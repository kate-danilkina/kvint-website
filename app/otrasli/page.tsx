import type { Metadata } from 'next'
import HubView from '@/components/landing/HubView'
import { industries } from '@/lib/data/landings'

export const metadata: Metadata = {
  title: 'Маркетинг для производства, IT и B2B — отрасли',
  description:
    'Маркетинг для производственных компаний, мебельного производства, IT и SaaS. Кейсы с цифрами: нажатия «Позвонить» на Картах 0 → 185, конверсия сайта 0,36% → 2,17%',
}

export default function IndustriesHub() {
  return (
    <HubView
      title="Маркетинг для производства и IT-компаний"
      crumb="Отрасли"
      path="/otrasli"
      lead="Работаем там, где ошибка в рекламе стоит дорого: сложный продукт, мало заявок, долгая сделка. Отраслевую страницу делаем, только когда есть кейс с цифрами"
      items={industries}
      outro="Другая отрасль? Приходите на разбор. За 60 минут поймём, можем ли окупить ваши вложения. Если нет, скажем прямо"
    />
  )
}
