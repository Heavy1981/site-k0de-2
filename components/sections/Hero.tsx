'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Play, ArrowRight, Globe, Users, Star } from 'lucide-react'
import GreenButton from '@/components/ui/GreenButton'
import { fadeInUp, staggerContainer, WHATSAPP_URL } from '@/lib/constants'

const typewriterWords = [
  'Clínicas', 'Dentistas', 'Advogados',
  'Restaurantes', 'Lojas', 'Construtoras',
]

const segmentPills = [
  { icon: '🏥', label: 'Saúde' },
  { icon: '⚖️', label: 'Jurídico' },
  { icon: '🍕', label: 'Restaurantes' },
  { icon: '🏗️', label: 'Construção' },
  { icon: '💇', label: 'Beleza' },
  { icon: '🛍️', label: 'Varejo' },
  { icon: '📚', label: 'Educação' },
  { icon: '🏋️', label: 'Fitness' },
]

function SiteMockupCard() {
  return (
    <motion.div
      className="absolute right-[-20px] top-[18%] w-[220px] z-10 hidden xl:block"
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="rounded-2xl border border-white/10 bg-dark-900/90 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Browser bar */}
        <div className="flex items-center gap-1.5 px-3 py-2.5 bg-dark-800/80 border-b border-white/[0.06]">
          <span className="w-2 h-2 rounded-full bg-red-500/70" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
          <span className="w-2 h-2 rounded-full bg-green-500/70" />
          <span className="ml-2 text-[0.55rem] font-mono text-slate-500 truncate">clinicasorrir.com.br</span>
        </div>
        {/* Site preview */}
        <div className="p-3 space-y-2">
          <div className="h-1.5 bg-brand-green/30 rounded-full w-3/4" />
          <div className="h-1 bg-white/10 rounded-full w-full" />
          <div className="h-1 bg-white/10 rounded-full w-5/6" />
          <div className="mt-3 h-8 rounded-lg bg-brand-green/20 border border-brand-green/30 flex items-center justify-center">
            <span className="text-brand-green text-[0.6rem] font-semibold">Agendar Consulta</span>
          </div>
        </div>
        {/* Status */}
        <div className="px-3 py-2 border-t border-white/[0.06] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
          <span className="text-[0.55rem] font-mono text-slate-400">site no ar · 7 dias</span>
        </div>
      </div>
    </motion.div>
  )
}

function StatsCard() {
  return (
    <motion.div
      className="absolute left-[-30px] bottom-[25%] w-[190px] z-10 hidden xl:block"
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
    >
      <div className="rounded-2xl border border-white/10 bg-dark-900/90 backdrop-blur-xl p-4 shadow-2xl">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg bg-brand-green/15 border border-brand-green/30 flex items-center justify-center">
            <Globe size={12} className="text-brand-green" />
          </div>
          <span className="text-[0.6rem] font-mono text-slate-400">visitantes hoje</span>
        </div>
        <div className="font-display font-black text-2xl text-white mb-1">247</div>
        <div className="flex items-center gap-1 text-[0.6rem]">
          <span className="text-brand-green font-semibold">+32%</span>
          <span className="text-slate-500">esta semana</span>
        </div>
        <div className="mt-3 flex gap-1 items-end h-8">
          {[30, 50, 40, 70, 55, 85, 90].map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-sm ${i === 6 ? 'bg-brand-green' : 'bg-brand-green/25'}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid pt-20">
      {/* Background orbs */}
      <div className="orb w-[600px] h-[600px] bg-brand-green/10 top-[-200px] left-[-200px] animate-float" style={{ animationDuration: '10s' }} />
      <div className="orb w-[500px] h-[500px] bg-blue-500/8 bottom-[-100px] right-[-100px] animate-float" style={{ animationDuration: '14s', animationDelay: '-4s' }} />
      <div className="orb w-[300px] h-[300px] bg-purple-500/8 top-[40%] left-[60%] animate-float" style={{ animationDuration: '18s', animationDelay: '-8s' }} />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-gradient-radial from-brand-green/5 via-transparent to-transparent" />

      {/* Floating mockup cards */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative max-w-6xl mx-auto h-full">
          <SiteMockupCard />
          <StatsCard />
        </div>
      </div>

      <div className="container-k0de section-padding relative z-10">
        <motion.div
          className="text-center max-w-5xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-green/30 bg-brand-green/5 text-brand-green text-xs font-semibold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              Sites · Automações · IA · Bragança Paulista & Brasil
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight"
          >
            <span className="text-white block mb-2">Seu negócio</span>
            <span className="text-gradient block mb-2">online e no automático.</span>
            <span className="text-white block">Em 7 dias.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeInUp}
            className="mt-8 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Sites profissionais e automações de IA para{' '}
            <TypewriterInline words={typewriterWords} />{' '}
            — de Bragança Paulista ao{' '}
            <span className="text-brand-green font-semibold">Brasil todo</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeInUp} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <GreenButton href={WHATSAPP_URL} size="lg" icon={<MessageCircle size={18} />}>
              Quero meu site agora
            </GreenButton>
            <GreenButton href="#automacoes" variant="ghost" size="lg" icon={<ArrowRight size={16} />}>
              Ver Automações
            </GreenButton>
          </motion.div>

          {/* Social proof */}
          <motion.p variants={fadeInUp} className="mt-6 text-slate-500 text-sm">
            Sites em 7 dias · Bots de IA 24h · Revisões inclusas
          </motion.p>

          {/* Segment pills */}
          <motion.div
            variants={staggerContainer}
            className="mt-16 flex items-center justify-center flex-wrap gap-3"
          >
            {segmentPills.map((item, i) => (
              <motion.div
                key={item.label}
                variants={{
                  hidden: { opacity: 0, scale: 0.5, y: 20 },
                  visible: {
                    opacity: 1, scale: 1, y: 0,
                    transition: { delay: 0.6 + i * 0.08, type: 'spring', stiffness: 200 }
                  }
                }}
                whileHover={{ scale: 1.15, y: -4 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass glass-hover"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium text-slate-300">{item.label}</span>
              </motion.div>
            ))}

            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: { opacity: 1, scale: 1, transition: { delay: 1.3 } }
              }}
              className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-brand-green/20 bg-brand-green/5"
            >
              <span className="text-brand-green text-sm font-semibold">+10 segmentos</span>
              <ArrowRight size={14} className="text-brand-green" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-brand-green/50 to-transparent mx-auto" />
      </motion.div>
    </section>
  )
}

function TypewriterInline({ words }: { words: string[] }) {
  'use client'
  const [index, setIndex] = React.useState(0)
  const [displayed, setDisplayed] = React.useState('')
  const [deleting, setDeleting] = React.useState(false)

  React.useEffect(() => {
    const word = words[index]
    if (!deleting) {
      if (displayed.length < word.length) {
        const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 90)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setDeleting(true), 1800)
        return () => clearTimeout(t)
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
        return () => clearTimeout(t)
      } else {
        setDeleting(false)
        setIndex((i) => (i + 1) % words.length)
      }
    }
  }, [displayed, deleting, index, words])

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-brand-green/10 border border-brand-green/20 font-mono text-brand-green font-semibold">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  )
}

import React from 'react'
