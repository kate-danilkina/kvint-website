'use client'

import { useMemo, useState } from 'react'
import { DiagnosticButton } from '@/components/landing/CtaBlock'
import { NumberField, count, money, type FieldKind } from '@/components/calculator/CalcFields'
import { formatNum } from '@/lib/calculator'
import { PLANNER_DEFAULTS, TEST_MONTH_SHARE, calculatePlan, type PlannerInput } from '@/lib/budget-planner'

const FIELDS: { key: keyof PlannerInput; label: string; kind: FieldKind }[] = [
  { key: 'sales', label: 'Продаж в месяц нужно, шт', kind: 'num' },
  { key: 'conv', label: 'Конверсия заявки в продажу, %', kind: 'pct' },
  { key: 'leadPrice', label: 'Ожидаемая цена заявки, ₽', kind: 'rub' },
]

const formulas = [
  'Заявки в месяц = продажи / конверсия заявки в продажу',
  'Бюджет в месяц = заявки × цена заявки',
  `Тест: первый месяц — ${TEST_MONTH_SHARE}% бюджета, остальные месяцы — полный бюджет`,
]

export default function BudgetPlanner() {
  const [input, setInput] = useState<PlannerInput>(PLANNER_DEFAULTS)
  const result = useMemo(() => calculatePlan(input), [input])

  // Short text with the client's numbers; it goes into the task field of the lead form
  const prefill =
    `Цифры из планировщика бюджета: продаж в месяц ${formatNum(input.sales)}, конверсия заявки в продажу ${input.conv}%, ` +
    `цена заявки ${formatNum(input.leadPrice)} ₽. ` +
    (result.budget === null
      ? 'Бюджет не посчитан'
      : `Нужно заявок ${count(result.leads)} в месяц, бюджет ${money(result.budget)} в месяц`)

  const set = (key: keyof PlannerInput) => (n: number) => setInput((prev) => ({ ...prev, [key]: n }))

  const metrics: { label: string; value: string }[] = [
    { label: 'Заявок в месяц', value: count(result.leads) },
    { label: 'Бюджет в месяц', value: money(result.budget) },
    { label: 'Первый месяц теста', value: money(result.testMonth) },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start">
      {/* Исходные цифры */}
      <div className="glass-card p-5 sm:p-8 flex flex-col gap-8 min-w-0">
        <fieldset className="flex flex-col gap-5">
          <legend className="eyebrow mb-1">План продаж</legend>
          {FIELDS.map((f) => (
            <NumberField
              key={f.key}
              id={`planner-${f.key}`}
              label={f.label}
              kind={f.kind}
              value={input[f.key]}
              onChange={set(f.key)}
            />
          ))}
        </fieldset>
        <p className="text-sm text-muted leading-relaxed">
          Значения на старте — пример, замените их на свои. Цену заявки берите из рекламного кабинета или прошлых
          месяцев
        </p>
      </div>

      {/* Результат */}
      <div className="flex flex-col gap-4 min-w-0">
        <section aria-labelledby="planner-result" className="rounded-2xl bg-night text-white p-6 sm:p-8">
          <h2 id="planner-result" className="eyebrow !text-white/50 mb-4">Результат</h2>
          <div aria-live="polite" className="flex flex-col gap-4">
            <div>
              <p className="font-mono text-xs text-white/50 mb-2">Бюджет в месяц</p>
              <p className="font-display font-bold text-step-5 leading-none">{money(result.budget)}</p>
            </div>
            <p className="text-white/75 leading-relaxed">
              {result.budget === null
                ? 'Нужны продажи, конверсия и цена заявки больше нуля'
                : `Чтобы получить ${formatNum(input.sales)} продаж в месяц, нужно ${count(result.leads)} заявок`}
            </p>
          </div>

          {result.budget !== null && (
            <div className="mt-6 rounded-xl bg-white/5 p-4">
              <p className="eyebrow !text-white/50 mb-2">План теста на 3 месяца</p>
              <p className="text-white/75 leading-relaxed">
                Тест: месяц 1 — {money(result.testMonth)} на проверку цены заявки. Месяцы 2 и 3 — {money(result.budget)} в
                месяц, если цена заявки держится
              </p>
              <p className="mt-2 text-sm text-white/50 leading-relaxed">
                Правило большого пальца, а не прогноз. Первый месяц показывает, какая цена заявки на самом деле
              </p>
            </div>
          )}

          <DiagnosticButton
            label="Разобрать план с основательницей"
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
        </div>
      </div>
    </div>
  )
}
