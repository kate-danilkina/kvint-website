import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cases } from '@/lib/data/cases'
import SectionHeading from '@/components/shared/SectionHeading'

export default function CasesPreview() {
  return (
    <section className="py-fluid-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <SectionHeading className="section-title mb-3">Кейсы</SectionHeading>
            <p className="text-text/75 max-w-xl">Что было, что сделали и что получили — в цифрах</p>
          </div>
          <Link
            href="/cases"
            className="link-underline inline-flex items-center gap-1.5 text-sm text-text/75 hover:text-text transition-colors"
          >
            Все кейсы <ArrowRight size={14} />
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {cases.map((c) => (
            <Link
              key={c.slug}
              href={`/cases/${c.slug}`}
              className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <article className="rounded-2xl bg-bg-2 border border-transparent transition-colors duration-200 group-hover:border-black/15 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-6 lg:gap-12">
                <div className="min-w-0 flex flex-col">
                  <p className="font-mono text-xs uppercase tracking-wider text-muted mb-4">
                    {c.niche} · {c.duration}
                  </p>
                  <h3 className="font-semibold text-text text-2xl tracking-tight leading-snug mb-3">{c.title}</h3>
                  <p className="text-text/70 leading-relaxed">{c.task}</p>

                  <dl className="grid grid-cols-3 gap-4 mt-6">
                    {c.results.map((r) => (
                      <div key={r.label} className="min-w-0 flex flex-col-reverse">
                        <dt className="text-xs text-muted mt-1 leading-snug">{r.label}</dt>
                        <dd className="font-display font-semibold text-sm sm:text-base text-text tabular-nums leading-tight">
                          {r.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="flex flex-col justify-between gap-6">
                  <div>
                    <div
                      className="font-display font-bold text-accent tabular-nums leading-none"
                      style={{ fontSize: 'clamp(44px, 5.5vw, 72px)' }}
                    >
                      {c.mainMetric}
                    </div>
                    <p className="text-text mt-3">{c.metricLabel}</p>
                    <p className="text-sm text-muted mt-1">{c.metricSecondary}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm text-text">
                    Читать кейс
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
