import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Badge from '@/components/ui/Badge'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { blogPosts, getPostBySlug, readMinutes } from '@/lib/data/blog'
import { formatDate } from '@/lib/utils'
import { faqLd, JsonLd, SITE_URL } from '@/lib/seo'

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
    ...(post.noindex ? { robots: { index: false, follow: true } } : {}),
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}`,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'ru-RU',
    author: { '@type': 'Person', name: post.author, '@id': `${SITE_URL}/#founder` },
    publisher: { '@id': `${SITE_URL}/#organization` },
  }

  return (
    <>
      <JsonLd data={post.faq?.length ? [articleLd, faqLd(post.faq)] : articleLd} />
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

            <div className="flex items-center gap-4 text-sm text-muted font-mono pb-6 border-b border-black/5">
              <span>{post.author}</span>
              <span>·</span>
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock size={13} />
                {readMinutes(post)} мин чтения
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

          {/* FAQ */}
          {post.faq?.length ? (
            <AnimatedSection delay={0.15} className="mt-12">
              <h2 className="text-2xl font-bold text-text mb-6">Частые вопросы</h2>
              <div className="flex flex-col gap-6">
                {post.faq.map((item) => (
                  <div key={item.q}>
                    <h3 className="font-semibold text-text text-lg mb-2">{item.q}</h3>
                    <p className="text-muted leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          ) : null}

          {/* Author */}
          <AnimatedSection delay={0.2} className="mt-12 pt-8 border-t border-black/5">
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

type MdBlock = { tag: 'h2' | 'h3' | 'p' | 'ul' | 'ol'; lines: string[] }

// Line-based parser for our own trusted content: h2/h3, paragraphs,
// ordered and unordered lists, **bold** and [text](/internal/path) links
function markdownToHtml(md: string): string {
  const blocks: MdBlock[] = []
  let afterBlank = true

  for (const raw of md.trim().split('\n')) {
    const line = raw.trim()
    if (!line) {
      afterBlank = true
      continue
    }

    let tag: MdBlock['tag'] = 'p'
    let text = line
    const heading = /^(##|###) (.+)$/.exec(line)
    if (heading) {
      tag = heading[1] === '##' ? 'h2' : 'h3'
      text = heading[2]
    } else if (/^\d+\. /.test(line)) {
      tag = 'ol'
      text = line.replace(/^\d+\. /, '')
    } else if (/^- /.test(line)) {
      tag = 'ul'
      text = line.slice(2)
    }

    const last = blocks[blocks.length - 1]
    const mergeable = !afterBlank && last && last.tag === tag && (tag === 'p' || tag === 'ul' || tag === 'ol')
    if (mergeable) last.lines.push(text)
    else blocks.push({ tag, lines: [text] })
    afterBlank = false
  }

  return blocks
    .map(({ tag, lines }) => {
      if (tag === 'h2' || tag === 'h3') return `<${tag}>${inline(lines[0])}</${tag}>`
      if (tag === 'p') return `<p>${inline(lines.join(' '))}</p>`
      return `<${tag}>${lines.map((l) => `<li>${inline(l)}</li>`).join('')}</${tag}>`
    })
    .join('\n')
}

function inline(s: string): string {
  return s
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, '<a href="$2">$1</a>')
}
