'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GreenButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  icon?: React.ReactNode
}

export default function GreenButton({
  children, href, onClick, variant = 'primary', size = 'md', className, icon
}: GreenButtonProps) {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  const variants = {
    primary: 'bg-brand-green text-dark-950 font-bold hover:bg-brand-greenDim shadow-[0_0_25px_rgba(0,255,136,0.35)]',
    ghost: 'bg-transparent border border-brand-green text-brand-green hover:bg-brand-green hover:text-dark-950',
    outline: 'bg-transparent border border-white/20 text-white hover:border-brand-green hover:text-brand-green',
  }

  const base = cn(
    'inline-flex items-center gap-2 rounded-xl font-semibold transition-all duration-200',
    sizes[size],
    variants[variant],
    className
  )

  const content = (
    <>
      {icon && <span>{icon}</span>}
      {children}
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={base}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      className={base}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {content}
    </motion.button>
  )
}
