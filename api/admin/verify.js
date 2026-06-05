const crypto = require('crypto')
const ADMIN_PASSWORD = (process.env.BLOG_ADMIN_PASSWORD || '').trim()

function sessionToken(password) {
  return crypto.createHmac('sha256', 'kode-session-v1').update(password).digest('hex')
}

module.exports = (req, res) => {
  const cookies = Object.fromEntries(
    (req.headers.cookie || '').split(';').map(c => {
      const [k, ...v] = c.trim().split('=')
      return [k, v.join('=')]
    })
  )

  const expected = sessionToken(ADMIN_PASSWORD)
  if (cookies.blog_admin && cookies.blog_admin === expected) {
    return res.status(200).json({ ok: true })
  }

  res.status(401).json({ ok: false })
}
