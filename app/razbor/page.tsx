import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import PageShell from '@/components/landing/PageShell'
import Breadcrumbs from '@/components/landing/Breadcrumbs'
import { DiagnosticButton } from '@/components/landing/CtaBlock'
import { JsonLd, serviceLd, faqLd } from '@/lib/seo'

const faq = [
  { q: 'Сколько стоит разбор?', a: '10 000 ₽ за 60 минут.' },
  { q: 'Кто проводит разбор?', a: 'Основательница агентства Екатерина Данилкина.' },
  { q: 'Что подготовить к разбору?', a: 'Доступ к рекламным кабинетам и Метрике или готовность показать их экран, цифры по заявкам и продажам за последние 2–3 месяца.' },
  { q: 'Что будет после разбора?', a: 'Вы получаете план и вердикт. Если видим, как окупить вложения в 3–5 раз, предложим сопровождение. Если нет — так и скажем.' },
]

export const metadata: Metadata = {
  title: 'Разбор маркетинга с основательницей — 60 минут, 10 000 ₽',
  description:
    'Разбор маркетинга с Екатериной Данилкиной: за 60 минут покажем ошибки в рекламе, на сайте и в воронке, посчитаем стоимость заявки и дадим план с 3–5 точками роста. 10 000 ₽.',
}

export default function RazborPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          serviceLd({
            name: 'Разбор маркетинга с основательницей',
            description: '60-минутный разбор рекламы, сайта и воронки продаж с расчётом стоимости заявки и планом.',
            path: '/razbor',
            price: 10000,
          }),
          faqLd(faq),
        ]}
      />
      <Breadcrumbs items={[{ name: 'Разбор', path: '/razbor' }]} />
      <h1 className="section-title mb-6">Разбор маркетинга с основательницей</h1>
      <p className="text-text/85 text-lg sm:text-xl leading-relaxed max-w-3xl mb-8">
        За 60 минут Екатерина Данилкина разберёт вашу рекламу, сайт и воронку продаж, посчитает, сколько стоит заявка,
        и покажет, где теряются деньги. Стоимость — 10 000 ₽.
      </p>
      <DiagnosticButton className="mb-fluid-l" />

      <dl className="grid grid-cols-2 sm:grid-cols-4 border-y border-black/10 mb-fluid-l font-mono">
        {[
          ['Формат', 'созвон'],
          ['Длительность', '60 минут'],
          ['Ведёт', 'Екатерина Данилкина'],
          ['Стоимость', '10 000 ₽'],
        ].map(([l, v]) => (
          <div key={l} className="py-5 pr-4">
            <dt className="text-xs text-muted uppercase tracking-wide">{l}</dt>
            <dd className="text-text mt-1">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-fluid-l mb-fluid-l">
        <section>
          <h2 className="font-bold text-text text-2xl tracking-tight mb-4">Что вы получите</h2>
          <ul className="flex flex-col gap-3">
            {[
              'Ошибки в рекламе, на сайте и в воронке продаж',
              'Стоимость заявки и срок окупаемости вложений',
              'Пошаговый план: как выйти из просадки или вырасти',
              '3–5 точек роста с первыми шагами',
              'Вердикт: окупаем вложения в 3–5 раз — берёмся, нет — так и скажем',
            ].map((t) => (
              <li key={t} className="flex gap-3 text-text/90">
                <Check size={16} className="text-up mt-1 flex-shrink-0" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-bold text-text text-2xl tracking-tight mb-4">Как проходит</h2>
          <ol className="flex flex-col gap-3">
            {[
              'Оставляете заявку — отвечаем за 2 часа в рабочее время',
              'Договариваемся о времени и вы присылаете доступы или цифры',
              'Созвон 60 минут: разбираем рекламу, сайт и воронку',
              'Получаете план и вердикт',
            ].map((t, i) => (
              <li key={t} className="flex gap-3 text-text/90">
                <span className="font-mono text-muted w-5 flex-shrink-0">{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section className="mb-fluid-l max-w-3xl">
        <h2 className="font-bold text-text text-2xl tracking-tight mb-4">Кому подходит</h2>
        <p className="text-muted leading-relaxed">
          Компаниям из IT B2B, производства, премиум-ритейла и недвижимости, которые уже тратят деньги на рекламу и хотят
          понять, что из этого окупается. Если рекламы пока нет, разбор поможет выбрать, с какого канала начать.
        </p>
      </section>

      <section className="mb-fluid-l max-w-3xl">
        <h2 className="font-bold text-text text-2xl tracking-tight mb-4">Вопросы</h2>
        <dl className="border-t border-black/10">
          {faq.map((f) => (
            <div key={f.q} className="py-4 border-b border-black/10">
              <dt className="text-text font-medium mb-1">{f.q}</dt>
              <dd className="text-muted">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <DiagnosticButton />
    </PageShell>
  )
}
