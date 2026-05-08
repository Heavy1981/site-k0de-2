# køde Automações Fase 1 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ativar WhatsApp IA + lead capture + notificações usando n8n, Supabase e Evolution API.

**Architecture:** Dois workflows n8n independentes. Workflow 1 recebe webhooks da Evolution API e responde com Claude Haiku. Workflow 2 recebe submissões do briefing form, salva no Supabase e notifica via Gmail e WhatsApp.

**Tech Stack:** n8n, Supabase, Evolution API, Claude Haiku, Gmail OAuth2, HTML/JS

---

## Arquivos criados/modificados

| Arquivo | Ação | Responsabilidade |
|---------|------|-----------------|
| `supabase/migrations/001_initial_schema.sql` | Criado | Tabelas `leads` e `conversations` |
| `n8n/workflow-whatsapp-ai.json` | Criado | Workflow WhatsApp IA (importar no n8n) |
| `n8n/workflow-lead-capture.json` | Criado | Workflow Lead Capture (importar no n8n) |
| `index.html` | Modificado | `submitBriefing` envia para n8n + WhatsApp |
| `preview.html` | Modificado | Mesmo que index.html |

---

### Task 1: Criar tabelas no Supabase

- [ ] **Step 1: Executar o SQL**

  1. Acessar [supabase.com](https://supabase.com) → seu projeto
  2. Menu lateral: **SQL Editor → New Query**
  3. Colar o conteúdo de `supabase/migrations/001_initial_schema.sql`
  4. Clicar em **Run**

- [ ] **Step 2: Verificar tabelas**

  **Table Editor** deve mostrar: `leads` e `conversations`

- [ ] **Step 3: Copiar credenciais**

  **Settings → API → copiar:**
  - `Project URL` (ex: `https://xyzxyz.supabase.co`)
  - `anon public` key

  Guardar para a Task 3.

---

### Task 2: Criar instância Evolution API + conectar WhatsApp

- [ ] **Step 1: Acessar painel Evolution API**

  Abrir o painel no seu servidor Hostinger.

- [ ] **Step 2: Criar instância**

  1. Clicar em **Create Instance**
  2. Nome: `kode-production`
  3. Confirmar

- [ ] **Step 3: Conectar WhatsApp**

  1. Clicar na instância `kode-production` → **Connect**
  2. Abrir WhatsApp no celular → **Aparelhos conectados → Conectar aparelho**
  3. Escanear o QR code
  4. Aguardar status: **Connected**

- [ ] **Step 4: Anotar credenciais**

  - `Evolution API URL` (ex: `https://evolution.seudominio.com`)
  - `API Key` da instância
  - Instance name: `kode-production`

---

### Task 3: Configurar credenciais e variáveis no n8n

- [ ] **Step 1: Adicionar credencial Supabase**

  n8n → **Settings → Credentials → Add Credential → Supabase**

  ```
  Host: https://SEU_PROJECT_ID.supabase.co
  Service Role Secret: [anon public key copiada na Task 1]
  ```

  Salvar como: **Supabase køde**

- [ ] **Step 2: Adicionar credencial Gmail**

  n8n → **Settings → Credentials → Add Credential → Gmail OAuth2**

  Autenticar com `k0de.inteligence@gmail.com` → Salvar como: **Gmail køde**

- [ ] **Step 3: Adicionar variáveis de ambiente**

  n8n → **Settings → Variables → Add Variable**

  | Nome | Valor |
  |------|-------|
  | `ANTHROPIC_API_KEY` | Sua chave da Anthropic |
  | `EVOLUTION_API_URL` | URL da Evolution API |
  | `EVOLUTION_API_KEY` | API Key da Evolution |
  | `EVOLUTION_INSTANCE` | `kode-production` |

---

### Task 4: Importar e ativar Workflow 1 — WhatsApp IA

- [ ] **Step 1: Importar workflow**

  n8n → **Workflows → ⋮ → Import from File**
  
  Selecionar: `n8n/workflow-whatsapp-ai.json`

- [ ] **Step 2: Vincular credencial Supabase**

  Abrir o workflow importado. Clicar em cada um dos 3 nodes Supabase:
  - `Busca Histórico`
  - `Salva Mensagem User`
  - `Salva Resposta Bot`

  Em cada um → selecionar credencial **Supabase køde**

- [ ] **Step 3: Ativar e copiar URL do webhook**

  1. Clicar em **Activate** (toggle no topo direito)
  2. Clicar no node `Recebe Mensagem`
  3. Copiar a **Production URL** do webhook:
     ```
     https://SEU_N8N/webhook/whatsapp
     ```

- [ ] **Step 4: Configurar webhook na Evolution API**

  No painel Evolution API → instância `kode-production` → **Webhook**:

  ```
  URL: https://SEU_N8N/webhook/whatsapp
  Evento: messages.upsert (apenas esse)
  ```

  Salvar.

---

### Task 5: Importar e ativar Workflow 2 — Lead Capture

- [ ] **Step 1: Importar workflow**

  n8n → **Workflows → ⋮ → Import from File**

  Selecionar: `n8n/workflow-lead-capture.json`

- [ ] **Step 2: Vincular credenciais**

  - Node `Salva Lead Supabase` → selecionar **Supabase køde**
  - Node `Email Notificação` → selecionar **Gmail køde**

- [ ] **Step 3: Ativar e copiar URL do webhook**

  1. Clicar em **Activate**
  2. Clicar no node `Recebe Lead`
  3. Copiar a **Production URL**:
     ```
     https://SEU_N8N/webhook/lead
     ```

---

### Task 6: Conectar site ao webhook de leads

- [ ] **Step 1: Substituir URL placeholder no index.html e preview.html**

  Nos dois arquivos, localizar:
  ```
  COLE_AQUI_URL_WEBHOOK_N8N/webhook/lead
  ```

  Substituir pela URL copiada na Task 5 Step 3:
  ```
  https://SEU_N8N/webhook/lead
  ```

- [ ] **Step 2: Commit e deploy**

  ```bash
  git add index.html preview.html
  git commit -m "feat: connect briefing form to n8n lead capture webhook"
  git push
  ```

  A Vercel faz deploy automático em ~30 segundos.

---

### Task 7: Teste end-to-end

- [ ] **Step 1: Testar Lead Capture**

  1. Acessar `https://k0de.com.br`
  2. Clicar em **Formulário para seu site**
  3. Preencher e enviar o formulário
  4. Verificar:
     - Email chegou em `k0de.inteligence@gmail.com` ✓
     - Mensagem WhatsApp chegou para Fabiano ✓
     - Supabase → tabela `leads` → nova linha com status `novo` ✓
     - n8n → **Executions → køde — Lead Capture** → status verde ✓

- [ ] **Step 2: Testar WhatsApp IA**

  1. Enviar mensagem para o número da køde: `"Olá, quanto custa um site?"`
  2. Verificar:
     - Resposta chega em ~5 segundos ✓
     - Supabase → tabela `conversations` → 2 novas linhas (user + assistant) ✓
     - n8n → **Executions → køde — WhatsApp IA** → status verde ✓

- [ ] **Step 3: Testar filtro de grupos**

  Enviar mensagem do próprio número da køde para si mesmo — o bot **não** deve responder.
  n8n Executions deve mostrar execução parada no node `Filtra Grupos e Bot`.
