import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LandingView from '@/components/landing/LandingView'
import { industries as items, findLanding } from '@/lib/data/landings'
import { metaDescription } from '@/lib/seo'

interface Props {
  params: { slug: string }
}

export const dynamicParams = false

export function generateStaticParams() {
  return items.map((l) => ({ slug: l.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const page = findLanding('industry', params.slug)
  if (!page) return {}
  const description = metaDescription(page.metaDescription)
  return {
    title: page.metaTitle,
    description,
    openGraph: { title: page.metaTitle, description, type: 'website' },
  }
}

export default function Page({ params }: Props) {
  const page = findLanding('industry', params.slug)
  if (!page) notFound()
  return <LandingView page={page} />
}
