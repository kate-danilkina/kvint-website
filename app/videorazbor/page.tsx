import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import PageShell from '@/components/landing/PageShell'
import Breadcrumbs from '@/components/landing/Breadcrumbs'
import { FreeVideoButton } from '@/components/landing/CtaBlock'

export const metadata: Metadata = {
  title: 'Бесплатный видеоразбор рекламы для B2B за 48 часов',
  description:
    'Пришлите ссылку на сайт, и за 48 часов Екатерина Данилкина запишет видео 10–15 минут: где теряются заявки и деньги и что исправить первым. Без обязательств',
  alternates: { canonical: '/videorazbor' },
}

export default function VideorazborPage() {
  return (
    <PageShell>
      <Breadcrumbs items={[{ name: 'Видеоразбор', path: '/videorazbor' }]} />
      <h1 className="section-title mb-6">Бесплатный видеоразбор рекламы за 48 часов</h1>
      <p className="text-text/85 text-lg sm:text-xl leading-relaxed max-w-3xl mb-8">
        Пришлите ссылку на сайт и, если хотите, доступ к рекламному кабинету. За 48 часов основательница агентства
        Екатерина Данилкина запишет видео 10–15 минут с экрана: где теряются заявки и деньги и что исправить в первую
        очередь. Без обязательств
      </p>
      <FreeVideoButton className="mb-2" />
      <p className="text-xs text-muted font-mono mb-fluid-l">
        Ответ на заявку в течение 15 минут в рабочее время: пн–сб, 9:00–20:00
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-fluid-l mb-fluid-l">
        <section>
          <h2 className="font-bold text-text text-2xl tracking-tight mb-4">Что вы получите</h2>
          <ul className="flex flex-col gap-3">
            {[
              'Видео 10–15 минут с экрана по вашей рекламе и сайту',
              'Где именно теряются заявки и деньги',
              'Что исправить в первую очередь',
            ].map((t) => (
              <li key={t} className="flex gap-3 text-text/90">
                <Check size={16} className="text-up mt-1 flex-shrink-0" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-bold text-text text-2xl tracking-tight mb-4">Как это работает</h2>
          <ol className="flex flex-col gap-3">
            {[
              'Присылаете ссылку на сайт и, по желанию, доступ к рекламному кабинету',
              'За 48 часов Екатерина записывает видео 10–15 минут',
              'Решаете сами, нужна ли вам помощь',
            ].map((t, i) => (
              <li key={t} className="flex gap-3 text-text/90">
                <span className="font-mono text-muted w-5 flex-shrink-0">{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section className="mb-fluid-l max-w-3xl">
        <h2 className="font-bold text-text text-2xl tracking-tight mb-4">Чем отличается от платного разбора</h2>
        <p className="text-muted leading-relaxed mb-6">
          Видеоразбор ничего не стоит и ни к чему не обязывает. Платный разбор идёт 60 минут живой встречи: цифры
          разбираем вместе, в конце остаются план и честный вердикт.
        </p>
        <dl className="border-t border-black/10 mb-6">
          <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 py-4 border-b border-black/10 font-mono text-xs text-muted uppercase tracking-wide">
            <dt />
            <dd>Видеоразбор</dd>
            <dd>Платный разбор</dd>
          </div>
          {[
            ['Формат', 'видео с экрана', 'созвон 60 минут'],
            ['Стоимость', 'бесплатно', '10 000 ₽'],
            ['Что остаётся', 'видео и первые шаги', 'план и вердикт'],
          ].map(([l, free, paid]) => (
            <div key={l} className="grid grid-cols-[1fr_1fr_1fr] gap-4 py-4 border-b border-black/10">
              <dt className="text-muted">{l}</dt>
              <dd className="text-text">{free}</dd>
              <dd className="text-muted">{paid}</dd>
            </div>
          ))}
        </dl>
        <p className="text-muted leading-relaxed">
          Нужен разбор вживую? Смотрите <Link href="/razbor" className="link-underline text-text">разбор с основательницей</Link>
        </p>
      </section>

      <section className="rounded-2xl bg-bg-2 p-6 sm:p-10">
        <h2 className="font-bold text-text text-2xl tracking-tight mb-6">Получите видеоразбор</h2>
        <FreeVideoButton />
        <p className="text-xs text-muted font-mono mt-4">Без обязательств</p>
      </section>
    </PageShell>
  )
}
