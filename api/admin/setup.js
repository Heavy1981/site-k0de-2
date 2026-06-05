const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim()
const SERVICE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim()
const ADMIN_TOKEN = (process.env.BLOG_ADMIN_PASSWORD || '').trim()

function getCookie(req, name) {
  return Object.fromEntries(
    (req.headers.cookie || '').split(';').map(c => {
      const [k, ...v] = c.trim().split('=')
      return [k, v.join('=')]
    })
  )[name] || ''
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  return res.status(404).json({ error: 'Not found' })

  const cookie = getCookie(req, 'blog_admin')
  if (cookie !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const report = { env: {}, bucket: null, table: null, errors: [] }
  const headers = {
    'Content-Type': 'application/json',
    'apikey': SERVICE_KEY,
    'Authorization': `Bearer ${SERVICE_KEY}`,
  }

  report.env = {
    hasUrl: !!SUPABASE_URL,
    hasKey: !!SERVICE_KEY,
    urlPrefix: SUPABASE_URL ? SUPABASE_URL.slice(0, 45) + '...' : null,
    urlLength: SUPABASE_URL.length,
    keyLength: SERVICE_KEY.length,
  }

  if (!SUPABASE_URL || !SERVICE_KEY) {
    return res.status(500).json({ ...report, error: 'Missing Supabase env vars' })
  }

  // 1. Check/create bucket blog-images
  try {
    const listRes = await fetch(`${SUPABASE_URL}/storage/v1/bucket/blog-images`, { headers })
    if (listRes.ok) {
      report.bucket = 'exists'
    } else {
      const createRes = await fetch(`${SUPABASE_URL}/storage/v1/bucket`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ id: 'blog-images', name: 'blog-images', public: true }),
      })
      const createData = await createRes.json()
      report.bucket = createRes.ok ? 'created' : `error: ${JSON.stringify(createData)}`
    }
  } catch (e) {
    report.bucket = 'error: ' + e.message
    report.errors.push('bucket: ' + e.message)
  }

  // 2. Check/create posts table via SQL (using REST API won't create tables)
  // Check if table exists
  try {
    const tableRes = await fetch(`${SUPABASE_URL}/rest/v1/posts?limit=0`, { headers })
    if (tableRes.ok || tableRes.status === 200) {
      report.table = 'exists'
    } else {
      const tableData = await tableRes.json()
      report.table = `missing or error (${tableRes.status}): ${JSON.stringify(tableData).slice(0, 200)}`
      report.errors.push('table: needs to be created manually — see SQL below')
      report.sql = `create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  cover_url text,
  content text default '',
  excerpt text default '',
  tag text default 'IA & Automação',
  status text default 'draft',
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);`
    }
  } catch (e) {
    report.table = 'error: ' + e.message
    report.errors.push('table: ' + e.message)
  }

  res.status(200).json(report)
}
