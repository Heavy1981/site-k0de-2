const crypto = require('crypto')
const ADMIN_PASSWORD = (process.env.BLOG_ADMIN_PASSWORD || '').trim()
const SEVEN_DAYS = 60 * 60 * 24 * 7

function sessionToken(password) {
  return crypto.createHmac('sha256', 'kode-session-v1').update(password).digest('hex')
}

function setCookie(res, token) {
  res.setHeader('Set-Cookie',
    `blog_admin=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=${SEVEN_DAYS}; Path=/`)
}

function clearCookie(res) {
  res.setHeader('Set-Cookie',
    'blog_admin=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/')
}

const delay = ms => new Promise(r => setTimeout(r, ms))

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'same-origin')
  res.setHeader('Access-Control-Allow-Methods', 'POST, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method === 'DELETE') {
    clearCookie(res)
    return res.status(200).json({ ok: true })
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { password } = req.body || {}

  if (!password || !ADMIN_PASSWORD) {
    return res.status(400).json({ error: 'Missing credentials' })
  }

  // Constant-time delay on every attempt to slow brute force
  await delay(800)

  if (!crypto.timingSafeEqual(Buffer.from(password), Buffer.from(ADMIN_PASSWORD))) {
    await delay(1200)
    return res.status(401).json({ error: 'Senha incorreta' })
  }

  setCookie(res, sessionToken(ADMIN_PASSWORD))
  res.status(200).json({ ok: true })
}
