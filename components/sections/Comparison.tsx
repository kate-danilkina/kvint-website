'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { comparisonRows } from '@/lib/data/services'
import { X } from 'lucide-react'

function AnimatedCheck({ delay }: { delay: number }) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()

  return (
    <svg ref={ref} width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 flex-shrink-0">
      <motion.path
        d="M2 7l3.5 3.5L12 3"
        stroke="#1A6EFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduced ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={reduced ? { duration: 0 } : { duration: 0.4, delay, ease: 'easeOut' }}
      />
    </svg>
  )
}

function ComparisonRow({ row, index, last }: { row: typeof comparisonRows[0]; index: number; last: boolean }) {
  return (
    <div
      className={`grid grid-cols-3 px-4 sm:px-6 py-4 items-start gap-3 group/row transition-colors duration-150 hover:bg-white/[0.02] ${!last ? 'border-b border-white/5' : ''}`}
    >
      <div className="text-sm text-muted font-grotesk font-medium">{row.feature}</div>
      <div className="flex items-start gap-2 text-sm text-muted/60">
        <X size={14} className="text-red-500/50 mt-0.5 flex-shrink-0" />
        <span>{row.competitor}</span>
      </div>
      <div
        className="flex items-start gap-2 text-sm text-text transition-all duration-200 group-hover/row:[box-shadow:inset_3px_0_0_#1A6EFF]"
        style={{ paddingLeft: 8, marginLeft: -8 }}
      >
        <AnimatedCheck delay={index * 0.08} />
        <span>{row.kvint}</span>
      </div>
    </div>
  )
}

export default function Comparison() {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <p className="eyebrow mb-4">Отличие</p>
          <h2 className="section-title">
            Типичное агентство vs{' '}
            <span className="text-outline">Квинт</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="relative">
            {/* Right gradient fade — scroll hint on mobile */}
            <div className="sm:hidden absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-bg to-transparent pointer-events-none z-10" aria-hidden />
            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <div className="glass-card overflow-hidden min-w-[560px]">
                <div className="grid grid-cols-3 px-4 sm:px-6 py-3 border-b border-white/5">
                  <div className="text-xs text-muted font-grotesk uppercase tracking-wider" />
                  <div className="text-xs text-muted font-grotesk uppercase tracking-wider text-center">
                    Другие
                  </div>
                  <div className="text-xs font-grotesk uppercase tracking-wider text-center text-accent">
                    Квинт
                  </div>
                </div>

                {comparisonRows.map((row, i) => (
                  <ComparisonRow key={row.feature} row={row} index={i} last={i === comparisonRows.length - 1} />
                ))}
              </div>
            </div>
          </div>
          <p className="sm:hidden text-xs text-muted/50 text-center mt-3 font-grotesk tracking-wide">← прокрутите →</p>
        </AnimatedSection>
      </div>
    </section>
  )
}
