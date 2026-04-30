import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import TrustedBy from '@/components/sections/TrustedBy'
import Packages from '@/components/sections/Packages'
import Automations from '@/components/sections/Automations'
import Segments from '@/components/sections/Segments'
import HowItWorks from '@/components/sections/HowItWorks'
import Results from '@/components/sections/Results'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import CTA from '@/components/sections/CTA'

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <TrustedBy />
      <Packages />
      <Automations />
      <Segments />
      <HowItWorks />
      <Results />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
