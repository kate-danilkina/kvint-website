import type { Metadata } from 'next'
import HubView from '@/components/landing/HubView'
import { industries } from '@/lib/data/landings'

export const metadata: Metadata = {
  title: 'Маркетинг для производства, IT и B2B — отрасли',
  description:
    'Маркетинг для производственных компаний, мебельного производства, IT и SaaS. Отраслевые страницы с кейсами и цифрами: звонки с Карт 0 → 151, конверсия сайта 0,36% → 2,17%.',
}

export default function IndustriesHub() {
  return (
    <HubView
      title="Отрасли"
      path="/otrasli"
      lead="Работаем там, где ошибка стоит дорого: сложный продукт, мало заявок, длинная сделка. Отраслевую страницу делаем, только когда есть кейс с цифрами."
      items={industries}
    />
  )
}
