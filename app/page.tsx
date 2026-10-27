import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import ClientsMarquee from '@/components/sections/ClientsMarquee'
import ForWho from '@/components/sections/ForWho'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import CasesPreview from '@/components/sections/CasesPreview'
import FAQ from '@/components/sections/FAQ'
import Testimonials from '@/components/sections/Testimonials'
import Team from '@/components/sections/Team'
import MainCTA from '@/components/sections/MainCTA'
import ContactSection from '@/components/sections/ContactSection'

export const metadata: Metadata = {
  title: 'Маркетинговое агентство Квинт — маркетинг для B2B с расчётом окупаемости',
  description:
    'Маркетинг для B2B: IT, премиум-ритейл, производство, недвижимость. Разбираем бизнес целиком и считаем, сколько приносит каждый рубль рекламы. Не видим окупаемости — не берём проект. С августа 2024 года выполнили 54 проекта',
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
