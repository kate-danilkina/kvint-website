import type { Metadata } from 'next'
import HubView from '@/components/landing/HubView'
import { services } from '@/lib/data/landings'

export const metadata: Metadata = {
  title: 'Услуги маркетингового агентства для B2B',
  description:
    'Аудит от 5 000 ₽, стратегия от 40 000 ₽, Яндекс Директ, Карты и 2ГИС, SEO и нейросети, сопровождение «Система Роста». Показываем путь каждого рубля от клика до денег в CRM.',
}

const guide = [
  { situation: 'Реклама идёт, а окупается ли она, непонятно', href: '/uslugi/marketingovyj-audit', label: 'Маркетинговый аудит' },
  { situation: 'Не знаете, кто ваш покупатель и где его искать', href: '/uslugi/marketingovaya-strategiya', label: 'Маркетинговая стратегия' },
  { situation: 'Подрядчиков несколько, а за заявки не отвечает никто', href: '/uslugi/soprovozhdenie', label: 'Сопровождение «Система Роста»' },
  { situation: 'Нужны заявки из поиска Яндекса', href: '/uslugi/yandex-direct', label: 'Яндекс Директ' },
  { situation: 'Клиенты ищут вас по городу и приезжают на адрес', href: '/uslugi/prodvizhenie-na-kartah', label: 'Яндекс Карты и 2ГИС' },
  { situation: 'Хотите заявки без оплаты за клик и место в ответах нейросетей', href: '/uslugi/seo-i-geo', label: 'SEO и нейросети' },
]

export default function ServicesHub() {
  return (
    <HubView
      title="Услуги маркетингового агентства для B2B"
      crumb="Услуги"
      path="/uslugi"
      lead="Разбираем B2B-бизнес как систему: реклама, сайт, продажи, деньги. Услугу выбираем по цифрам, а не по прайсу. Начинаем с разбора с основательницей: за 60 минут видно, где теряются деньги и с чего начать."
      items={services}
      guide={guide}
      outro="Не нашли свою ситуацию? Расскажите о ней на разборе. Не видим, как окупить вложения в 3–5 раз — не берём проект и говорим об этом прямо."
    />
  )
}
