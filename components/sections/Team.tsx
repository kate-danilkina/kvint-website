import Image from 'next/image'
import Link from 'next/link'
import { teamMembers } from '@/lib/data/services'
import SectionHeading from '@/components/shared/SectionHeading'

const founder = teamMembers[0]

export default function Team() {
  return (
    <section id="about" className="py-fluid-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="section-title mb-12 max-w-2xl">Проект ведёт основательница. Стратегию пишет она</SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 lg:gap-16 items-start">
          {/* Photo */}
          <div className="relative aspect-square w-full max-w-[420px] rounded-2xl border border-transparent bg-bg-2 overflow-hidden">
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
            <h3 className="font-bold text-text text-3xl sm:text-4xl tracking-tight mb-6">
              <Link href="/ekaterina-danilkina" className="link-underline">{founder.name}</Link>
            </h3>

            <p className="text-muted text-lg leading-relaxed mb-8 max-w-2xl">{founder.bio}</p>


            <dl className="grid grid-cols-2 max-w-md border-t border-black/10">
              {[
                { value: '9', label: 'лет в маркетинге' },
                { value: '54', label: 'проекта с августа 2024' },
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
