import type { Metadata } from 'next'
import Image from 'next/image'
import PageShell from '@/components/landing/PageShell'
import Breadcrumbs from '@/components/landing/Breadcrumbs'
import CtaBlock from '@/components/landing/CtaBlock'
import { company, founder } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Екатерина Данилкина — основательница агентства Квинт',
  description:
    'Екатерина (Рина) Данилкина — основательница маркетингового агентства «Квинт». В маркетинге с 13 лет, руководила командой из 26 человек в Oxytropin, эксперт и лектор ФТМИ ИТМО, выпускница СПбГУ.',
}

const facts = [
  'В маркетинге с 13 лет: начинала с SMM на фрилансе',
  'В 2021–2022 годах руководила компанией Oxytropin: команда из 26 человек, прибыль выросла в 3,2 раза',
  '25 августа 2024 года основала своё агентство — DANILKINA Agency, с апреля 2026 года «Квинт»',
  'Совладелица мебельного производства «Анталекс»: проверяет маркетинговые решения на собственном бизнесе',
]

const public_ = [
  'Эксперт по маркетингу «Стартап ночи» ФТМИ Университета ИТМО',
  'Лектор программы «Бизнес-Тезис» ФТМИ ИТМО: «Важность эмоционального интеллекта в бизнесе» (2025), «Автоматизация маркетинга» (2026)',
  'Член экспертного совета по отбору бизнес-тезисов (2024) и ГЭК по защитам ВКР (2025) в ИТМО',
  'Гость подкаста «Взгляд маркетолога» — выпуск о маркировке рекламы',
]

export default function FounderPage() {
  return (
    <PageShell>
      <Breadcrumbs items={[{ name: 'О компании', path: '/o-kompanii' }, { name: founder.name, path: founder.slug }]} />
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] gap-fluid-l mb-fluid-l items-start">
        <div className="relative aspect-square w-full max-w-[380px] rounded-xl overflow-hidden border border-black/10">
          <Image src="/team/founder.jpg" alt="Екатерина Данилкина" fill sizes="(min-width: 768px) 380px, 100vw" className="object-cover" priority />
        </div>
        <div>
          <p className="eyebrow mb-3">{founder.role}</p>
          <h1 className="section-title mb-6">{founder.name}</h1>
          <p className="text-text/85 text-lg leading-relaxed mb-6">
            Екатерина (Рина) Данилкина — основательница маркетингового агентства «Квинт». Сильнее всего в стратегии,
            коммуникациях, перезапуске бизнеса и выводе новых продуктов на рынок.
          </p>
          <blockquote className="border-l-2 border-up pl-5 text-text text-xl leading-snug">
            «Беру ограниченное число проектов, потому что стратегию каждого пишу сама и лично проверяю отчёты.»
          </blockquote>
        </div>
      </div>

      <section className="mb-fluid-m max-w-3xl">
        <h2 className="font-bold text-text text-2xl tracking-tight mb-4">Опыт</h2>
        <ul className="flex flex-col gap-3 text-text/90">{facts.map((f) => <li key={f}>{f}</li>)}</ul>
      </section>

      <section className="mb-fluid-m max-w-3xl">
        <h2 className="font-bold text-text text-2xl tracking-tight mb-4">Образование</h2>
        <ul className="flex flex-col gap-3 text-text/90">
          <li>СПбГУ, «Реклама и связи с общественностью», 2026. Тема выпускной работы — инструменты органического привлечения B2B-клиентов рекламного агентства</li>
          <li>Сертификат Яндекс Метрики</li>
        </ul>
      </section>

      <section className="mb-fluid-m max-w-3xl">
        <h2 className="font-bold text-text text-2xl tracking-tight mb-4">Выступления и экспертиза</h2>
        <ul className="flex flex-col gap-3 text-text/90">{public_.map((f) => <li key={f}>{f}</li>)}</ul>
      </section>

      <section className="mb-fluid-l max-w-3xl">
        <h2 className="font-bold text-text text-2xl tracking-tight mb-4">Где читать</h2>
        <a href={company.founderTelegram} target="_blank" rel="noopener noreferrer" className="text-text link-underline">
          Telegram-канал @danilkina_does
        </a>
      </section>

      <CtaBlock title="Разбор с Екатериной — 60 минут, 10 000 ₽" />
    </PageShell>
  )
}
