import { Mail, PhoneCall } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export function ContactCTA() {
  return (
    <section id="contact" className="scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-2xl border border-emerald-500/15 bg-gradient-to-b from-emerald-500/10 to-background/30 p-6 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Badge variant="outline" className="border-emerald-500/25 bg-emerald-500/10 text-emerald-200">
                  Contact
                </Badge>
                <p className="text-xs tracking-wide text-muted-foreground">LET'S BUILD</p>
              </div>
              <h2 className="dc-animate-heading [--dc-delay:60ms] mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                Ready to ship something solid?
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
                Share a short brief and we’ll reply with timeline options and a delivery plan.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:items-end md:justify-end">
              <Button asChild className="bg-emerald-500 text-emerald-950 hover:bg-emerald-400">
                <a href="mailto:systems.devconone@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Email us
                </a>
              </Button>
              <Button asChild variant="outline" className="border-border/60 bg-transparent hover:bg-muted">
                <a href="tel:+27746588885">
                  <PhoneCall className="mr-2 h-4 w-4" />
                  Call
                </a>
              </Button>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border/60 bg-background/40 p-5">
              <p className="text-sm font-semibold">Response time</p>
              <p className="mt-1 text-sm text-muted-foreground">Usually within 1 business day.</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-background/40 p-5">
              <p className="text-sm font-semibold">Engagements</p>
              <p className="mt-1 text-sm text-muted-foreground">Sprints, retainers, or project delivery.</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-background/40 p-5">
              <p className="text-sm font-semibold">Timezone</p>
              <p className="mt-1 text-sm text-muted-foreground">Remote-first, US-aligned availability.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
