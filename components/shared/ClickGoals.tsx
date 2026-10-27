'use client'

import { useEffect } from 'react'
import { trackGoal } from '@/lib/utils'

// One delegated listener sends Metrika goals for every phone, Telegram and WhatsApp link on the site
export default function ClickGoals() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!link) return
      const href = link.getAttribute('href') || ''
      if (href.startsWith('tel:')) trackGoal('click_phone')
      else if (href.includes('t.me/')) trackGoal('click_telegram')
      else if (href.includes('wa.me/')) trackGoal('click_whatsapp')
      else if (href.startsWith('mailto:')) trackGoal('click_email')
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
  return null
}
