import type { Metadata } from 'next'
import Image from 'next/image'
import PageShell from '@/components/landing/PageShell'
import Breadcrumbs from '@/components/landing/Breadcrumbs'
import CtaBlock from '@/components/landing/CtaBlock'
import { company, founder } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Екатерина Данилкина — основательница агентства Квинт',
  description:
    'Екатерина Данилкина — основательница маркетингового агентства «Квинт», 9 лет в маркетинге. Руководила командой из 26 человек в Oxytropin, спикер и член экспертной комиссии ФТМИ ИТМО, выпускница СПбГУ',
}

const facts = [
  'В 2021–2022 годах руководила командой из 26 человек в Oxytropin. Прибыль компании за это время выросла в 3,2 раза',
  '25 августа 2024 года основала агентство DANILKINA Agency. С апреля 2026 года оно называется «Квинт»',
  'Совладелица мебельного производства «Анталекс». Каждый метод сначала проверяет на агентстве и на производстве, потом предлагает клиентам',
]

// Scans from the founder's Google Drive folder «Дипломы и сертификаты»; sizes are the real image sizes
const documents = [
  { src: '/certificates/spbu-mentor-program-certificate-2025.jpg', caption: 'Сертификат участника менторской программы СПбГУ, 2025' },
  { src: '/certificates/itmo-startup-night-thanks-2026.jpg', caption: 'Эксперт-консультант «Стартап ночи-2026», Университет ИТМО' },
  { src: '/certificates/itmo-marketing-lecture-thanks-2026.jpg', caption: 'Лекция «Автоматизация маркетинга» в программе «Бизнес-Тезис» ИТМО, 2026' },
  { src: '/certificates/itmo-eq-lecture-thanks-2025.jpg', caption: 'Лекция об эмоциональном интеллекте в бизнесе, «Бизнес-Тезис» ИТМО, 2025' },
  { src: '/certificates/itmo-accelerator-team-thanks-2026.jpg', caption: 'Мероприятие по командообразованию в Акселераторе ИТМО, 2026' },
  { src: '/certificates/spbu-falcon-speaker-letter.jpg', caption: 'Спикер конференции ВШМ СПбГУ и Falcon Business Club' },
]

const public_ = [
  'Эксперт по маркетингу «Стартап ночи» ФТМИ Университета ИТМО',
  'Лектор программы «Бизнес-Тезис» ФТМИ ИТМО: «Важность эмоционального интеллекта в бизнесе» (2025), «Автоматизация маркетинга» (2026)',
  'Член экспертного совета по отбору бизнес-тезисов (2024) и ГЭК по защитам ВКР (2025) в ИТМО',
  'Гость подкаста «Взгляд маркетолога» — выпуск о маркировке рекламы',
]

export default function FounderPage() {
  return (
    <PageShell>
      <Breadcrumbs items={[{ name: 'О компании', path: '/o-kompanii' }, { name: founder.name, path: founder.slug }]} />
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] gap-fluid-l mb-fluid-l items-start">
        <div className="relative aspect-square w-full max-w-[380px] rounded-xl overflow-hidden border border-black/10">
          <Image src="/team/founder.jpg" alt="Екатерина Данилкина, основательница агентства Квинт" fill sizes="(min-width: 768px) 380px, 100vw" className="object-cover" priority />
        </div>
        <div>
          <p className="eyebrow mb-3">{founder.role}</p>
          <h1 className="section-title mb-6">{founder.name}</h1>
          <p className="text-text/85 text-lg leading-relaxed mb-6">
            Екатерина Данилкина — основательница маркетингового агентства «Квинт», 9 лет в маркетинге.
            Разбирает бизнес как систему: продукт, сервис, команду, продажи и деньги. Особенно сильна в стратегии,
            перезапуске бизнеса и выводе новых продуктов на рынок
          </p>
        </div>
      </div>

      <section className="mb-fluid-m max-w-3xl">
        <h2 className="font-bold text-text text-2xl tracking-tight mb-4">Опыт</h2>
        <ul className="flex flex-col gap-3 text-text/90">{facts.map((f) => <li key={f}>{f}</li>)}</ul>
      </section>

      <section className="mb-fluid-m max-w-3xl">
        <h2 className="font-bold text-text text-2xl tracking-tight mb-4">Образование</h2>
        <ul className="flex flex-col gap-3 text-text/90">
          <li>СПбГУ, Высшая школа журналистики и массовых коммуникаций, «Реклама и связи с общественностью», 2026. Тема выпускной работы — инструменты органического привлечения B2B-клиентов рекламного агентства</li>
          <li>Менторская программа СПбГУ, 2025</li>
          <li>Сертификат Яндекс Метрики</li>
        </ul>
      </section>

      <section className="mb-fluid-m max-w-3xl">
        <h2 className="font-bold text-text text-2xl tracking-tight mb-4">Выступления и экспертиза</h2>
        <ul className="flex flex-col gap-3 text-text/90">{public_.map((f) => <li key={f}>{f}</li>)}</ul>
      </section>

      <section className="mb-fluid-m">
        <h2 className="font-bold text-text text-2xl tracking-tight mb-4">Сертификаты и благодарности</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {documents.map((d) => (
            <li key={d.src}>
              <a href={d.src} target="_blank" rel="noopener noreferrer" className="group block">
                <span className="relative block aspect-[4/5] rounded-lg overflow-hidden border border-black/10 bg-white">
                  <Image
                    src={d.src}
                    alt={d.caption}
                    fill
                    sizes="(min-width: 768px) 300px, 45vw"
                    className="object-contain p-2 transition-transform duration-200 group-hover:scale-[1.02]"
                  />
                </span>
                <span className="block text-sm text-muted mt-2 leading-snug">{d.caption}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-fluid-l max-w-3xl">
        <h2 className="font-bold text-text text-2xl tracking-tight mb-4">Где читать</h2>
        <a href={company.founderTelegram} target="_blank" rel="noopener noreferrer" className="text-text link-underline">
          Telegram-канал @danilkina_does
        </a>
      </section>

      <CtaBlock title="Запишитесь на разбор с Екатериной" />
    </PageShell>
  )
}
