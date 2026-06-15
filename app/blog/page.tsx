import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Badge from '@/components/ui/Badge'
import AnimatedSection, { AnimatedGrid, AnimatedItem } from '@/components/shared/AnimatedSection'
import { blogPosts } from '@/lib/data/blog'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Блог Квинт — маркетинг для IT и B2B: стратегии, кейсы, инструменты',
  description:
    'Экспертный блог агентства Квинт: как выстроить маркетинг для IT-компании, B2B бизнеса и стартапа. Разборы, стратегии и реальные цифры — без воды.',
  openGraph: {
    title: 'Блог — Квинт',
    description: 'Практика маркетинга без воды.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-14">
            <p className="eyebrow mb-4">Блог</p>
            <h1 className="section-title mb-4">
              Маркетинг без{' '}
              <span className="text-outline">воды</span>
            </h1>
            <p className="text-muted max-w-xl">
              Практика, кейсы, инструменты. Только то, что работает.
            </p>
          </AnimatedSection>

          <AnimatedGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogPosts.map((post) => (
              <AnimatedItem key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <div className="glass-card glass-card-hover p-6 h-full flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="accent">{tag}</Badge>
                      ))}
                    </div>

                    <h2 className="font-bold text-text text-lg leading-snug group-hover:text-accent transition-colors duration-200 flex-1">
                      {post.title}
                    </h2>

                    <p className="text-muted text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted font-grotesk">{formatDate(post.date)}</span>
                        <span className="flex items-center gap-1 text-xs text-muted font-grotesk">
                          <Clock size={11} />
                          {post.readTime} мин
                        </span>
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-200"
                      />
                    </div>
                  </div>
                </Link>
              </AnimatedItem>
            ))}
          </AnimatedGrid>
        </div>
      </main>
      <Footer />
    </>
  )
}
