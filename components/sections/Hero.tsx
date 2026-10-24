'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useInView } from 'framer-motion'
import Button, { buttonClass } from '@/components/ui/Button'
import HeroReport from '@/components/sections/HeroReport'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { openContact, TELEGRAM_URL } from '@/lib/utils'

// Starts at the final value so server HTML (crawlers, link previews, no-JS) shows real numbers
function useCountUp(to: number, duration = 1500, active = false) {
  const [val, setVal] = useState(to)
  useEffect(() => {
    if (!active) return
    let start: number | null = null
    let frame: number
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      // ease-out-expo: fast start, settles exactly on the target
      setVal(Math.round((1 - Math.pow(2, -10 * progress)) * to))
      if (progress < 1) frame = requestAnimationFrame(step)
      else setVal(to)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [active, to, duration])
  return val
}

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()

  const statsVisible = useInView(statsRef, { once: true, margin: '-60px' })
  const projects = useCountUp(125, 1500, statsVisible)
  const years = useCountUp(8, 1500, statsVisible)

  // Gentle parallax on the report card only (desktop, motion allowed)
  const { scrollY } = useScroll()
  const yReport = useTransform(scrollY, [0, 500], reduced || isMobile ? [0, 0] : [0, 40])

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-[calc(5rem+var(--space-xl))] pb-fluid-3xl">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-center gap-14 lg:gap-16">
          {/* Left: offer */}
          <div className="min-w-0">
            <p className="eyebrow mb-6">
              Маркетинговый штаб для бизнеса
            </p>

            <h1
              className="font-sans font-extrabold text-step-6 leading-[1.02] tracking-[-0.04em] mb-7 text-text"
            >
              Внедряем <span className="text-outline">контролируемую</span> систему
              <br />
              маркетинга
            </h1>

            <p className="text-muted text-lg leading-relaxed mb-10 max-w-xl">
              Связываем рекламу, сайт, CRM и аналитику: видно цену каждой заявки и канал, который приносит
              сделки. Когда схема работает без нас, уходим.
            </p>

            {/* Stats */}
            <div ref={statsRef} className="flex flex-wrap gap-x-12 gap-y-6 mb-10">
              <div className="whitespace-nowrap">
                <div className="font-mono font-bold text-text tabular-nums" style={{ fontSize: 'clamp(34px, 4vw, 52px)', lineHeight: 1 }}>
                  {projects}
                </div>
                <div className="text-muted mt-2 text-sm">проектов</div>
              </div>
              <div className="whitespace-nowrap">
                <div className="font-mono font-bold text-text tabular-nums" style={{ fontSize: 'clamp(34px, 4vw, 52px)', lineHeight: 1 }}>
                  {years} лет
                </div>
                <div className="text-muted mt-2 text-sm">в маркетинге</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button variant="primary" size="lg" onClick={() => openContact('strategy')}>
                Записаться на разбор
              </Button>
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className={buttonClass('secondary', 'lg')}>
                Написать в Telegram
              </a>
            </div>
            <p className="text-xs text-muted mt-3 font-mono">Разбор: 60 минут с основательницей, 10 000 ₽</p>
          </div>

          {/* Right: report card */}
          <motion.div className="flex justify-center lg:justify-end" style={{ y: yReport }}>
            <HeroReport />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
