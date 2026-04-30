'use client'

import { motion } from 'framer-motion'
import { Check, MessageCircle, Zap } from 'lucide-react'
import { automationPackages, staggerContainer, fadeInUp, WHATSAPP_URL } from '@/lib/constants'
import SectionHeading from '@/components/ui/SectionHeading'

function AutomationCard({
  pkg,
  index,
}: {
  pkg: (typeof automationPackages)[number]
  index: number
}) {
  const waUrl = `${WHATSAPP_URL}&text=Olá%2C%20tenho%20interesse%20no%20plano%20de%20automação%20${encodeURIComponent(pkg.name)}%21`
  const isConsulta = pkg.priceSetup === 'Sob consulta'

  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      className={`relative flex flex-col rounded-2xl p-7 border transition-all duration-300 ${
        pkg.popular
          ? 'border-brand-green/40 bg-brand-green/5 shadow-[0_0_40px_rgba(0,255,136,0.08)]'
          : 'border-white/[0.08] bg-dark-900/50 hover:border-white/[0.15]'
      }`}
    >
      {pkg.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brand-green text-dark-950 text-xs font-black uppercase tracking-widest">
            <Zap size={11} />
            Mais popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="font-display font-bold text-white text-xl mb-1">{pkg.name}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{pkg.description}</p>
      </div>

      <div className="mb-6 pb-6 border-b border-white/[0.06]">
        {isConsulta ? (
          <div className="font-display font-black text-3xl text-white leading-none mb-1">
            Sob consulta
          </div>
        ) : (
          <>
            <div className="font-display font-black text-3xl text-white leading-none mb-1">
              {pkg.priceSetup}
              <span className="text-slate-500 text-sm font-normal ml-2">setup</span>
            </div>
            <div className="text-brand-green font-semibold text-sm mt-1">
              + {pkg.priceMonthly}
            </div>
          </>
        )}
      </div>

      <ul className="flex-1 space-y-3 mb-8">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-brand-green/15 border border-brand-green/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check size={11} className="text-brand-green" />
            </div>
            <span className="text-slate-300 text-sm leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
          pkg.popular
            ? 'bg-brand-green text-dark-950 hover:bg-brand-greenDim shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:shadow-[0_0_30px_rgba(0,255,136,0.4)]'
            : 'border border-white/[0.12] text-white hover:border-brand-green/40 hover:text-brand-green hover:bg-brand-green/5'
        }`}
      >
        <MessageCircle size={15} />
        {pkg.cta}
      </a>
    </motion.div>
  )
}

export default function Automations() {
  return (
    <section id="automacoes" className="section-padding relative overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-blue-500/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="container-k0de relative z-10">
        <SectionHeading
          badge="Automações de Atendimento"
          title="Automatize seu atendimento "
          highlight="com IA"
          description="Seus clientes respondidos 24h no WhatsApp, email e Instagram — sem contratar mais ninguém. Setup rápido, resultado imediato."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {automationPackages.map((pkg, i) => (
            <AutomationCard key={pkg.name} pkg={pkg} index={i} />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-slate-500 text-sm"
        >
          Não sabe qual escolher?{' '}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-brand-green hover:underline">
            Fale com a gente no WhatsApp
          </a>{' '}
          e te ajudamos a decidir.
        </motion.p>
      </div>
    </section>
  )
}
