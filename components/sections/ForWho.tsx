'use client'

import { Code2, ShoppingBag, Factory, Building2 } from 'lucide-react'
import AnimatedSection, { AnimatedGrid, AnimatedItem } from '@/components/shared/AnimatedSection'
import { audiences } from '@/lib/data/services'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Code2,
  ShoppingBag,
  Factory,
  Building2,
}

export default function ForWho() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <p className="eyebrow mb-4">Для кого</p>
          <h2 className="section-title">
            Работаем там, где высока{' '}
            <span className="text-outline">цена ошибки</span>
          </h2>
        </AnimatedSection>

        <AnimatedGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {audiences.map((a) => {
            const Icon = iconMap[a.icon]
            return (
              <AnimatedItem key={a.id}>
                <div className="glass-card glass-card-hover p-6 h-full flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                    <Icon size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text mb-1">{a.title}</h3>
                    <p className="text-sm text-muted">{a.description}</p>
                  </div>
                </div>
              </AnimatedItem>
            )
          })}
        </AnimatedGrid>

      </div>
    </section>
  )
}
