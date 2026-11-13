import type { Metadata } from 'next'
import Link from 'next/link'
import PageShell from '@/components/landing/PageShell'
import Breadcrumbs from '@/components/landing/Breadcrumbs'
import { FreeVideoButton } from '@/components/landing/CtaBlock'
import BudgetPlanner from '@/components/calculator/BudgetPlanner'
import OtherCalculators from '@/components/calculator/OtherCalculators'
import { JsonLd, faqLd } from '@/lib/seo'

const PATH = '/planirovshchik-byudzheta'

const faq = [
  { q: 'Откуда взять конверсию заявки в продажу', a: 'Посчитайте по CRM: оплаченные проекты делим на все заявки за тот же период. Если CRM нет, возьмите цифры из прошлых месяцев или начните с теста и пересчитайте через месяц' },
  { q: 'Почему в тесте только половина бюджета', a: 'Первый месяц нужен, чтобы проверить цену заявки на деле. Если цена отличается от ожидаемой, бюджет пересчитывается до того, как потрачен весь месячный план' },
  { q: 'Что делать, если цена заявки выше ожидаемой', a: 'Пересчитайте бюджет по новой цене. При той же конверсии и том же плане продаж бюджет растёт пропорционально цене заявки. Или улучшайте конверсию заявки в продажу, тогда нужно меньше заявок' },
  { q: 'Это гарантия результата', a: 'Нет. Планировщик считает арифметику по вашим входным цифрам. Результат зависит от рынка, сайта и отдела продаж, поэтому тест нужен' },
]

export const metadata: Metadata = {
  title: 'Планировщик рекламного бюджета для B2B',
  description:
    'Бесплатный планировщик: укажите продажи в месяц, конверсию заявки и цену заявки. Посчитаем нужное число заявок, бюджет и план теста на три месяца',
  alternates: { canonical: PATH },
}

export default function BudgetPlannerPage() {
  return (
    <PageShell>
      <JsonLd data={faqLd(faq)} />
      <Breadcrumbs items={[{ name: 'Планировщик бюджета', path: PATH }]} />

      <header className="mb-fluid-l">
        <p className="eyebrow mb-4">Инструмент · бесплатно</p>
        <h1 className="section-title mb-6 max-w-4xl">Планировщик рекламного бюджета для B2B</h1>
        <p className="text-text/85 text-lg sm:text-xl leading-relaxed max-w-3xl">
          Введите план продаж и цифры воронки. Планировщик покажет, сколько заявок нужно в месяц и какой бюджет на них
          уйдёт. Это расчёт по воронке, а не обещание результата
        </p>
      </header>

      <section className="mb-fluid-xl" aria-label="Планировщик">
        <BudgetPlanner />
      </section>

      <section className="mb-fluid-xl" aria-label="Пример расчёта">
        <div className="rounded-2xl border border-black/10 p-5 sm:p-6">
          <p className="eyebrow mb-3">Пример расчёта</p>
          <ul className="flex flex-col gap-2 font-mono text-sm text-muted leading-relaxed">
            <li>Исходные: продаж 10 в месяц, конверсия заявки в продажу 20%, цена заявки 2 000 ₽</li>
            <li>Заявок: 10 / 20% = 50 в месяц</li>
            <li>Бюджет: 50 × 2 000 = 100 000 ₽ в месяц</li>
            <li>Тест: месяц 1 — 50% от 100 000 = 50 000 ₽, месяцы 2 и 3 — по 100 000 ₽, если цена заявки держится</li>
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
        <h2 className="font-bold text-text text-2xl sm:text-3xl tracking-tight mb-3">Проверим план вместе</h2>
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
