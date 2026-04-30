'use client'

import { motion } from 'framer-motion'
import { steps, staggerContainer, fadeInUp } from '@/lib/constants'
import SectionHeading from '@/components/ui/SectionHeading'
import GreenButton from '@/components/ui/GreenButton'
import { MessageCircle } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/constants'

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="section-padding bg-dark-900/50 relative overflow-hidden">
      <div className="orb w-[400px] h-[400px] bg-brand-green/5 top-0 right-0" />

      <div className="container-k0de relative z-10">
        <SectionHeading
          badge="Como Funciona"
          title="Do briefing ao "
          highlight="site no ar"
          description="Processo simples e rápido. Sem reuniões longas, sem burocracia."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-brand-green/30 to-transparent" />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                variants={fadeInUp}
                className="relative flex flex-col items-center text-center"
              >
                {/* Number */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center border border-brand-green/20 glow-green mb-0">
                    <span className="font-display font-black text-3xl text-brand-green">{step.number}</span>
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-lg bg-dark-800 border border-brand-green/20 flex items-center justify-center">
                    <Icon size={14} className="text-brand-green" />
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-display font-bold text-white text-xl mb-3">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <GreenButton href={WHATSAPP_URL} size="lg" icon={<MessageCircle size={18} />}>
            Quero meu site agora
          </GreenButton>
        </motion.div>
      </div>
    </section>
  )
}
