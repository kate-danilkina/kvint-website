import Link from 'next/link'
import { audiences } from '@/lib/data/services'
import SectionHeading from '@/components/shared/SectionHeading'

export default function ForWho() {
  return (
    <section className="py-fluid-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="section-title mb-3">С кем работаем</SectionHeading>
        <p className="text-muted mb-fluid-l">B2B-компании с дорогой сделкой и долгим выбором. Там, где шаблонная реклама не работает</p>

        <ul className="grid grid-cols-1 md:grid-cols-2 border-t border-black/10">
          {audiences.map((a, i) => (
            <li
              key={a.id}
              className={`py-6 border-b border-black/10 ${i % 2 === 1 ? 'md:pl-10 md:border-l' : 'md:pr-10'}`}
            >
              <h3 className="font-semibold text-text text-2xl tracking-tight mb-1">
                {'href' in a && a.href ? <Link href={a.href} className="link-underline">{a.title}</Link> : a.title}
              </h3>
              <p className="text-muted">{a.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
