'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import Button from '@/components/ui/Button'
import LeadMagnetPopup from '@/components/shared/LeadMagnetPopup'
import { trackGoal } from '@/lib/utils'

const diagnosticItems = [
  'Разбор текущих ошибок в рекламе, сайте и воронке продаж',
  'Просчёт реальной стоимости лида и окупаемости вложений',
  'Пошаговый план выхода из просадки или масштабирования',
  '3–5 точек роста, которые можно внедрить прямо сейчас',
  'Честный вердикт: окупаем 3–5× — берёмся. Нет — скажем прямо',
]

export default function MainCTA() {
  const [popupOpen, setPopupOpen] = useState(false)

  return (
    <>
      <section className="py-20 lg:py-28 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/8 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-accent/5 blur-[80px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <p className="eyebrow mb-5">Следующий шаг</p>
            <h2 className="section-title mb-4" style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}>
              Готовы выстроить систему,{' '}
              <span className="text-outline">которая приносит</span>{' '}
              деньги?
            </h2>
          </AnimatedSection>

          {/* Diagnostic card */}
          <AnimatedSection delay={0.1} className="mb-10">
            <div
              className="glass-card relative overflow-hidden"
              style={{ borderColor: 'rgba(26,110,255,0.2)' }}
            >
              {/* Blue left stripe */}
              <div className="absolute top-0 left-0 w-1 h-full bg-accent" />

              <div className="p-6 sm:p-8 pl-8 sm:pl-10">
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                  <div>
                    <p className="eyebrow mb-2">60-минутная стратегия от фаундера</p>
                    <h3 className="text-xl sm:text-2xl font-bold text-text">
                      Диагностика за{' '}
                      <span className="text-accent">10 000 ₽</span>
                    </h3>
                  </div>
                  <div className="flex-shrink-0 text-right sm:text-right">
                    <span className="text-xs text-muted/60 font-grotesk block">Стоимость</span>
                    <span className="text-3xl font-bold text-accent font-grotesk">10 000 ₽</span>
                  </div>
                </div>

                {/* Subtitle */}
                <p className="text-muted text-sm sm:text-base mb-6 max-w-xl">
                  Эти деньги окупятся в первые 10 минут созвона —{' '}
                  когда вы увидите, где прямо сейчас теряете бюджет
                </p>

                {/* What's included */}
                <ul className="flex flex-col gap-3 mb-8">
                  {diagnosticItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={11} className="text-accent" />
                      </div>
                      <span className="text-sm text-muted leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={() => {
                      document.getElementById('strategy')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    Записаться на диагностику
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Обсудить проект
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.25} className="text-center">
            <button
              onClick={() => {
                setPopupOpen(true)
                trackGoal('lead_magnet_open')
              }}
              className="text-sm text-muted hover:text-accent transition-colors underline underline-offset-4"
            >
              Или просто получи презентацию на почту
            </button>
          </AnimatedSection>
        </div>
      </section>

      <LeadMagnetPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  )
}
