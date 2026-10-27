import type { Metadata } from 'next'
import Link from 'next/link'
import PageShell from '@/components/landing/PageShell'
import Breadcrumbs from '@/components/landing/Breadcrumbs'
import CtaBlock from '@/components/landing/CtaBlock'

const rows = [
  { name: 'Разбор с основательницей', href: '/razbor', price: '10 000 ₽', note: '60 минут, план и вердикт' },
  { name: 'Маркетинговое сопровождение «Система Роста»', href: '/uslugi/soprovozhdenie', price: 'от 150 000 ₽ в месяц', note: 'Реклама, сайт, Карты, аналитика, отчёт каждую неделю' },
  { name: 'Маркетинговый аудит', href: '/uslugi/marketingovyj-audit', price: 'от 5 000 ₽', note: 'Зависит от числа каналов и кабинетов' },
  { name: 'Маркетинговая стратегия', href: '/uslugi/marketingovaya-strategiya', price: 'от 40 000 ₽', note: 'Зависит от числа сегментов и каналов' },
  { name: 'Яндекс Директ', href: '/uslugi/yandex-direct', price: 'от 45 000 ₽', note: 'Настройка и ведение, рекламный бюджет оплачивается отдельно' },
  { name: 'Яндекс Карты и 2ГИС', href: '/uslugi/prodvizhenie-na-kartah', price: '20 000 ₽', note: '' },
  { name: 'SEO и видимость в нейросетях', href: '/uslugi/seo-i-geo', price: 'от 60 000 ₽', note: '' },
]

export const metadata: Metadata = {
  title: 'Цены на маркетинговые услуги',
  description:
    'Цены агентства Квинт: разбор с основательницей — 10 000 ₽, аудит — от 5 000 ₽, стратегия — от 40 000 ₽, Яндекс Директ — от 45 000 ₽, Яндекс Карты — 20 000 ₽, SEO — от 60 000 ₽, сопровождение — от 150 000 ₽ в месяц.',
}

export default function PricesPage() {
  return (
    <PageShell>
      <Breadcrumbs items={[{ name: 'Цены', path: '/ceny' }]} />
      <h1 className="section-title mb-6">Цены</h1>
      <p className="text-text/85 text-lg leading-relaxed max-w-3xl mb-fluid-l">
        Разбор маркетинга с основательницей стоит 10 000 ₽, сопровождение под ключ — от 150 000 ₽ в месяц. Итоговую
        стоимость отдельных услуг называем после разбора, когда видно объём работы. Рекламный бюджет оплачивается отдельно.
      </p>
      <div className="border-t border-black/10 mb-fluid-l">
        {rows.map((r) => (
          <div key={r.name} className="grid grid-cols-1 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,1.2fr)] gap-1 md:gap-8 py-5 border-b border-black/10">
            <Link href={r.href} className="text-text font-medium link-underline self-start">{r.name}</Link>
            <span className="font-mono text-text">{r.price}</span>
            <span className="text-muted text-sm">{r.note}</span>
          </div>
        ))}
      </div>
      <CtaBlock />
    </PageShell>
  )
}
