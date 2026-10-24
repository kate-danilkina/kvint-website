'use client'

import { Check } from 'lucide-react'
import Button, { buttonClass } from '@/components/ui/Button'
import { openContact, TELEGRAM_URL } from '@/lib/utils'
import SectionHeading from '@/components/shared/SectionHeading'

const diagnosticItems = [
  'Ошибки в рекламе, на сайте и в воронке продаж',
  'Стоимость заявки и срок окупаемости вложений',
  'Пошаговый план: как выйти из просадки или вырасти',
  '3–5 точек роста с первыми шагами',
  'Вердикт: окупаем вложения в 3–5 раз — берёмся, нет — так и скажем',
]

const estimate = [
  { label: 'Формат', value: 'созвон, 60 минут' },
  { label: 'Ведёт', value: 'Екатерина Данилкина' },
  { label: 'На выходе', value: 'план и вердикт' },
]

export default function MainCTA() {
  return (
    <section className="py-fluid-2xl border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="eyebrow mb-4">Разбор с основательницей</p>
        <SectionHeading className="section-title mb-fluid-l max-w-3xl">Посчитаем, во сколько вам обходится заявка</SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-start">
          {/* What's included */}
          <div>
            <p className="text-muted text-lg mb-8 max-w-xl">
              За час покажем, куда уходит бюджет и сколько стоит заявка.
            </p>
            <ul className="flex flex-col gap-4">
              {diagnosticItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check size={16} className="text-up mt-1 flex-shrink-0" aria-hidden />
                  <span className="text-text/90 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Estimate */}
          <div className="rounded-xl border border-white/10 bg-bg-2 font-mono text-sm">
            <div className="px-5 py-3 border-b border-white/[0.08] text-xs text-muted">СМЕТА</div>
            <dl>
              {estimate.map((row) => (
                <div key={row.label} className="flex justify-between gap-4 px-5 py-3 border-b border-white/[0.06]">
                  <dt className="text-muted">{row.label}</dt>
                  <dd className="text-text text-right">{row.value}</dd>
                </div>
              ))}
              <div className="flex justify-between items-baseline gap-4 px-5 py-5">
                <dt className="text-muted">Стоимость</dt>
                <dd className="text-text text-3xl font-bold tabular-nums">10 000 ₽</dd>
              </div>
            </dl>
            <div className="flex flex-col gap-2 p-5 pt-0 font-sans">
              <Button variant="primary" size="lg" fullWidth onClick={() => openContact('strategy')}>
                Записаться на разбор
              </Button>
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className={buttonClass('secondary', 'lg', 'w-full')}>
                Написать в Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
