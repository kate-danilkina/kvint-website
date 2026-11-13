import Link from 'next/link'

export const CALCULATORS = [
  { path: '/kalkulyator-zayavki', title: 'Калькулятор цены заявки и окупаемости', note: 'цена заявки и клиента, ROMI по цене клика' },
  { path: '/kalkulyator-okupaemosti', title: 'Калькулятор окупаемости рекламы для B2B', note: 'окупится ли бюджет и какую цену заявки можно платить' },
  { path: '/planirovshchik-byudzheta', title: 'Планировщик рекламного бюджета для B2B', note: 'сколько заявок и бюджета нужно под план продаж' },
]

export default function OtherCalculators({ current }: { current: string }) {
  const others = CALCULATORS.filter((c) => c.path !== current)
  return (
    <section className="mb-fluid-xl max-w-3xl" aria-labelledby="other-calculators">
      <h2 id="other-calculators" className="section-title !text-step-3 mb-fluid-s">Другие калькуляторы</h2>
      <ul className="flex flex-col gap-3">
        {others.map((c) => (
          <li key={c.path} className="rounded-2xl bg-bg-2 p-5 sm:p-6">
            <Link href={c.path} className="link-underline font-semibold text-text">
              {c.title}
            </Link>
            <p className="text-muted leading-relaxed mt-1">{c.note}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
