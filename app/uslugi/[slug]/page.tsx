import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LandingView from '@/components/landing/LandingView'
import { services as items, findLanding } from '@/lib/data/landings'

interface Props {
  params: { slug: string }
}

export const dynamicParams = false

export function generateStaticParams() {
  return items.map((l) => ({ slug: l.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const page = findLanding('service', params.slug)
  if (!page) return {}
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    openGraph: { title: page.metaTitle, description: page.metaDescription, type: 'website' },
  }
}

export default function Page({ params }: Props) {
  const page = findLanding('service', params.slug)
  if (!page) notFound()
  return <LandingView page={page} />
}
