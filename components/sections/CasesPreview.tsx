'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AnimatedSection, { AnimatedGrid, AnimatedItem } from '@/components/shared/AnimatedSection'
import Badge from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { cases } from '@/lib/data/cases'

export default function CasesPreview() {
  const preview = cases.slice(0, 4)

  return (
    <section className="py-16 md:py-20 bg-bg-2/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <p className="eyebrow mb-4">Кейсы</p>
          <h2 className="section-title">
            Результаты, за которые{' '}
            <span className="text-outline">отвечаем</span>
          </h2>
        </AnimatedSection>

        <AnimatedGrid className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {preview.map((c) => (
            <AnimatedItem key={c.slug}>
              <Link href={`/cases/${c.slug}`} className="group block">
                <div className="glass-card glass-card-hover p-6 h-full flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="accent">{c.tag}</Badge>
                    <ArrowRight
                      size={16}
                      className="text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-text mb-2 group-hover:text-accent transition-colors duration-200">
                      {c.title}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span
                        className="font-bold text-accent"
                        style={{ fontSize: 'clamp(32px, 5vw, 48px)' }}
                      >
                        {c.mainMetric}
                      </span>
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
