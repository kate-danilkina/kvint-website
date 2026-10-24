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
import FAQ from '@/components/sections/FAQ'
import Team from '@/components/sections/Team'
import MainCTA from '@/components/sections/MainCTA'
import ContactSection from '@/components/sections/ContactSection'

export const metadata: Metadata = {
  title: 'Маркетинговое агентство Квинт — реклама, сайт и аналитика для IT B2B, ритейла, производства и недвижимости',
  description:
    'Бутиковое маркетинговое агентство: IT B2B, премиум-ритейл, производство, недвижимость. 125 проектов. Разбор маркетинга с основательницей за 60 минут — 10 000 ₽.',
}

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <ClientsMarquee />
        <CasesPreview />
        <Team />
        <MainCTA />
        <Process />
        <Services />
        <ForWho />
        <Testimonials />
        <FAQ />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
