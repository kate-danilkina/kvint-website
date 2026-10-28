'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

// Figures come from lib/data/cases.ts (ai-saas-startup, hr-consulting-webinar)
const CONV_BEFORE = 0.36
const CONV_AFTER = 2.17
const CPL = 604
const CPL_LIMIT = 650

function Bar({ value, max, className, delay, active }: { value: number; max: number; className: string; delay: number; active: boolean }) {
  const reduced = useReducedMotion()
  return (
    <div className="h-2 w-full rounded-full bg-white/[0.06] overflow-hidden">
      <motion.div
        className={`h-full rounded-full origin-left ${className}`}
        style={{ width: `${(value / max) * 100}%` }}
        initial={reduced ? false : { scaleX: 0 }}
        animate={active || reduced ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}

export default function HeroReport() {
  const ref = useRef<HTMLDivElement>(null)
  const active = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="w-full max-w-[460px] rounded-2xl bg-night text-white font-mono text-sm shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)]">
      {/* Report header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.08] text-xs text-white/60">
        <span>ОТЧЁТ · ИЗ НАШИХ КЕЙСОВ</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" aria-hidden />
          факт
        </span>
      </div>

      {/* Case 1: conversion */}
      <div className="px-5 pt-5 pb-6 border-b border-white/[0.08]">
        <div className="flex items-baseline justify-between mb-4">
          <span className="text-white font-sans font-semibold text-base">AI-стартап · 2 месяца</span>
          <span className="text-[#34D399] text-2xl font-bold">×6</span>
        </div>
        <p className="text-xs text-white/60 mb-3">Конверсия: доля посетителей сайта, оставивших заявку</p>
        <div className="grid grid-cols-[52px_1fr_56px] items-center gap-3 mb-2.5">
          <span className="text-xs text-white/60">до</span>
          <Bar value={CONV_BEFORE} max={CONV_AFTER} className="bg-white/30" delay={0.2} active={active} />
          <span className="text-right text-white/60 tabular-nums">0,36%</span>
        </div>
        <div className="grid grid-cols-[52px_1fr_56px] items-center gap-3">
          <span className="text-xs text-white/60">после</span>
          <Bar value={CONV_AFTER} max={CONV_AFTER} className="bg-[#34D399]" delay={0.45} active={active} />
          <span className="text-right text-white font-bold tabular-nums">2,17%</span>
        </div>
      </div>

      {/* Case 2: lead cost vs limit */}
      <div className="px-5 pt-5 pb-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 mb-4">
          <span className="text-white font-sans font-semibold text-base">Вебинар HR · 7 дней</span>
          <span className="text-white text-2xl font-bold tabular-nums">
            220 <span className="text-xs font-normal text-white/60">регистраций</span>
          </span>
        </div>
        <p className="text-xs text-white/60 mb-3">Цена одной регистрации</p>
        <div className="relative mb-2">
          <Bar value={CPL} max={CPL_LIMIT} className="bg-accent" delay={0.7} active={active} />
          {/* Client's limit marker */}
          <span className="absolute right-0 -top-1 h-4 w-px bg-white/50" aria-hidden />
        </div>
        <div className="flex justify-between text-xs tabular-nums">
          <span className="text-white font-bold">604 ₽</span>
          <span className="text-white/60">лимит клиента 650 ₽</span>
        </div>
      </div>

      <Link
        href="/cases"
        className="flex items-center justify-between px-5 py-3 border-t border-white/[0.08] text-xs text-white/60 hover:text-white transition-colors rounded-b-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <span>Как мы получили эти цифры</span>
        <ArrowRight size={14} aria-hidden />
      </Link>
    </div>
  )
}
