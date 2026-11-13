'use client'

import { useMemo, useState } from 'react'
import { DiagnosticButton } from '@/components/landing/CtaBlock'
import { NumberField, count, money, type FieldKind } from '@/components/calculator/CalcFields'
import { formatNum } from '@/lib/calculator'
import { PAYBACK_DEFAULTS, calculatePayback, type PaybackInput } from '@/lib/payback'

const GROUPS: { title: string; fields: { key: keyof PaybackInput; label: string; kind: FieldKind }[] }[] = [
  {
    title: 'Продажи',
    fields: [
      { key: 'check', label: 'Средний чек, ₽', kind: 'rub' },
      { key: 'margin', label: 'Маржинальность, %', kind: 'pct' },
      { key: 'conv', label: 'Конверсия заявки в продажу, %', kind: 'pct' },
      { key: 'dealMonths', label: 'Длина сделки, мес. (необязательно)', kind: 'num' },
    ],
  },
  {
    title: 'Реклама',
    fields: [
      { key: 'leadPrice', label: 'Цена заявки, ₽', kind: 'rub' },
      { key: 'budget', label: 'Рекламный бюджет в месяц, ₽', kind: 'rub' },
    ],
  },
]

// Вердикт только по ROMI: прибыль покрывает бюджет или нет
function verdictOf(romi: number | null) {
  if (romi === null) return { title: 'Введите цифры', text: 'Нужны бюджет и цена заявки больше нуля', pill: 'bg-white/15 text-white' }
  if (romi >= 0) return { title: 'Бюджет возвращается', text: 'Валовая прибыль покрывает рекламный бюджет', pill: 'bg-up text-white' }
  return { title: 'Бюджет не возвращается', text: 'Прибыль с продаж меньше рекламного бюджета', pill: 'bg-down text-white' }
}

export default function PaybackCalculator() {
  const [input, setInput] = useState<PaybackInput>(PAYBACK_DEFAULTS)
  const result = useMemo(() => calculatePayback(input), [input])
  const verdict = verdictOf(result.romi)

  // Short text with the client's numbers; it goes into the task field of the lead form
  const romiText = result.romi === null ? 'не посчитан' : `${formatNum(Math.round(result.romi))}%`
  const prefill =
    `Цифры из калькулятора окупаемости: бюджет ${formatNum(input.budget)} ₽ в месяц, цена заявки ${formatNum(input.leadPrice)} ₽, ` +
    `конверсия заявки в продажу ${input.conv}%, средний чек ${formatNum(input.check)} ₽, маржинальность ${input.margin}%. ` +
    `ROMI ${romiText}`

  const set = (key: keyof PaybackInput) => (n: number) => setInput((prev) => ({ ...prev, [key]: n }))

  const metrics: { label: string; value: string }[] = [
    { label: 'Заявки в месяц', value: count(result.leads) },
    { label: 'Продажи в месяц', value: count(result.sales) },
    { label: 'Цена клиента', value: money(result.clientPrice) },
    { label: 'Валовая прибыль', value: money(result.grossProfit) },
    { label: 'Предельная цена заявки', value: money(result.maxLeadPrice) },
  ]

  const formulas = [
    'Заявки = бюджет / цена заявки',
    'Продажи = заявки × конверсия заявки в продажу',
    'Цена клиента = бюджет / продажи',
    'Валовая прибыль = продажи × средний чек × маржинальность',
    'ROMI = (валовая прибыль − бюджет) / бюджет × 100%',
    'Предельная цена заявки = средний чек × маржинальность × конверсия',
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start">
      {/* Исходные цифры */}
      <div className="glass-card p-5 sm:p-8 flex flex-col gap-8 min-w-0">
        {GROUPS.map((g) => (
          <fieldset key={g.title} className="flex flex-col gap-5">
            <legend className="eyebrow mb-1">{g.title}</legend>
            {g.fields.map((f) => (
              <NumberField
                key={f.key}
                id={`payback-${f.key}`}
                label={f.label}
                kind={f.kind}
                value={input[f.key]}
                onChange={set(f.key)}
              />
            ))}
          </fieldset>
        ))}
        <p className="text-sm text-muted leading-relaxed">
          Значения на старте — пример, замените их на свои. Расчёт работает со средними значениями за месяц
        </p>
      </div>

      {/* Результат */}
      <div className="flex flex-col gap-4 min-w-0">
        <section aria-labelledby="payback-result" className="rounded-2xl bg-night text-white p-6 sm:p-8">
          <h2 id="payback-result" className="eyebrow !text-white/50 mb-4">Результат</h2>
          <div aria-live="polite" className="flex flex-col gap-4">
            <span className={`self-start rounded-full px-3 py-1 font-mono text-xs font-semibold ${verdict.pill}`}>
              {verdict.title}
            </span>
            <div>
              <p className="font-mono text-xs text-white/50 mb-2">ROMI, возврат на рекламу</p>
              <p className="font-display font-bold text-step-5 leading-none">{romiText}</p>
            </div>
            <p className="text-white/75 leading-relaxed">{verdict.text}</p>
          </div>

          {result.maxLeadPrice !== null && (
            <div className="mt-6 rounded-xl bg-white/5 p-4">
              <p className="eyebrow !text-white/50 mb-2">Порог окупаемости</p>
              <p className="text-white/75 leading-relaxed">
                Если заявка стоит дороже {money(result.maxLeadPrice)}, прибыль с продаж не покроет бюджет
              </p>
            </div>
          )}

          <DiagnosticButton
            label="Разобрать мои цифры с основательницей"
            className="mt-6 w-full sm:w-auto"
            prefill={prefill}
          />
        </section>

        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-5 rounded-2xl bg-bg-2 p-5 sm:p-6 border border-black/[0.08]">
          {metrics.map((m) => (
            <div key={m.label} className="min-w-0 border-t border-black/10 pt-3">
              <dt className="text-xs text-muted leading-snug">{m.label}</dt>
              <dd className="font-mono text-text text-base sm:text-lg mt-1">{m.value}</dd>
            </div>
          ))}
        </dl>

        <div className="rounded-2xl border border-black/10 p-5 sm:p-6">
          <p className="eyebrow mb-3">Как считаем</p>
          <ul className="flex flex-col gap-2 font-mono text-sm text-muted">
            {formulas.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          {input.dealMonths > 0 && (
            <p className="mt-4 text-sm text-muted leading-relaxed">
              Срок сделки {input.dealMonths} мес. Деньги от рекламы приходят через этот срок после заявки, поэтому
              окупаемость смотрите за период не короче срока сделки
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
