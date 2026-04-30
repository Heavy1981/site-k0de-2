'use client'

import { motion } from 'framer-motion'
import { stats, staggerContainer, fadeInUp } from '@/lib/constants'
import SectionHeading from '@/components/ui/SectionHeading'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import GlassCard from '@/components/ui/GlassCard'

export default function Results() {
  return (
    <section id="resultados" className="section-padding relative overflow-hidden">
      <div className="orb w-[600px] h-[600px] bg-brand-green/5 bottom-0 left-[-200px]" />

      <div className="container-k0de relative z-10">
        <SectionHeading
          badge="Resultados"
          title="Números que "
          highlight="comprovam"
          description="Projetos reais entregues para clientes reais em Bragança Paulista e no Brasil todo."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div key={stat.label} variants={fadeInUp}>
                <GlassCard className="text-center py-8 animate-pulse-glow" hover>
                  <div className="w-10 h-10 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center mx-auto mb-4">
                    <Icon size={20} className="text-brand-green" />
                  </div>
                  <div className="font-display font-black text-4xl md:text-5xl text-white mb-2">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Extra metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { label: 'mais leads com site profissional', value: '+3x' },
            { label: 'dos projetos entregues no prazo', value: '100%' },
            { label: 'dos sites são mobile-first', value: '100%' },
          ].map((metric) => (
            <div key={metric.label}
              className="flex items-center gap-4 px-6 py-4 rounded-xl border border-white/[0.06] bg-dark-900/50">
              <div className="w-2 h-2 rounded-full bg-brand-green flex-shrink-0" />
              <div>
                <span className="text-brand-green font-display font-bold text-lg">{metric.value}</span>
                <span className="text-slate-400 text-sm ml-2">{metric.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
