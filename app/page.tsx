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
import LeadMagnetDivider from '@/components/sections/LeadMagnetDivider'
import Comparison from '@/components/sections/Comparison'
import Team from '@/components/sections/Team'
import MainCTA from '@/components/sections/MainCTA'
import ContactSection from '@/components/sections/ContactSection'

export const metadata: Metadata = {
  title: 'Квинт — Маркетинговое агентство | Системный маркетинг для бизнеса',
  description:
    'Бутиковое маркетинговое агентство полного цикла. Работаем с IT B2B, премиальным ритейлом, производством. Личный контроль фаундера, прозрачная аналитика, результат от 80 000 ₽/мес.',
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ClientsMarquee />
        <ForWho />
        <Services />
        <Process />
        <CasesPreview />
        <Testimonials />
        <LeadMagnetDivider />
        <Comparison />
        <Team />
        <MainCTA />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
