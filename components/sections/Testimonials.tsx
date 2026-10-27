'use client'

import { Quote } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { testimonials } from '@/lib/data/services'
import SectionHeading from '@/components/shared/SectionHeading'

export default function Testimonials() {
  return (
    <section className="py-fluid-xl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-fluid-l">
          <SectionHeading className="section-title">Отзывы клиентов</SectionHeading>
        </AnimatedSection>

        <div>
          {testimonials.map((t, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div className="py-8 pl-5 border-l border-black/[0.07]">
                <Quote size={20} className="text-accent/55 mb-4" aria-hidden />
                <p className="text-text/80 text-base sm:text-lg leading-relaxed mb-6 max-w-3xl">
                  {t.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0" aria-hidden>
                    <span className="text-sm font-bold text-accent">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-text">{t.name}</span>
                    <span className="text-sm text-muted ml-2">· {t.company}</span>
                  </div>
                </div>
              </div>
              {i < testimonials.length - 1 && (
                <div className="h-px bg-black/[0.08]" />
              )}
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
