'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Check, AlertCircle, Send } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { trackGoal } from '@/lib/utils'

interface FormData {
  name: string
  contact: string
  niche: string
  budget: string
}

const niches = [
  'IT / SaaS / B2B',
  'Премиум-ритейл',
  'Производство',
  'Недвижимость',
  'Медицина и здоровье',
  'Другое',
]

const budgets = ['до 50 000 ₽', '50 000 – 150 000 ₽', '150 000 ₽ и выше']

export default function StrategyForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/send-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, formType: 'strategy' }),
      })
      if (!res.ok) throw new Error()
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
        <p className="text-muted text-sm">Мы свяжемся в течение рабочего дня для согласования времени.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        id="s-name"
        label="Имя"
        placeholder="Иван Иванов"
        error={errors.name?.message}
        {...register('name', { required: 'Введите имя' })}
      />
      <Input
        id="s-contact"
        label="Телефон"
        placeholder="+7 (999) 000-00-00"
        error={errors.contact?.message}
        {...register('contact', { required: 'Введите телефон' })}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="s-niche" className="text-sm font-medium text-muted font-grotesk">
          Ниша бизнеса
        </label>
        <select
          id="s-niche"
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-text focus:outline-none focus:border-accent/60 transition-all duration-200 text-base appearance-none"
          {...register('niche', { required: 'Выберите нишу' })}
        >
          <option value="" disabled>Выберите нишу</option>
          {niches.map((n) => (
            <option key={n} value={n} className="bg-bg-2">{n}</option>
          ))}
        </select>
        {errors.niche && <p className="text-xs text-red-400 font-grotesk">{errors.niche.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="s-budget" className="text-sm font-medium text-muted font-grotesk">
          Текущий маркетинговый бюджет
        </label>
        <select
          id="s-budget"
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-text focus:outline-none focus:border-accent/60 transition-all duration-200 text-base appearance-none"
          {...register('budget', { required: 'Выберите бюджет' })}
        >
          <option value="" disabled>Выберите диапазон</option>
          {budgets.map((b) => (
            <option key={b} value={b} className="bg-bg-2">{b}</option>
          ))}
        </select>
        {errors.budget && <p className="text-xs text-red-400 font-grotesk">{errors.budget.message}</p>}
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle size={16} />
          Что-то пошло не так. Попробуйте позже.
        </div>
      )}

      <Button type="submit" variant="primary" size="lg" fullWidth disabled={status === 'loading'}>
        {status === 'loading' ? (
          <>
            <span className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
            Отправляем...
          </>
        ) : (
          <>
            <Send size={16} />
            Записаться на диагностику
          </>
        )}
      </Button>
    </form>
  )
}
