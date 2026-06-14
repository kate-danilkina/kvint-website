import Link from 'next/link'
import { Mail, Send, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-bold tracking-tight text-white hover:text-accent transition-colors">
              КВИНТ
            </Link>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Бутиковое маркетинговое агентство<br />
              Системный маркетинг для бизнеса
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
                <Link key={l.href} href={l.href} className="text-sm text-muted hover:text-text transition-colors">
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
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
              >
                <Mail size={15} />
                hello@kvint.agency
              </a>
              <a
                href="https://t.me/kvint_agency"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
              >
                <Send size={15} />
                @kvint_agency
              </a>
              <a
                href="tel:+79930798655"
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
              >
                <Phone size={15} />
                +7 993 079 86 55
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted font-grotesk">
            © {new Date().getFullYear()} Квинт. Все права защищены.
          </p>
          <p className="text-xs text-muted/50 font-grotesk">
            Маркетинг, который работает
          </p>
        </div>
      </div>
    </footer>
  )
}
