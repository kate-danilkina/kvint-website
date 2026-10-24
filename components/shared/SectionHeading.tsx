'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

type HeadingTag = 'h1' | 'h2' | 'h3'

interface Props {
  children: React.ReactNode
  as?: HeadingTag
  className?: string
  id?: string
}

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Section heading whose text slides up from under a mask when it scrolls into view.
 *
 * SSR / no-JS / reduced motion: the text is rendered in its final position.
 * The hidden start state is applied only after mount, and only for headings that
 * are still below the fold, so crawlers and users without JS always see the text
 * and nothing that is already on screen blinks.
 */
export default function SectionHeading({ children, as = 'h2', className, id }: Props) {
  const ref = useRef<HTMLHeadingElement>(null)
  const reduced = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    if (reduced || !ref.current) return
    // Arm the reveal only for headings not yet visible on mount
    const rect = ref.current.getBoundingClientRect()
    if (rect.top > window.innerHeight * 0.9) setArmed(true)
  }, [reduced])

  const Tag = as

  const y = !armed || inView ? '0%' : '100%'

  return (
    <Tag ref={ref} id={id} className={className}>
      <span className="heading-mask">
        <motion.span
          className="block"
          initial={false}
          animate={{ y }}
          // Hide instantly when arming; animate only the reveal
          transition={armed && inView ? { duration: 0.6, ease: EASE } : { duration: 0 }}
        >
          {children}
        </motion.span>
      </span>
    </Tag>
  )
}
