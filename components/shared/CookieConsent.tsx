'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

/** Yandex Metrika counter. Same id and init options as before the consent gate. */
const YM_ID = 109826277
const YM_INIT = { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true }
const YM_SRC = 'https://mc.yandex.ru/metrika/tag.js'
/** Metrika cookies, cleared when the visitor declines analytics */
const YM_COOKIES = ['_ym_uid', '_ym_d', '_ym_isad', '_ym_visorc']

const STORAGE_KEY = 'kvint-cookie-consent'
/** Bump when the cookie policy changes: every visitor is asked again */
const CONSENT_VERSION = 1

/** Window event that reopens the settings banner (footer link and /cookies page button) */
export const COOKIE_SETTINGS_EVENT = 'kvint:cookie-settings'

interface StoredConsent {
  v: number
  analytics: boolean
  at: string
}

/** Set once Metrika has been injected in this page view. It cannot be unloaded, only stopped by a reload. */
let metrikaLoaded = false

function readConsent(): StoredConsent | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as StoredConsent
    return data && data.v === CONSENT_VERSION && typeof data.analytics === 'boolean' ? data : null
  } catch {
    return null
  }
}

function saveConsent(analytics: boolean) {
  try {
    const data: StoredConsent = { v: CONSENT_VERSION, analytics, at: new Date().toISOString() }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // Storage blocked (private window, site data cleared): the choice holds for this page view only
  }
}

function clearMetrikaCookies() {
  try {
    for (const name of YM_COOKIES) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
    }
  } catch {
    // Cookies unavailable: nothing to clear
  }
}

/**
 * Injects Yandex Metrika. Called only after the visitor accepted analytics.
 * Same queue stub as the official snippet, so hits before tag.js loads are kept.
 * Until this runs, window.ym is undefined and trackGoal() in lib/utils.ts does nothing.
 */
function loadMetrika() {
  if (metrikaLoaded || typeof window === 'undefined') return
  metrikaLoaded = true
  const w = window as any
  w.ym =
    w.ym ||
    function () {
      ;(w.ym.a = w.ym.a || []).push(arguments)
    }
  w.ym.l = Date.now()
  const script = document.createElement('script')
  script.async = true
  script.src = YM_SRC
  document.head.appendChild(script)
  w.ym(YM_ID, 'init', YM_INIT)
}

export function openCookieSettings() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))
}

/** Button that reopens the cookie settings banner. Used on the /cookies page. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Открыть настройки cookie
    </button>
  )
}

const choiceButton =
  'flex-1 min-h-[44px] px-5 py-3 rounded-full border-2 border-text bg-bg-2 text-text font-semibold text-sm text-center hover:bg-black/[0.04] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2'

/**
 * Cookie banner. Shown on the first visit and again after CONSENT_VERSION changes or
 * when the visitor opens the settings. Both choices have the same size and weight, nothing is pre-selected.
 * Does not cover content: a card in the bottom corner on desktop, a compact card above the bottom edge on mobile.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState<StoredConsent | null>(null)

  useEffect(() => {
    const stored = readConsent()
    setCurrent(stored)
    if (stored) {
      if (stored.analytics) loadMetrika()
    } else {
      setVisible(true)
    }

    const onOpen = () => {
      setCurrent(readConsent())
      setVisible(true)
    }
    window.addEventListener(COOKIE_SETTINGS_EVENT, onOpen)
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, onOpen)
  }, [])

  const choose = (analytics: boolean) => {
    saveConsent(analytics)
    setVisible(false)
    if (analytics) {
      loadMetrika()
      return
    }
    clearMetrikaCookies()
    // Metrika already ran in this page view: a reload is the only way to stop it
    if (metrikaLoaded) window.location.reload()
  }

  if (!visible) return null

  return (
    <section
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-3 sm:inset-x-auto sm:left-6 sm:max-w-[380px] z-[65] rounded-2xl bg-bg-2 border border-black/10 shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-5"
      style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)' }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h2 id="cookie-consent-title" className="text-base font-bold text-text">
          Cookie на сайте
        </h2>
        {current && (
          <button
            type="button"
            onClick={() => setVisible(false)}
            aria-label="Закрыть настройки cookie"
            className="-mr-2 -mt-2 w-11 h-11 flex items-center justify-center rounded-xl text-muted hover:text-text hover:bg-black/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <p className="text-sm text-muted leading-relaxed mb-4">
        Необходимые cookie нужны, чтобы сайт работал и помнил ваш выбор. Яндекс Метрика, которая показывает, как пользуются сайтом,
        включается только с вашего согласия.{' '}
        <Link href="/cookies" className="text-text underline underline-offset-2 hover:text-accent">
          Подробнее о cookie
        </Link>
      </p>

      {current && (
        <p className="text-xs text-muted font-mono mb-3">
          Сейчас: аналитика {current.analytics ? 'включена' : 'отключена'}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-2">
        <button type="button" onClick={() => choose(true)} className={choiceButton}>
          Принять
        </button>
        <button type="button" onClick={() => choose(false)} className={choiceButton}>
          Только необходимые
        </button>
      </div>
    </section>
  )
}
