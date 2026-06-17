'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Check, AlertCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { trackGoal } from '@/lib/utils'

interface Props {
  isOpen: boolean
  onClose: () => void
}

type ContactType = 'email' | 'telegram'

interface FormData {
  contact: string
}

export default function LeadMagnetPopup({ isOpen, onClose }: Props) {
  const [contactType, setContactType] = useState<ContactType>('email')
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
      const res = await fetch('/api/send-presentation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: data.contact, type: contactType }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      trackGoal('lead_magnet_sent')
      reset()
    } catch {
      setStatus('error')
    }
  }

  const handleClose = () => {
    setStatus('idle')
    reset()
    onClose()
  }

  const validate = (value: string) => {
    if (contactType === 'email') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Введите корректный email'
    }
    return /^@[\w]{3,}$/.test(value) || 'Введите telegram @username'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            className="fixed z-[101] inset-x-4 bottom-0 pb-safe sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md"
          >
            <div className="glass-card p-6 sm:p-8 pb-24 sm:pb-8 relative">
              {/* Close */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-muted hover:text-text transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Закрыть"
              >
                <X size={20} />
              </button>

              {status === 'success' ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <Check size={28} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-text mb-2">Отправлено!</h3>
                  <p className="text-muted text-sm">
                    {contactType === 'email'
                      ? 'Презентация отправлена на ваш email. Проверьте входящие (и папку спам).'
                      : 'Напишите нам в Telegram — пришлём презентацию сразу.'}
                  </p>
                  <Button variant="primary" className="mt-6" onClick={handleClose}>
                    Отлично!
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl sm:text-2xl font-bold text-text mb-2">
                    Посмотрите, как мы работаем
                  </h3>
                  <p className="text-muted text-sm mb-6">
                    Пришлём презентацию агентства — сразу на почту или в Telegram
                  </p>

                  {/* Type toggle */}
                  <div className="flex gap-2 mb-5 p-1 bg-white/5 rounded-xl">
                    {(['email', 'telegram'] as ContactType[]).map((t) => (
                      <button
                        key={t}
                        onClick={() => setContactType(t)}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                          contactType === t
                            ? 'bg-accent text-white shadow-lg'
                            : 'text-muted hover:text-text'
                        }`}
                      >
                        {t === 'email' ? 'Email' : 'Telegram'}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <Input
                      id="lead-contact"
                      placeholder={contactType === 'email' ? 'your@email.com' : '@username'}
                      type={contactType === 'email' ? 'email' : 'text'}
                      error={errors.contact?.message}
                      {...register('contact', { required: 'Обязательное поле', validate })}
                    />

                    {status === 'error' && (
                      <div className="flex items-center gap-2 text-red-400 text-sm">
                        <AlertCircle size={16} />
                        Что-то пошло не так. Попробуйте ещё раз.
                      </div>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? (
                        <>
                          <span className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
                          Отправляем...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Получить
                        </>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
