'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Check, AlertCircle, Send, ArrowRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { trackGoal } from '@/lib/utils'

interface FormData {
  name: string
  contact: string
  message: string
}

const STEPS = 3

const stepVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
}

export default function ContactForm() {
  const [step, setStep] = useState(1)
  const [dir, setDir] = useState(1)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const goNext = async () => {
    const fields: (keyof FormData)[] = step === 1 ? ['name', 'contact'] : ['message']
    const valid = await trigger(fields)
    if (!valid) return
    setDir(1)
    setStep((s) => s + 1)
  }

  const goBack = () => {
    setDir(-1)
    setStep((s) => s - 1)
  }

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
        <p className="text-muted text-sm">
          Спасибо — вернёмся в течение 2 часов.{' '}
          Пока можно посмотреть наши{' '}
          <Link href="/cases" className="text-accent hover:underline inline-flex items-center gap-0.5">
            кейсы <ArrowRight size={12} />
          </Link>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* Progress bar */}
      <div className="flex gap-1.5 mb-1">
        {Array.from({ length: STEPS }).map((_, i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{ background: i < step ? '#1A6EFF' : 'rgba(255,255,255,0.1)' }}
          />
        ))}
      </div>
      <p className="text-xs text-muted font-grotesk">Шаг {step} из {STEPS}</p>

      {/* Step content */}
      <div className="overflow-hidden relative min-h-[160px]">
        <AnimatePresence mode="wait" custom={dir}>
          {step === 1 && (
            <motion.div
              key="step1"
              custom={dir}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="flex flex-col gap-4"
            >
              <Input
                id="name"
                label="Как вас зовут?"
                placeholder="Имя или название компании"
                error={errors.name?.message}
                {...register('name', {
                  required: 'Введите имя',
                  minLength: { value: 2, message: 'Минимум 2 символа' },
                  pattern: { value: /^[а-яёА-ЯЁa-zA-Z\s-]+$/, message: 'Только буквы' },
                })}
              />
              <Input
                id="contact"
                label="Как с вами связаться?"
                placeholder="+7 (999) 000-00-00 или @username"
                error={errors.contact?.message}
                {...register('contact', {
                  required: 'Введите контакт',
                  pattern: {
                    value: /^(\+?[0-9\s\-()]{10,15}|@[\w]{3,})$/,
                    message: 'Введите телефон или @username',
                  },
                })}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              custom={dir}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-medium text-muted font-grotesk">
                  Расскажите о задаче
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Что хотите улучшить? Какая сейчас ситуация? Любой формат..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-text placeholder:text-muted focus:outline-none focus:border-accent/60 focus:bg-white/[0.07] transition-all duration-200 text-base resize-none"
                  {...register('message')}
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              custom={dir}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="flex flex-col gap-3"
            >
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8 space-y-2">
                <p className="text-xs text-muted font-grotesk uppercase tracking-wider mb-3">Ваша заявка</p>
                <div className="flex gap-2 text-sm">
                  <span className="text-muted w-20 flex-shrink-0">Контакт:</span>
                  <span className="text-text font-medium" />
                </div>
              </div>
              <p className="text-sm text-muted leading-relaxed">
                Всё готово! Нажмите кнопку ниже — мы ответим в течение 2 часов в рабочее время.
              </p>
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle size={16} />
                  Что-то пошло не так. Попробуйте позже.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-3">
        {step > 1 && (
          <button
            type="button"
            onClick={goBack}
            className="flex items-center gap-1.5 px-4 py-3 rounded-xl border border-white/15 text-muted hover:text-text hover:border-white/30 transition-all duration-200 text-sm font-medium"
          >
            <ArrowLeft size={15} />
            Назад
          </button>
        )}

        {step < STEPS ? (
          <button
            type="button"
            onClick={goNext}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold text-base hover:shadow-[0_0_24px_rgba(26,110,255,0.4)] transition-all duration-200"
          >
            Далее
            <ArrowRight size={16} />
          </button>
        ) : (
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
        )}
      </div>
    </form>
  )
}
