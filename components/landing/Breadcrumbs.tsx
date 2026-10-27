import Link from 'next/link'
import { JsonLd, breadcrumbLd } from '@/lib/seo'

export default function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const trail = [{ name: 'Главная', path: '/' }, ...items]
  return (
    <>
      <JsonLd data={breadcrumbLd(trail)} />
      <nav aria-label="Хлебные крошки" className="mb-8">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted font-mono">
          {trail.map((it, i) => (
            <li key={it.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden>/</span>}
              {i === trail.length - 1 ? (
                <span aria-current="page" className="text-text/80">{it.name}</span>
              ) : (
                <Link href={it.path} className="link-underline hover:text-text transition-colors">
                  {it.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
