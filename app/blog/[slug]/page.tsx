import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Badge from '@/components/ui/Badge'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { blogPosts, getPostBySlug } from '@/lib/data/blog'
import { formatDate } from '@/lib/utils'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back */}
          <AnimatedSection className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
            >
              <ArrowLeft size={15} />
              Все статьи
            </Link>
          </AnimatedSection>

          {/* Meta */}
          <AnimatedSection className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="accent">{tag}</Badge>
              ))}
            </div>

            <h1 className="section-title mb-4">{post.title}</h1>
            <p className="text-muted text-lg mb-6">{post.excerpt}</p>

            <div className="flex items-center gap-4 text-sm text-muted font-grotesk pb-6 border-b border-white/5">
              <span>{post.author}</span>
              <span>·</span>
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock size={13} />
                {post.readTime} мин чтения
              </span>
            </div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection delay={0.1}>
            <div
              className="prose prose-invert prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-text
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-muted prose-p:leading-relaxed
                prose-li:text-muted prose-li:leading-relaxed
                prose-strong:text-text
                prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
            />
          </AnimatedSection>

          {/* Author */}
          <AnimatedSection delay={0.2} className="mt-12 pt-8 border-t border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="font-bold text-accent">ЕД</span>
              </div>
              <div>
                <p className="font-semibold text-text">{post.author}</p>
                <p className="text-sm text-muted">CEO & Founder, Квинт</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </>
  )
}

function markdownToHtml(md: string): string {
  return md
    .trim()
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .split(/\n\n+/)
    .map((block) => {
      if (block.startsWith('<h') || block.startsWith('<ul') || block.startsWith('<ol')) return block
      if (block.trim()) return `<p>${block.replace(/\n/g, ' ')}</p>`
      return ''
    })
    .filter(Boolean)
    .join('\n')
}
