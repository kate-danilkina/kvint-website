import { ImageResponse } from 'next/og'

export const alt = 'Квинт — маркетинговое агентство'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Satori needs a TTF/OTF with Cyrillic; Google Fonts serves TTF to a blank user agent
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

export default async function OpengraphImage() {
  const [bold, regular] = await Promise.all([loadFont(700), loadFont(400)])
  const fonts = [
    bold && { name: 'Onest', data: bold, weight: 700 as const, style: 'normal' as const },
    regular && { name: 'Onest', data: regular, weight: 400 as const, style: 'normal' as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 700; style: 'normal' }[]

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
          background: '#0A0A0F',
          color: '#F0F0F5',
          fontFamily: 'Onest',
        }}
      >
        <div style={{ display: 'flex', fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>КВИНТ</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 72, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 900 }}>
            Реклама, сайт и аналитика одной командой
          </div>
          <div style={{ display: 'flex', fontSize: 30, color: '#888899', marginTop: 28 }}>
            IT B2B · премиум-ритейл · производство · недвижимость
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, color: '#888899' }}>
          <span>kvint.agency</span>
          <span style={{ color: '#34D399' }}>Конверсия ×6 · 0,36% → 2,17%</span>
        </div>
      </div>
    ),
    { ...size, fonts }
  )
}
