import type { Metadata } from 'next'
import HubView from '@/components/landing/HubView'
import { services } from '@/lib/data/landings'

export const metadata: Metadata = {
  title: 'Услуги маркетингового агентства для B2B',
  description:
    'Маркетинговый аудит, стратегия, сопровождение под ключ, Яндекс Директ, Яндекс Карты и 2ГИС, SEO и видимость в нейросетях. Разбор с основательницей — 10 000 ₽, сопровождение — от 150 000 ₽ в месяц.',
}

export default function ServicesHub() {
  return (
    <HubView
      title="Услуги"
      path="/uslugi"
      lead="Начинаем с разбора за 10 000 ₽: показываем, где теряются деньги, и только потом выбираем каналы. Сопровождение под ключ — от 150 000 ₽ в месяц."
      items={services}
    />
  )
}
