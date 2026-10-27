import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'
import PageShell from '@/components/landing/PageShell'
import Breadcrumbs from '@/components/landing/Breadcrumbs'
import CtaBlock, { DiagnosticButton } from '@/components/landing/CtaBlock'
import { cases } from '@/lib/data/cases'
import { type Landing, landingPath, landingByPath } from '@/lib/data/landings'
import { JsonLd, serviceLd, faqLd } from '@/lib/seo'

const STATIC_TITLES: Record<string, string> = {
  '/razbor': 'Разбор с основательницей',
  '/ceny': 'Цены',
  '/kontakty': 'Контакты',
}

function linkTitle(path: string) {
  return landingByPath(path)?.navTitle ?? STATIC_TITLES[path] ?? path
}

export default function LandingView({ page }: { page: Landing }) {
  const path = landingPath(page)
  const hub = page.kind === 'service' ? { name: 'Услуги', path: '/uslugi' } : { name: 'Отрасли', path: '/otrasli' }
  const pageCases = page.caseSlugs.map((s) => cases.find((c) => c.slug === s)).filter(Boolean) as typeof cases

  return (
    <PageShell>
      <JsonLd
        data={[
          serviceLd({ name: page.h1, description: page.metaDescription, path, price: page.price }),
          ...(page.faq.length ? [faqLd(page.faq)] : []),
        ]}
      />
      <Breadcrumbs items={[hub, { name: page.navTitle, path }]} />

      <header className="mb-fluid-l">
        <h1 className="section-title mb-6">{page.h1}</h1>
        <p className="text-text/85 text-lg sm:text-xl leading-relaxed max-w-3xl mb-8">{page.lead}</p>
        <DiagnosticButton />
      </header>

      {/* Facts table — the block AI answers and snippets pick up first */}
      <dl className="grid grid-cols-1 sm:grid-cols-2 border-t border-white/10 mb-fluid-l">
        {page.facts.map((f) => (
          <div key={f.label} className="flex flex-col gap-1 py-4 border-b border-white/10 sm:odd:pr-8 sm:even:pl-8 sm:even:border-l">
            <dt className="text-xs text-muted font-mono uppercase tracking-wide">{f.label}</dt>
            <dd className="text-text">{f.value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-col gap-fluid-m mb-fluid-l max-w-3xl">
        {page.sections.map((s) => (
          <section key={s.h2}>
            <h2 className="font-bold text-text text-2xl tracking-tight mb-4">{s.h2}</h2>
            {s.text?.map((t) => (
              <p key={t} className="text-muted leading-relaxed mb-3">{t}</p>
            ))}
            {s.bullets && (
              <ul className="flex flex-col gap-2.5">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-text/90 leading-relaxed">
                    <span className="text-up mt-[0.6em] h-1.5 w-1.5 rounded-full bg-up flex-shrink-0" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {pageCases.length > 0 && (
        <section className="mb-fluid-l">
          <h2 className="font-bold text-text text-2xl tracking-tight mb-5">Кейсы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pageCases.map((c) => (
              <Link
                key={c.slug}
                href={`/cases/${c.slug}`}
                className="group rounded-xl border border-white/10 bg-bg-2 p-6 hover:border-white/25 transition-colors"
              >
                <p className="text-xs text-muted font-mono mb-2">{c.tag} · {c.duration}</p>
                <h3 className="font-semibold text-text text-lg mb-3">{c.title}</h3>
                <p className="font-mono font-bold text-up text-3xl">{c.mainMetric}</p>
                <p className="text-sm text-muted mt-1">{c.metricLabel}</p>
                <span className="inline-flex items-center gap-1 text-sm text-muted group-hover:text-text mt-4">
                  Читать кейс <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {page.faq.length > 0 && (
        <section className="mb-fluid-l max-w-3xl">
          <h2 className="font-bold text-text text-2xl tracking-tight mb-4">Вопросы</h2>
          <div className="border-t border-white/10">
            {page.faq.map((f) => (
              <details key={f.q} className="group border-b border-white/10">
                <summary className="flex items-center justify-between gap-6 py-4 cursor-pointer list-none text-text font-medium [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus size={16} className="text-muted flex-shrink-0 transition-transform group-open:rotate-45" aria-hidden />
                </summary>
                <p className="text-muted leading-relaxed pb-5">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <div className="mb-fluid-l">
        <CtaBlock />
      </div>

      <nav aria-label="Связанные страницы">
        <h2 className="text-sm text-muted font-mono uppercase tracking-wide mb-3">Смотрите также</h2>
        <ul className="flex flex-wrap gap-3">
          {page.related.map((r) => (
            <li key={r}>
              <Link href={r} className="inline-flex rounded-lg border border-white/10 px-4 py-2 text-sm text-text/90 hover:border-white/30 transition-colors">
                {linkTitle(r)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </PageShell>
  )
}
