import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { Hero } from '@/components/sections/Hero'
import { Industries } from '@/components/sections/Industries'
import { Process } from '@/components/sections/Process'
import { Services } from '@/components/sections/Services'

export function Home() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(16,185,129,0.18),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.10),transparent_45%)]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/20 to-background" />
      </div>

      <Navbar />

      <main>
        <Hero />
        <Services />
        <Industries />
        <Process />
        <ContactCTA />
      </main>

      <Footer />
    </div>
  )
}

