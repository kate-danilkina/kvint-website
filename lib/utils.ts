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

/** Scrolls to the contact section and switches it to the given tab. */
export function openContact(tab: ContactTab = 'strategy') {
  const contact = document.getElementById('contact')
  if (!contact) {
    window.location.href = `/#${tab === 'strategy' ? 'strategy' : 'contact'}`
    return
  }
  window.dispatchEvent(new CustomEvent<ContactTab>('kvint:contact-tab', { detail: tab }))
  contact.scrollIntoView({ behavior: 'smooth' })
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
