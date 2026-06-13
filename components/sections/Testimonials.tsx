'use client'

import { useRef, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import Badge from '@/components/ui/Badge'
import { testimonials } from '@/lib/data/services'

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow mb-4">Отзывы</p>
            <h2 className="section-title">
              Говорят{' '}
              <span className="text-outline">клиенты</span>
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={scrollPrev}
              className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center text-muted hover:text-text hover:border-white/25 transition-all duration-200"
              aria-label="Предыдущий"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center text-muted hover:text-text hover:border-white/25 transition-all duration-200"
              aria-label="Следующий"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-5">
              {testimonials.map((t, i) => (
                <div key={i} className="flex-none w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
                  <div className="glass-card p-6 h-full flex flex-col gap-4">
                    <Quote size={20} className="text-accent/40" />
                    <p className="text-text/80 text-sm leading-relaxed flex-1">{t.text}</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                      {/* Avatar placeholder */}
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-accent">
                          {t.name.charAt(0)}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-text text-sm">{t.name}</p>
                        <p className="text-xs text-muted truncate">{t.company}</p>
                      </div>
                      <Badge variant="accent" className="ml-auto flex-shrink-0">{t.niche}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile nav */}
          <div className="flex sm:hidden items-center justify-center gap-3 mt-6">
            <button
              onClick={scrollPrev}
              className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center text-muted hover:text-text transition-colors"
              aria-label="Предыдущий"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center text-muted hover:text-text transition-colors"
              aria-label="Следующий"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
