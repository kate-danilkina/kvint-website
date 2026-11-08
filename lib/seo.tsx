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
  projects: 54,
}

export const founder = {
  name: 'Екатерина Данилкина',
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
    logo: `${SITE_URL}/brand/kvint-avatar-1000.png`,
    email: company.email,
    telephone: company.phone.replace(/\s/g, ''),
    foundingDate: company.foundingDate,
    address: { '@type': 'PostalAddress', addressCountry: 'RU' },
    areaServed: { '@type': 'Country', name: 'Россия', alternateName: 'RU' },
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

// Short prepositions, conjunctions and particles that must not end a cut meta description
const DANGLING = new Set([
  'в', 'во', 'и', 'а', 'с', 'со', 'к', 'ко', 'у', 'о', 'об', 'на', 'по', 'за', 'от', 'до', 'из', 'для', 'не', 'ни',
  'но', 'да', 'или', 'при', 'про', 'над', 'под', 'без', 'же', 'ли', 'бы', 'то', 'что', 'как',
])

// Trims a meta description to `max` characters, cutting at a word boundary.
// A non-breaking space (U+00A0) counts as a word separator (JS \s matches it). No ellipsis, no trailing period.
// After a cut, drops trailing dangling words (1-3 letters, see DANGLING) and trailing dashes, commas, colons.
export function metaDescription(text: string, max = 160): string {
  const t = text.replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t.replace(/[.\s]+$/, '')
  // Look one char past the limit: if that char is a separator, the whole text up to `max` fits
  const head = t.slice(0, max + 1)
  let cut = -1
  for (let i = head.length - 1; i > 0; i--) {
    if (/\s/.test(head[i])) {
      cut = i
      break
    }
  }
  let out = (cut > 0 ? head.slice(0, cut) : t.slice(0, max)).replace(/[\s.,;:—–-]+$/, '')
  for (;;) {
    const m = out.match(/([А-Яа-яЁёA-Za-z]+)$/)
    if (!m || m[1].length > 3 || !DANGLING.has(m[1].toLowerCase())) break
    out = out.slice(0, out.length - m[1].length).replace(/[\s.,;:—–-]+$/, '')
  }
  return out
}
