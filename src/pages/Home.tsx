import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { PageBackground } from '@/components/layout/PageBackground'
import { About } from '@/components/sections/About'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { Hero } from '@/components/sections/Hero'
import { Industries } from '@/components/sections/Industries'
import { Pricing } from '@/components/sections/Pricing'
import { Process } from '@/components/sections/Process'
import { Services } from '@/components/sections/Services'

export function Home() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <PageBackground />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Services />
        <Pricing />
        <Industries />
        <Process />
        <ContactCTA />
      </main>

      <Footer />
    </div>
  )
}
