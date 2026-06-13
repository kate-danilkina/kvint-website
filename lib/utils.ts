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

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
