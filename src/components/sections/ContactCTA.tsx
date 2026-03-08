import { Mail, PhoneCall } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function ContactCTA() {
  const bookingUrl = (import.meta.env.VITE_BOOKING_URL as string | undefined) || ''

  return (
    <section id="contact" className="scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-xl border border-border/60 bg-background/40 p-6 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-xs font-medium tracking-wide text-muted-foreground">CONTACT</p>
              <h2 className="dc-animate-heading [--dc-delay:60ms] mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                Ready to ship something solid?
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
                Share a short brief and we’ll reply within 1 business day.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:items-end md:justify-end">
              <Button asChild>
                <a href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Start a project
                </a>
              </Button>
              <Button asChild variant="outline">
                <a
                  href={bookingUrl || 'tel:+27746588885'}
                  target={bookingUrl ? '_blank' : undefined}
                  rel={bookingUrl ? 'noreferrer' : undefined}
                >
                  <PhoneCall className="mr-2 h-4 w-4" />
                  {bookingUrl ? 'Book a call' : 'Call'}
                </a>
              </Button>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground md:text-left">
            Engagements: projects, sprint blocks, or retainers • Remote-first, US-aligned availability
          </p>
        </div>
      </div>
    </section>
  )
}
