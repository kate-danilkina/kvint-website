'use client'

import { TrendingUp, Search, Globe, BarChart3, MessageSquare, Target, Layers, Users, Zap, Star } from 'lucide-react'
import AnimatedSection, { AnimatedGrid, AnimatedItem } from '@/components/shared/AnimatedSection'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

const iconMap: Record<string, React.ElementType> = {
  TrendingUp, Search, Globe, BarChart3, MessageSquare, Target, Layers, Users, Star,
}

const services = [
  { id: 'performance', label: 'Performance-маркетинг', icon: 'TrendingUp' },
  { id: 'seo', label: 'SEO', icon: 'Search' },
  { id: 'web', label: 'Разработка сайтов', icon: 'Globe' },
  { id: 'analytics', label: 'Сквозная аналитика', icon: 'BarChart3' },
  { id: 'smm', label: 'SMM', icon: 'MessageSquare' },
  { id: 'strategy', label: 'Стратегия и аудит', icon: 'Target' },
  { id: 'brandformance', label: 'Brandformance', icon: 'Layers' },
  { id: 'influence', label: 'Инфлюенс-маркетинг', icon: 'Users' },
  { id: 'personal-brand', label: 'Управление личным брендом', icon: 'Star' },
]

export default function Services() {
  return (
    <section className="py-20 lg:py-28 bg-bg-2/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <p className="eyebrow mb-4">Что делаем</p>
          <h2 className="section-title mb-4">
            Полный спектр{' '}
            <span className="text-outline">инструментов</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Выбираем инструменты под задачу, а не под прайс. Всё в связке — не по отдельности.
          </p>
        </AnimatedSection>

        {/* Flagship product */}
        <AnimatedSection className="mb-8">
          <div
            className="glass-card p-6 sm:p-8 border-accent/20 relative overflow-hidden"
            style={{ borderColor: 'rgba(26,110,255,0.2)' }}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-accent rounded-l-2xl" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pl-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0">
                  <Zap size={22} className="text-accent" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-text text-lg">Система Роста под ключ</h3>
                    <Badge variant="flagship">Флагман</Badge>
                  </div>
                  <p className="text-muted text-sm">Аудит + Цифровой продавец + Трафик</p>
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="flex-shrink-0"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Узнать подробнее
              </Button>
            </div>
          </div>
        </AnimatedSection>

        {/* Services grid */}
        <AnimatedGrid className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
          {services.map((s) => {
            const Icon = iconMap[s.icon]
            return (
              <AnimatedItem key={s.id}>
                <div className="glass-card glass-card-hover p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-accent" />
                  </div>
                  <span className="text-sm font-medium text-text">{s.label}</span>
                </div>
              </AnimatedItem>
            )
          })}
        </AnimatedGrid>

        <AnimatedSection className="text-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Обсудить задачу
          </Button>
        </AnimatedSection>
      </div>
    </section>
  )
}
