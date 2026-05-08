# køde — Automação com IA para Empresas

Site institucional da **køde**, empresa brasileira especializada em automação com inteligência artificial para empresas.

## 🚀 Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v3**
- **Framer Motion**
- **Three.js** (animações 3D)

## ✨ Features

- Particle network interativo com física de repulsão
- Cards com 3D tilt + efeito holográfico
- Magnetic buttons
- Glitch text animation
- Orbit rings 3D
- Floating terminals com dados em tempo real
- Data streams (matrix)
- Parallax multi-camada
- Typewriter effect
- Animated counters
- Grain overlay texture
- Aurora beams + scan line

## 🛠️ Desenvolvimento

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Preview estático com live-server
preview.bat   # duplo clique no Windows

# Build de produção
npm run build
```

## 🔒 Segurança

- CSP (Content Security Policy)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera, mic, geolocation bloqueados
- `rel="noopener noreferrer"` em todos os links externos
- 0 vulnerabilidades no `npm audit`

## 🌐 Deploy

Site publicado via **GitHub Pages**:
```
https://heavy1981.github.io/Site-k0de/
```

## 📁 Estrutura

```
k0de/
├── app/                  # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── layout/           # Navbar, Footer
│   ├── sections/         # Hero, Services, HowItWorks...
│   └── ui/               # GlassCard, GreenButton...
├── lib/
│   └── constants.ts      # dados estáticos e variantes
├── docs/                 # GitHub Pages (preview estático)
├── preview.html          # preview standalone
├── preview.bat           # servidor local de preview
└── server.js             # servidor Node.js com headers de segurança
```

## 🎨 Identidade Visual

| Token | Valor |
|-------|-------|
| Azul primário | `#4B7BFF` |
| Azul secundário | `#818cf8` |
| Dark background | `#020408` |
| Fonte display | Space Grotesk |
| Fonte mono | JetBrains Mono |

---

© 2026 køde Automações · São Paulo, SP · Brasil
