import Link from 'next/link'
import { Mail, Send, Phone } from 'lucide-react'
import { PHONE, PHONE_HREF, TELEGRAM_URL } from '@/lib/utils'

export default function Footer() {
  return (
    <footer className="bg-night text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-fluid-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-bold tracking-tight text-white hover:text-accent font-display transition-colors">
              КВИНТ
            </Link>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              Маркетинговое агентство для B2B
              <br />
              IT B2B, премиум-ритейл, производство, недвижимость
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="eyebrow mb-4 !text-white/45">Навигация</p>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/uslugi', label: 'Услуги' },
                { href: '/otrasli', label: 'Отрасли' },
                { href: '/cases', label: 'Кейсы' },
                { href: '/ceny', label: 'Цены' },
                { href: '/razbor', label: 'Разбор с основательницей' },
                { href: '/kalkulyator-zayavki', label: 'Калькулятор заявки' },
                { href: '/o-kompanii', label: 'О компании' },
                { href: '/ekaterina-danilkina', label: 'Екатерина Данилкина' },
                { href: '/blog', label: 'Блог' },
                { href: '/kontakty', label: 'Контакты' },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="link-underline self-start text-sm text-white/60 hover:text-white transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <p className="eyebrow mb-4 !text-white/45">Контакты</p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@kvint.agency"
                className="link-underline self-start inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                <Mail size={15} />
                hello@kvint.agency
              </a>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline self-start inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                <Send size={15} />
                @kvint_agency
              </a>
              <a href={PHONE_HREF} className="link-underline self-start inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                <Phone size={15} />
                {PHONE}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs text-white/60 font-mono">
          <p>
            © {new Date().getFullYear()} Квинт · ИП Данилкина Екатерина Денисовна · ИНН 631607801908 · ОГРНИП 326632700136276
          </p>
          <Link href="/privacy" className="link-underline self-start lg:self-auto hover:text-white transition-colors">
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  )
}
