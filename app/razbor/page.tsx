import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import PageShell from '@/components/landing/PageShell'
import Breadcrumbs from '@/components/landing/Breadcrumbs'
import { DiagnosticButton } from '@/components/landing/CtaBlock'
import { JsonLd, serviceLd, faqLd } from '@/lib/seo'

const faq = [
  { q: 'Сколько стоит разбор?', a: '10 000 ₽ за 60 минут' },
  { q: 'Кто проводит разбор?', a: 'Основательница агентства Екатерина Данилкина' },
  { q: 'Что подготовить к разбору?', a: 'Доступы к рекламным кабинетам и Яндекс Метрике или показ экрана на созвоне. И цифры по заявкам и продажам за 2–3 последних месяца' },
  { q: 'Что будет после разбора?', a: 'План и вердикт. Если видим окупаемость, предложим сопровождение. Если нет, скажем прямо. План остаётся у вас' },
]

export const metadata: Metadata = {
  title: 'Разбор маркетинга с основательницей — 60 минут, 10 000 ₽',
  description:
    'Разбор маркетинга с Екатериной Данилкиной: за 60 минут найдём, где вы теряете деньги, посчитаем цену заявки и окупаемость, дадим план и честный вердикт. Стоимость 10 000 ₽',
}

export default function RazborPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          serviceLd({
            name: 'Разбор маркетинга с основательницей',
            description: 'Разбор рекламы, сайта и работы с заявками за 60 минут: цена заявки, точки роста, план и вердикт',
            path: '/razbor',
            price: 10000,
          }),
          faqLd(faq),
        ]}
      />
      <Breadcrumbs items={[{ name: 'Разбор', path: '/razbor' }]} />
      <h1 className="section-title mb-6">Разбор маркетинга с основательницей</h1>
      <p className="text-text/85 text-lg sm:text-xl leading-relaxed max-w-3xl mb-8">
        Хватит гадать. Пора считать. За 60 минут Екатерина Данилкина разберёт рекламу, сайт и путь клиента
        до сделки. Посчитает, сколько стоит одна заявка, и покажет, где вы прямо сейчас теряете деньги.
        Стоимость — 10 000 ₽. Разбор платный: после него у вас остаётся план, который можно выполнить
      </p>
      <DiagnosticButton className="mb-fluid-l" />

      <dl className="grid grid-cols-2 sm:grid-cols-4 border-y border-black/10 mb-fluid-l font-mono">
        {[
          ['Формат', 'созвон'],
          ['Длительность', '60 минут'],
          ['Ведёт', 'Екатерина Данилкина'],
          ['Стоимость', '10 000 ₽'],
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
              'Ошибки в рекламе, на сайте и в работе с заявками',
              'Реальную цену заявки и срок окупаемости',
              'План по шагам: как выйти из просадки или вырасти',
              '3–5 точек роста, которые можно внедрить сразу',
              'Честный вердикт: окупаем вложения в 3–5 раз — берёмся. Нет — скажем прямо',
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
              'Вы оставляете заявку, мы связываемся с вами',
              'Договариваемся о времени, вы присылаете доступы или цифры',
              'Созвон на 60 минут: разбираем рекламу, сайт и работу с заявками',
              'Вы получаете план и честный вердикт',
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
          Собственникам компаний из IT B2B, производства, премиум-ритейла и недвижимости. Тем, кто тратит деньги
          на рекламу и не понимает, что из этого окупается. Если рекламы пока нет, выберем канал, с которого стоит начать
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
