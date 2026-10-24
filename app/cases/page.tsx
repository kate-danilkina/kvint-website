import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Badge from '@/components/ui/Badge'
import AnimatedSection, { AnimatedGrid, AnimatedItem } from '@/components/shared/AnimatedSection'
import { cases } from '@/lib/data/cases'

export const metadata: Metadata = {
  title: 'Кейсы агентства Квинт — IT B2B и B2B-запуски',
  description:
    'Кейсы маркетингового агентства Квинт: что было до нас, что сделали и какие цифры получили. Конверсия AI-стартапа ×6, 220 регистраций на B2B-вебинар за 7 дней.',
  openGraph: {
    title: 'Кейсы — Квинт',
    description: 'Что было до нас, что сделали и какие цифры получили.',
  },
}

export default function CasesPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-14">
            <h1 className="section-title mb-4">Кейсы</h1>
            <p className="text-muted max-w-xl">Что было до нас, что сделали и какие цифры получили</p>
          </AnimatedSection>

          <AnimatedGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {cases.map((c) => (
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

                    <h2 className="font-bold text-text text-lg leading-snug group-hover:text-accent transition-colors duration-200">
                      {c.title}
                    </h2>

                    <p className="text-muted text-sm line-clamp-3">{c.task}</p>

                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-up font-mono">{c.mainMetric}</span>
                        <span className="text-sm text-muted">{c.metricLabel}</span>
                      </div>
                      <p className="text-xs text-muted/60 mt-0.5 font-mono">{c.metricSecondary}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
                      {c.results.map((r) => (
                        <div key={r.label}>
                          <div className="text-sm font-bold text-text font-mono">{r.value}</div>
                          <div className="text-xs text-muted mt-0.5">{r.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {c.tags.map((tag) => (
                        <Badge key={tag} variant="muted">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </Link>
              </AnimatedItem>
            ))}
          </AnimatedGrid>
        </div>
      </main>
      <Footer />
    </>
  )
}
