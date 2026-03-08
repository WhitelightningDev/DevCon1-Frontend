import { useEffect } from 'react'

import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { PageBackground } from '@/components/layout/PageBackground'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { Hero } from '@/components/sections/Hero'
import { Industries } from '@/components/sections/Industries'
import { Process } from '@/components/sections/Process'
import { Services } from '@/components/sections/Services'
import { TrustSignals } from '@/components/sections/TrustSignals'
import { setSeo } from '@/lib/seo'

export function Home() {
  useEffect(() => {
    setSeo({
      title: 'DevCon1 — Reliable software systems for growth',
      description:
        'We build scalable software systems and digital infrastructure for businesses that need reliability, performance, and growth.',
      imagePath: '/pwa/icon-512.png',
    })
  }, [])

  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <PageBackground />

      <Navbar />

      <main id="main">
        <Hero />
        <TrustSignals />
        <Services />
        <Industries />
        <Process />
        <ContactCTA />
      </main>

      <Footer />
    </div>
  )
}
