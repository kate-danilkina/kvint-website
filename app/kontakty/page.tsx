import type { Metadata } from 'next'
import PageShell from '@/components/landing/PageShell'
import Breadcrumbs from '@/components/landing/Breadcrumbs'
import { DiagnosticButton } from '@/components/landing/CtaBlock'
import { company } from '@/lib/seo'
import { PHONE_HREF } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Контакты агентства Квинт',
  description: `Телефон ${company.phone}, почта ${company.email}, Telegram @kvint_agency. Работаем онлайн по всей России. ${company.legalName}, ИНН ${company.inn}.`,
}

export default function ContactsPage() {
  const rows = [
    { label: 'Телефон', value: company.phone, href: PHONE_HREF },
    { label: 'Почта', value: company.email, href: `mailto:${company.email}` },
    { label: 'Telegram', value: '@kvint_agency', href: company.telegram },
    { label: 'WhatsApp', value: company.phone, href: 'https://wa.me/79930798655' },
    { label: 'Часы работы', value: 'Пн–сб, 9:00–20:00' },
    { label: 'География', value: 'Работаем онлайн с клиентами по всей России' },
  ]
  return (
    <PageShell narrow>
      <Breadcrumbs items={[{ name: 'Контакты', path: '/kontakty' }]} />
      <h1 className="section-title mb-6">Контакты</h1>
      <p className="text-text/85 text-lg leading-relaxed mb-fluid-l">
        Быстрее всего отвечаем в Telegram. Чтобы записаться на разбор, оставьте заявку, и мы свяжемся с вами
      </p>
      <dl className="border-t border-black/10 mb-fluid-l">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[140px_1fr] gap-4 py-4 border-b border-black/10">
            <dt className="text-muted text-sm font-mono">{r.label}</dt>
            <dd className="text-text">
              {r.href ? (
                <a href={r.href} className="link-underline" {...(r.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  {r.value}
                </a>
              ) : (
                r.value
              )}
            </dd>
          </div>
        ))}
      </dl>
      <h2 className="font-bold text-text text-2xl tracking-tight mb-4">Реквизиты</h2>
      <dl className="border-t border-black/10 mb-fluid-l font-mono text-sm">
        {[
          ['Исполнитель', company.legalName],
          ['ИНН', company.inn],
          ['ОГРНИП', company.ogrnip],
        ].map(([l, v]) => (
          <div key={l} className="grid grid-cols-[140px_1fr] gap-4 py-3 border-b border-black/10">
            <dt className="text-muted">{l}</dt>
            <dd className="text-text">{v}</dd>
          </div>
        ))}
      </dl>
      <DiagnosticButton />
    </PageShell>
  )
}
