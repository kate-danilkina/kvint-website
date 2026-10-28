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
  // Reduced motion: the counters show the final numbers at once
  const countActive = statsVisible && !reduced
  const projects = useCountUp(54, 1500, countActive)
  const years = useCountUp(9, 1500, countActive)

  // Gentle parallax on the report card only (desktop, motion allowed)
  const { scrollY } = useScroll()
  const yReport = useTransform(scrollY, [0, 500], reduced || isMobile ? [0, 0] : [0, 40])

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-[calc(5rem+var(--space-xl))] pb-fluid-3xl">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="eyebrow mb-6">Маркетинговое агентство для B2B</p>

        {/* Headline spans the full width: the long word must never collide with the report card */}
        <h1 className="font-display font-bold uppercase text-[clamp(30px,10.8vw,56px)] sm:text-[clamp(40px,7.5vw,104px)] lg:text-[clamp(25px,6.6vw,104px)] leading-[0.95] tracking-[-0.02em] mb-fluid-l text-text max-w-[14ch] lg:max-w-none">
          Маркетинг, который отвечает <span className="text-accent">деньгами</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-14 lg:gap-16">
          {/* Left: offer */}
          <div className="min-w-0">
            <p className="text-muted text-lg leading-relaxed mb-10 max-w-xl">
              Считаем окупаемость до старта. Не видим, как вернуть вложения минимум в 3–5 раз, — не берёмся
            </p>

            {/* Stats */}
            <div ref={statsRef} className="flex flex-wrap gap-x-12 gap-y-6 mb-10">
              <div className="whitespace-nowrap">
                <div className="font-mono font-bold text-text tabular-nums" style={{ fontSize: 'clamp(34px, 4vw, 52px)', lineHeight: 1 }}>
                  {projects}
                </div>
                <div className="text-muted mt-2 text-sm">проекта с августа 2024</div>
              </div>
              <div className="whitespace-nowrap">
                <div className="font-mono font-bold text-text tabular-nums" style={{ fontSize: 'clamp(34px, 4vw, 52px)', lineHeight: 1 }}>
                  {years} лет
                </div>
                <div className="text-muted mt-2 text-sm">в маркетинге</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button variant="primary" size="lg" onClick={() => openContact('strategy')}>
                Записаться на разбор
              </Button>
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className={buttonClass('secondary', 'lg')}>
                Написать в Telegram
              </a>
            </div>
            <p className="text-xs text-muted mt-3 font-mono">Разбор: 60 минут с основательницей, итог — план и вердикт</p>
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
