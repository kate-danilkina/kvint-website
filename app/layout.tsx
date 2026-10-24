import type { Metadata, Viewport } from 'next'
import { Onest, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import MessengerWidget from '@/components/shared/MessengerWidget'
import StickyCTA from '@/components/shared/StickyCTA'
import LeadPanel from '@/components/shared/LeadPanel'
import './globals.css'

const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
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
    default: 'Квинт — маркетинговое агентство для IT B2B, ритейла, производства и недвижимости',
    template: '%s | Квинт — Маркетинговое агентство',
  },
  description:
    'Бутиковое маркетинговое агентство полного цикла для IT B2B, премиального ритейла, производства и недвижимости. Стратегию ведёт основательница, отчёт каждую неделю. Сопровождение от 150 000 ₽ в месяц.',
  keywords: ['маркетинговое агентство', 'маркетинг для бизнеса', 'B2B маркетинг', 'performance маркетинг', 'SEO', 'квинт агентство'],
  authors: [{ name: 'Квинт' }],
  creator: 'Квинт',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://kvint.agency',
    siteName: 'Квинт — Маркетинговое агентство',
    title: 'Квинт — маркетинговое агентство',
    description:
      'Бутиковое маркетинговое агентство полного цикла для IT B2B, премиального ритейла, производства и недвижимости.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Квинт — Маркетинговое агентство',
    description: 'Реклама, сайт и аналитика для B2B. Сопровождение от 150 000 ₽ в месяц',
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
  themeColor: '#0A0A0F',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${onest.variable} ${jetbrainsMono.variable}`}>
      <head>
        <Script id="metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            ym(109826277, "init", {
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true
            });
          `}
        </Script>
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/109826277" style={{position:'absolute', left:'-9999px'}} alt="" />
          </div>
        </noscript>
      </head>
      <body className="bg-bg text-text antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold focus:shadow-lg focus:outline-none"
        >
          Перейти к содержанию
        </a>
        {children}
        <MessengerWidget />
        <StickyCTA />
        <LeadPanel />
      </body>
    </html>
  )
}
