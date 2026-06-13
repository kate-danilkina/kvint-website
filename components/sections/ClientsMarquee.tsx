'use client'

// TODO: copy alfa-logo.jpeg and sber-logo.svg to /public/logos/

const logoClients = [
  { type: 'image' as const, src: '/logos/alfa-logo.jpeg', alt: 'Альфа-Банк' },
  { type: 'image' as const, src: '/logos/sber-logo.svg', alt: 'Сбербанк' },
]

const textClients = ['ЭКОНАД', 'САНТЕХНИКА ОНЛАЙН', 'БАЛТФЛОТ', 'HELLOWORLDSCHOOL']

const separator = (
  <span
    aria-hidden="true"
    className="mx-6 inline-block w-px bg-white/15 h-4 align-middle flex-shrink-0"
    style={{ display: 'inline-block' }}
  />
)

function MarqueeItems() {
  return (
    <>
      {logoClients.map((c) => (
        <span key={c.alt} className="inline-flex items-center flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.src}
            alt={c.alt}
            style={{
              height: '28px',
              width: 'auto',
              filter: 'brightness(0) invert(1)',
              opacity: 0.6,
              display: 'inline-block',
              verticalAlign: 'middle',
              objectFit: 'contain',
            }}
          />
          {separator}
        </span>
      ))}

      {textClients.map((name, i) => (
        <span key={name} className="inline-flex items-center flex-shrink-0">
          <span
            style={{
              fontSize: '13px',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.45)',
              fontFamily: 'var(--font-space-grotesk)',
              fontWeight: 500,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            {name}
          </span>
          {i < textClients.length - 1 && separator}
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
      {/* Track is doubled so the loop is seamless: [items][items] */}
      <div
        className="marquee-track"
        style={{
          display: 'flex',
          alignItems: 'center',
          width: 'max-content',
        }}
      >
        {/* First copy */}
        <span className="inline-flex items-center" style={{ paddingRight: '48px' }}>
          <MarqueeItems />
        </span>
        {/* Second copy — seamless continuation */}
        <span className="inline-flex items-center" style={{ paddingRight: '48px' }}>
          <MarqueeItems />
        </span>
      </div>
    </div>
  )
}
