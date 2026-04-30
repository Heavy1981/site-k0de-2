import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'køde — Automação com IA para Empresas',
  description:
    'Automatize WhatsApp, Telegram, Slack, Gmail e muito mais com inteligência artificial. +300 empresas já confiam na køde. Setup em 7 dias.',
  keywords: [
    'automação whatsapp', 'chatbot empresarial', 'inteligência artificial brasil',
    'automação telegram', 'bot whatsapp', 'automação slack', 'IA atendimento',
    'automação gmail', 'chatbot ia', 'køde automações'
  ],
  openGraph: {
    title: 'køde — Automação com IA para Empresas',
    description: 'Automatize seu atendimento 24/7 com IA. WhatsApp, Telegram, Slack, Gmail e muito mais.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'køde',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'køde — Automação com IA para Empresas',
    description: 'Automatize seu atendimento 24/7 com IA.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  )
}
