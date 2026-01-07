import { Quote } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const testimonials = [
  {
    quote:
      '“DevCon1 took ownership quickly, communicated clearly, and shipped a polished result. The handoff was thorough and easy to maintain.”',
    name: 'Client Name',
    company: 'Company / Org',
  },
  {
    quote:
      '“Strong engineering instincts and great UX judgment. The delivery cadence kept us confident and reduced risk throughout the build.”',
    name: 'Client Name',
    company: 'Company / Org',
  },
  {
    quote:
      '“Reliable, pragmatic, and security-aware. We saw immediate improvements in performance and overall clarity.”',
    name: 'Client Name',
    company: 'Company / Org',
  },
] as const

export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center gap-2 md:justify-start">
            <Badge variant="outline" className="border-emerald-500/25 bg-emerald-500/10 text-emerald-200">
              Testimonials
            </Badge>
            <p className="text-xs tracking-wide text-muted-foreground">SOCIAL PROOF</p>
          </div>
          <h2 className="dc-animate-heading [--dc-delay:60ms] mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            Trusted by teams that care about quality.
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
            Swap these examples with real client feedback (quote + name/company, optional logo).
          </p>
        </div>

        <Separator className="my-8" />

        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure key={`${item.name}-${item.company}`} className="rounded-xl border border-border/60 bg-background/40 p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-medium tracking-wide text-muted-foreground">CLIENT FEEDBACK</p>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-emerald-500/15 bg-emerald-500/10">
                  <Quote className="h-4 w-4 text-emerald-400" />
                </span>
              </div>
              <blockquote className="mt-3 text-sm text-muted-foreground">{item.quote}</blockquote>
              <figcaption className="mt-5">
                <p className="text-sm font-semibold text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.company}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

