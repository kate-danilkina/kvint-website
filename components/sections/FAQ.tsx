import { Plus } from 'lucide-react'
import { faq } from '@/lib/data/services'
import SectionHeading from '@/components/shared/SectionHeading'
import { JsonLd, faqLd } from '@/lib/seo'

export default function FAQ() {
  return (
    <section className="py-fluid-xl border-t border-black/[0.06]">
      <JsonLd data={faqLd(faq)} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="section-title mb-fluid-l">Частые вопросы</SectionHeading>
        <div className="border-t border-black/10">
          {faq.map((item) => (
            <details key={item.q} className="group border-b border-black/10">
              <summary className="flex items-center justify-between gap-6 py-5 cursor-pointer list-none text-text text-lg font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus size={18} className="text-muted flex-shrink-0 transition-transform duration-200 group-open:rotate-45" aria-hidden />
              </summary>
              <p className="text-muted leading-relaxed pb-6 max-w-2xl">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
