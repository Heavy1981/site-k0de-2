'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { testimonials, staggerContainer, fadeInUp } from '@/lib/constants'
import SectionHeading from '@/components/ui/SectionHeading'
import GlassCard from '@/components/ui/GlassCard'

export default function Testimonials() {
  return (
    <section id="depoimentos" className="section-padding bg-dark-900/30 relative overflow-hidden">
      <div className="orb w-[400px] h-[400px] bg-purple-500/5 top-0 right-0" />
      <div className="orb w-[300px] h-[300px] bg-brand-green/5 bottom-0 left-0" />

      <div className="container-k0de relative z-10">
        <SectionHeading
          badge="Depoimentos"
          title="O que nossos "
          highlight="clientes"
          description="Veja o que dizem os negócios que já têm seu site entregue pela k0de."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div key={t.name} variants={fadeInUp} custom={i}>
              <GlassCard hover className="h-full flex flex-col gap-4 p-7">
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={14} className="fill-brand-green text-brand-green" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-300 text-sm leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-sm text-white flex-shrink-0"
                    style={{ background: `${t.avatarColor}25`, border: `1px solid ${t.avatarColor}40` }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.role} · {t.company}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6"
        >
          {['Entrega Garantida', 'Mobile-First', 'SEO Otimizado', 'LGPD Compliant'].map((badge) => (
            <div key={badge}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/[0.06] bg-dark-800/50">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-green" />
              <span className="text-slate-400 text-xs font-medium">{badge}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
