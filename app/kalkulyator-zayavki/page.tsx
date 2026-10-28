import type { Metadata } from 'next'
import PageShell from '@/components/landing/PageShell'
import Breadcrumbs from '@/components/landing/Breadcrumbs'
import CtaBlock from '@/components/landing/CtaBlock'
import RequestCalculator from '@/components/calculator/RequestCalculator'
import { JsonLd, faqLd } from '@/lib/seo'

const PATH = '/kalkulyator-zayavki'

const terms = [
  { term: 'Рекламный бюджет', def: 'Сумма, которую вы тратите на рекламу за месяц' },
  { term: 'Цена клика', def: 'Сколько стоит один переход на сайт из рекламы' },
  { term: 'Конверсия сайта в заявку', def: 'Доля посетителей, которые оставили заявку. Например, 3 заявки из 200 визитов — это 1,5%' },
  { term: 'Конверсия заявки в сделку', def: 'Доля заявок, которые стали оплаченными проектами' },
  { term: 'Средний чек', def: 'Сумма одной оплаченной сделки' },
  { term: 'Маржинальность', def: 'Часть выручки, которая остаётся после расходов на производство услуги или товара' },
  { term: 'Цена заявки', def: 'Сколько стоит одна заявка. Бюджет делим на число заявок' },
  { term: 'Цена клиента', def: 'Сколько стоит один новый клиент. Бюджет делим на число сделок' },
  { term: 'Валовая прибыль', def: 'Выручка за вычетом расходов на производство. Из неё платят за рекламу и остальные расходы' },
  { term: 'ROMI', def: 'Возврат на вложения в рекламу. Считаем так: (валовая прибыль − бюджет) / бюджет × 100%' },
]

const verdicts = [
  { term: 'Реклама окупается', def: 'ROMI от 50%' },
  { term: 'Реклама на грани', def: 'ROMI от 0 до 50%' },
  { term: 'Реклама не окупается', def: 'ROMI ниже 0' },
]

const faq = [
  { q: 'Откуда взять цифры для калькулятора', a: 'Бюджет и цену клика берите из рекламного кабинета. Конверсию сайта считайте в Яндекс Метрике: заявки делим на визиты за тот же период. Конверсию в сделку, чек и маржу берите из CRM или учёта продаж' },
  { q: 'Насколько точен расчёт', a: 'Калькулятор работает со средними значениями за месяц. Он показывает порядок цифр и слабое звено, но не заменяет отчёт. Точную картину дают сквозная аналитика и CRM' },
  { q: 'Подходит ли калькулятор для B2B', a: 'Да. Для B2B особенно важны средний чек и путь заявки до сделки, поэтому поля про продажи тоже нужны' },
  { q: 'Что делать, если реклама не окупается', a: 'Сначала найдите слабое звено. Калькулятор покажет его в блоке «Что улучшить первым». Меняйте одно звено за раз и сравнивайте цифры за одинаковый срок' },
  { q: 'Нужно ли указывать маржу', a: 'Лучше указать. Без маржи калькулятор считает выручку, а не прибыль, и ROMI получается завышенным' },
]

export const metadata: Metadata = {
  title: 'Калькулятор цены заявки и окупаемости рекламы',
  description:
    'Бесплатный калькулятор: введите бюджет, цену клика, конверсии, чек и маржу. Посчитаем цену заявки, цену клиента и ROMI рекламы, покажем, что улучшить первым',
  alternates: { canonical: PATH },
}

export default function CalculatorPage() {
  return (
    <PageShell>
      <JsonLd data={faqLd(faq)} />
      <Breadcrumbs items={[{ name: 'Калькулятор заявки', path: PATH }]} />

      <header className="mb-fluid-l">
        <p className="eyebrow mb-4">Инструмент · бесплатно</p>
        <h1 className="section-title mb-6 max-w-4xl">Калькулятор цены заявки и окупаемости рекламы</h1>
        <p className="text-text/85 text-lg sm:text-xl leading-relaxed max-w-3xl">
          Введите цифры своей рекламы. Калькулятор покажет, сколько стоит заявка и клиент, и возвращает ли реклама
          бюджет. Результат меняется сразу. Значения на старте — пример, замените их на свои
        </p>
      </header>

      <section className="mb-fluid-xl" aria-label="Калькулятор">
        <RequestCalculator />
      </section>

      <section className="mb-fluid-xl" aria-labelledby="terms">
        <h2 id="terms" className="section-title !text-step-3 mb-fluid-s">Что значат термины</h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {terms.map((t) => (
            <div key={t.term} className="rounded-2xl bg-bg-2 p-5 sm:p-6">
              <dt className="font-semibold text-text mb-1.5">{t.term}</dt>
              <dd className="text-muted leading-relaxed">{t.def}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 rounded-2xl border border-black/10 p-5 sm:p-6">
          <p className="eyebrow mb-3">Как читать вердикт</p>
          <dl className="flex flex-col gap-2">
            {verdicts.map((v) => (
              <div key={v.term} className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="font-medium text-text sm:w-56">{v.term}</dt>
                <dd className="font-mono text-muted">{v.def}</dd>
              </div>
            ))}
          </dl>
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

      <CtaBlock title="Разберём ваши цифры вместе" />
    </PageShell>
  )
}
