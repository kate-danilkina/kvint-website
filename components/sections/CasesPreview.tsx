import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { cases } from '@/lib/data/cases'

export default function CasesPreview() {
  return (
    <section className="py-24 lg:py-32 bg-bg-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="section-title mb-3">Кейсы</h2>
            <p className="text-muted max-w-xl">Что было до нас, что сделали и какие цифры получили</p>
          </div>
          <Link
            href="/cases"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-text transition-colors font-mono"
          >
            Все кейсы <ArrowRight size={14} />
          </Link>
        </div>

        <div className="flex flex-col gap-5">
          {cases.map((c) => (
            <Link key={c.slug} href={`/cases/${c.slug}`} className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50">
              <article className="rounded-xl border border-white/10 bg-bg transition-colors duration-200 group-hover:border-white/25">
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-8 p-6 sm:p-8">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="muted">{c.tag}</Badge>
                      <span className="text-xs text-muted font-mono">{c.duration}</span>
                    </div>
                    <h3 className="font-bold text-text text-2xl tracking-tight mb-3">{c.title}</h3>
                    <p className="text-muted leading-relaxed">{c.task}</p>
                  </div>

                  <div className="lg:border-l lg:border-white/10 lg:pl-8 flex flex-col justify-between gap-6">
                    <div>
                      <div className="font-mono font-bold text-up tabular-nums" style={{ fontSize: 'clamp(40px, 5vw, 60px)', lineHeight: 1 }}>
                        {c.mainMetric}
                      </div>
                      <p className="text-text mt-2">{c.metricLabel}</p>
                      <p className="text-sm text-muted mt-1 font-mono">{c.metricSecondary}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm text-muted group-hover:text-text transition-colors">
                      Читать кейс <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>

                <dl className="grid grid-cols-3 border-t border-white/10 font-mono">
                  {c.results.map((r, i) => (
                    <div key={r.label} className={`px-4 sm:px-8 py-4 ${i > 0 ? 'border-l border-white/10' : ''}`}>
                      <dt className="text-xs text-muted">{r.label}</dt>
                      <dd className="text-text font-bold mt-1 tabular-nums">{r.value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
