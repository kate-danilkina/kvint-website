import { PHONE, TELEGRAM_URL } from '@/lib/utils'

export const SITE_URL = 'https://kvint.agency'

// One source of truth for facts about the company: schema.org, pages and footer read from here,
// so search engines and AI answers never see conflicting versions
export const company = {
  name: 'Квинт',
  alternateNames: ['Kvint', 'Агентство Квинт', 'DANILKINA Agency'],
  legalName: 'ИП Данилкина Екатерина Денисовна',
  inn: '631607801908',
  ogrnip: '326632700136276',
  foundingDate: '2024-08-25',
  renamedAt: 'апрель 2026',
  email: 'hello@kvint.agency',
  phone: PHONE,
  telegram: TELEGRAM_URL,
  founderTelegram: 'https://t.me/danilkina_does',
  projects: 125,
}

export const founder = {
  name: 'Екатерина Данилкина',
  alternateName: 'Рина Данилкина',
  slug: '/ekaterina-danilkina',
  role: 'Основательница агентства «Квинт»',
}

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: company.name,
    alternateName: company.alternateNames,
    legalName: company.legalName,
    taxID: company.inn,
    url: SITE_URL,
    logo: `${SITE_URL}/icon-512.png`,
    email: company.email,
    telephone: company.phone.replace(/\s/g, ''),
    foundingDate: company.foundingDate,
    areaServed: { '@type': 'Country', name: 'Россия' },
    founder: { '@id': `${SITE_URL}/#founder` },
    sameAs: [company.telegram],
    knowsAbout: ['маркетинговая стратегия', 'маркетинговый аудит', 'Яндекс Директ', 'продвижение на Яндекс Картах', 'B2B-маркетинг'],
  }
}

export function founderLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#founder`,
    name: founder.name,
    alternateName: founder.alternateName,
    jobTitle: 'Основательница маркетингового агентства',
    url: `${SITE_URL}${founder.slug}`,
    image: `${SITE_URL}/team/founder.jpg`,
    worksFor: { '@id': `${SITE_URL}/#organization` },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Санкт-Петербургский государственный университет' },
    sameAs: [company.founderTelegram],
  }
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  }
}

export function serviceLd(s: { name: string; description: string; path: string; price?: number }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    description: s.description,
    url: `${SITE_URL}${s.path}`,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'Country', name: 'Россия' },
    ...(s.price
      ? { offers: { '@type': 'Offer', price: s.price, priceCurrency: 'RUB' } }
      : {}),
  }
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  }
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
