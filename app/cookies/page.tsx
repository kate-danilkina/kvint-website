import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { CookieSettingsButton } from '@/components/shared/CookieConsent'

export const metadata: Metadata = {
  title: 'Политика использования cookie',
  description: 'Какие cookie использует сайт Квинт, зачем они нужны и как изменить свой выбор',
  robots: { index: false, follow: true },
}

const linkClass = 'text-text underline underline-offset-2 hover:text-accent'

const sections: { title: string; body: React.ReactNode[] }[] = [
  {
    title: '1. Что такое cookie',
    body: [
      'Cookie — небольшие файлы, которые браузер сохраняет на устройстве, когда вы открываете сайт. Похожую роль играет локальное хранилище браузера (localStorage). Оба механизма мы описываем здесь вместе',
    ],
  },
  {
    title: '2. Необходимые',
    body: [
      'Запись о том, что вы выбрали в баннере cookie. Хранится в локальном хранилище браузера под названием kvint-cookie-consent. Без неё баннер показывался бы на каждой странице',
      'Сохраняется до тех пор, пока вы не удалите данные сайта в браузере или не измените выбор. По этой записи мы не отслеживаем посетителей',
    ],
  },
  {
    title: '3. Аналитика: Яндекс Метрика',
    body: [
      'Яндекс Метрика запускается только после того, как вы нажали «Принять». Если вы выбрали «Только необходимые», её код не загружается и данные не собираются',
      'Метрика ставит cookie, в том числе:',
      '_ym_uid — идентификатор посетителя. Помогает считать посетителей, а не визиты',
      '_ym_d — дата первого визита на сайт',
      '_ym_isad — признак, есть ли в браузере блокировщик рекламы',
      '_ym_visorc — признак записи визита в Вебвизор, то есть записи действий на страницах',
      'Метрика может также использовать идентификатор Яндекса (yandexuid), если вы пользуетесь сервисами Яндекса',
      'Срок хранения этих cookie задаёт Яндекс. Актуальное описание смотрите в документации Яндекс Метрики. Мы не меняем эти сроки',
    ],
  },
  {
    title: '4. Как изменить выбор',
    body: [
      'Нажмите кнопку ниже, и откроется окно выбора. Вы можете принять аналитику или оставить только необходимые cookie. Изменить выбор можно в любой момент',
      'Ту же настройку открывает ссылка «Настройки cookie» в подвале сайта',
    ],
  },
  {
    title: '5. Настройки браузера',
    body: [
      'Вы можете удалить cookie или запретить их сохранение в настройках браузера. Обычно нужный раздел называется «Конфиденциальность» или «Безопасность». Удаление cookie не сбрасывает ваш выбор в баннере. Чтобы его изменить, используйте кнопку выше',
      'Ограничения в браузере могут сделать часть функций сайта недоступной',
    ],
  },
  {
    title: '6. Кто отвечает за данные',
    body: [
      <>
        Оператор — индивидуальный предприниматель Данилкина Екатерина Денисовна (ИНН 631607801908, ОГРНИП 326632700136276). Подробнее о том, какие данные обрабатываются, зачем и как обратиться с запросом, — в{' '}
        <Link href="/privacy" className={linkClass}>
          политике конфиденциальности
        </Link>
        . Согласие на обработку данных из форм — отдельный документ:{' '}
        <Link href="/soglasie" className={linkClass}>
          согласие на обработку персональных данных
        </Link>
      </>,
      'Вопросы о cookie направляйте на hello@kvint.agency',
    ],
  },
]

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-28 pb-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="section-title mb-4">Политика использования cookie</h1>
          <p className="text-muted font-mono text-sm mb-8">Редакция от 28 октября 2026 года</p>

          <CookieSettingsButton className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 mb-12 rounded-full border border-black/25 text-text font-semibold text-sm hover:border-black/60 hover:bg-black/[0.03] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50" />

          <div className="flex flex-col gap-10">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="text-xl font-bold text-text mb-3">{s.title}</h2>
                <div className="flex flex-col gap-3 text-muted leading-relaxed">
                  {s.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
