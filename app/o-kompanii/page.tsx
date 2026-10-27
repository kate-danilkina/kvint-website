import type { Metadata } from 'next'
import Link from 'next/link'
import PageShell from '@/components/landing/PageShell'
import Breadcrumbs from '@/components/landing/Breadcrumbs'
import CtaBlock from '@/components/landing/CtaBlock'
import { company, founder } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'О компании — маркетинговое агентство Квинт',
  description:
    'Квинт — бутиковое маркетинговое агентство для B2B: IT, производство, премиум-ритейл, недвижимость. Основано 25 августа 2024 года как DANILKINA Agency, с апреля 2026 года — Квинт. 125 проектов.',
}

export default function AboutPage() {
  return (
    <PageShell narrow>
      <Breadcrumbs items={[{ name: 'О компании', path: '/o-kompanii' }]} />
      <h1 className="section-title mb-6">О компании</h1>
      <p className="text-text/85 text-lg leading-relaxed mb-fluid-l">
        Квинт — бутиковое маркетинговое агентство для B2B-компаний из IT, производства, премиум-ритейла и недвижимости.
        Основала агентство Екатерина Данилкина 25 августа 2024 года. На счету команды — {company.projects} проектов.
      </p>

      <dl className="grid grid-cols-2 border-y border-white/10 mb-fluid-l font-mono">
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
          Екатерина ушла из найма в агентстве и 25 августа 2024 года открыла своё — DANILKINA Agency. В {company.renamedAt}{' '}
          года агентство стало называться «Квинт»: от слова «квинтэссенция» — навыков, знаний и подходов, которые команда
          собрала в одном месте.
        </p>
        <p className="text-muted leading-relaxed">
          Сейчас агентство работает как {company.legalName} (ИНН {company.inn}, ОГРНИП {company.ogrnip}).
        </p>
      </section>

      <section className="mb-fluid-m">
        <h2 className="font-bold text-text text-2xl tracking-tight mb-4">Принципы</h2>
        <ul className="flex flex-col gap-3 text-text/90">
          <li>Цель — чтобы бизнес клиента приносил деньги и ему, и нам как партнёрам. Навязывать услуги не будем.</li>
          <li>Берёмся, если видим, как окупить вложения в 3–5 раз. Если не видим — так и говорим на разборе.</li>
          <li>Стратегию каждого проекта пишет Екатерина и лично проверяет отчёты.</li>
          <li>Отчёт каждую неделю, дашборд с цифрами обновляется круглосуточно.</li>
        </ul>
      </section>

      <section className="mb-fluid-l">
        <h2 className="font-bold text-text text-2xl tracking-tight mb-4">Команда</h2>
        <p className="text-muted leading-relaxed">
          Проекты ведут специалисты уровня Middle и Senior по рекламе, аналитике, SEO и контенту. Стратегию пишет{' '}
          <Link href={founder.slug} className="text-text link-underline">{founder.name}</Link>.
        </p>
      </section>

      <CtaBlock />
    </PageShell>
  )
}
