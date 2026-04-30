'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { faqs, staggerContainer, fadeInUp } from '@/lib/constants'
import SectionHeading from '@/components/ui/SectionHeading'

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div variants={fadeInUp} custom={index}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className={`font-display font-semibold text-base transition-colors duration-200 ${open ? 'text-brand-green' : 'text-white group-hover:text-brand-green'}`}>
          {question}
        </span>
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 border transition-all duration-200 ${open ? 'bg-brand-green/15 border-brand-green/40' : 'bg-white/[0.04] border-white/[0.08] group-hover:border-brand-green/30'}`}>
          {open
            ? <Minus size={14} className="text-brand-green" />
            : <Plus size={14} className="text-slate-400 group-hover:text-brand-green transition-colors" />
          }
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-slate-400 text-sm leading-relaxed pr-12">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-px bg-white/[0.06]" />
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="section-padding relative overflow-hidden">
      <div className="orb w-[400px] h-[400px] bg-brand-green/4 bottom-0 right-0" />

      <div className="container-k0de relative z-10">
        <SectionHeading
          badge="Dúvidas Frequentes"
          title="Perguntas que a gente "
          highlight="sempre responde"
          description="Transparência é tudo. Aqui estão as respostas para as dúvidas mais comuns."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <div className="h-px bg-white/[0.06]" />
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
