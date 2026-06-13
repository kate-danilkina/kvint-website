'use client'

import AnimatedSection from '@/components/shared/AnimatedSection'
import { comparisonRows } from '@/lib/data/services'
import { X, Check } from 'lucide-react'

export default function Comparison() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <p className="eyebrow mb-4">Отличие</p>
          <h2 className="section-title">
            Типичное агентство vs{' '}
            <span className="text-outline">Квинт</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="glass-card overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 px-4 sm:px-6 py-3 border-b border-white/5">
              <div className="text-xs text-muted font-grotesk uppercase tracking-wider col-span-1" />
              <div className="text-xs text-muted font-grotesk uppercase tracking-wider text-center">
                Другие
              </div>
              <div className="text-xs font-grotesk uppercase tracking-wider text-center text-accent">
                Квинт
              </div>
            </div>

            {comparisonRows.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 px-4 sm:px-6 py-4 items-start gap-3 ${
                  i < comparisonRows.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <div className="text-sm text-muted font-grotesk font-medium col-span-1">
                  {row.feature}
                </div>
                <div className="flex items-start gap-2 text-sm text-muted/60">
                  <X size={14} className="text-red-500/50 mt-0.5 flex-shrink-0" />
                  <span>{row.competitor}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-text">
                  <Check size={14} className="text-accent mt-0.5 flex-shrink-0" />
                  <span>{row.kvint}</span>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
