'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Check, AlertCircle, Send } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { trackGoal } from '@/lib/utils'

interface FormData {
  name: string
  company: string
  contact: string
  message: string
}

export default function ContactForm() {
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
        body: JSON.stringify({ ...data, formType: 'project' }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      trackGoal('form_project')
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
        <p className="text-muted text-sm">Мы свяжемся с вами в течение рабочего дня.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="name"
          label="Имя"
          placeholder="Иван Иванов"
          error={errors.name?.message}
          {...register('name', { required: 'Введите имя' })}
        />
        <Input
          id="company"
          label="Компания"
          placeholder="ООО «Название»"
          error={errors.company?.message}
          {...register('company')}
        />
      </div>
      <Input
        id="contact"
        label="Телефон или Telegram"
        placeholder="+7 (999) 000-00-00 или @username"
        error={errors.contact?.message}
        {...register('contact', { required: 'Введите контакт' })}
      />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-muted font-grotesk">
          Краткое описание задачи
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Расскажите о вашем проекте..."
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-text placeholder:text-muted focus:outline-none focus:border-accent/60 focus:bg-white/[0.07] transition-all duration-200 text-base resize-none"
          {...register('message')}
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle size={16} />
          Что-то пошло не так. Попробуйте позже или напишите нам напрямую.
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
            Отправить заявку
          </>
        )}
      </Button>
    </form>
  )
}
