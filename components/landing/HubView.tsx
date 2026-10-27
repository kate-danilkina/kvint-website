import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import PageShell from '@/components/landing/PageShell'
import Breadcrumbs from '@/components/landing/Breadcrumbs'
import { DiagnosticButton } from '@/components/landing/CtaBlock'
import { FinalCta, TrustStrip } from '@/components/landing/LandingView'
import { type Landing, landingPath } from '@/lib/data/landings'

export default function HubView({
  title,
  crumb,
  path,
  lead,
  items,
  guide,
  outro,
}: {
  /** h1 with the search phrase */
  title: string
  /** Short name for breadcrumbs */
  crumb: string
  path: string
  lead: string
  items: Landing[]
  /** «С чего начать»: situation → page */
  guide?: { situation: string; href: string; label: string }[]
  outro?: string
}) {
  return (
    <PageShell>
      <Breadcrumbs items={[{ name: crumb, path }]} />

      <header className="mb-fluid-xl">
        <h1 className="section-title mb-6 max-w-4xl">{title}</h1>
        <p className="text-text/85 text-lg sm:text-xl leading-relaxed max-w-3xl mb-8">{lead}</p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <DiagnosticButton />
          <p className="text-sm text-muted max-w-xs">60 минут с основательницей, онлайн</p>
        </div>
        <TrustStrip />
      </header>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-fluid-xl">
        {items.map((l) => {
          const highlight = l.proof.items?.[0]
          return (
            <li key={l.slug}>
              <Link
                href={landingPath(l)}
                className="group flex h-full flex-col rounded-2xl border border-transparent bg-bg-2 p-6 sm:p-7 hover:border-black/15 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="font-display font-bold uppercase text-text text-xl leading-tight tracking-tight">{l.navTitle}</h2>
                  <ArrowUpRight size={20} className="text-muted group-hover:text-text flex-shrink-0 transition-colors" aria-hidden />
                </div>
                <p className="text-muted leading-relaxed mb-5">{l.summary}</p>
                <div className="mt-auto flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  {l.priceLabel && (
                    <span className="font-mono text-sm text-text">
                      {l.priceLabel.startsWith('после') ? `Стоимость ${l.priceLabel}` : l.priceLabel}
                    </span>
                  )}
                  {!l.priceLabel && highlight && (
                    <span className="text-sm text-muted">
                      <span className="font-mono font-bold text-up">{highlight.value}</span> {highlight.label}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          )
        })}
      </ul>

      {guide && guide.length > 0 && (
        <section className="mb-fluid-xl" aria-labelledby="guide">
          <h2 id="guide" className="section-title !text-step-3 mb-fluid-s">С чего начать</h2>
          <ul className="rounded-2xl bg-bg-2 px-5 sm:px-7">
            {guide.map((g, i) => (
              <li key={g.href} className={i > 0 ? 'border-t border-black/[0.06]' : ''}>
                <Link href={g.href} className="group grid grid-cols-1 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto] gap-1 sm:gap-6 py-4 items-center">
                  <span className="text-text text-lg leading-snug">{g.situation}</span>
                  <span className="font-mono text-sm text-accent">{g.label}</span>
                  <ArrowRight size={16} className="hidden sm:block text-muted group-hover:text-text" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {outro && <p className="text-text/80 text-lg leading-relaxed max-w-3xl mb-fluid-xl">{outro}</p>}

      <FinalCta />
    </PageShell>
  )
}
