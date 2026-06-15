'use client'

import { useEffect, useState } from 'react'
import LeadMagnetPopup from '@/components/shared/LeadMagnetPopup'

export default function ScrollLeadMagnet() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('leadMagnetShown')) return

    const check = () => {
      const scrolled = window.scrollY
      const total = document.body.scrollHeight - window.innerHeight
      if (total > 0 && scrolled / total > 0.72) {
        sessionStorage.setItem('leadMagnetShown', '1')
        setOpen(true)
        window.removeEventListener('scroll', check)
      }
    }
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

  return <LeadMagnetPopup isOpen={open} onClose={() => setOpen(false)} />
}
