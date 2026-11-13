import type { Metadata } from 'next'
import Link from 'next/link'
import PageShell from '@/components/landing/PageShell'
import Breadcrumbs from '@/components/landing/Breadcrumbs'
import { FreeVideoButton } from '@/components/landing/CtaBlock'
import PaybackCalculator from '@/components/calculator/PaybackCalculator'
import OtherCalculators from '@/components/calculator/OtherCalculators'
import { JsonLd, faqLd } from '@/lib/seo'

const PATH = '/kalkulyator-okupaemosti'

const faq = [
  { q: 'Откуда взять цифры', a: 'Цену заявки и бюджет берите из рекламного кабинета. Конверсию в продажу, чек и маржу берите из CRM или учёта продаж. Если CRM нет, начните с оценки и уточните цифры через месяц' },
  { q: 'Что такое предельная цена заявки', a: 'Это цена, выше которой прибыль с продаж не покрывает рекламный бюджет. Если заявка дешевле, реклама возвращает свои деньги. Если дороже, не возвращает' },
  { q: 'Зачем указывать длину сделки', a: 'Прибыль от рекламы приходит после сделки, а не в том же месяце. Если сделка длится три месяца, первые деньги вернутся через три месяца. Калькулятор напомнит об этом под результатом' },
  { q: 'Насколько точен расчёт', a: 'Калькулятор работает со средними значениями за месяц. Он показывает порядок цифр и слабое звено, но не заменяет отчёт. Точную картину дают сквозная аналитика и CRM' },
]

export const metadata: Metadata = {
  title: 'Калькулятор окупаемости рекламы для B2B',
  description:
    'Бесплатный калькулятор: введите цену заявки, конверсию, чек, маржу и бюджет. Посчитаем заявки, цену клиента, ROMI и предельную цену заявки',
  alternates: { canonical: PATH },
}

export default function PaybackPage() {
  return (
    <PageShell>
      <JsonLd data={faqLd(faq)} />
      <Breadcrumbs items={[{ name: 'Калькулятор окупаемости', path: PATH }]} />

      <header className="mb-fluid-l">
        <p className="eyebrow mb-4">Инструмент · бесплатно</p>
        <h1 className="section-title mb-6 max-w-4xl">Калькулятор окупаемости рекламы для B2B</h1>
        <p className="text-text/85 text-lg sm:text-xl leading-relaxed max-w-3xl">
          Введите цифры рекламы и продаж. Калькулятор покажет, сколько заявок даёт бюджет, сколько стоит клиент и
          возвращает ли реклама свои деньги. Результат меняется сразу
        </p>
      </header>

      <section className="mb-fluid-xl" aria-label="Калькулятор">
        <PaybackCalculator />
      </section>

      <section className="mb-fluid-xl" aria-label="Пример расчёта">
        <div className="rounded-2xl border border-black/10 p-5 sm:p-6">
          <p className="eyebrow mb-3">Пример расчёта</p>
          <ul className="flex flex-col gap-2 font-mono text-sm text-muted leading-relaxed">
            <li>Исходные: бюджет 200 000 ₽, цена заявки 2 000 ₽, конверсия в продажу 20%, чек 100 000 ₽, маржа 30%</li>
            <li>Заявок: 200 000 / 2 000 = 100</li>
            <li>Продаж: 100 × 20% = 20</li>
            <li>Цена клиента: 200 000 / 20 = 10 000 ₽</li>
            <li>Валовая прибыль: 20 × 100 000 × 30% = 600 000 ₽</li>
            <li>ROMI: (600 000 − 200 000) / 200 000 × 100% = 200%</li>
            <li>Предельная цена заявки: 100 000 × 30% × 20% = 6 000 ₽</li>
          </ul>
        </div>
      </section>

      <section className="mb-fluid-xl max-w-3xl" aria-labelledby="faq">
        <h2 id="faq" className="section-title !text-step-3 mb-fluid-s">Вопросы</h2>
        <dl className="border-t border-black/10">
          {faq.map((f) => (
            <div key={f.q} className="py-4 border-b border-black/10">
              <dt className="text-text font-medium mb-1">{f.q}</dt>
              <dd className="text-muted leading-relaxed">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <OtherCalculators current={PATH} />

      <section className="rounded-2xl bg-bg-2 p-6 sm:p-10">
        <h2 className="font-bold text-text text-2xl sm:text-3xl tracking-tight mb-3">Разберём ваши цифры вместе</h2>
        <p className="text-muted mb-6 max-w-xl">
          Бесплатный видеоразбор: основательница запишет видео 10–15 минут с экрана по вашей рекламе и сайту. Для разбора
          вживую смотрите <Link href="/razbor" className="link-underline text-text">разбор с основательницей</Link>
        </p>
        <FreeVideoButton />
        <p className="text-xs text-muted font-mono mt-4">Без обязательств</p>
      </section>
    </PageShell>
  )
}
