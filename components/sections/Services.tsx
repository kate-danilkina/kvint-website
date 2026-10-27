import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import { services } from '@/lib/data/services'
import SectionHeading from '@/components/shared/SectionHeading'

export default function Services() {
  return (
    <section className="py-fluid-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="section-title mb-3">Что делаем</SectionHeading>
        <p className="text-muted max-w-xl mb-fluid-l">
          Сначала находим, где теряются деньги, потом подбираем инструменты под вашу задачу: от рекламы до сайта и аналитики
        </p>

        <div className="border-t border-black/10">
          {/* Flagship */}
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-1 md:gap-10 py-5 border-b border-black/10">
            <div className="flex items-center gap-3">
              <Link href="/uslugi/soprovozhdenie" className="font-semibold text-text text-lg link-underline">Система Роста</Link>
              <Badge variant="flagship">Флагман</Badge>
            </div>
            <p className="text-muted md:text-text/80">Разбор, реклама, сайт, Карты и аналитика в одной команде. Отчёт каждую неделю</p>
          </div>

          {/* Column heads */}
          <div className="hidden md:grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-10 pt-6 pb-2 eyebrow">
            <span>Направление</span>
            <span>Когда нужно</span>
          </div>

          {services.map((s) => (
            <div
              key={s.id}
              className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-1 md:gap-10 py-4 border-b border-black/[0.07]"
            >
              {'href' in s && s.href ? (
                <Link href={s.href} className="text-text font-medium link-underline self-start">{s.label}</Link>
              ) : (
                <span className="text-text font-medium">{s.label}</span>
              )}
              <span className="text-muted">{s.when}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
