import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageShell from '@/components/landing/PageShell'
import Breadcrumbs from '@/components/landing/Breadcrumbs'
import CtaBlock from '@/components/landing/CtaBlock'
import { type Landing, landingPath } from '@/lib/data/landings'

export default function HubView({
  title,
  path,
  lead,
  items,
}: {
  title: string
  path: string
  lead: string
  items: Landing[]
}) {
  return (
    <PageShell>
      <Breadcrumbs items={[{ name: title, path }]} />
      <h1 className="section-title mb-5">{title}</h1>
      <p className="text-text/85 text-lg leading-relaxed max-w-3xl mb-fluid-l">{lead}</p>
      <ul className="border-t border-black/10 mb-fluid-l">
        {items.map((l) => (
          <li key={l.slug} className="border-b border-black/10">
            <Link href={landingPath(l)} className="group grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_auto] gap-2 md:gap-8 py-6 items-start">
              <h2 className="font-semibold text-text text-xl tracking-tight group-hover:text-accent transition-colors">{l.navTitle}</h2>
              <p className="text-muted leading-relaxed">{l.lead}</p>
              <ArrowRight size={18} className="hidden md:block text-muted group-hover:text-text mt-1" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
      <CtaBlock />
    </PageShell>
  )
}
