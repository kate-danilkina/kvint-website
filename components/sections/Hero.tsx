'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import LeadMagnetPopup from '@/components/shared/LeadMagnetPopup'
import { trackGoal } from '@/lib/utils'

function useCountUp(to: number, duration = 1500, active = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(Math.floor(eased * to))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, to, duration])
  return val
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
  const [glitch, setGlitch] = useState(false)
  const offsets = useMemo(() => word.split('').map(() => (Math.random() - 0.5) * 8), []) // eslint-disable-line react-hooks/exhaustive-deps

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
  const [popupOpen, setPopupOpen] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const statsVisible = useInView(statsRef, { once: true, margin: '-60px' })
  const count124 = useCountUp(124, 1500, statsVisible)
  const count8 = useCountUp(8, 1500, statsVisible)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['0%', '25%'])
  const fadeOut = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <>
      <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-32">
        <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full bg-accent/5 blur-[140px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-accent/3 blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(26,110,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(26,110,255,0.5) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
        </motion.div>

        <motion.div
          style={{ opacity: fadeOut }}
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="flex items-center gap-16">
            {/* Left: content */}
            <div className="w-full max-w-[680px]">
              <motion.p
                className="eyebrow mb-6"
                initial={reduced ? {} : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
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
                initial={reduced ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
              >
                Маркетинг, который не сливает бюджет.{' '}
                Приходим как партнёры — уходим когда система работает сама
              </motion.p>

              {/* Stats row */}
              <motion.div
                ref={statsRef}
                className="flex flex-row flex-wrap gap-x-12 gap-y-6 mb-10"
                initial={reduced ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.75 }}
              >
                <div style={{ whiteSpace: 'nowrap' }}>
                  <div
                    className="font-sans font-extrabold text-text tabular-nums"
                    style={{ fontSize: 'clamp(36px, 4vw, 56px)', lineHeight: 1 }}
                  >
                    {statsVisible ? count124 : 0}+
                  </div>
                  <div className="text-muted mt-1 text-sm">проектов</div>
                </div>

                <div style={{ whiteSpace: 'nowrap' }}>
                  <div
                    className="font-sans font-extrabold text-text tabular-nums"
                    style={{ fontSize: 'clamp(36px, 4vw, 56px)', lineHeight: 1 }}
                  >
                    {statsVisible ? count8 : 0} лет
                  </div>
                  <div className="text-muted mt-1 text-sm">в маркетинге</div>
                </div>

                <div style={{ whiteSpace: 'nowrap' }}>
                  <motion.div
                    className="font-sans font-extrabold text-text"
                    style={{ fontSize: 'clamp(36px, 4vw, 56px)', lineHeight: 1 }}
                    initial={reduced ? {} : { opacity: 0 }}
                    animate={statsVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    от 80 000 ₽
                  </motion.div>
                  <div className="text-muted mt-1 text-sm">стоимость входа</div>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row items-start gap-4"
                initial={reduced ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.85 }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Обсудить проект
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => document.getElementById('strategy')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Записаться на диагностику
                </Button>
              </motion.div>

              <motion.div
                className="mt-5"
                initial={reduced ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.95 }}
              >
                <button
                  onClick={() => { setPopupOpen(true); trackGoal('lead_magnet_open') }}
                  className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors duration-200"
                >
                  Получить презентацию агентства
                  <ArrowRight size={13} />
                </button>
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
                  124+
                </text>
              </motion.svg>
            </div>
          </div>
        </motion.div>
      </section>

      <LeadMagnetPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  )
}
