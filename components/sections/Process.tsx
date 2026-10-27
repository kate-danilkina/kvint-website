'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { processSteps } from '@/lib/data/services'
import SectionHeading from '@/components/shared/SectionHeading'

// Each stage keeps fewer hypotheses than the one before — the bar narrows to show it
const widths = [100, 76, 54, 38]

export default function Process() {
  const ref = useRef<HTMLOListElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()

  return (
    <section className="py-fluid-xl bg-night text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="section-title !text-white mb-3">4 шага к системе, которая приносит деньги</SectionHeading>
        <p className="text-white/60 text-lg mb-fluid-l max-w-xl">От правды о цифрах до прибыли на вашем дашборде</p>

        <ol ref={ref} className="flex flex-col">
          {processSteps.map((step, i) => (
            <li
              key={step.number}
              className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-4 md:gap-10 py-7 border-t border-white/15"
            >
              <div className="flex gap-5">
                <span className="font-mono text-sm text-white/60 pt-1.5">{step.number}</span>
                <div>
                  <h3 className="font-bold text-2xl tracking-tight mb-2">{step.title}</h3>
                  <p className="text-white/60 leading-relaxed max-w-md">{step.description}</p>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-2 md:pl-0 pl-10">
                <motion.div
                  className="h-9 rounded-md bg-accent origin-left"
                  style={{ width: `${widths[i]}%` }}
                  initial={reduced ? false : { scaleX: 0 }}
                  animate={inView || reduced ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  aria-hidden
                />
                <span className="font-mono text-sm">→ {step.result}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
