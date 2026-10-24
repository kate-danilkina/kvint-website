import Image from 'next/image'
import { teamMembers } from '@/lib/data/services'
import SectionHeading from '@/components/shared/SectionHeading'

const founder = teamMembers[0]

export default function Team() {
  return (
    <section id="about" className="py-fluid-2xl border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="section-title mb-12 max-w-2xl">Кто отвечает за ваш проект</SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 lg:gap-16 items-start">
          {/* Photo */}
          <div className="relative aspect-square w-full max-w-[420px] rounded-xl border border-white/10 bg-bg-2 overflow-hidden">
            <Image
              src="/team/founder.jpg"
              alt="Екатерина Данилкина, основательница агентства Квинт"
              fill
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover"
            />
          </div>

          {/* Bio */}
          <div className="min-w-0">
            <p className="eyebrow mb-3">{founder.role}</p>
            <h3 className="font-bold text-text text-3xl sm:text-4xl tracking-tight mb-8">{founder.name}</h3>

            <blockquote className="text-text/90 text-xl sm:text-2xl leading-snug mb-10 max-w-2xl">
              «{founder.quote}»
            </blockquote>

            <dl className="grid grid-cols-2 max-w-md border-t border-white/10">
              {[
                { value: '8+', label: 'лет в маркетинге' },
                { value: '125', label: 'проектов' },
              ].map((s) => (
                <div key={s.label} className="pt-5 pr-6">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-mono font-bold text-text text-3xl tabular-nums">{s.value}</dd>
                  <dd className="text-sm text-muted mt-1">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
