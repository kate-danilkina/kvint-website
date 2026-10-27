import type { Metadata } from 'next'
import Link from 'next/link'
import PageShell from '@/components/landing/PageShell'
import Breadcrumbs from '@/components/landing/Breadcrumbs'
import CtaBlock from '@/components/landing/CtaBlock'
import { company, founder } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'О компании — маркетинговое агентство Квинт',
  description:
    'Квинт — маркетинговое агентство для B2B: IT, производство, премиум-ритейл, недвижимость. Разбираем бизнес целиком и считаем окупаемость до старта. Основано 25 августа 2024 года как DANILKINA Agency, с апреля 2026 года — «Квинт». 125 проектов.',
}

export default function AboutPage() {
  return (
    <PageShell narrow>
      <Breadcrumbs items={[{ name: 'О компании', path: '/o-kompanii' }]} />
      <h1 className="section-title mb-6">О компании</h1>
      <p className="text-text/85 text-lg leading-relaxed mb-fluid-l">
        Квинт — маркетинговое агентство для B2B-компаний из IT, производства, премиум-ритейла и недвижимости.
        Маркетинг для нас — разбор всего бизнеса: продукта, сервиса, команды, продаж и денег. Если где-то дыра,
        реклама её не закроет. Агентство основала Екатерина Данилкина 25 августа 2024 года. В портфеле{' '}
        {company.projects} проектов.
      </p>

      <dl className="grid grid-cols-2 border-y border-black/10 mb-fluid-l font-mono">
        {[
          ['Основано', '25 августа 2024'],
          ['Проектов', String(company.projects)],
          ['Ниши', 'IT B2B, производство, ритейл, недвижимость'],
          ['География', 'вся Россия, онлайн'],
        ].map(([l, v]) => (
          <div key={l} className="py-5 pr-4">
            <dt className="text-xs text-muted uppercase tracking-wide">{l}</dt>
            <dd className="text-text mt-1">{v}</dd>
          </div>
        ))}
      </dl>

      <section className="mb-fluid-m">
        <h2 className="font-bold text-text text-2xl tracking-tight mb-4">История</h2>
        <p className="text-muted leading-relaxed mb-3">
          25 августа 2024 года Екатерина Данилкина открыла агентство DANILKINA Agency. Строила его без денег и связей:
          руками, ошибками и системным подходом. В {company.renamedAt} года агентство сменило название на «Квинт».
        </p>
        <p className="text-muted leading-relaxed">
          Юридически агентство работает как {company.legalName} (ИНН {company.inn}, ОГРНИП {company.ogrnip}).
        </p>
      </section>

      <section className="mb-fluid-m">
        <h2 className="font-bold text-text text-2xl tracking-tight mb-4">Принципы</h2>
        <ul className="flex flex-col gap-3 text-text/90">
          <li>Считаем окупаемость до старта. Не видим, как окупить вложения в 3–5 раз, — не берём проект.</li>
          <li>Узнаём правду о цифрах, даже если она вам не понравится. Делаем как надо, а не как просят.</li>
          <li>Никаких экспериментов на ваши деньги: бюджет идёт только туда, где реклама уже окупилась.</li>
          <li>Никаких PDF-отписок. Дашборд открыт круглосуточно, отчёт приходит каждую неделю. Вы видите ситуацию, а не интерпретацию.</li>
          <li>Доступы к кабинетам, данные и контакты клиентов остаются у вас.</li>
          <li>Услуги не навязываем. Наша цель: бизнес клиента приносит деньги ему и нам как партнёрам.</li>
        </ul>
      </section>

      <section className="mb-fluid-l">
        <h2 className="font-bold text-text text-2xl tracking-tight mb-4">Команда</h2>
        <p className="text-muted leading-relaxed">
          Проекты ведут специалисты среднего и старшего уровня (middle и senior) по рекламе, аналитике, SEO и контенту.
          Никаких стажёров. Проектов берём ограниченное число, чтобы на каждый хватало внимания. Стратегию пишет и отчёты
          проверяет <Link href={founder.slug} className="text-text link-underline">{founder.name}</Link>.
        </p>
      </section>

      <CtaBlock />
    </PageShell>
  )
}
