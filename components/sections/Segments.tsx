'use client'

import { motion } from 'framer-motion'
import { segments, staggerContainer, fadeInUp } from '@/lib/constants'
import SectionHeading from '@/components/ui/SectionHeading'

export default function Segments() {
  return (
    <section id="segmentos" className="section-padding bg-dark-900/30 relative overflow-hidden">
      <div className="orb w-[400px] h-[400px] bg-brand-green/4 top-0 right-0" />

      <div className="container-k0de relative z-10">
        <SectionHeading
          badge="Segmentos"
          title="Fazemos para "
          highlight="qualquer negócio"
          description="Seja qual for o seu setor, entregamos um site que representa sua empresa com qualidade."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
        >
          {segments.map((seg, i) => (
            <motion.div
              key={seg.name}
              variants={fadeInUp}
              custom={i}
              whileHover={{ scale: 1.05, y: -4 }}
              className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl border border-white/[0.07] bg-dark-900/50 hover:border-brand-green/25 hover:bg-brand-green/5 transition-all duration-300 cursor-default group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                {seg.icon}
              </span>
              <div>
                <p className="font-display font-semibold text-white text-sm">{seg.name}</p>
                <p className="text-slate-500 text-xs mt-0.5 leading-snug">{seg.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
