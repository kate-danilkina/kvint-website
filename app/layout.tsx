import type { Metadata, Viewport } from 'next'
import { Montserrat, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import MessengerWidget from '@/components/shared/MessengerWidget'
import CustomCursor from '@/components/shared/CustomCursor'
import StickyCTA from '@/components/shared/StickyCTA'
import ScrollLeadMagnet from '@/components/shared/ScrollLeadMagnet'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://kvint.agency'),
  title: {
    default: 'Квинт — Маркетинговое агентство | Системный маркетинг для бизнеса',
    template: '%s | Квинт — Маркетинговое агентство',
  },
  description:
    'Бутиковое маркетинговое агентство полного цикла. Работаем с IT B2B, премиальным ритейлом, производством. Личный контроль фаундера, прозрачная аналитика, результат от 150 000 ₽/мес.',
  keywords: ['маркетинговое агентство', 'маркетинг для бизнеса', 'B2B маркетинг', 'performance маркетинг', 'SEO', 'квинт агентство'],
  authors: [{ name: 'Квинт' }],
  creator: 'Квинт',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://kvint.agency',
    siteName: 'Квинт — Маркетинговое агентство',
    title: 'Квинт — Маркетинговое агентство | Системный маркетинг для бизнеса',
    description:
      'Бутиковое маркетинговое агентство полного цикла. Работаем с IT B2B, премиальным ритейлом, производством.',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Квинт — Маркетинговое агентство' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Квинт — Маркетинговое агентство',
    description: 'Системный маркетинг для бизнеса от 150 000 ₽/мес',
    images: ['/og-image.svg'],
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
  themeColor: '#1A6EFF',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${montserrat.variable} ${spaceGrotesk.variable}`}>
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
        <div className="noise-overlay" aria-hidden="true" />
        {children}
        <MessengerWidget />
        <CustomCursor />
        <StickyCTA />
        <ScrollLeadMagnet />
      </body>
    </html>
  )
}
