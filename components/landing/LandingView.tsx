import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Check, Minus, Plus } from 'lucide-react'
import PageShell from '@/components/landing/PageShell'
import Breadcrumbs from '@/components/landing/Breadcrumbs'
import { DiagnosticButton } from '@/components/landing/CtaBlock'
import { cases } from '@/lib/data/cases'
import { type Landing, landingPath, landingByPath } from '@/lib/data/landings'
import { JsonLd, serviceLd, faqLd } from '@/lib/seo'
import { TELEGRAM_URL } from '@/lib/utils'

const STATIC_TITLES: Record<string, string> = {
  '/razbor': 'Разбор с основательницей',
  '/ceny': 'Цены',
  '/kontakty': 'Контакты',
}

function linkTitle(path: string) {
  const caseSlug = path.startsWith('/cases/') ? path.slice('/cases/'.length) : null
  const caseItem = caseSlug ? cases.find((c) => c.slug === caseSlug) : undefined
  if (caseItem) return `Кейс: ${caseItem.title}`
  return landingByPath(path)?.navTitle ?? STATIC_TITLES[path] ?? path
}

/** Section heading: Unbounded caps, one step smaller than the page title */
const H2 = 'section-title !text-step-3 mb-fluid-s'

export const TRUST_POINTS = [
  '54 проекта с августа 2024',
  'Стратегию пишет основательница',
  'Специалисты среднего и старшего уровня',
  'Отчёт каждую неделю',
  'Онлайн по всей России',
]

export function TrustStrip({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {TRUST_POINTS.map((t) => (
        <li key={t} className="rounded-full bg-bg-2 px-3 py-1.5 font-mono text-xs text-text/75">
          {t}
        </li>
      ))}
    </ul>
  )
}

export function FinalCta({ title = 'Разберём вашу рекламу за 60 минут' }: { title?: string }) {
  return (
    <section className="rounded-2xl bg-night text-white p-6 sm:p-10">
      <p className="eyebrow !text-white/50 mb-3">Разбор с основательницей · 60 минут</p>
      <h2 className="section-title !text-step-3 !text-white mb-4 max-w-2xl">{title}</h2>
      <p className="text-white/70 leading-relaxed max-w-xl mb-6">
        Екатерина Данилкина по видеосвязи смотрит вашу рекламу, сайт и цифры. Через час вы знаете:
      </p>
      <ul className="flex flex-col gap-3 mb-8 max-w-xl">
        {[
          'куда уходит бюджет и сколько стоит заявка',
          'что исправить первым',
          'берёмся ли мы. Если видим окупаемость, берёмся. Если нет, скажем прямо',
        ].map((item) => (
          <li key={item} className="flex items-start gap-3 text-white/90 leading-relaxed">
            <Check size={16} className="text-up mt-1 flex-shrink-0" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <DiagnosticButton />
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-lg font-semibold text-white transition-colors hover:border-white hover:bg-white/5"
        >
          Написать в Telegram
        </a>
      </div>
      <p className="font-mono text-xs text-white/50">Работаем пн–сб, 9:00–20:00</p>
    </section>
  )
}

export default function LandingView({ page }: { page: Landing }) {
  const path = landingPath(page)
  const hub = page.kind === 'service' ? { name: 'Услуги', path: '/uslugi' } : { name: 'Отрасли', path: '/otrasli' }
  const pageCases = page.caseSlugs.map((s) => cases.find((c) => c.slug === s)).filter(Boolean) as typeof cases
  const hasItems = !!page.proof.items?.length

  return (
    <PageShell>
      <JsonLd
        data={[
          serviceLd({ name: page.h1, description: page.metaDescription, path, price: page.price }),
          ...(page.faq.length ? [faqLd(page.faq)] : []),
        ]}
      />
      <Breadcrumbs items={[hub, { name: page.navTitle, path }]} />

      {/* 1. Hero: keyword h1 + direct answer */}
      <header className="mb-fluid-xl">
        <p className="eyebrow mb-4">
          {page.kind === 'service' ? 'Услуга' : 'Отрасль'}
          {page.priceLabel && <> · {page.priceLabel.startsWith('после') ? `стоимость ${page.priceLabel}` : page.priceLabel}</>}
        </p>
        <h1 className="section-title mb-6 max-w-4xl">{page.h1}</h1>
        <p className="text-text/85 text-lg sm:text-xl leading-relaxed max-w-3xl mb-8">{page.lead}</p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <DiagnosticButton />
          <p className="text-sm text-muted max-w-xs">60 минут с основательницей, онлайн</p>
        </div>
        <TrustStrip />
      </header>

      {/* 2. Symptoms in the reader's words */}
      <section className="mb-fluid-xl" aria-labelledby="symptoms">
        <h2 id="symptoms" className={H2}>Узнаёте себя?</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
          {page.symptoms.map((s, i) => (
            <li key={s} className="flex gap-4 rounded-2xl bg-bg-2 p-5 sm:p-6">
              <span className="font-mono text-xs text-muted pt-1">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-text text-lg leading-snug">{s}</span>
            </li>
          ))}
        </ul>
        <p className="text-text/80 leading-relaxed max-w-3xl">{page.symptomsOutro}</p>
      </section>

      {/* 3. Plain-words explanation + glossary */}
      <section className="mb-fluid-xl" aria-labelledby="explain">
        <h2 id="explain" className={H2}>{page.explain.h2}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-8 lg:gap-12 items-start">
          <div className="flex flex-col gap-4">
            {page.explain.text.map((t) => (
              <p key={t} className="text-text/85 text-lg leading-relaxed">{t}</p>
            ))}
          </div>
          {page.explain.terms && page.explain.terms.length > 0 && (
            <aside className="rounded-2xl bg-bg-2 p-6">
              <p className="eyebrow mb-4">Словарик</p>
              <dl className="flex flex-col gap-4">
                {page.explain.terms.map((t) => (
                  <div key={t.term}>
                    <dt className="font-semibold text-text">{t.term}</dt>
                    <dd className="text-muted leading-relaxed">{t.def}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          )}
        </div>
      </section>

      {/* 4. Steps with what the client gets */}
      <section className="mb-fluid-xl" aria-labelledby="steps">
        <h2 id="steps" className={H2}>Что мы делаем</h2>
        <ol className="flex flex-col gap-3">
          {page.steps.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-5 sm:gap-8 rounded-2xl bg-bg-2 p-5 sm:p-7">
              <span className="font-display font-bold text-step-3 leading-none text-accent">{i + 1}</span>
              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 md:gap-8">
                <div>
                  <h3 className="font-bold text-text text-xl tracking-tight mb-1.5">{s.title}</h3>
                  <p className="text-muted leading-relaxed">{s.text}</p>
                </div>
                <p className="self-start rounded-xl bg-accent-dim px-4 py-3 text-text/90 leading-relaxed">
                  <span className="block font-mono text-xs uppercase tracking-wide text-accent mb-1">Вы получаете</span>
                  {s.get}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 5. Proof: dark block with case numbers */}
      <section className="mb-fluid-xl" aria-labelledby="proof">
        <div className="rounded-2xl bg-night text-white p-6 sm:p-10">
          <h2 id="proof" className="section-title !text-step-3 !text-white mb-5">{page.proof.h2}</h2>
          <div className="flex flex-col gap-3 max-w-3xl mb-8">
            {page.proof.text.map((t) => (
              <p key={t} className="text-white/75 text-lg leading-relaxed">{t}</p>
            ))}
          </div>
          {hasItems && (
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 mb-6">
              {page.proof.items!.map((it) => (
                <div key={it.label} className="flex flex-col-reverse justify-end gap-2 border-t border-white/15 pt-4">
                  <dt className="text-white/60 text-sm leading-relaxed">{it.label}</dt>
                  <dd className="font-display font-bold text-step-3 leading-tight text-white">{it.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {page.proof.note && <p className="font-mono text-xs text-white/45 leading-relaxed max-w-3xl">{page.proof.note}</p>}
        </div>

        {pageCases.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            {pageCases.map((c) => (
              <Link
                key={c.slug}
                href={`/cases/${c.slug}`}
                className="group flex items-center justify-between gap-6 rounded-2xl border border-transparent bg-bg-2 p-5 sm:p-6 hover:border-black/15 transition-colors"
              >
                <div>
                  <p className="font-mono text-xs text-muted mb-1.5">Кейс · {c.tag} · {c.duration}</p>
                  <h3 className="font-semibold text-text text-lg leading-snug">{c.title}</h3>
                  <p className="text-sm text-muted mt-1">
                    <span className="font-mono font-bold text-up">{c.mainMetric}</span> {c.metricLabel}
                  </p>
                </div>
                <ArrowUpRight size={20} className="text-muted group-hover:text-text flex-shrink-0 transition-colors" aria-hidden />
              </Link>
            ))}
          </div>
        )}
      </section>

      {page.note && (
        <section className="mb-fluid-xl rounded-2xl border border-black/10 p-6 sm:p-8 max-w-3xl">
          <h2 className="font-bold text-text text-xl tracking-tight mb-2">{page.note.title}</h2>
          <p className="text-text/80 leading-relaxed">{page.note.text}</p>
        </section>
      )}

      {/* 6. Price and facts — the block snippets and AI answers pick up */}
      <section className="mb-fluid-xl" aria-labelledby="price">
        <h2 id="price" className={H2}>Сколько стоит и как устроено</h2>
        <dl className="rounded-2xl bg-bg-2 grid grid-cols-1 sm:grid-cols-2 overflow-hidden">
          {page.facts.map((f) => (
            <div key={f.label} className="flex flex-col gap-1 px-5 sm:px-7 py-4 border-b border-black/[0.06]">
              <dt className="text-xs text-muted font-mono uppercase tracking-wide">{f.label}</dt>
              <dd className="text-text text-lg">{f.value}</dd>
            </div>
          ))}
        </dl>
        {page.priceNote && <p className="text-muted leading-relaxed mt-4 max-w-3xl">{page.priceNote}</p>}
      </section>

      {/* 7. Who it's for / not for */}
      <section className="mb-fluid-xl" aria-labelledby="fit">
        <h2 id="fit" className={H2}>Кому подойдёт</h2>
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-3">
          <div className="rounded-2xl bg-bg-2 p-6 sm:p-7">
            <p className="eyebrow mb-4">Подойдёт, если</p>
            <ul className="flex flex-col gap-3">
              {page.fit.yes.map((t) => (
                <li key={t} className="flex items-start gap-3 text-text/90 leading-relaxed">
                  <Check size={16} className="text-up mt-1 flex-shrink-0" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-black/10 p-6 sm:p-7">
            <p className="eyebrow mb-4">Не подойдёт, если</p>
            <ul className="flex flex-col gap-3">
              {page.fit.no.map((t) => (
                <li key={t} className="flex items-start gap-3 text-text/80 leading-relaxed">
                  <Minus size={16} className="text-down mt-1 flex-shrink-0" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      {page.faq.length > 0 && (
        <section className="mb-fluid-xl" aria-labelledby="faq">
          <h2 id="faq" className={H2}>Частые вопросы</h2>
          <div className="rounded-2xl bg-bg-2 px-5 sm:px-7">
            {page.faq.map((f, i) => (
              <details key={f.q} className={`group ${i > 0 ? 'border-t border-black/[0.06]' : ''}`}>
                <summary className="flex items-center justify-between gap-6 py-5 cursor-pointer list-none text-text text-lg font-medium [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus size={18} className="text-muted flex-shrink-0 transition-transform group-open:rotate-45" aria-hidden />
                </summary>
                <p className="text-muted leading-relaxed pb-5 max-w-3xl">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* 9. Final CTA */}
      <div className="mb-fluid-l">
        <FinalCta title={page.ctaTitle} />
      </div>

      <nav aria-label="Связанные страницы">
        <h2 className="eyebrow mb-3">Смотрите также</h2>
        <ul className="flex flex-wrap gap-2">
          {page.related.map((r) => (
            <li key={r}>
              <Link
                href={r}
                className="inline-flex items-center gap-1.5 rounded-full bg-bg-2 px-4 py-2 text-sm text-text/90 hover:text-text transition-colors"
              >
                {linkTitle(r)}
                <ArrowRight size={14} className="text-muted" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </PageShell>
  )
}
