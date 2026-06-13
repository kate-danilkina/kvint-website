'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { processSteps } from '@/lib/data/services'

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reducedMotion = useReducedMotion()

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="eyebrow mb-4">Как работаем</p>
          <h2 className="section-title">
            Четыре шага к{' '}
            <span className="text-outline">системе</span>
          </h2>
        </AnimatedSection>

        <div ref={ref} className="relative">
          {/* Horizontal line (desktop) */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
                animate={inView || reducedMotion ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col gap-4"
              >
                {/* Step number */}
                <div className="relative z-10 flex items-center gap-4 lg:flex-col lg:items-start">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-grotesk font-bold text-accent text-lg">{step.number}</span>
                  </div>
                  {/* Connector (mobile) */}
                  {i < processSteps.length - 1 && (
                    <div className="lg:hidden flex-1 h-px bg-gradient-to-r from-accent/30 to-transparent" />
                  )}
                </div>

                <div>
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
