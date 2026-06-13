'use client'

const clients = [
  'Сбер.Образование',
  'Альфа',
  'Эконад',
  'Сантехника Онлайн',
  'БалтФлот',
  'HelloWorldSchool',
  'Тёплого Хлеба',
  'Буше',
  'Sup.me',
  'Зеленка',
]

const itemStyle: React.CSSProperties = {
  fontSize: '13px',
  letterSpacing: '0.1em',
  color: 'rgba(255,255,255,0.45)',
  fontFamily: 'var(--font-space-grotesk)',
  fontWeight: 500,
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
}

const dotStyle: React.CSSProperties = {
  ...itemStyle,
  margin: '0 20px',
  opacity: 0.3,
}

function MarqueeItems() {
  return (
    <>
      {clients.map((name, i) => (
        <span key={`${name}-${i}`} style={{ display: 'inline-flex', alignItems: 'center' }}>
          <span style={itemStyle}>{name}</span>
          <span style={dotStyle} aria-hidden="true">·</span>
        </span>
      ))}
    </>
  )
}

export default function ClientsMarquee() {
  return (
    <div
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '16px 0',
        overflow: 'hidden',
        background: 'transparent',
      }}
      aria-label="Наши клиенты"
    >
      {/* Track doubled for seamless loop */}
      <div
        className="marquee-track"
        style={{ display: 'flex', alignItems: 'center', width: 'max-content' }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', paddingRight: '40px' }}>
          <MarqueeItems />
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', paddingRight: '40px' }}>
          <MarqueeItems />
        </span>
      </div>
    </div>
  )
}
