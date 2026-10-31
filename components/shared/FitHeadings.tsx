'use client'

import { useEffect } from 'react'

const SELECTOR = 'main .section-title:not(.sr-only), main h1:not(.sr-only), main h2:not(.sr-only)'
const MIN_PX = 16

// Inline font-size each heading had before we touched it, so pages that set one (e.g. the 404 title) keep it
const baseInline = new WeakMap<HTMLElement, string>()

// The text lives inside .heading-mask (overflow: hidden) in SectionHeading, which hides overflow from the
// heading itself. Measure the mask when there is one, otherwise the heading.
function overflows(el: HTMLElement): boolean {
  const mask = el.querySelector<HTMLElement>('.heading-mask')
  const target = mask ?? el
  return target.scrollWidth > target.clientWidth + 1 || el.scrollWidth > el.clientWidth + 1
}

function fitAll() {
  const els = document.querySelectorAll<HTMLElement>(SELECTOR)
  els.forEach((el) => {
    if (!baseInline.has(el)) baseInline.set(el, el.style.fontSize)
    el.style.removeProperty('font-size')
    el.style.fontSize = baseInline.get(el) ?? ''
    if (!overflows(el)) return

    let size = parseFloat(getComputedStyle(el).fontSize)
    while (size > MIN_PX && overflows(el)) {
      size -= 1
      // important: some headings size themselves with Tailwind !text-* classes
      el.style.setProperty('font-size', `${size}px`, 'important')
    }
  })
}

/**
 * Shrinks headings that are too wide for the screen (long uppercase Russian words on phones).
 * Only ever decreases font size, never below 16px, and never hyphenates.
 */
export default function FitHeadings() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    const onResize = () => {
      clearTimeout(timer)
      timer = setTimeout(fitAll, 100)
    }

    fitAll()
    window.addEventListener('resize', onResize)
    document.fonts?.ready?.then(fitAll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return null
}
