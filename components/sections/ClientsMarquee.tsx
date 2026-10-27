import Image from 'next/image'

type Client =
  | { name: string; logo: string; width: number; height: number }
  | { name: string; logo?: undefined }

// Logos are rendered as dark silhouettes so different brand colours read as one row
const clients: Client[] = [
  { name: 'Сбер.Образование', logo: '/logos/clients/sber-education.svg', width: 262, height: 26 },
  { name: 'Альфа-Банк', logo: '/logos/clients/alfa.svg', width: 729, height: 146 },
  { name: 'Эконад' },
  { name: 'Сантехника Онлайн' },
  { name: 'БалтФлот' },
  { name: 'Hello World School', logo: '/logos/clients/hello-world-school.svg', width: 441, height: 128 },
  { name: 'Тёплого хлеба' },
  { name: 'Буше' },
  { name: 'Sup.me', logo: '/logos/clients/supme.png', width: 662, height: 393 },
  { name: 'Зелёнка', logo: '/logos/clients/zelenka.png', width: 1019, height: 1607 },
]

function MarqueeItems({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex items-center gap-14 pr-14" aria-hidden={hidden || undefined}>
      {clients.map((c) => (
        <li key={c.name} className="flex items-center h-10 flex-shrink-0">
          {c.logo ? (
            <Image
              src={c.logo}
              alt={hidden ? '' : c.name}
              width={c.width}
              height={c.height}
              unoptimized
              className={`${c.height > c.width ? 'h-10' : 'h-7'} w-auto max-w-[200px] object-contain opacity-55 [filter:brightness(0)]`}
            />
          ) : (
            <span className="font-mono text-[13px] uppercase tracking-[0.08em] text-black/50 whitespace-nowrap">
              {c.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}

export default function ClientsMarquee() {
  return (
    <div className="py-5 overflow-hidden" aria-label="Наши клиенты">
      {/* Track doubled for a seamless loop; the copy is hidden from screen readers */}
      <div className="marquee-track flex w-max">
        <MarqueeItems />
        <MarqueeItems hidden />
      </div>
    </div>
  )
}
