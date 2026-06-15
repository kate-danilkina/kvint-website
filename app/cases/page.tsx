import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Badge from '@/components/ui/Badge'
import AnimatedSection, { AnimatedGrid, AnimatedItem } from '@/components/shared/AnimatedSection'
import { cases } from '@/lib/data/cases'

export const metadata: Metadata = {
  title: 'Кейсы агентства Квинт — результаты в IT, финтех, B2B и EdTech',
  description:
    'Реальные кейсы маркетингового агентства Квинт: рост лидов, вывод продуктов на рынок, стратегии для IT-стартапов и B2B компаний по всей России.',
  openGraph: {
    title: 'Кейсы — Квинт',
    description: 'Реальные результаты наших клиентов.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

const niches = ['Все', ...Array.from(new Set(cases.map((c) => c.tag)))]

export default function CasesPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-14">
            <p className="eyebrow mb-4">Кейсы</p>
            <h1 className="section-title mb-4">
              Результаты, за которые{' '}
              <span className="text-outline">отвечаем</span>
            </h1>
            <p className="text-muted max-w-xl">
              Реальные проекты, реальные цифры. Без накруток и выбранных периодов.
            </p>
          </AnimatedSection>

          {/* Filter chips */}
          <AnimatedSection delay={0.1} className="flex flex-wrap gap-2 mb-10">
            {niches.map((n) => (
              <span
                key={n}
                className="px-3 py-1.5 rounded-lg text-sm font-grotesk font-medium border border-white/10 text-muted hover:border-accent/40 hover:text-accent transition-all duration-200 cursor-pointer"
              >
                {n}
              </span>
            ))}
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
                        <span className="text-4xl font-bold text-accent font-grotesk">{c.mainMetric}</span>
                        <span className="text-sm text-muted">{c.metricLabel}</span>
                      </div>
                      <p className="text-xs text-muted/60 mt-0.5 font-grotesk">{c.metricSecondary}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
                      {c.results.map((r) => (
                        <div key={r.label}>
                          <div className="text-sm font-bold text-text font-grotesk">{r.value}</div>
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
