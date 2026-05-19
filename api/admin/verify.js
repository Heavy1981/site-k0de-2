const ADMIN_PASSWORD = process.env.BLOG_ADMIN_PASSWORD

module.exports = (req, res) => {
  const cookies = Object.fromEntries(
    (req.headers.cookie || '').split(';').map(c => {
      const [k, ...v] = c.trim().split('=')
      return [k, v.join('=')]
    })
  )

  if (cookies.blog_admin && cookies.blog_admin === ADMIN_PASSWORD) {
    return res.status(200).json({ ok: true })
  }

  res.status(401).json({ ok: false })
}
