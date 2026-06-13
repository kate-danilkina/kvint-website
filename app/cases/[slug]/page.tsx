import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Badge from '@/components/ui/Badge'
import AnimatedSection from '@/components/shared/AnimatedSection'
import ContactSection from '@/components/sections/ContactSection'
import { cases, getCaseBySlug } from '@/lib/data/cases'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCaseBySlug(params.slug)
  if (!c) return {}
  return {
    title: c.title,
    description: c.description,
    openGraph: {
      title: c.title,
      description: c.description,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
  }
}

export default function CasePage({ params }: Props) {
  const c = getCaseBySlug(params.slug)
  if (!c) notFound()

  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back */}
          <AnimatedSection className="mb-8">
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
            >
              <ArrowLeft size={15} />
              Все кейсы
            </Link>
          </AnimatedSection>

          {/* Header */}
          <AnimatedSection className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <Badge variant="accent">{c.tag}</Badge>
              <span className="text-xs text-muted font-grotesk">
                {new Date(c.date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long' })}
              </span>
            </div>
            <h1 className="section-title mb-4">{c.title}</h1>
            <p className="text-muted text-lg">{c.task}</p>
          </AnimatedSection>

          {/* Hero metric */}
          <AnimatedSection delay={0.1} className="glass-card p-6 sm:p-10 mb-8 text-center">
            <div className="text-6xl sm:text-7xl font-bold text-accent font-grotesk mb-2">
              {c.mainMetric}
            </div>
            <p className="text-muted">{c.metricLabel}</p>
            {c.metricSecondary && (
              <p className="text-sm text-muted/60 mt-1 font-grotesk">{c.metricSecondary}</p>
            )}
          </AnimatedSection>

          {/* Results grid */}
          <AnimatedSection delay={0.15} className="grid grid-cols-3 gap-4 mb-10">
            {c.results.map((r) => (
              <div key={r.label} className="glass-card p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-text font-grotesk mb-1">{r.value}</div>
                <div className="text-xs text-muted">{r.label}</div>
              </div>
            ))}
          </AnimatedSection>

          {/* Description */}
          <AnimatedSection delay={0.2} className="mb-10">
            <h2 className="text-xl font-bold text-text mb-4">О проекте</h2>
            <p className="text-muted leading-relaxed">{c.description}</p>
          </AnimatedSection>

          {/* What we did */}
          <AnimatedSection delay={0.25} className="glass-card p-6 mb-16">
            <h2 className="text-xl font-bold text-text mb-5">Что делали</h2>
            <ul className="flex flex-col gap-3">
              {c.what_we_did.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={11} className="text-accent" />
                  </div>
                  <span className="text-muted text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Tags */}
          <AnimatedSection delay={0.3} className="flex flex-wrap gap-2 mb-16">
            {c.tags.map((tag) => (
              <Badge key={tag} variant="accent">{tag}</Badge>
            ))}
          </AnimatedSection>
        </div>

        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
