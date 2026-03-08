import { Code2, ShieldCheck, Target, Users } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const strengths = [
  { title: 'Product-minded engineering', detail: 'Clear scope, pragmatic tradeoffs, and measurable outcomes.', icon: Target },
  { title: 'Security-aware delivery', detail: 'Safe defaults, dependency hygiene, and reviewable controls.', icon: ShieldCheck },
  { title: 'Modern web systems', detail: 'React/TypeScript, API integration, performance, and maintainable UI.', icon: Code2 },
  { title: 'Collaborative partner', detail: 'Embedded delivery, crisp comms, and a handoff your team can own.', icon: Users },
] as const

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="text-center md:text-left lg:max-w-xl">
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <Badge variant="outline">About</Badge>
              <p className="text-xs tracking-wide text-muted-foreground">WHO WE ARE</p>
            </div>
            <h2 className="dc-animate-heading [--dc-delay:60ms] mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              Senior-led delivery, built on trust.
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
              DevCon1 exists to help teams ship confidently: reduce risk early, build clean systems, and hand over work
              that’s easy to operate and extend.
            </p>

            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
              <Button asChild>
                <a href="/contact">Work with us</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/work">See work</a>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 lg:w-[28rem]">
            <div className="rounded-2xl border border-border/60 bg-background/40 p-6">
              <p className="text-xs font-medium tracking-wide text-muted-foreground">FOUNDER</p>
              <div className="mt-4 flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
                <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-border/60 bg-background/50">
                  <span className="text-sm font-semibold text-primary">D1</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">Founder / Lead Engineer</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Senior, product-minded engineer focused on shipping reliable web systems with clean UX. Built and shipped
                    work across finance, bookings, legal/trust, healthcare, and industrial sites—prioritizing clarity,
                    pragmatic tradeoffs, and handoffs that teams can maintain.
                  </p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="grid gap-3 sm:grid-cols-2">
                {strengths.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.title} className="rounded-xl border border-border/60 bg-background/40 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold">{item.title}</p>
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/60 bg-background/50">
                          <Icon className="h-4 w-4 text-primary" />
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
