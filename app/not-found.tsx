import Link from 'next/link'
import type { Metadata } from 'next'
import Header from '@/components/layout/Header'

export const metadata: Metadata = { title: '404 — Страница не найдена' }

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="eyebrow mb-4">Ошибка 404</p>
          <h1
            className="font-bold text-text mb-4"
            style={{ fontSize: 'clamp(80px, 15vw, 160px)', lineHeight: 1 }}
          >
            <span className="text-outline">404</span>
          </h1>
          <p className="text-muted text-lg mb-8 max-w-sm mx-auto">
            Страница не найдена. Возможно, она была перемещена или удалена.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:scale-105 transition-transform duration-200"
          >
            На главную
          </Link>
        </div>
      </main>
    </>
  )
}
