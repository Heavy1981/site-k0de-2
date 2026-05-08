const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const ADMIN_TOKEN = process.env.BLOG_ADMIN_PASSWORD

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const auth = req.headers['authorization'] || ''
  if (auth !== `Bearer ${ADMIN_TOKEN}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { filename, contentType, base64 } = req.body || {}
  if (!filename || !base64) return res.status(400).json({ error: 'Missing file data' })

  const buffer = Buffer.from(base64, 'base64')
  const ext = filename.split('.').pop()
  const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const uploadUrl = `${SUPABASE_URL}/storage/v1/object/blog-images/${uniqueName}`

  const r = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      'Content-Type': contentType || 'image/jpeg',
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
    },
    body: buffer,
  })

  if (!r.ok) {
    const err = await r.text()
    return res.status(r.status).json({ error: err })
  }

  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/blog-images/${uniqueName}`
  res.status(200).json({ url: publicUrl })
}
