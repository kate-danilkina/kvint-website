'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import ContactForm from '@/components/shared/ContactForm'
import StrategyForm from '@/components/shared/StrategyForm'
import { useIsMobile } from '@/lib/hooks/useIsMobile'
import { LEAD_PANEL_EVENT, PHONE, PHONE_HREF, type ContactTab, type LeadPanelDetail } from '@/lib/utils'

const tabs: { id: ContactTab; label: string }[] = [
  { id: 'strategy', label: 'Разбор с основательницей' },
  { id: 'project', label: 'Обсудить проект' },
]

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Right-side drawer (bottom sheet below 640px) with the lead forms.
 * Opened from any page via openContact() / openLeadPanel() in lib/utils, or the /#strategy deep link.
 */
export default function LeadPanel() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<ContactTab>('strategy')
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const reduced = useReducedMotion()
  const isMobile = useIsMobile(640)

  const close = useCallback(() => {
    setOpen(false)
    // Drop the deep-link hash so a reload doesn't reopen the panel
    if (window.location.hash === '#strategy') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }, [])

  // Open requests from CTAs and the /#strategy deep link
  useEffect(() => {
    ;(window as any).__kvintLeadPanel = true

    const onOpen = (e: Event) => {
      const { tab: t, trigger } = (e as CustomEvent<LeadPanelDetail>).detail
      triggerRef.current = trigger
      setTab(t)
      setOpen(true)
    }
    const fromHash = () => {
      if (window.location.hash === '#strategy') {
        triggerRef.current = null
        setTab('strategy')
        setOpen(true)
      }
    }

    window.addEventListener(LEAD_PANEL_EVENT, onOpen)
    window.addEventListener('hashchange', fromHash)
    fromHash()
    return () => {
      ;(window as any).__kvintLeadPanel = false
      window.removeEventListener(LEAD_PANEL_EVENT, onOpen)
      window.removeEventListener('hashchange', fromHash)
    }
  }, [])

  // Scroll lock, initial focus, focus return
  useEffect(() => {
    if (!open) return
    const { body, documentElement } = document
    const scrollbar = window.innerWidth - documentElement.clientWidth
    const prevOverflow = body.style.overflow
    const prevPadding = body.style.paddingRight
    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0)

    return () => {
      window.clearTimeout(focusTimer)
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPadding
      const trigger = triggerRef.current
      if (trigger && document.contains(trigger)) trigger.focus()
      triggerRef.current = null
    }
  }, [open])

  // Esc to close + focus trap
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      close()
      return
    }
    if (e.key !== 'Tab' || !panelRef.current) return
    const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (el) => el.offsetParent !== null || el === document.activeElement
    )
    if (items.length === 0) return
    const first = items[0]
    const last = items[items.length - 1]
    const active = document.activeElement
    if (e.shiftKey && (active === first || !panelRef.current.contains(active))) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && (active === last || !panelRef.current.contains(active))) {
      e.preventDefault()
      first.focus()
    }
  }

  const onTabKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = tab === 'strategy' ? 'project' : 'strategy'
    setTab(next)
    document.getElementById(`lead-tab-${next}`)?.focus()
  }

  const offscreen = reduced ? { opacity: 0 } : isMobile ? { y: '100%' } : { x: '100%' }
  const onscreen = reduced ? { opacity: 1 } : isMobile ? { y: 0 } : { x: 0 }

  return (
    <AnimatePresence>
      {open && (
        <motion.div key="lead-panel" className="fixed inset-0 z-[70]" onKeyDown={onKeyDown} exit={{ opacity: 1 }} transition={{ duration: reduced ? 0.15 : 0.4 }}>
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
            onClick={close}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-panel-title"
            className="absolute flex flex-col bg-bg border-black/10 shadow-[0_0_48px_rgba(0,0,0,0.6)]
              inset-x-0 bottom-0 max-h-[92dvh] rounded-t-2xl border-t
              sm:inset-x-auto sm:right-0 sm:top-0 sm:bottom-0 sm:max-h-none sm:h-full sm:w-full sm:max-w-[480px] sm:rounded-none sm:border-t-0 sm:border-l"
            initial={offscreen}
            animate={onscreen}
            exit={offscreen}
            transition={{ duration: reduced ? 0.15 : 0.4, ease: EASE }}
          >
            {/* Grab handle (mobile) */}
            <div className="sm:hidden mx-auto mt-2.5 h-1 w-10 rounded-full bg-black/20" aria-hidden />

            <div className="flex items-start justify-between gap-4 px-5 sm:px-8 pt-4 sm:pt-8 pb-4">
              <div>
                <h2 id="lead-panel-title" className="font-extrabold text-step-3 leading-tight tracking-[-0.04em] text-text">
                  Оставить заявку
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Закрыть форму заявки"
                className="flex-shrink-0 w-11 h-11 -mr-2 flex items-center justify-center rounded-xl text-muted hover:text-text hover:bg-black/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-8 pb-[calc(env(safe-area-inset-bottom,0px)+24px)]">
              <div role="tablist" aria-label="Формат заявки" className="flex gap-1 mb-5 p-1 bg-black/5 rounded-xl">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    id={`lead-tab-${t.id}`}
                    aria-selected={tab === t.id}
                    aria-controls="lead-panel-body"
                    tabIndex={tab === t.id ? 0 : -1}
                    onClick={() => setTab(t.id)}
                    onKeyDown={onTabKey}
                    className={`flex-1 py-3 px-3 rounded-lg text-sm font-medium transition-colors duration-200 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      tab === t.id ? 'bg-accent text-white' : 'text-muted hover:text-text'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div id="lead-panel-body" role="tabpanel" aria-labelledby={`lead-tab-${tab}`}>
                {tab === 'strategy' ? <StrategyForm idPrefix="lp-" /> : <ContactForm idPrefix="lp-" />}
              </div>

              <p className="text-sm text-muted mt-6">
                Или позвоните:{' '}
                <a href={PHONE_HREF} className="link-underline text-text font-mono whitespace-nowrap">
                  {PHONE}
                </a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
