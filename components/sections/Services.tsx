'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp, channels, capabilities } from '@/lib/constants'
import SectionHeading from '@/components/ui/SectionHeading'
import GlassCard from '@/components/ui/GlassCard'

function ServiceCard({
  icon: Icon, name, description, color, delay
}: {
  icon: React.ElementType
  name: string
  description: string
  color: string
  delay: number
}) {
  return (
    <GlassCard animate hover delay={delay} className="group">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${color}20`, border: `1px solid ${color}30` }}
      >
        <Icon size={22} style={{ color }} />
      </div>
      <h3 className="font-display font-semibold text-white text-lg mb-2">{name}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </GlassCard>
  )
}

export default function Services() {
  return (
    <section id="servicos" className="section-padding relative overflow-hidden">
      {/* Background orb */}
      <div className="orb w-[500px] h-[500px] bg-blue-500/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="container-k0de relative z-10">
        <SectionHeading
          badge="Serviços"
          title="Tudo que sua empresa precisa "
          highlight="automatizar"
          description="Conectamos todos os canais de comunicação e sistemas da sua empresa com inteligência artificial."
        />

        {/* Channels */}
        <div className="mt-6 mb-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6">
            Canais de Comunicação
          </p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {channels.map((service, i) => (
              <ServiceCard key={service.name} {...service} delay={i * 0.08} />
            ))}
          </motion.div>
        </div>

        {/* Capabilities */}
        <div className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6">
            Capacidades com IA
          </p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {capabilities.map((cap, i) => (
              <ServiceCard key={cap.name} {...cap} delay={i * 0.08} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
