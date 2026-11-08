import { blogPosts, type BlogPost } from '@/lib/data/blog'
import { landingByPath, type Landing } from '@/lib/data/landings'

/**
 * Words that tie a landing page to blog posts. A post is related when one of these
 * starts a word in its title, excerpt or tags (case-insensitive). Add a slug here
 * and new posts on the topic link to the page automatically.
 */
export const LANDING_KEYWORDS: Record<string, string[]> = {
  'yandex-direct': ['Директ', 'Яндекс Директ', 'реклам'],
  'kontekstnaya-reklama': ['контекст', 'РСЯ'],
  'prodvizhenie-na-kartah': ['Карт', '2ГИС'],
  'seo-i-geo': ['SEO', 'нейросет', 'GEO'],
  'marketingovyj-audit': ['аудит'],
  'marketingovaya-strategiya': ['стратег'],
  soprovozhdenie: ['систем', 'аналитик'],
  proizvodstvo: ['производ', 'мебел'],
  'mebelnoe-proizvodstvo': ['производ', 'мебел'],
  'it-b2b': ['IT', 'ИТ', 'SaaS'],
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function matchesAny(text: string, words: string[]): boolean {
  // (?<!\p{L}) keeps the match at a word start, so «IT» does not hit «ОТКРЫТИЕ»
  return words.some((w) => new RegExp(`(?<!\\p{L})${escapeRegExp(w)}`, 'iu').test(text))
}

function postText(post: BlogPost): string {
  return [post.title, post.excerpt, ...post.tags].join(' \n ')
}

function indexablePosts(): BlogPost[] {
  return blogPosts.filter((p) => !p.noindex)
}

function newestFirst(a: BlogPost, b: BlogPost): number {
  return b.date.localeCompare(a.date)
}

/** Posts for a landing page, newest first. Empty when no keyword matches */
export function relatedPostsForLanding(slug: string, limit = 3): BlogPost[] {
  const words = LANDING_KEYWORDS[slug]
  if (!words) return []
  return indexablePosts()
    .filter((p) => matchesAny(postText(p), words))
    .sort(newestFirst)
    .slice(0, limit)
}

/** Other posts for an article: most shared tags first, then newest */
export function readAlsoPosts(post: BlogPost, limit = 3): BlogPost[] {
  const sharedTags = (p: BlogPost) => p.tags.filter((t) => post.tags.includes(t)).length
  return indexablePosts()
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => sharedTags(b) - sharedTags(a) || newestFirst(a, b))
    .slice(0, limit)
}

/** The service page the article already links to: the first /uslugi/ link in its text */
export function serviceForPost(post: BlogPost): Landing | undefined {
  const match = /\]\((\/uslugi\/[^)\s#]+)\)/.exec(post.content)
  return match ? landingByPath(match[1]) : undefined
}
