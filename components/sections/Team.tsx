'use client'

import AnimatedSection, { AnimatedGrid, AnimatedItem } from '@/components/shared/AnimatedSection'
import { Quote } from 'lucide-react'

export default function Team() {
  return (
    <section id="about" className="py-16 md:py-20 bg-bg-2/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <p className="eyebrow mb-4">Команда</p>
          <h2 className="section-title">
            Люди, которые{' '}
            <span className="text-outline">отвечают</span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Founder card */}
          <AnimatedSection>
            <div className="glass-card p-6 sm:p-8 h-full">
              <div className="flex items-start gap-5 mb-6">
                {/* Photo placeholder */}
                <div className="w-20 h-20 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-accent">ЕД</span>
                  {/* REPLACE: add <Image src="/team/founder.jpg" alt="Екатерина Данилкина" fill /> */}
                </div>
                <div>
                  <h3 className="font-bold text-text text-xl mb-1">Екатерина Данилкина</h3>
                  <p className="text-accent text-sm font-grotesk font-medium">CEO & Founder</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-white/3 rounded-xl border border-white/5">
                {[
                  { value: '8+', label: 'лет в маркетинге' },
                  { value: '120+', label: 'проектов' },
                  { value: '100%', label: 'личный контроль' },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-xl font-bold text-accent font-grotesk">{s.value}</div>
                    <div className="text-xs text-muted mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="relative pl-4">
                <Quote size={18} className="absolute -left-1 top-0 text-accent/30" />
                <p className="text-muted text-sm leading-relaxed italic">
                  «Я не строю конвейер. Каждый проект — личная ответственность. Заходим как партнёры, а не подрядчики. Ваш маркетинг важен мне так же, как вам»
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Team grid */}
          <AnimatedSection delay={0.15}>
            <div className="flex flex-col gap-4">
              <p className="text-sm text-muted font-grotesk mb-2">Команда специалистов</p>
              {[
                { initials: 'АС', name: 'Аналитик', role: 'Senior Analyst', spec: 'Сквозная аналитика, дашборды' },
                { initials: 'НК', name: 'Специалист по рекламе', role: 'Performance Lead', spec: 'Яндекс.Директ, VK, таргет' },
                { initials: 'МВ', name: 'SEO-специалист', role: 'SEO Lead', spec: 'Техническое SEO, контент' },
                { initials: 'ТО', name: 'SMM-менеджер', role: 'Content & SMM', spec: 'Стратегия, контент, посевы' },
                { initials: 'МЭ', name: 'Марта Эйнар', role: 'Project Manager', spec: 'Координирует проекты, контролирует сроки и коммуникацию с клиентами' },
                { initials: 'ДК', name: 'Дэниел Краус', role: 'Performance-специалист', spec: 'Настройка и оптимизация платного трафика, Яндекс.Директ, VK Ads' },
              ].map((m) => (
                <div key={m.initials} className="glass-card p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-bg-2 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-muted">{m.initials}</span>
                    {/* REPLACE: real photo */}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-text text-sm">{m.role}</p>
                    <p className="text-xs text-muted truncate">{m.spec}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
