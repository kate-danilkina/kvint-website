'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useIsMobile } from '@/lib/hooks/useIsMobile'

interface Props {
  children: React.ReactNode
  className?: string
  delay?: number
  stagger?: boolean
}

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const fadeMobileVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const staggerMobileContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
}

export default function AnimatedSection({ children, className = '', delay = 0 }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  const variants = reducedMotion
    ? { hidden: {}, visible: {} }
    : isMobile
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.35, delay: delay > 0 ? delay * 0.4 : 0 } },
      }
    : {
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
        },
      }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reducedMotion ? 'visible' : 'hidden'}
      animate={inView || reducedMotion ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedGrid({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  const variants = reducedMotion
    ? { hidden: {}, visible: {} }
    : isMobile
    ? staggerMobileContainer
    : staggerContainer

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reducedMotion ? 'visible' : 'hidden'}
      animate={inView || reducedMotion ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedItem({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  const variants = reducedMotion
    ? { hidden: {}, visible: {} }
    : isMobile
    ? fadeMobileVariants
    : fadeUpVariants

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  )
}
