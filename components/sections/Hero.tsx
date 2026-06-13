'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowDown, FileText } from 'lucide-react'
import Button from '@/components/ui/Button'
import LeadMagnetPopup from '@/components/shared/LeadMagnetPopup'
import { trackGoal } from '@/lib/utils'

export default function Hero() {
  const [popupOpen, setPopupOpen] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reducedMotion ? ['0%', '0%'] : ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const wordVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  const handleLeadMagnet = () => {
    setPopupOpen(true)
    trackGoal('lead_magnet_open')
  }

  return (
    <>
      <section
        ref={ref}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        {/* Parallax background */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          {/* Gradient glow */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/3 blur-[100px]" />
          {/* Grid */}
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
          style={{ opacity }}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          {/* Eyebrow */}
          <motion.p
            className="eyebrow mb-6"
            initial={reducedMotion ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Маркетинговый штаб для бизнеса
          </motion.p>

          {/* H1 */}
          <h1
            className="font-sans font-bold leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(36px, 8vw, 96px)' }}
          >
            {['Внедряем', 'контролируемую'].map((word, i) => (
              <motion.span
                key={word}
                custom={i}
                initial={reducedMotion ? {} : 'hidden'}
                animate="visible"
                variants={wordVariants}
                className="inline-block mr-[0.25em] text-text"
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              custom={2}
              initial={reducedMotion ? {} : 'hidden'}
              animate="visible"
              variants={wordVariants}
              className="inline-block text-outline"
            >
              систему
            </motion.span>
            <br />
            {['маркетинга'].map((word, i) => (
              <motion.span
                key={word}
                custom={i + 3}
                initial={reducedMotion ? {} : 'hidden'}
                animate="visible"
                variants={wordVariants}
                className="inline-block mr-[0.25em] text-text"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            className="text-muted text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
            initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Отвечаем за стабильный результат и сервис через полное погружение.
            Каждый проект — под личным контролем фаундера
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Обсудить проект
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => document.getElementById('strategy')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Получить стратсессию
            </Button>
            <button
              onClick={handleLeadMagnet}
              className="text-sm text-muted hover:text-accent transition-colors underline underline-offset-4 flex items-center gap-1.5"
            >
              <FileText size={14} />
              Лень листать → пришли презентацию
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-16 flex justify-center"
            initial={reducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.div
              animate={reducedMotion ? {} : { y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown size={20} className="text-muted/40" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <LeadMagnetPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  )
}
