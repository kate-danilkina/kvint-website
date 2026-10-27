import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnimatedSection, { AnimatedGrid, AnimatedItem } from '@/components/shared/AnimatedSection'
import { cases } from '@/lib/data/cases'

export const metadata: Metadata = {
  title: 'Кейсы: производство, IT и B2B в цифрах',
  description:
    'Кейсы агентства Квинт: что было, что мешало, что сделали и что получили. Неудобные цифры не прячем. Данные из Яндекс Метрики и Директа с периодами',
  alternates: { canonical: '/cases' },
  openGraph: {
    title: 'Кейсы — Квинт',
    description: 'Что было, что сделали и что получили. Цифры до и после по каждому проекту',
  },
}

export default function CasesPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-10">
            <h1 className="section-title mb-4">Кейсы</h1>
            <p className="text-text/75 max-w-xl">
              Что было, что мешало, что сделали и что получили. Неудобные цифры не прячем. Источник и период — в каждом кейсе
            </p>
          </AnimatedSection>

          <AnimatedGrid className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cases.map((c) => (
              <AnimatedItem key={c.slug}>
                <Link
                  href={`/cases/${c.slug}`}
                  className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <article className="h-full rounded-2xl bg-bg-2 border border-transparent group-hover:border-black/15 transition-colors p-6 sm:p-8 flex flex-col">
                    <p className="font-mono text-xs uppercase tracking-wider text-muted mb-4">
                      {c.niche} · {c.duration}
                    </p>
                    <h2 className="font-semibold text-text text-xl sm:text-2xl leading-snug tracking-tight mb-3">
                      {c.title}
                    </h2>
                    <p className="text-text/70 leading-relaxed line-clamp-3 mb-8">{c.task}</p>

                    <div className="mt-auto">
                      <div
                        className="font-display font-bold text-accent tabular-nums leading-none"
                        style={{ fontSize: 'clamp(44px, 5vw, 64px)' }}
                      >
                        {c.mainMetric}
                      </div>
                      <p className="text-text mt-3">{c.metricLabel}</p>
                      <p className="text-sm text-muted mt-1">{c.metricSecondary}</p>

                      <dl className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-black/[0.07]">
                        {c.results.map((r) => (
                          <div key={r.label} className="min-w-0 flex flex-col-reverse">
                            <dt className="text-xs text-muted mt-1 leading-snug">{r.label}</dt>
                            <dd className="font-display font-semibold text-sm sm:text-base text-text tabular-nums leading-tight">
                              {r.value}
                            </dd>
                          </div>
                        ))}
                      </dl>

                      <span className="inline-flex items-center gap-1.5 text-sm text-text mt-6">
                        Читать кейс
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </article>
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
