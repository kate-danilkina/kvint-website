'use client'

import { useState } from 'react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import ContactForm from '@/components/shared/ContactForm'
import StrategyForm from '@/components/shared/StrategyForm'

type Tab = 'project' | 'strategy'

export default function ContactSection() {
  const [tab, setTab] = useState<Tab>('project')

  return (
    <section id="contact" className="py-20 lg:py-28 bg-bg-2/60">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10">
          <p className="eyebrow mb-4">Контакт</p>
          <h2 className="section-title mb-4">
            Начнём{' '}
            <span className="text-outline">работу?</span>
          </h2>
          <p className="text-muted">
            Оставьте заявку — ответим в течение рабочего дня
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          {/* Tab toggle */}
          <div className="flex gap-2 mb-8 p-1 bg-white/5 rounded-xl">
            <button
              id="contact-tab-project"
              onClick={() => setTab('project')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                tab === 'project'
                  ? 'bg-accent text-white shadow-lg'
                  : 'text-muted hover:text-text'
              }`}
            >
              Обсудить проект
            </button>
            <button
              id="strategy"
              onClick={() => setTab('strategy')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                tab === 'strategy'
                  ? 'bg-accent text-white shadow-lg'
                  : 'text-muted hover:text-text'
              }`}
            >
              Диагностика · 10 000 ₽
            </button>
          </div>

          <div className="glass-card p-6 sm:p-8">
            {tab === 'project' ? <ContactForm /> : <StrategyForm />}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
