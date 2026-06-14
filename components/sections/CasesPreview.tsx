'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AnimatedSection, { AnimatedGrid, AnimatedItem } from '@/components/shared/AnimatedSection'
import Badge from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { cases } from '@/lib/data/cases'

export default function CasesPreview() {
  const [featured, ...rest] = cases
  const grid = rest.slice(0, 2)

  return (
    <section className="py-20 bg-bg-2/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-14">
          <p className="eyebrow mb-4">Результаты, которые можно проверить</p>
          <h2 className="section-title">Наши кейсы</h2>
        </AnimatedSection>

        {/* Featured case */}
        <AnimatedSection className="mb-5">
          <Link href={`/cases/${featured.slug}`} className="group block">
            <div
              className="relative overflow-hidden rounded-2xl border border-white/10 p-8 sm:p-10 min-h-[320px] flex flex-col justify-between transition-all duration-300 group-hover:border-white/20 group-hover:-translate-y-1"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              {/* Hover sweep line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

              <div className="flex items-start justify-between gap-4 mb-6">
                <Badge variant="accent">Флагманский кейс</Badge>
                <ArrowRight
                  size={18}
                  className="text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-200 flex-shrink-0"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div className="max-w-xl">
                  <Badge variant="muted" className="mb-3">{featured.tag}</Badge>
                  <h3 className="font-bold text-text text-xl sm:text-2xl mb-2 group-hover:text-accent transition-colors duration-200">
                    {featured.title}
                  </h3>
                  <p className="text-muted text-sm">{featured.task}</p>
                </div>

                <div className="flex-shrink-0">
                  <div
                    className="font-bold text-accent font-grotesk tabular-nums"
                    style={{ fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1 }}
                  >
                    {featured.mainMetric}
                  </div>
                  <p className="text-sm text-muted mt-0.5">{featured.metricLabel}</p>
                  <p className="text-xs text-muted/60 mt-0.5 font-grotesk">{featured.metricSecondary}</p>
                </div>
              </div>
            </div>
          </Link>
        </AnimatedSection>

        {/* Secondary cases — 2-col grid */}
        <AnimatedGrid className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {grid.map((c) => (
            <AnimatedItem key={c.slug}>
              <Link href={`/cases/${c.slug}`} className="group block h-full">
                <div className="relative overflow-hidden glass-card glass-card-hover p-6 h-full flex flex-col gap-4">
                  {/* Hover sweep line */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                  <div className="flex items-center justify-between">
                    <Badge variant="accent">{c.tag}</Badge>
                    <ArrowRight
                      size={15}
                      className="text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-text mb-2 group-hover:text-accent transition-colors duration-200">
                      {c.title}
                    </h3>
                    <div
                      className="font-bold text-accent tabular-nums"
                      style={{ fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1 }}
                    >
                      {c.mainMetric}
                    </div>
                    <p className="text-sm text-muted mt-0.5">{c.metricLabel}</p>
                    <p className="text-xs text-muted/60 mt-0.5 font-grotesk">{c.metricSecondary}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                    {c.tags.map((tag) => (
                      <Badge key={tag} variant="muted">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </Link>
            </AnimatedItem>
          ))}
        </AnimatedGrid>

        <AnimatedSection className="text-center">
          <ButtonLink as="link" href="/cases" variant="secondary" size="lg">
            Все кейсы <ArrowRight size={16} />
          </ButtonLink>
        </AnimatedSection>
      </div>
    </section>
  )
}
