'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  animate?: boolean
  delay?: number
}

export default function GlassCard({
  children, className, hover = true, animate = false, delay = 0
}: GlassCardProps) {
  const base = cn(
    'glass rounded-2xl p-6',
    hover && 'glass-hover cursor-default',
    className
  )

  if (animate) {
    return (
      <motion.div
        className={base}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay, ease: 'easeOut' }}
        whileHover={hover ? { y: -4, borderColor: 'rgba(0,255,136,0.3)' } : undefined}
      >
        {children}
      </motion.div>
    )
  }

  return <div className={base}>{children}</div>
}
