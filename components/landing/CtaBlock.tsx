'use client'

import Button, { buttonClass } from '@/components/ui/Button'
import { openContact, TELEGRAM_URL } from '@/lib/utils'

export function DiagnosticButton({ label = 'Записаться на разбор', className }: { label?: string; className?: string }) {
  return (
    <Button variant="primary" size="lg" className={className} onClick={() => openContact('strategy')}>
      {label}
    </Button>
  )
}

export default function CtaBlock({ title = 'Начните с разбора за 10 000 ₽' }: { title?: string }) {
  return (
    <section className="rounded-2xl border border-transparent bg-bg-2 p-6 sm:p-10">
      <h2 className="font-bold text-text text-2xl sm:text-3xl tracking-tight mb-3">{title}</h2>
      <p className="text-muted mb-6 max-w-xl">
        60 минут с основательницей: покажем, куда уходит бюджет, сколько стоит заявка, и дадим вердикт — берёмся или нет.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <DiagnosticButton />
        <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className={buttonClass('secondary', 'lg')}>
          Написать в Telegram
        </a>
      </div>
    </section>
  )
}
