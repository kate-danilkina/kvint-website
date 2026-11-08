'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Check, AlertCircle, Send, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import ConsentCheckbox from '@/components/shared/ConsentCheckbox'
import { trackGoal, LEAD_SOURCES, PHONE, PHONE_HREF, TELEGRAM_URL } from '@/lib/utils'

interface FormData {
  name: string
  contact: string
  niche: string
  budget: string
  source: string
  /** Honeypot: hidden from people, bots fill it */
  website?: string
  consent: boolean
}

const niches = [
  'IT / SaaS / B2B',
  'Премиум-ритейл',
  'Производство',
  'Недвижимость',
  'Медицина и здоровье',
  'Другое',
]

const budgets = ['до 50 000 ₽', '50 000 – 150 000 ₽', '150 000 ₽ и выше']

interface Props {
  /** Prefix for element ids, so the form can be rendered twice on a page (contact section + lead panel) */
  idPrefix?: string
  /** Text for the task field, e.g. the numbers from the calculator. Sent along with the form, not shown */
  prefill?: string
}

export default function StrategyForm({ idPrefix = '', prefill = '' }: Props = {}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const onSubmit = async ({ consent: _consent, ...fields }: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/send-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, message: prefill || undefined, formType: 'strategy' }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok || !data?.success) throw new Error()
      setStatus('success')
      trackGoal('form_session')
      reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
          <Check size={32} className="text-accent" />
        </div>
        <h3 className="text-xl font-bold text-text mb-2">Заявка отправлена!</h3>
        <p className="text-muted text-sm">
          Спасибо, скоро свяжемся с вами.{' '}
          Пока можно посмотреть наши{' '}
          <Link href="/cases" className="text-accent hover:underline inline-flex items-center gap-0.5">
            кейсы <ArrowRight size={12} />
          </Link>
        </p>
        <p className="text-muted text-sm mt-3">
          Ответим в течение 15 минут в рабочее время (пн–сб, 9:00–20:00). Срочно — напишите в{' '}
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Telegram</a>{' '}
          или позвоните:{' '}
          <a href={PHONE_HREF} className="text-accent hover:underline font-mono whitespace-nowrap">{PHONE}</a>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ym-hide-content flex flex-col gap-4">
      {/* Honeypot: hidden from people and screen readers, bots tend to fill it */}
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden className="sr-only" {...register('website')} />
      <Input
        id={`${idPrefix}s-name`}
        label="Имя"
        placeholder="Иван Иванов"
        autoComplete="name"
        error={errors.name?.message}
        {...register('name', {
          required: 'Введите имя',
          minLength: { value: 2, message: 'Минимум 2 символа' },
          pattern: { value: /^[а-яёА-ЯЁa-zA-Z\s-]+$/, message: 'Только буквы' },
        })}
      />
      <Input
        id={`${idPrefix}s-contact`}
        label="Телефон или @username"
        placeholder="+7 (999) 000-00-00 или @username"
        autoComplete="tel"
        error={errors.contact?.message}
        {...register('contact', {
          required: 'Введите контакт',
          pattern: {
            value: /^(\+?[0-9\s\-()]{10,15}|@[\w]{3,})$/,
            message: 'Введите телефон или @username',
          },
        })}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${idPrefix}s-niche`} className="text-sm font-medium text-muted font-mono flex items-center gap-2">
          Ниша бизнеса
          <span className="text-xs text-muted font-normal">(необязательно)</span>
        </label>
        <div className="relative">
          <select
            id={`${idPrefix}s-niche`}
            className="w-full px-4 py-3 pr-10 rounded-xl bg-black/5 border border-black/10 text-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 text-base appearance-none cursor-pointer"
            {...register('niche')}
          >
            <option value="">Выберите нишу</option>
            {niches.map((n) => (
              <option key={n} value={n} className="bg-bg-2">{n}</option>
            ))}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${idPrefix}s-budget`} className="text-sm font-medium text-muted font-mono flex items-center gap-2">
          Текущий маркетинговый бюджет
          <span className="text-xs text-muted font-normal">(необязательно)</span>
        </label>
        <div className="relative">
          <select
            id={`${idPrefix}s-budget`}
            className="w-full px-4 py-3 pr-10 rounded-xl bg-black/5 border border-black/10 text-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 text-base appearance-none cursor-pointer"
            {...register('budget')}
          >
            <option value="">Выберите диапазон</option>
            {budgets.map((b) => (
              <option key={b} value={b} className="bg-bg-2">{b}</option>
            ))}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${idPrefix}s-source`} className="text-sm font-medium text-muted font-mono flex items-center gap-2">
          Откуда узнали о нас
          <span className="text-xs text-muted font-normal">(необязательно)</span>
        </label>
        <div className="relative">
          <select
            id={`${idPrefix}s-source`}
            className="w-full px-4 py-3 pr-10 rounded-xl bg-black/5 border border-black/10 text-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 text-base appearance-none cursor-pointer"
            {...register('source')}
          >
            <option value="">Выберите вариант</option>
            {LEAD_SOURCES.map((o) => (
              <option key={o} value={o} className="bg-bg-2">{o}</option>
            ))}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <ConsentCheckbox
        id={`${idPrefix}consent-strategy`}
        error={errors.consent?.message}
        {...register('consent', { required: 'Нужно согласие, чтобы мы могли связаться с вами' })}
      />

            {status === 'error' && (
        <div role="alert" className="flex items-start gap-2 text-red-700 text-sm">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" aria-hidden />
          <p>
            Не получилось отправить заявку. Напишите нам в{' '}
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="underline">Telegram</a>{' '}
            или позвоните:{' '}
            <a href={PHONE_HREF} className="underline font-mono whitespace-nowrap">{PHONE}</a>
          </p>
        </div>
      )}

      <Button type="submit" variant="primary" size="lg" fullWidth disabled={status === 'loading'}>
        {status === 'loading' ? (
          <>
            <span className="animate-spin rounded-full h-4 w-4 border-2 border-black/30 border-t-white" aria-hidden />
            Отправляем...
          </>
        ) : (
          <>
            <Send size={16} />
            Записаться на разбор
          </>
        )}
      </Button>
      <p className="text-xs text-muted font-mono text-center">60 минут · 10 000 ₽ · оплата 50/50</p>
    </form>
  )
}
