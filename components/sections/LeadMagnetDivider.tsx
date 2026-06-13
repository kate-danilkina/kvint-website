'use client'

import { useState } from 'react'
import { FileText, ArrowRight } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import LeadMagnetPopup from '@/components/shared/LeadMagnetPopup'
import { trackGoal } from '@/lib/utils'

export default function LeadMagnetDivider() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <AnimatedSection>
        <div
          className="relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0A0A0F 0%, #0D0F1A 100%)' }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pl-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FileText size={18} className="text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-text mb-1">
                    Хочу сначала посмотреть — как вы работаете
                  </p>
                  <p className="text-sm text-muted">
                    Пришлём PDF-презентацию агентства на email или Telegram
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setOpen(true)
                  trackGoal('lead_magnet_open')
                }}
                className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-accent/40 text-accent text-sm font-medium hover:bg-accent/10 transition-all duration-200 hover:border-accent/70 min-h-[44px]"
              >
                Получить презентацию
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <LeadMagnetPopup isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}
