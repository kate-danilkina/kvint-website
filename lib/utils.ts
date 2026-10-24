export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function trackGoal(goal: string) {
  if (typeof window === 'undefined') return
  const ymId = process.env.NEXT_PUBLIC_YM_ID
  if (ymId && (window as any).ym) {
    ;(window as any).ym(ymId, 'reachGoal', goal)
  }
  if ((window as any).gtag) {
    ;(window as any).gtag('event', goal)
  }
}

export const TELEGRAM_URL = 'https://t.me/kvint_agency'
export const PHONE = '+7 993 079 86 55'
export const PHONE_HREF = 'tel:+79930798655'

export type ContactTab = 'strategy' | 'project'

export const LEAD_PANEL_EVENT = 'kvint:lead-panel'

export interface LeadPanelDetail {
  tab: ContactTab
  /** Element to return focus to when the panel closes */
  trigger: HTMLElement | null
}

/** Answer options for the optional «Откуда узнали о нас» field (also whitelisted in /api/send-form). */
export const LEAD_SOURCES = ['Telegram', 'Поиск', 'Рекомендация', 'Соцсети', 'Другое'] as const

/** Opens the side lead panel (bottom sheet on mobile) on the given tab. Works on every page. */
export function openLeadPanel(tab: ContactTab = 'strategy') {
  if (typeof window === 'undefined') return
  // LeadPanel is mounted in the root layout and flags itself; fall back to the contact section otherwise
  if (!(window as any).__kvintLeadPanel) {
    const contact = document.getElementById('contact')
    if (!contact) {
      window.location.href = `/#${tab === 'strategy' ? 'strategy' : 'contact'}`
      return
    }
    window.dispatchEvent(new CustomEvent<ContactTab>('kvint:contact-tab', { detail: tab }))
    contact.scrollIntoView({ behavior: 'smooth' })
    return
  }
  const active = document.activeElement
  window.dispatchEvent(
    new CustomEvent<LeadPanelDetail>(LEAD_PANEL_EVENT, {
      detail: { tab, trigger: active instanceof HTMLElement && active !== document.body ? active : null },
    })
  )
}

/** Primary CTA entry point — kept for existing callers; opens the lead panel. */
export function openContact(tab: ContactTab = 'strategy') {
  openLeadPanel(tab)
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
