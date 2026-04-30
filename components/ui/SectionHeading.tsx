'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/constants'

interface SectionHeadingProps {
  badge?: string
  title: string
  highlight?: string
  description?: string
  centered?: boolean
}

export default function SectionHeading({
  badge, title, highlight, description, centered = true
}: SectionHeadingProps) {
  const titleParts = highlight
    ? title.split(highlight)
    : [title]

  return (
    <motion.div
      className={centered ? 'text-center' : ''}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {badge && (
        <motion.div variants={fadeInUp} className="mb-4 inline-flex">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-green/30 bg-brand-green/5 text-brand-green text-xs font-semibold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
            {badge}
          </span>
        </motion.div>
      )}

      <motion.h2
        variants={fadeInUp}
        className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
      >
        {highlight ? (
          <>
            {titleParts[0]}
            <span className="text-gradient">{highlight}</span>
            {titleParts[1]}
          </>
        ) : title}
      </motion.h2>

      {description && (
        <motion.p
          variants={fadeInUp}
          className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
