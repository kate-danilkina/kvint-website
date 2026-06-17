'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Phone, ArrowRight } from 'lucide-react'

export default function StickyCTA() {
  const [visible, setVisible] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const check = () => {
      const heroHeight = window.innerHeight * 0.85
      const contact = document.getElementById('contact')
      const contactTop = contact ? contact.getBoundingClientRect().top : Infinity
      setVisible(window.scrollY > heroHeight && contactTop > window.innerHeight + 80)
    }
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduced ? {} : { y: 72, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? {} : { y: 72, opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="fixed left-1/2 -translate-x-1/2 z-40 pointer-events-auto"
          style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)' }}
        >
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-bg/90 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] whitespace-nowrap">
            <a
              href="tel:+79930798655"
              className="hidden sm:flex items-center gap-1.5 text-sm text-muted hover:text-text transition-colors duration-150"
            >
              <Phone size={13} />
              +7 993 079 86 55
            </a>
            <div className="hidden sm:block w-px h-4 bg-white/10" />
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-1.5 text-sm font-semibold text-white bg-accent px-4 py-3 min-h-[44px] rounded-xl hover:shadow-[0_0_16px_rgba(26,110,255,0.5)] transition-all duration-200"
            >
              Обсудить проект
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
