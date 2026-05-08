# køde — Automações Fase 1: Design Spec
**Data:** 2026-04-24  
**Status:** Aprovado  
**Stack:** n8n + Supabase + Evolution API + Claude Haiku + Gmail

---

## Objetivo

Implementar a base de automações da køde em 4 entregas independentes:

1. WhatsApp com IA (respostas automáticas via Claude Haiku)
2. Lead capture (briefing form → Supabase)
3. Email de notificação para novo lead (Gmail)
4. Notificação WhatsApp para o dono quando chegar lead

---

## Arquitetura

Dois workflows n8n independentes. Toda a lógica de negócio fica no n8n — zero código novo no servidor.

```
FLUXO 1 — WhatsApp IA
Usuário WhatsApp
  → Evolution API (webhook mensagem recebida)
  → n8n Webhook POST /webhook/whatsapp
  → Filtra: ignora grupos (@g.us) e mensagens do próprio bot (fromMe)
  → Supabase: busca últimas 10 mensagens da conversa (por phone)
  → Monta messages[] com histórico + mensagem atual
  → HTTP Request: Claude Haiku (api.anthropic.com/v1/messages)
  → Supabase: salva mensagem do usuário + resposta do bot
  → HTTP Request: Evolution API envia resposta ao usuário

FLUXO 2 — Lead Capture
Website k0de.com.br (formulário briefing)
  → fetch POST /webhook/lead (fire-and-forget)
  → n8n Webhook POST /webhook/lead
  → Supabase: INSERT INTO leads
  → Gmail: envia email de notificação para Fabiano
  → Evolution API: envia resumo do lead no WhatsApp de Fabiano
```

---

## Supabase Schema

```sql
-- Leads recebidos pelo formulário de briefing
CREATE TABLE leads (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at  timestamptz DEFAULT now(),
  nome        text NOT NULL,
  empresa     text,
  segmento    text,
  whatsapp    text NOT NULL,
  pacote      text,
  objetivo    text,
  dominio     text,
  logo        text,
  referencias text,
  info        text,
  status      text DEFAULT 'novo'  -- novo | em_contato | fechado | perdido
);

-- Histórico de conversas WhatsApp por número
CREATE TABLE conversations (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  phone       text NOT NULL,
  role        text NOT NULL,   -- 'user' | 'assistant'
  content     text NOT NULL,
  created_at  timestamptz DEFAULT now()
);

CREATE INDEX idx_conversations_phone ON conversations(phone, created_at DESC);
```

---

## Workflow 1 — WhatsApp IA (n8n)

### Nodes em ordem

| # | Node | Tipo | Config |
|---|------|------|--------|
| 1 | Recebe mensagem | Webhook | POST `/webhook/whatsapp`, responde 200 imediato |
| 2 | Filtra inválidos | IF | `fromMe = true` OR `remoteJid` contains `@g.us` → Stop |
| 3 | Extrai dados | Set | `phone` = remoteJid sem `@s.whatsapp.net`, `text` = conversation ou extendedTextMessage.text |
| 4 | IF sem texto | IF | `text` vazio → Stop |
| 5 | Busca histórico | Supabase | SELECT `role`, `content` FROM `conversations` WHERE `phone` = `{{phone}}` ORDER BY `created_at` DESC LIMIT 10 |
| 6 | Monta payload | Code | Reverte array (ASC), adiciona mensagem atual como `user` |
| 7 | Chama Claude | HTTP Request | POST `https://api.anthropic.com/v1/messages` — header `x-api-key`, body com model, system, messages |
| 8 | Salva histórico | Supabase | INSERT user message + assistant reply em `conversations` |
| 9 | Envia resposta | HTTP Request | POST Evolution API `/message/sendText/{{instancia}}` com `number` e `text` |

### System Prompt (Claude)

```
Você é o assistente virtual da køde, agência de sites e landing pages em Bragança Paulista, SP.

SOBRE A KØDE:
- Sites e landing pages profissionais entregues em 7 dias
- Atendemos todo o Brasil, foco em Bragança Paulista e região
- Fundador: Fabiano (WhatsApp direto para negociações)

PACOTES:
1. Starter — R$ 1.489 — Landing page, 1 revisão, 5 dias úteis
2. Pro — R$ 2.959 — Site até 5 páginas, SEO, Analytics, 2 revisões, 7 dias ⭐
3. Scale — Sob consulta — Site completo + CMS, revisões ilimitadas, suporte mensal

COMO RESPONDER:
- Português brasileiro informal mas profissional
- Mensagens curtas (máx 3-4 parágrafos)
- Máximo 2-3 emojis por mensagem
- Se quiser fechar ou tiver dúvida complexa, ofereça passar para o Fabiano
- Não invente informações fora deste prompt
```

---

## Workflow 2 — Lead Capture (n8n)

### Nodes em ordem

| # | Node | Tipo | Config |
|---|------|------|--------|
| 1 | Recebe lead | Webhook | POST `/webhook/lead`, responde 200 imediato |
| 2 | Salva lead | Supabase | INSERT INTO `leads` com todos os campos do body |
| 3 | Email notificação | Gmail | Para: `k0de.inteligence@gmail.com` — assunto: `🔔 Novo lead køde — {{nome}} ({{pacote}})` |
| 4 | WhatsApp notificação | HTTP Request | Evolution API envia resumo para `5511345920335` |

### Template email

```
🔔 NOVO LEAD — køde

Nome: {{nome}}
Empresa: {{empresa}}
Segmento: {{segmento}}
WhatsApp: {{whatsapp}}

Pacote: {{pacote}}
Objetivo: {{objetivo}}
Domínio: {{dominio}}
Logo/Visual: {{logo}}

Referências: {{referencias}}
Informações extras: {{info}}

Recebido em: {{created_at}}
```

---

## Mudança no Site (index.html)

Substituir `submitBriefing` para fazer chamada **fire-and-forget** ao n8n antes de abrir o WhatsApp:

```javascript
async function submitBriefing(e) {
  e.preventDefault();
  const f = document.getElementById('briefingForm');

  const payload = {
    nome: f.nome.value,
    empresa: f.empresa.value,
    segmento: f.segmento.value,
    whatsapp: f.whatsapp.value,
    pacote: getActiveChip('pacote'),
    objetivo: getActiveChip('objetivo'),
    dominio: getActiveChip('dominio'),
    logo: getActiveChip('logo'),
    referencias: f.referencias.value || '',
    info: f.info.value || ''
  };

  // Salva lead no Supabase via n8n (silencioso, não bloqueia o usuário)
  fetch('N8N_WEBHOOK_URL/webhook/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).catch(() => {});

  // Abre WhatsApp normalmente
  const msg = buildWhatsAppMessage(payload);
  window.open(`https://wa.me/5511345920335?text=${encodeURIComponent(msg)}`, '_blank');
  closeBriefing();
  f.reset();
}
```

---

## Setup Evolution API

1. Criar instância `kode-production` no painel da Evolution API
2. Gerar QR code → escanear com WhatsApp da køde
3. Configurar webhook:
   - URL: `https://SEU_N8N/webhook/whatsapp`
   - Evento: `messages.upsert`
4. Testar enviando mensagem para o número

---

## Variáveis de Ambiente (n8n Credentials)

| Variável | Onde usar |
|----------|-----------|
| `ANTHROPIC_API_KEY` | HTTP Request → Claude |
| `EVOLUTION_API_URL` | HTTP Request → Evolution API |
| `EVOLUTION_API_KEY` | HTTP Request → Evolution API (header `apikey`) |
| `EVOLUTION_INSTANCE` | Nome da instância (ex: `kode-production`) |
| Supabase URL + anon key | Nodes Supabase |
| Gmail OAuth | Node Gmail |

---

## Fases Futuras (fora deste spec)

- **Fase 2:** Follow-up automático + relatório semanal de leads
- **Fase 3:** Instagram DM com IA
