'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Calendar, ArrowRight } from 'lucide-react'
import GreenButton from '@/components/ui/GreenButton'
import { WHATSAPP_URL, EMAIL, fadeInUp, staggerContainer } from '@/lib/constants'

export default function CTA() {
  return (
    <section id="contato" className="section-padding relative overflow-hidden">
      {/* Green radial glow */}
      <div className="absolute inset-0 bg-gradient-radial from-brand-green/8 via-transparent to-transparent pointer-events-none" />
      <div className="orb w-[700px] h-[400px] bg-brand-green/6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ filter: 'blur(120px)' }} />

      {/* Grid */}
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />

      <div className="container-k0de relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-green/30 bg-brand-green/5 text-brand-green text-xs font-semibold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
              Pronto para ter seu site?
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6"
          >
            Seu site pronto em{' '}
            <span className="text-gradient">7 dias. Garantido.</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            Fale com a gente agora e receba um orçamento em minutos. Sem enrolação,
            sem contrato longo — só seu site no ar do jeito que precisa ser.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GreenButton href={WHATSAPP_URL} size="lg" icon={<MessageCircle size={18} />}>
              Quero meu site agora
            </GreenButton>
            <GreenButton
              href="#portfolio"
              variant="ghost"
              size="lg"
              icon={<Calendar size={16} />}
            >
              Ver portfólio
            </GreenButton>
          </motion.div>

          <motion.p variants={fadeInUp} className="mt-6 text-slate-500 text-sm">
            Sem compromisso · Orçamento em minutos · Resposta em até 2 horas
          </motion.p>

          {/* Feature list */}
          <motion.div
            variants={fadeInUp}
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              'Entrega em 7 dias',
              '2 revisões inclusas',
              'Suporte pós-entrega',
              'Mobile-first',
            ].map((item) => (
              <div key={item} className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/[0.06] bg-dark-800/50">
                <ArrowRight size={14} className="text-brand-green flex-shrink-0" />
                <span className="text-slate-300 text-sm font-medium">{item}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
