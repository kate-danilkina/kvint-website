import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function PageShell({ children, narrow = false }: { children: React.ReactNode; narrow?: boolean }) {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-28 pb-fluid-2xl">
        <div className={`${narrow ? 'max-w-3xl' : 'max-w-5xl'} mx-auto px-4 sm:px-6 lg:px-8`}>{children}</div>
      </main>
      <Footer />
    </>
  )
}
