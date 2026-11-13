'use client'

import { useState } from 'react'
import Input from '@/components/ui/Input'
import { formatNum } from '@/lib/calculator'

// rub — рубли с пробелами, pct — проценты с запятой, num — целое число без единиц
export type FieldKind = 'rub' | 'pct' | 'num'

// Значение в поле после ухода с него: 100 000, 1,5, 3
function toShown(v: number, kind: FieldKind) {
  if (kind === 'rub') return formatNum(v)
  if (kind === 'pct') return String(Math.round(v * 100) / 100).replace('.', ',')
  return String(Math.round(v))
}

// Значение для редактирования: без пробелов
function toRaw(v: number, kind: FieldKind) {
  return kind === 'rub' ? String(Math.round(v)) : toShown(v, kind)
}

// Число для расчёта: пустое поле даёт 0, проценты не больше 100
function parse(s: string, kind: FieldKind) {
  if (kind === 'pct') return Math.min(Number.parseFloat(s.replace(',', '.')) || 0, 100)
  return Number(s.replace(/\D/g, '')) || 0
}

// Не даём тексту уйти в число: в рублях и месяцах только цифры, в процентах цифры, точка и запятая
function clean(s: string, kind: FieldKind) {
  return kind === 'pct' ? s.replace(/[^\d.,]/g, '') : s.replace(/\D/g, '')
}

export function NumberField({
  id,
  label,
  kind,
  value,
  onChange,
}: {
  id: string
  label: string
  kind: FieldKind
  value: number
  onChange: (n: number) => void
}) {
  // Пока поле в фокусе, показываем сырой ввод. Пробелы появляются после ухода с поля
  const [focused, setFocused] = useState(false)
  const [raw, setRaw] = useState('')

  return (
    <Input
      id={id}
      label={label}
      type="text"
      inputMode={kind === 'pct' ? 'decimal' : 'numeric'}
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

// Число для таблицы: целые, а дробные (заявки, продажи) до одного знака. null — «—»
export function count(n: number | null) {
  if (n === null) return '—'
  const x = Math.round(n * 10) / 10
  return formatNum(x, Number.isInteger(x) ? 0 : 1)
}

export function money(n: number | null) {
  return n === null ? '—' : `${formatNum(Math.round(n))} ₽`
}
