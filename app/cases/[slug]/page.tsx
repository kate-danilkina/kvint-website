import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactSection from '@/components/sections/ContactSection'
import { cases, getCaseBySlug, type Case, type CaseComparison, type CaseMonthly } from '@/lib/data/cases'
import { JsonLd, SITE_URL, company, founder } from '@/lib/seo'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCaseBySlug(params.slug)
  if (!c) return {}
  return {
    title: `${c.title} — кейс`,
    description: c.description,
    alternates: { canonical: `/cases/${c.slug}` },
    openGraph: {
      title: c.title,
      description: c.description,
      type: 'article',
    },
  }
}

function articleLd(c: Case) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.title,
    description: c.description,
    datePublished: c.date,
    dateModified: c.date,
    inLanguage: 'ru',
    url: `${SITE_URL}/cases/${c.slug}`,
    mainEntityOfPage: `${SITE_URL}/cases/${c.slug}`,
    author: { '@type': 'Person', name: founder.name, url: `${SITE_URL}${founder.slug}` },
    publisher: { '@type': 'Organization', name: company.name, url: SITE_URL, '@id': `${SITE_URL}/#organization` },
    about: c.channels ?? c.tags,
  }
}

// Section with a heading column on the left (desktop) and content on the right
function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-4 lg:gap-10">
      <h2 className="font-display font-bold uppercase text-step-1 leading-tight tracking-tight text-text">{title}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  )
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col gap-3 max-w-2xl">
      {items.map((p, i) => (
        <p key={i} className="text-text/80 leading-relaxed">
          {p}
        </p>
      ))}
    </div>
  )
}

function ComparisonRow({ row }: { row: CaseComparison }) {
  const hasBars = row.beforeValue !== undefined && row.afterValue !== undefined
  const max = hasBars ? Math.max(row.beforeValue!, row.afterValue!, 1e-9) : 1
  const beforePct = hasBars ? Math.max((row.beforeValue! / max) * 100, row.beforeValue! > 0 ? 1.5 : 0) : 0
  const afterPct = hasBars ? Math.max((row.afterValue! / max) * 100, row.afterValue! > 0 ? 1.5 : 0) : 0
  const improved = hasBars
    ? row.lowerIsBetter
      ? row.afterValue! < row.beforeValue!
      : row.afterValue! > row.beforeValue!
    : false

  return (
    <div className="rounded-2xl bg-bg-2 p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-4">
        <h3 className="font-semibold text-text">{row.metric}</h3>
        <span className="font-mono text-xs text-muted">{row.period}</span>
      </div>
      <div className="grid grid-cols-[64px_minmax(0,1fr)] sm:grid-cols-[72px_minmax(0,1fr)] items-center gap-x-4 gap-y-3">
        <span className="text-xs text-muted">Было</span>
        <div className="flex items-center gap-3 min-w-0">
          {hasBars && (
            <div className="h-2.5 rounded-full bg-black/15" style={{ width: `${beforePct}%` }} aria-hidden />
          )}
          <span className="font-display font-semibold text-text/60 tabular-nums whitespace-nowrap">{row.before}</span>
        </div>
        <span className="text-xs text-muted">Стало</span>
        <div className="flex items-center gap-3 min-w-0">
          {hasBars && (
            <div
              className={`h-2.5 rounded-full ${improved ? 'bg-accent' : 'bg-text/70'}`}
              style={{ width: `${afterPct}%` }}
              aria-hidden
            />
          )}
          <span
            className={`font-display font-bold tabular-nums whitespace-nowrap ${improved ? 'text-accent' : 'text-text'}`}
          >
            {row.after}
          </span>
        </div>
      </div>
    </div>
  )
}

function toNumber(v: string): number {
  const n = parseFloat(v.replace(/[^\d,.-]/g, '').replace(',', '.'))
  return Number.isFinite(n) ? n : 0
}

function MonthlyTable({ table }: { table: CaseMonthly }) {
  const firstCol = table.rows.map((r) => toNumber(r.values[0] ?? '0'))
  const max = Math.max(...firstCol, 1)
  return (
    <figure className="rounded-2xl bg-bg-2 p-5 sm:p-6">
      <figcaption className="mb-4">
        <span className="block font-semibold text-text">{table.caption}</span>
        <span className="block text-xs text-muted mt-1">{table.source}</span>
      </figcaption>
      <div className="overflow-x-auto -mx-5 sm:-mx-6 px-5 sm:px-6">
        <table className="w-full min-w-[520px] text-sm tabular-nums">
          <thead>
            <tr className="text-left text-xs text-muted">
              <th className="font-normal pb-3 pr-4">Месяц</th>
              <th className="font-normal pb-3 pr-4 w-[28%]" aria-label="График" />
              {table.columns.map((col) => (
                <th key={col} className="font-normal pb-3 pl-3 text-right whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={row.label} className="border-t border-black/[0.06]">
                <td className="py-2.5 pr-4 text-text">{row.label}</td>
                <td className="py-2.5 pr-4">
                  <div className="h-2 rounded-full bg-black/[0.06]">
                    <div
                      className="h-2 rounded-full bg-accent"
                      style={{ width: `${Math.max((firstCol[i] / max) * 100, firstCol[i] > 0 ? 2 : 0)}%` }}
                    />
                  </div>
                </td>
                {row.values.map((v, j) => (
                  <td
                    key={j}
                    className={`py-2.5 pl-3 text-right whitespace-nowrap ${j === 0 ? 'font-semibold text-text' : 'text-text/75'}`}
                  >
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted mt-3">Полоса показывает столбец «{table.columns[0]}»</p>
    </figure>
  )
}

function Lesson({ text }: { text: string }) {
  const cut = text.indexOf('. ')
  const head = cut > 0 ? text.slice(0, cut + 1) : text
  const tail = cut > 0 ? text.slice(cut + 2) : ''
  return (
    <li className="rounded-2xl bg-bg-2 p-5">
      <p className="font-semibold text-text leading-snug">{head}</p>
      {tail && <p className="text-text/75 leading-relaxed mt-1.5">{tail}</p>}
    </li>
  )
}

export default function CasePage({ params }: Props) {
  const c = getCaseBySlug(params.slug)
  if (!c) notFound()

  return (
    <>
      <Header />
      <JsonLd data={articleLd(c)} />
      <main id="main-content" className="pt-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-text transition-colors mb-8"
          >
            <ArrowLeft size={15} />
            Все кейсы
          </Link>

          {/* Header */}
          <header className="mb-8">
            <p className="font-mono text-xs uppercase tracking-wider text-muted mb-4">
              {c.niche} · {c.period ?? c.duration}
            </p>
            <h1 className="section-title mb-5 max-w-4xl">{c.title}</h1>
            <p className="text-step-1 text-text/80 leading-snug max-w-3xl">{c.task}</p>
          </header>

          {/* Result block */}
          <section
            aria-label="Главный результат"
            className="rounded-2xl bg-night text-white p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-8 lg:gap-12 mb-6"
          >
            <div>
              <div
                className="font-display font-bold text-accent tabular-nums leading-none"
                style={{ fontSize: 'clamp(56px, 9vw, 112px)' }}
              >
                {c.mainMetric}
              </div>
              <p className="text-lg mt-4 max-w-md">{c.metricLabel}</p>
              <p className="text-sm text-white/60 mt-1">{c.metricSecondary}</p>
            </div>
            <dl className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-5 lg:gap-6 content-center">
              {c.results.map((r) => (
                <div key={r.label}>
                  <dt className="text-sm text-white/60">{r.label}</dt>
                  <dd className="font-display font-bold text-2xl sm:text-3xl tabular-nums mt-1">{r.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {c.disclosure && (
            <p className="rounded-2xl bg-accent-dim text-text px-5 py-4 text-sm leading-relaxed mb-6 max-w-4xl">
              {c.disclosure}
            </p>
          )}

          <div className="flex flex-col gap-14 sm:gap-16 py-10">
            {c.context && (
              <Block title="Что было">
                <Paragraphs items={c.context} />
              </Block>
            )}

            {c.problem && (
              <Block title="Что мешало">
                <Paragraphs items={c.problem} />
              </Block>
            )}

            {c.goal && (
              <Block title="Задача">
                <ul className="flex flex-col gap-2 max-w-2xl">
                  {c.goal.map((g, i) => (
                    <li key={i} className="flex gap-3 text-text/80 leading-relaxed">
                      <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" aria-hidden />
                      {g}
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            <Block title="Что сделали">
              {c.steps ? (
                <ol className="flex flex-col gap-3">
                  {c.steps.map((s, i) => (
                    <li key={s.title} className="rounded-2xl bg-bg-2 p-5 sm:p-6 grid grid-cols-[40px_minmax(0,1fr)] gap-4">
                      <span className="font-display font-bold text-2xl text-accent leading-none">{i + 1}</span>
                      <div>
                        <h3 className="font-semibold text-text text-lg leading-snug">{s.title}</h3>
                        <p className="text-text/75 leading-relaxed mt-1.5">{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <Paragraphs items={c.what_we_did} />
              )}
            </Block>

            {c.comparison && (
              <Block title="Что получили">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {c.comparison.map((row) => (
                    <ComparisonRow key={row.metric} row={row} />
                  ))}
                </div>
              </Block>
            )}

            {c.monthly && (
              <Block title="По месяцам">
                <div className="flex flex-col gap-3">
                  {c.monthly.map((t) => (
                    <MonthlyTable key={t.caption} table={t} />
                  ))}
                </div>
              </Block>
            )}

            {c.lessons && (
              <Block title="Что поняли">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {c.lessons.map((l, i) => (
                    <Lesson key={i} text={l} />
                  ))}
                </ul>
              </Block>
            )}

            {c.terms && (
              <Block title="Как читать цифры">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 max-w-3xl">
                  {c.terms.map((t) => (
                    <div key={t.term}>
                      <dt className="font-semibold text-text">{t.term}</dt>
                      <dd className="text-text/75 leading-relaxed mt-1">{t.text}</dd>
                    </div>
                  ))}
                </dl>
              </Block>
            )}

            <Block title="Каналы и данные">
              <div className="flex flex-wrap gap-2 mb-5">
                {(c.channels ?? c.tags).map((ch) => (
                  <span key={ch} className="rounded-full bg-bg-2 px-3.5 py-1.5 text-sm text-text">
                    {ch}
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted mb-2">Срок работы: {c.duration}</p>
              {c.sources && (
                <ul className="flex flex-col gap-1.5 text-sm text-muted max-w-3xl list-disc pl-4">
                  {c.sources.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              )}
            </Block>
          </div>
        </div>

        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
