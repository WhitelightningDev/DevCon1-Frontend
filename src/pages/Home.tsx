import { useEffect } from 'react'

import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { PageBackground } from '@/components/layout/PageBackground'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { FeaturedWork } from '@/components/sections/FeaturedWork'
import { Hero } from '@/components/sections/Hero'
import { Process } from '@/components/sections/Process'
import { Services } from '@/components/sections/Services'
import { setSeo } from '@/lib/seo'

export function Home() {
  useEffect(() => {
    setSeo({
      title: 'HKFT Services — Engineering support built for high-stakes delivery',
      description:
        'We build and improve web apps, integrations, and AI-enabled workflows—delivered with secure defaults, performance focus, and a clean handoff.',
      imagePath: '/pwa/icon-512.png',
    })
  }, [])

  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <PageBackground />

      <Navbar />

      <main id="main">
        <Hero />
        <FeaturedWork />
        <Services />
        <Process />
        <ContactCTA />
      </main>

      <Footer />
    </div>
  )
}
