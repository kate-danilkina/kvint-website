'use client'

import { useState } from 'react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import ContactForm from '@/components/shared/ContactForm'
import StrategyForm from '@/components/shared/StrategyForm'

type Tab = 'project' | 'strategy'

export default function ContactSection() {
  const [tab, setTab] = useState<Tab>('project')

  return (
    <section id="contact" className="py-20 bg-bg-2/60">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10">
          <p className="eyebrow mb-4">Первый шаг</p>
          <h2 className="section-title mb-4">Начнём работу?</h2>
          <p className="text-muted">
            Оставьте заявку — вернемся в течение 2 часов
          </p>
          <a
            href="tel:+79930798655"
            className="inline-block mt-4 text-lg font-semibold text-text hover:text-accent transition-colors duration-200"
          >
            +7 993 079 86 55
          </a>
          {/* Social proof */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="flex -space-x-2">
              {['АМ', 'КС', 'ДВ'].map((initials) => (
                <div
                  key={initials}
                  className="w-8 h-8 rounded-full border-2 border-bg-2 flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #1A6EFF, #0044CC)' }}
                >
                  {initials}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted">
              <span className="text-text font-semibold">124 проекта</span> · ответ за 2 часа · с 2016 года
            </p>
          </div>
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
