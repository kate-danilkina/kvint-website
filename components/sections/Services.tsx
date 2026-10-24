import Badge from '@/components/ui/Badge'
import { services } from '@/lib/data/services'

export default function Services() {
  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title mb-3">Что делаем</h2>
        <p className="text-muted max-w-xl mb-10">
          Сначала смотрим, где теряются деньги, потом выбираем каналы. Иногда это Telegram Ads, иногда SEO.
        </p>

        <div className="border-t border-white/10">
          {/* Flagship */}
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-1 md:gap-10 py-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-text text-lg">Система Роста под ключ</span>
              <Badge variant="flagship">Флагман</Badge>
            </div>
            <p className="text-muted md:text-text/80">Аудит, цифровой продавец и трафик в одном проекте</p>
          </div>

          {/* Column heads */}
          <div className="hidden md:grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-10 pt-6 pb-2 eyebrow">
            <span>Направление</span>
            <span>Когда нужно</span>
          </div>

          {services.map((s) => (
            <div
              key={s.id}
              className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-1 md:gap-10 py-4 border-b border-white/[0.07]"
            >
              <span className="text-text font-medium">{s.label}</span>
              <span className="text-muted">{s.when}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
