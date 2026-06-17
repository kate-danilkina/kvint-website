'use client'

import { useRef, useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
  maxTilt?: number
}

export default function TiltCard({ children, className, maxTilt = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const handleEnter = useCallback(() => {
    if (reduced || !ref.current) return
    ref.current.style.willChange = 'transform'
  }, [reduced])

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    ref.current.style.transform = `perspective(900px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) translateZ(6px)`
  }, [reduced, maxTilt])

  const handleLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px)'
    ref.current.style.willChange = 'auto'
  }, [])

  return (
    <div
      ref={ref}
      className={cn(className)}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: 'transform 0.2s ease-out' }}
    >
      {children}
    </div>
  )
}
