'use client'

import { useEffect, useState } from 'react'
import ContactForm from '@/components/shared/ContactForm'
import StrategyForm from '@/components/shared/StrategyForm'
import SectionHeading from '@/components/shared/SectionHeading'
import { PHONE, PHONE_HREF, type ContactTab } from '@/lib/utils'

const tabs: { id: ContactTab; label: string }[] = [
  { id: 'strategy', label: 'Разбор · 10 000 ₽' },
  { id: 'project', label: 'Обсудить проект' },
]

export default function ContactSection() {
  const [tab, setTab] = useState<ContactTab>('strategy')

  useEffect(() => {
    // CTA buttons elsewhere on the page switch the tab via openContact()
    const onTab = (e: Event) => setTab((e as CustomEvent<ContactTab>).detail)
    window.addEventListener('kvint:contact-tab', onTab)

    // Arriving from another page via /#contact (/#strategy opens the lead panel instead, see LeadPanel)
    const hash = window.location.hash
    if (hash === '#contact') {
      setTab('project')
      // Wait for Next's own scroll restoration after navigation, then jump to the form
      const t = setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'instant' }), 150)
      return () => {
        clearTimeout(t)
        window.removeEventListener('kvint:contact-tab', onTab)
      }
    }
    return () => window.removeEventListener('kvint:contact-tab', onTab)
  }, [])

  return (
    <section id="contact" className="py-fluid-2xl scroll-mt-16 border-t border-white/[0.06]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-fluid-l">
          <p className="eyebrow mb-4">Ответим за 2 часа в рабочее время</p>
          <SectionHeading className="section-title mb-4">Оставить заявку</SectionHeading>
          <p className="text-muted">
            Выберите формат: разбор за 10 000 ₽ или обсуждение проекта. Можно позвонить:{' '}
            <a href={PHONE_HREF} className="link-underline text-text font-mono whitespace-nowrap">
              {PHONE}
            </a>
          </p>
        </div>

        <div role="tablist" aria-label="Формат заявки" className="flex gap-1 mb-6 p-1 bg-white/5 rounded-xl">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              id={`contact-tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls="contact-panel"
              onClick={() => setTab(t.id)}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors duration-200 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
                tab === t.id ? 'bg-accent text-white' : 'text-muted hover:text-text'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div id="contact-panel" role="tabpanel" aria-labelledby={`contact-tab-${tab}`} className="glass-card p-6 sm:p-8">
          {tab === 'strategy' ? <StrategyForm /> : <ContactForm />}
        </div>
      </div>
    </section>
  )
}
