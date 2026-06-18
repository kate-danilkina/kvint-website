'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { processSteps } from '@/lib/data/services'
import { useIsMobile } from '@/lib/hooks/useIsMobile'

export default function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const lineInView = useInView(lineRef, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()

  return (
    <section className="py-16 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-16">
          <p className="eyebrow mb-4">От хаоса к системе</p>
          <h2 className="section-title">Четыре шага</h2>
        </AnimatedSection>

        <div ref={ref} className="relative">
          {/* Progressive connector line (desktop) */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-8 left-0 right-0 h-px overflow-hidden"
          >
            <motion.div
              className="h-full w-full origin-left"
              style={{ background: 'linear-gradient(to right, transparent, rgba(26,110,255,0.3), transparent)' }}
              initial={{ scaleX: 0 }}
              animate={lineInView && !reduced ? { scaleX: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.4, ease: 'easeInOut' }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={reduced ? {} : (isMobile ? { opacity: 0 } : { opacity: 0, y: 40 })}
                animate={inView || reduced ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: isMobile ? 0.3 : 0.55,
                  delay: isMobile ? 0 : i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex flex-col gap-4"
              >
                {/* Decorative background step number */}
                <div
                  className="absolute -top-4 -left-2 pointer-events-none select-none"
                  aria-hidden
                >
                  <svg viewBox="0 0 180 180" width={150} height={150} style={{ display: 'block' }}>
                    <text
                      x="50%"
                      y="55%"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontFamily="Arial Black, sans-serif"
                      fontWeight="900"
                      fontSize="160"
                      fill="none"
                      stroke="rgba(26,110,255,0.05)"
                      strokeWidth="1"
                    >
                      {step.number}
                    </text>
                  </svg>
                </div>

                {/* Step badge */}
                <div className="relative z-10 flex items-center gap-4 lg:flex-col lg:items-start">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-grotesk font-bold text-accent text-lg">{step.number}</span>
                  </div>
                  {i < processSteps.length - 1 && (
                    <div className="lg:hidden flex-1 h-px bg-gradient-to-r from-accent/30 to-transparent" />
                  )}
                </div>

                <div className="relative z-10">
                  <h3 className="font-bold text-text text-lg mb-2">{step.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
