const crypto = require('crypto')
const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim()
const SERVICE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim()
const ADMIN_TOKEN = (process.env.BLOG_ADMIN_PASSWORD || '').trim()

function sessionToken(password) {
  return crypto.createHmac('sha256', 'kode-session-v1').update(password).digest('hex')
}

function supabaseHeaders() {
  return {
    'Content-Type': 'application/json',
    'apikey': SERVICE_KEY,
    'Authorization': `Bearer ${SERVICE_KEY}`,
    'Prefer': 'return=representation',
  }
}

function getCookie(req, name) {
  const cookies = Object.fromEntries(
    (req.headers.cookie || '').split(';').map(c => {
      const [k, ...v] = c.trim().split('=')
      return [k, v.join('=')]
    })
  )
  return cookies[name] || ''
}

function isAuthorized(req) {
  const auth = req.headers['authorization'] || ''
  const cookie = getCookie(req, 'blog_admin')
  const token = sessionToken(ADMIN_TOKEN)
  return auth === `Bearer ${ADMIN_TOKEN}` || cookie === token
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') return res.status(200).end()

  if (!SUPABASE_URL || !SERVICE_KEY) {
    return res.status(503).json({ error: 'Blog temporariamente indisponível: banco de dados não configurado.' })
  }

  const base = `${SUPABASE_URL}/rest/v1/posts`

  // GET — public: published posts; admin: all posts
  if (req.method === 'GET') {
    const { slug, all } = req.query
    let url = base

    if (slug) {
      url += `?slug=eq.${encodeURIComponent(slug)}&select=*&limit=1`
    } else if (all && isAuthorized(req)) {
      url += '?select=*&order=created_at.desc'
    } else {
      url += '?status=eq.published&select=*&order=published_at.desc'
    }

    const r = await fetch(url, { headers: supabaseHeaders() })
    const data = await r.json()
    return res.status(r.status).json(slug ? (data[0] || null) : data)
  }

  // All write operations require auth
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // POST — create post
  if (req.method === 'POST') {
    const body = req.body || {}
    const slug = body.title
      ? body.title.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
          .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
      : `post-${Date.now()}`

    const payload = {
      title: body.title,
      slug,
      cover_url: body.cover_url || null,
      content: body.content || '',
      excerpt: body.excerpt || body.content?.replace(/<[^>]+>/g, '').slice(0, 160) || '',
      tag: body.tag || 'IA & Automação',
      status: body.status || 'draft',
      published_at: body.status === 'published' ? new Date().toISOString() : null,
    }

    // Insert; if the slug already exists, retry once with a short unique suffix so
    // saving never fails just because another post shares the same title.
    let r = await fetch(base, {
      method: 'POST',
      headers: supabaseHeaders(),
      body: JSON.stringify(payload),
    })
    if (r.status === 409) {
      payload.slug = `${payload.slug}-${Date.now().toString(36).slice(-4)}`
      r = await fetch(base, {
        method: 'POST',
        headers: supabaseHeaders(),
        body: JSON.stringify(payload),
      })
    }
    const data = await r.json()
    if (!r.ok) {
      return res.status(r.status).json({ error: data.message || data.error || 'Erro ao salvar o post' })
    }
    return res.status(r.status).json(data)
  }

  // PATCH — update post
  if (req.method === 'PATCH') {
    const { id } = req.query
    if (!id) return res.status(400).json({ error: 'Missing id' })

    const body = req.body || {}
    const updates = { ...body, updated_at: new Date().toISOString() }

    if (updates.status === 'published' && !updates.published_at) {
      updates.published_at = new Date().toISOString()
    }

    const r = await fetch(`${base}?id=eq.${id}`, {
      method: 'PATCH',
      headers: supabaseHeaders(),
      body: JSON.stringify(updates),
    })
    const data = await r.json()
    if (!r.ok) {
      return res.status(r.status).json({ error: data.message || data.error || 'Erro ao salvar o post' })
    }
    return res.status(r.status).json(data)
  }

  // DELETE — remove post
  if (req.method === 'DELETE') {
    const { id } = req.query
    if (!id) return res.status(400).json({ error: 'Missing id' })

    const r = await fetch(`${base}?id=eq.${id}`, {
      method: 'DELETE',
      headers: supabaseHeaders(),
    })
    return res.status(r.status).json({ ok: true })
  }

  res.status(405).json({ error: 'Method not allowed' })
}
