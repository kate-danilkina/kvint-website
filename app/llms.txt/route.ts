import { landingPath, services, industries } from '@/lib/data/landings'
import { cases } from '@/lib/data/cases'
import { blogPosts } from '@/lib/data/blog'
import { company, SITE_URL } from '@/lib/seo'

// Built once at build time, so new services, cases and posts appear without editing this file
export const dynamic = 'force-static'

const url = (path: string) => `${SITE_URL}${path}`
const link = (title: string, path: string, note?: string) =>
  `- [${title}](${url(path)})${note ? `: ${note}` : ''}`

const SUMMARY =
  'Квинт — маркетинговое агентство для B2B-компаний: IT и производство. ' +
  'Считаем окупаемость до старта. Стратегию ведёт основательница Екатерина Данилкина. ' +
  `Работаем онлайн по всей России. Юридическое лицо: ${company.legalName}, г. Самара`

// Static pages have no data file, so their titles are the ones in each page's metadata
const STATIC_PAGES: { title: string; path: string }[] = [
  { title: 'Цены на маркетинговые услуги', path: '/ceny' },
  { title: 'Разбор маркетинга с основательницей', path: '/razbor' },
  { title: 'Калькулятор цены заявки и окупаемости рекламы', path: '/kalkulyator-zayavki' },
  { title: 'О компании', path: '/o-kompanii' },
  { title: 'Екатерина Данилкина — основательница агентства Квинт', path: '/ekaterina-danilkina' },
  { title: 'Контакты агентства Квинт', path: '/kontakty' },
]

export function GET() {
  const indexablePosts = blogPosts.filter((p) => !p.noindex)

  const lines = [
    '# Квинт',
    '',
    `> ${SUMMARY}`,
    '',
    '## Услуги',
    ...services.map((l) => link(l.h1, landingPath(l), l.summary)),
    '',
    '## Отрасли',
    ...industries.map((l) => link(l.h1, landingPath(l), l.summary)),
    '',
    '## Кейсы',
    ...cases.map((c) => link(c.title, `/cases/${c.slug}`)),
    '',
    '## Цены, разбор и калькулятор',
    ...STATIC_PAGES.slice(0, 3).map((p) => link(p.title, p.path)),
    '',
    '## Компания',
    ...STATIC_PAGES.slice(3).map((p) => link(p.title, p.path)),
    '',
    '## Блог',
    link('Блог Квинт', '/blog'),
    ...indexablePosts.map((p) => link(p.title, `/blog/${p.slug}`, p.excerpt)),
    '',
  ]

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
