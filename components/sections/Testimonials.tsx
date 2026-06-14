'use client'

import { Quote } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { testimonials } from '@/lib/data/services'

export default function Testimonials() {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12">
          <p className="eyebrow mb-4">Они уже проверили</p>
          <h2 className="section-title">Говорят клиенты</h2>
        </AnimatedSection>

        <div>
          {testimonials.map((t, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div className="py-8">
                <Quote size={18} className="text-accent/30 mb-4" />
                <p className="text-text/80 text-base sm:text-lg leading-relaxed mb-6 max-w-3xl">
                  {t.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-accent">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-text">{t.name}</span>
                    <span className="text-sm text-muted ml-2">· {t.company}</span>
                  </div>
                </div>
              </div>
              {i < testimonials.length - 1 && (
                <div className="h-px bg-white/[0.08]" />
              )}
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
