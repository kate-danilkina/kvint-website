'use client'

import { useRef, useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  strength?: number
}

export default function MagneticButton({ children, strength = 0.25 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    ref.current.style.transform = `translate(${x}px, ${y}px)`
  }, [reduced, strength])

  const handleLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0px, 0px)'
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ display: 'inline-flex', transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)' }}
    >
      {children}
    </div>
  )
}
