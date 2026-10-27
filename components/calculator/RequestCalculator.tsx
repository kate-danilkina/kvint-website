'use client'

import { useMemo, useState } from 'react'
import Input from '@/components/ui/Input'
import { DiagnosticButton } from '@/components/landing/CtaBlock'
import { DEFAULTS, calculate, formatNum, verdictOf, weakestLink, type CalcInput, type Verdict } from '@/lib/calculator'

type Kind = 'rub' | 'pct'

const GROUPS: { title: string; fields: { key: keyof CalcInput; label: string; kind: Kind }[] }[] = [
  {
    title: 'Реклама и сайт',
    fields: [
      { key: 'budget', label: 'Рекламный бюджет в месяц, ₽', kind: 'rub' },
      { key: 'cpc', label: 'Цена клика, ₽', kind: 'rub' },
      { key: 'siteConv', label: 'Конверсия сайта в заявку, %', kind: 'pct' },
    ],
  },
  {
    title: 'Продажи',
    fields: [
      { key: 'dealConv', label: 'Конверсия заявки в сделку, %', kind: 'pct' },
      { key: 'check', label: 'Средний чек, ₽', kind: 'rub' },
      { key: 'margin', label: 'Маржинальность, %', kind: 'pct' },
    ],
  },
]

const VERDICT: Record<Verdict, { title: string; text: string; pill: string }> = {
  profit: { title: 'Реклама окупается', text: 'Прибыль с продаж покрывает бюджет с запасом', pill: 'bg-up text-white' },
  edge: { title: 'Реклама на грани', text: 'Бюджет возвращается, но запаса мало', pill: 'bg-white text-night' },
  loss: { title: 'Реклама не окупается', text: 'Клиент приносит меньше прибыли, чем стоит', pill: 'bg-down text-white' },
  none: { title: 'Введите цифры', text: 'Нужны бюджет и цена клика больше нуля', pill: 'bg-white/15 text-white' },
}

// Значение в поле после ухода с него: 100 000, 1,5
function toShown(v: number, kind: Kind) {
  return kind === 'rub' ? formatNum(v) : String(Math.round(v * 100) / 100).replace('.', ',')
}

// Значение для редактирования: без пробелов
function toRaw(v: number, kind: Kind) {
  return kind === 'rub' ? String(Math.round(v)) : toShown(v, kind)
}

// Число для расчёта: цифры для рублей, проценты до 100
function parse(s: string, kind: Kind) {
  if (kind === 'rub') return Number(s.replace(/\D/g, '')) || 0
  return Math.min(Number.parseFloat(s.replace(',', '.')) || 0, 100)
}

// Не даём тексту уйти в число: в поле рублей только цифры, в процентах цифры, точка и запятая
function clean(s: string, kind: Kind) {
  return kind === 'rub' ? s.replace(/\D/g, '') : s.replace(/[^\d.,]/g, '')
}

function NumberField({
  id,
  label,
  kind,
  value,
  onChange,
}: {
  id: string
  label: string
  kind: Kind
  value: number
  onChange: (n: number) => void
}) {
  // Пока поле в фокусе, показываем сырой ввод. Пробелы появляются после ухода с поля
  const [focused, setFocused] = useState(false)
  const [raw, setRaw] = useState('')

  return (
    <Input
      id={id}
      label={label}
      type="text"
      inputMode={kind === 'rub' ? 'numeric' : 'decimal'}
      autoComplete="off"
      value={focused ? raw : toShown(value, kind)}
      onFocus={() => {
        setRaw(toRaw(value, kind))
        setFocused(true)
      }}
      onBlur={() => setFocused(false)}
      onChange={(e) => {
        const s = clean(e.target.value, kind)
        setRaw(s)
        onChange(parse(s, kind))
      }}
      className="font-mono"
    />
  )
}

// Число для таблицы: целые, а дробные (заявки, сделки) — до одного знака
function count(n: number) {
  const x = Math.round(n * 10) / 10
  return formatNum(x, Number.isInteger(x) ? 0 : 1)
}

function money(n: number | null) {
  return n === null ? '—' : `${formatNum(Math.round(n))} ₽`
}

export default function RequestCalculator() {
  const [input, setInput] = useState<CalcInput>(DEFAULTS)
  const result = useMemo(() => calculate(input), [input])
  const verdict = verdictOf(result.romi)
  const hint = useMemo(() => weakestLink(input, result), [input, result])

  const set = (key: keyof CalcInput) => (n: number) => setInput((prev) => ({ ...prev, [key]: n }))

  const metrics: { label: string; value: string }[] = [
    { label: 'Клики', value: formatNum(Math.round(result.clicks)) },
    { label: 'Заявки', value: count(result.leads) },
    { label: 'Цена заявки', value: money(result.leadPrice) },
    { label: 'Сделки', value: count(result.deals) },
    { label: 'Цена клиента', value: money(result.clientPrice) },
    { label: 'Выручка', value: money(result.revenue) },
    { label: 'Валовая прибыль', value: money(result.grossProfit) },
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
                id={`calc-${f.key}`}
                label={f.label}
                kind={f.kind}
                value={input[f.key]}
                onChange={set(f.key)}
              />
            ))}
          </fieldset>
        ))}
        <p className="text-sm text-muted leading-relaxed">
          Расчёт упрощённый: работает со средними значениями за месяц. Точные цифры дают сквозная аналитика и CRM
        </p>
      </div>

      {/* Результат */}
      <div className="flex flex-col gap-4 min-w-0">
        <section aria-labelledby="calc-result" className="rounded-2xl bg-night text-white p-6 sm:p-8">
          <h2 id="calc-result" className="eyebrow !text-white/50 mb-4">Результат</h2>
          <div aria-live="polite" className="flex flex-col gap-4">
            <span className={`self-start rounded-full px-3 py-1 font-mono text-xs font-semibold ${VERDICT[verdict].pill}`}>
              {VERDICT[verdict].title}
            </span>
            <div>
              <p className="font-mono text-xs text-white/50 mb-2">ROMI, возврат на рекламу</p>
              <p className="font-display font-bold text-step-5 leading-none break-words">
                {result.romi === null ? '—' : `${formatNum(Math.round(result.romi))}%`}
              </p>
            </div>
            <p className="text-white/75 leading-relaxed">{VERDICT[verdict].text}</p>
          </div>

          {hint && (
            <div className="mt-6 rounded-xl bg-white/5 p-4">
              <p className="eyebrow !text-white/50 mb-2">Что улучшить первым</p>
              <p className="font-semibold mb-1">{hint.title}</p>
              <p className="text-white/75 leading-relaxed">{hint.text}</p>
            </div>
          )}

          <DiagnosticButton label="Разобрать мои цифры с основательницей" className="mt-6 w-full sm:w-auto" />
        </section>

        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-5 rounded-2xl bg-bg-2 p-5 sm:p-6 border border-black/[0.08]">
          {metrics.map((m) => (
            <div key={m.label} className="min-w-0 border-t border-black/10 pt-3">
              <dt className="text-xs text-muted leading-snug">{m.label}</dt>
              <dd className="font-mono text-text text-base sm:text-lg mt-1 break-words">{m.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
