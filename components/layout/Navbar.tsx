'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, MessageCircle } from 'lucide-react'
import GreenButton from '@/components/ui/GreenButton'
import { navLinks, WHATSAPP_URL } from '@/lib/constants'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-950/90 backdrop-blur-md border-b border-white/[0.06]' : ''
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container-k0de px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 no-underline">
            {/* Icon mark */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1a1f2e] to-[#0d1117] border border-white/10 flex items-center justify-center shadow-lg flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                <path d="M5 4v14M5 11l5-4M5 11l6 7" stroke="#e2e8f0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="15" cy="11" r="3.5" stroke="#4B7BFF" strokeWidth="1.7"/>
                <line x1="12.5" y1="8.5" x2="17.5" y2="13.5" stroke="#4B7BFF" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            {/* Wordmark */}
            <div className="flex flex-col gap-0">
              <span className="font-display font-bold text-[1.4rem] leading-none tracking-[-0.5px] text-white">
                k<span className="text-[#4B7BFF]">ø</span>de
              </span>
              <span className="font-mono text-[0.5rem] tracking-[0.18em] text-slate-600 uppercase leading-none mt-0.5">
                Sites & Landing Pages
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-slate-400 hover:text-brand-green transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <GreenButton href={WHATSAPP_URL} size="sm" icon={<MessageCircle size={15} />}>
              Quero meu site
            </GreenButton>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-slate-400 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          className="md:hidden bg-dark-900/95 backdrop-blur-md border-b border-white/[0.06]"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-slate-400 hover:text-brand-green transition-colors font-medium py-2"
              >
                {link.label}
              </a>
            ))}
            <GreenButton href={WHATSAPP_URL} className="mt-2 justify-center" icon={<MessageCircle size={15} />}>
              Quero meu site
            </GreenButton>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
