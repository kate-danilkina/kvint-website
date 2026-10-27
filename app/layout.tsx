import type { Metadata, Viewport } from 'next'
import { Onest, JetBrains_Mono, Unbounded } from 'next/font/google'
import MessengerWidget from '@/components/shared/MessengerWidget'
import ClickGoals from '@/components/shared/ClickGoals'
import StickyCTA from '@/components/shared/StickyCTA'
import LeadPanel from '@/components/shared/LeadPanel'
import CookieConsent from '@/components/shared/CookieConsent'
import { JsonLd, organizationLd, founderLd } from '@/lib/seo'
import './globals.css'

const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})

const unbounded = Unbounded({
  subsets: ['latin', 'cyrillic'],
  weight: ['500', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://kvint.agency'),
  title: {
    default: 'Квинт — маркетинговое агентство для B2B: IT, ритейл, производство, недвижимость',
    template: '%s | Квинт',
  },
  description:
    'Маркетинговое агентство для B2B. Считаем окупаемость до старта и показываем, сколько приносит каждый рубль рекламы. Проект ведёт основательница Екатерина Данилкина',
  // Each page gets a self-canonical resolved against metadataBase
  alternates: { canonical: './' },
  verification: { other: { 'msvalidate.01': '269C5DB1E3644ECDE492CE7B447803BD' } },
  authors: [{ name: 'Квинт' }],
  creator: 'Квинт',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://kvint.agency',
    siteName: 'Квинт — Маркетинговое агентство',
    title: 'Квинт — маркетинговое агентство',
    description:
      'Реклама, сайт, SEO и аналитика для B2B с расчётом окупаемости до старта',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Квинт — Маркетинговое агентство',
    description: 'Маркетинг для B2B, который считают в деньгах',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Квинт',
  },
}

export const viewport: Viewport = {
  themeColor: '#ECEBE6',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Yandex Metrika is not in the HTML: CookieConsent loads it only after the visitor accepts analytics
    <html lang="ru" className={`${onest.variable} ${jetbrainsMono.variable} ${unbounded.variable}`}>
      <body className="bg-bg text-text antialiased">
        <JsonLd data={[organizationLd(), founderLd()]} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold focus:shadow-lg focus:outline-none"
        >
          Перейти к содержанию
        </a>
        {children}
        <MessengerWidget />
        <ClickGoals />
        <StickyCTA />
        <LeadPanel />
        <CookieConsent />
      </body>
    </html>
  )
}
