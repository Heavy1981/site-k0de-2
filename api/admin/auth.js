const ADMIN_PASSWORD = process.env.BLOG_ADMIN_PASSWORD
const SEVEN_DAYS = 60 * 60 * 24 * 7

function setCookie(res, value) {
  res.setHeader('Set-Cookie',
    `blog_admin=${value}; HttpOnly; Secure; SameSite=Strict; Max-Age=${SEVEN_DAYS}; Path=/`)
}

function clearCookie(res) {
  res.setHeader('Set-Cookie',
    'blog_admin=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/')
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'same-origin')
  res.setHeader('Access-Control-Allow-Methods', 'POST, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  // DELETE = logout
  if (req.method === 'DELETE') {
    clearCookie(res)
    return res.status(200).json({ ok: true })
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { password } = req.body || {}

  if (!password || !ADMIN_PASSWORD) {
    return res.status(400).json({ error: 'Missing credentials' })
  }

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Senha incorreta' })
  }

  setCookie(res, ADMIN_PASSWORD)
  res.status(200).json({ ok: true })
}
