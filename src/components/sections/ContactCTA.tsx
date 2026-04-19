import { Mail, PhoneCall } from 'lucide-react'

import { StartProjectDialog } from '@/components/project/StartProjectDialog'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { Button } from '@/components/ui/button'
import { isValidAbsoluteUrl } from '@/lib/validation'

export function ContactCTA() {
  const bookingUrlRaw = (import.meta.env.VITE_BOOKING_URL as string | undefined) || ''
  const bookingUrl = isValidAbsoluteUrl(bookingUrlRaw) ? bookingUrlRaw : ''

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border/40 bg-secondary/10 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          index="04"
          kicker="Contact"
          title="Ready to ship something solid?"
          description="Share a short brief and we’ll reply within 1 business day."
          actions={
            <>
              <StartProjectDialog
                defaultToWizard
                trigger={
                  <Button className="h-11 rounded-none px-5">
                    <Mail className="mr-2 h-4 w-4" />
                    Start a project
                  </Button>
                }
              />
              <Button asChild variant="outline" className="h-11 rounded-none px-5">
                <a
                  href={bookingUrl || 'tel:+27746588885'}
                  target={bookingUrl ? '_blank' : undefined}
                  rel={bookingUrl ? 'noreferrer' : undefined}
                >
                  <PhoneCall className="mr-2 h-4 w-4" />
                  {bookingUrl ? 'Book a call' : 'Call'}
                </a>
              </Button>
            </>
          }
        />

        <div className="mt-10 rounded-xl border border-border/60 bg-background/55 p-6 text-center shadow-sm shadow-black/5 md:p-8 md:text-left">
          <p className="text-xs text-muted-foreground">
            Engagements: projects, sprint blocks, or retainers • Remote-first, US-aligned availability
          </p>
        </div>
      </div>
    </section>
  )
}
