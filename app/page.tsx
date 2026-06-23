import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import ClientsMarquee from '@/components/sections/ClientsMarquee'
import ForWho from '@/components/sections/ForWho'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import CasesPreview from '@/components/sections/CasesPreview'
import Testimonials from '@/components/sections/Testimonials'
import Comparison from '@/components/sections/Comparison'
import Team from '@/components/sections/Team'
import MainCTA from '@/components/sections/MainCTA'
import ContactSection from '@/components/sections/ContactSection'

export const metadata: Metadata = {
  title: 'Маркетинговое агентство Квинт — стратегический партнёр для IT, финтех и B2B бизнеса',
  description:
    'Бутиковое маркетинговое агентство. Работаем с IT-компаниями, финтехом и B2B — от стратегии до результата. 124 проекта, города-миллионники и вся Россия. Оставьте заявку.',
}

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <ClientsMarquee />
        <ForWho />
        <Services />
        <Process />
        <CasesPreview />
        <Testimonials />
        <Comparison />
        <Team />
        <MainCTA />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
