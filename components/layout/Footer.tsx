import Link from 'next/link'
import { Mail, Send, Phone } from 'lucide-react'
import { PHONE, PHONE_HREF, TELEGRAM_URL } from '@/lib/utils'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-fluid-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-bold tracking-tight text-white hover:text-accent transition-colors">
              КВИНТ
            </Link>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Бутиковое маркетинговое агентство
              <br />
              IT B2B, премиум-ритейл, производство, недвижимость
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="eyebrow mb-4">Навигация</p>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/cases', label: 'Кейсы' },
                { href: '/blog', label: 'Блог' },
                { href: '/#about', label: 'О нас' },
                { href: '/#contact', label: 'Контакты' },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="link-underline self-start text-sm text-muted hover:text-text transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <p className="eyebrow mb-4">Контакты</p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@kvint.agency"
                className="link-underline self-start inline-flex items-center gap-2 text-sm text-muted hover:text-text transition-colors"
              >
                <Mail size={15} />
                hello@kvint.agency
              </a>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline self-start inline-flex items-center gap-2 text-sm text-muted hover:text-text transition-colors"
              >
                <Send size={15} />
                @kvint_agency
              </a>
              <a href={PHONE_HREF} className="link-underline self-start inline-flex items-center gap-2 text-sm text-muted hover:text-text transition-colors">
                <Phone size={15} />
                {PHONE}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs text-muted font-mono">
          <p>
            © {new Date().getFullYear()} Квинт · ИП Данилкина Екатерина Денисовна · ИНН 631607801908 · ОГРНИП 326632700136276
          </p>
          <Link href="/privacy" className="link-underline self-start lg:self-auto hover:text-text transition-colors">
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  )
}
