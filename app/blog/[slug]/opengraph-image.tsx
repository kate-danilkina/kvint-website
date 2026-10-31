import { ImageResponse } from 'next/og'
import { blogPosts, getPostBySlug } from '@/lib/data/blog'

export const alt = 'Квинт · Блог'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

// Satori needs a TTF/OTF with Cyrillic; Google Fonts serves TTF to a blank user agent (same as the root image)
async function loadFont(weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Onest:wght@${weight}&subset=cyrillic`, {
        headers: { 'User-Agent': '' },
      })
    ).text()
    const url = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1]
    return url ? await (await fetch(url)).arrayBuffer() : null
  } catch {
    return null
  }
}

export default async function OpengraphImage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  const title = post?.title ?? 'Блог Квинт'
  const bold = await loadFont(700)
  const fonts = bold ? [{ name: 'Onest', data: bold, weight: 700 as const, style: 'normal' as const }] : []

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#ECEBE6',
          color: '#111114',
          fontFamily: 'Onest',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 32, fontWeight: 700, letterSpacing: -1 }}>
          <span>Квинт</span>
          <span style={{ color: '#1561E0' }}>·</span>
          <span style={{ color: '#1561E0' }}>Блог</span>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: title.length > 60 ? 58 : 68,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -2,
          }}
        >
          {title}
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#4A4A55' }}>
          <span>kvint.agency</span>
        </div>
      </div>
    ),
    { ...size, fonts }
  )
}
