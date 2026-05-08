/**
 * køde WhatsApp AI Bot
 * Webhook receiver + Claude AI responses via Evolution API
 *
 * Setup:
 *   1. npm install  (dentro desta pasta)
 *   2. Copie .env.example → .env e preencha as chaves
 *   3. node bot.js
 *   4. Configure o webhook na sua Evolution API para apontar para http://SEU_IP:3001/webhook
 */

require('dotenv').config()
const express = require('express')
const Anthropic = require('@anthropic-ai/sdk')

const app = express()
app.use(express.json())

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// Histórico de conversa por número de telefone (máx 20 mensagens por sessão)
const sessions = new Map()
const MAX_HISTORY = 20
const SESSION_TTL_MS = 30 * 60 * 1000 // 30 minutos sem atividade limpa a sessão

// System prompt da køde — personalidade e conhecimento do negócio
const SYSTEM_PROMPT = `Você é o assistente virtual da køde, uma agência especializada em criação de sites e landing pages em Bragança Paulista, SP.

SOBRE A KØDE:
- Criamos sites e landing pages profissionais para pequenas e médias empresas
- Entregamos em 7 dias úteis (ou menos)
- Atendemos todo o Brasil, com foco em Bragança Paulista e região
- Fundador: Fabiano (responde diretamente pelo WhatsApp)

PACOTES:
1. Starter — R$ 1.489 (pagamento único)
   • Landing page profissional, design responsivo, botão WhatsApp, formulário de contato
   • 1 rodada de revisão | Entrega em 5 dias úteis

2. Pro — R$ 2.959 (pagamento único) ⭐ Mais popular
   • Site com até 5 páginas, SEO básico, Google Analytics
   • 2 rodadas de revisão | Entrega em 7 dias úteis

3. Scale — Sob consulta
   • Site personalizado completo, painel CMS, integrações customizadas
   • Revisões ilimitadas | Suporte mensal incluído | Entrega em até 15 dias úteis

SEGMENTOS QUE ATENDEMOS:
Saúde (clínicas, dentistas), Jurídico (advogados), Restaurantes, Construção, Beleza (salões), Varejo, Educação, Fitness, Imóveis, Automotivo.

DIFERENCIAIS:
- Entrega garantida em 7 dias
- 100% mobile-first
- SEO otimizado
- Pagamento: 50% na aprovação do briefing + 50% na entrega
- Aceitamos Pix, cartão de crédito e boleto

COMO RESPONDER:
- Seja simpático, objetivo e direto — sem textos longos demais
- Use português brasileiro informal mas profissional
- Se perguntarem sobre preço, explique os pacotes com clareza
- Se o cliente quiser contratar ou tiver dúvidas técnicas complexas, ofereça para Fabiano entrar em contato
- Não invente informações que não estão neste prompt
- Use emojis com moderação (no máximo 2-3 por mensagem)
- Mensagens curtas (máx 3-4 parágrafos)
- Se não souber responder, diga que vai passar para o Fabiano`

function getHistory(phone) {
  const session = sessions.get(phone)
  if (!session) return []
  // Limpa sessões antigas
  if (Date.now() - session.lastActivity > SESSION_TTL_MS) {
    sessions.delete(phone)
    return []
  }
  return session.messages
}

function saveHistory(phone, messages) {
  const trimmed = messages.slice(-MAX_HISTORY)
  sessions.set(phone, { messages: trimmed, lastActivity: Date.now() })
}

async function sendWhatsAppMessage(phone, text) {
  const url = `${process.env.EVOLUTION_API_URL}/message/sendText/${process.env.EVOLUTION_INSTANCE}`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': process.env.EVOLUTION_API_KEY,
    },
    body: JSON.stringify({
      number: phone,
      text,
      delay: 1200, // simula digitação humana (ms)
    }),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Evolution API error ${res.status}: ${err}`)
  }
  return res.json()
}

async function getAIResponse(phone, userMessage) {
  const history = getHistory(phone)

  history.push({ role: 'user', content: userMessage })

  const response = await claude.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 400,
    system: SYSTEM_PROMPT,
    messages: history,
  })

  const assistantMessage = response.content[0].text
  history.push({ role: 'assistant', content: assistantMessage })
  saveHistory(phone, history)

  return assistantMessage
}

// Webhook principal — recebe mensagens do Evolution API
app.post('/webhook', async (req, res) => {
  // Responde 200 imediatamente para o Evolution API não reenviar
  res.sendStatus(200)

  try {
    const { data, event } = req.body

    // Ignora eventos que não são mensagens recebidas
    if (event !== 'messages.upsert') return

    const msg = data?.message
    const from = data?.key?.remoteJid
    const isFromMe = data?.key?.fromMe

    // Ignora mensagens enviadas pelo próprio bot e grupos
    if (isFromMe || !from || from.includes('@g.us')) return

    // Extrai o texto da mensagem
    const text = msg?.conversation || msg?.extendedTextMessage?.text
    if (!text) return

    const phone = from.replace('@s.whatsapp.net', '')

    console.log(`[${new Date().toLocaleTimeString('pt-BR')}] 📩 ${phone}: ${text.slice(0, 80)}`)

    const reply = await getAIResponse(phone, text)

    console.log(`[${new Date().toLocaleTimeString('pt-BR')}] 🤖 Bot → ${phone}: ${reply.slice(0, 80)}`)

    await sendWhatsAppMessage(from, reply)

  } catch (err) {
    console.error('Erro no webhook:', err.message)
  }
})

// Health check
app.get('/health', (_, res) => {
  res.json({ status: 'ok', sessions: sessions.size, timestamp: new Date().toISOString() })
})

// Limpa sessões expiradas a cada 10 minutos
setInterval(() => {
  const now = Date.now()
  for (const [phone, session] of sessions.entries()) {
    if (now - session.lastActivity > SESSION_TTL_MS) sessions.delete(phone)
  }
}, 10 * 60 * 1000)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`\n🤖 køde WhatsApp Bot rodando na porta ${PORT}`)
  console.log(`📡 Webhook: POST http://localhost:${PORT}/webhook`)
  console.log(`❤️  Health:  GET  http://localhost:${PORT}/health\n`)
})
