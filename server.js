const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = 5500
const FILE = path.join(__dirname, 'preview.html')

const SECURITY_HEADERS = {
  'Content-Type': 'text/html; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Cache-Control': 'no-store',
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' })
    return res.end()
  }
  const content = fs.readFileSync(FILE, 'utf8')
  res.writeHead(200, SECURITY_HEADERS)
  res.end(content)
})

server.listen(PORT, () => {
  console.log(`\n  Preview rodando em: http://localhost:${PORT}\n`)
  console.log('  Pressione Ctrl+C para parar.')
})
