'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useInView } from 'framer-motion'
import Button from '@/components/ui/Button'
import MagneticButton from '@/components/shared/MagneticButton'
import { useIsMobile } from '@/lib/hooks/useIsMobile'

function useCountUp(to: number, duration = 1500, active = false) {
  const [val, setVal] = useState(0)
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (!active) return
    setDone(false)
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      // ease-out-expo with overshoot: peaks ~105% at t=0.85, snaps back to 100%
      const eased =
        progress < 0.85
          ? (1 - Math.pow(2, -10 * (progress / 0.85))) * 1.05
          : 1.05 - ((progress - 0.85) / 0.15) * 0.05
      setVal(Math.round(eased * to))
      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setVal(to)
        setDone(true)
      }
    }
    requestAnimationFrame(step)
  }, [active, to, duration])
  return { val, done }
}

function AnimatedWord({
  word,
  startDelay,
  className,
}: {
  word: string
  startDelay: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()

  // Mobile: fade the whole word, no character-by-character
  if (isMobile) {
    return (
      <motion.span
        className={`inline-block ${className ?? ''}`}
        style={{ whiteSpace: 'nowrap' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: startDelay * 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {word}
      </motion.span>
    )
  }

  return (
    <span className={`inline-block ${className ?? ''}`} style={{ whiteSpace: 'nowrap' }}>
      {word.split('').map((ch, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block' }}
          initial={reduced ? {} : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: startDelay + i * 0.02, ease: [0.22, 1, 0.36, 1] }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

function GlitchWord({ word, startDelay }: { word: string; startDelay: number }) {
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()
  const [glitch, setGlitch] = useState(false)
  const offsets = useMemo(() => word.split('').map(() => (Math.random() - 0.5) * 8), []) // eslint-disable-line react-hooks/exhaustive-deps

  // Mobile: simple fade, no glitch
  if (isMobile) {
    return (
      <motion.span
        className="text-outline inline-block"
        style={{ whiteSpace: 'nowrap' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: startDelay * 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {word}
      </motion.span>
    )
  }

  return (
    <span
      className="text-outline inline-block"
      style={{ whiteSpace: 'nowrap', cursor: 'default' }}
      onMouseEnter={() => !reduced && setGlitch(true)}
      onMouseLeave={() => setGlitch(false)}
    >
      {word.split('').map((ch, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block' }}
          initial={reduced ? {} : { opacity: 0, y: 60 }}
          animate={glitch ? { opacity: 1, y: offsets[i] } : { opacity: 1, y: 0 }}
          transition={
            glitch
              ? { duration: 0.4, ease: 'easeInOut' }
              : { duration: 0.5, delay: startDelay + i * 0.02, ease: [0.22, 1, 0.36, 1] }
          }
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()

  const statsVisible = useInView(statsRef, { once: true, margin: '-60px' })
  const { val: count124, done: done124 } = useCountUp(124, 1500, statsVisible)
  const { val: count8, done: done8 } = useCountUp(8, 1500, statsVisible)

  const { scrollY } = useScroll()
  const fadeOut = useTransform(scrollY, reduced ? [0, 0] : [300, 700], [1, 0])

  // Parallax layers — disabled for reduced-motion and mobile (performance)
  const noParallax = reduced || isMobile
  const yBackground = useTransform(scrollY, [0, 500], noParallax ? [0, 0] : [0, 100])
  const yMidground = useTransform(scrollY, [0, 500], noParallax ? [0, 0] : [0, 200])
  const yForeground = useTransform(scrollY, [0, 500], noParallax ? [0, 0] : [0, 50])

  // On mobile: no y offsets in initial state, shorter delays
  const noY = reduced || isMobile

  return (
    <>
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden pt-20 pb-16 sm:pt-24 sm:pb-32">
        {/* Background parallax layers at different scroll speeds */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <motion.div
            style={{ y: yBackground }}
            className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full bg-accent/5 blur-[140px]"
          />
          <motion.div
            style={{ y: yMidground }}
            className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-accent/3 blur-[100px]"
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(26,110,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(26,110,255,0.5) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        <motion.div
          style={{ opacity: fadeOut }}
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="flex items-center gap-16">
            {/* Left: content */}
            <div className="w-full max-w-[680px]">
              <motion.p
                className="eyebrow mb-6"
                initial={noY ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: isMobile ? 0.35 : 0.5 }}
              >
                Маркетинговый штаб для бизнеса
              </motion.p>

              <h1
                className="font-sans font-bold leading-[1.05] mb-6"
                style={{ fontSize: 'clamp(36px, 6vw, 82px)' }}
              >
                <AnimatedWord word="Внедряем" startDelay={0} className="text-text" />
                {' '}
                <AnimatedWord word="контролируемую" startDelay={0.17} className="text-text" />
                {' '}
                <GlitchWord word="систему" startDelay={0.45} />
                <br />
                <AnimatedWord word="маркетинга" startDelay={0.59} className="text-text" />
              </h1>

              <motion.p
                className="text-muted text-lg leading-relaxed mb-10 max-w-xl"
                initial={noY ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: isMobile ? 0.35 : 0.6, delay: isMobile ? 0.2 : 0.65 }}
              >
                Реклама не сливает бюджет. Приходим как партнёры —{' '}
                уходим, когда система работает сама
              </motion.p>

              {/* Stats row */}
              <motion.div
                ref={statsRef}
                className="flex flex-row flex-wrap gap-x-12 gap-y-6 mb-10"
                initial={noY ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: isMobile ? 0.35 : 0.6, delay: isMobile ? 0.25 : 0.75 }}
              >
                <div style={{ whiteSpace: 'nowrap' }}>
                  <motion.div
                    className="font-sans font-extrabold text-text tabular-nums"
                    style={{ fontSize: 'clamp(36px, 4vw, 56px)', lineHeight: 1 }}
                    animate={done124 ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {statsVisible ? count124 : 0}
                  </motion.div>
                  <div className="text-muted mt-1 text-sm">проекта</div>
                </div>

                <div style={{ whiteSpace: 'nowrap' }}>
                  <motion.div
                    className="font-sans font-extrabold text-text tabular-nums"
                    style={{ fontSize: 'clamp(36px, 4vw, 56px)', lineHeight: 1 }}
                    animate={done8 ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {statsVisible ? count8 : 0} лет
                  </motion.div>
                  <div className="text-muted mt-1 text-sm">в маркетинге</div>
                </div>

              </motion.div>

              {/* CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row items-stretch sm:items-start gap-4"
                initial={noY ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: isMobile ? 0.35 : 0.6, delay: isMobile ? 0.3 : 0.85 }}
              >
                <div className="w-full sm:w-auto">
                  <MagneticButton>
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Обсудить проект
                    </Button>
                  </MagneticButton>
                </div>
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => document.getElementById('strategy')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Записаться на диагностику
                </Button>
              </motion.div>

            </div>

            {/* Right: decorative outline number (desktop only) */}
            <div
              className="hidden lg:flex flex-1 items-center justify-center flex-shrink-0 select-none"
              aria-hidden
            >
              <motion.svg
                viewBox="0 0 480 240"
                width={420}
                height={240}
                style={{ y: yForeground }}
                initial={reduced ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.4 }}
              >
                <text
                  x="50%"
                  y="55%"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily="Arial Black, sans-serif"
                  fontWeight="900"
                  fontSize="200"
                  fill="none"
                  stroke="#1A6EFF"
                  strokeWidth="1.5"
                  opacity="0.12"
                >
                  124
                </text>
              </motion.svg>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  )
}
