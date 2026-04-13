import { Binary, Eye, ShieldCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'

const serviceGroups = [
  {
    title: 'Build',
    description: 'Ship new capability with clean architecture.',
    icon: Binary,
    bullets: ['Product & platform engineering', 'Integrations & APIs', 'Offline-ready PWAs'],
  },
  {
    title: 'Improve',
    description: 'Make existing product faster and clearer.',
    icon: Eye,
    bullets: ['Performance & UX audit', 'Accessibility audit', 'Design system cleanup'],
  },
  {
    title: 'Operate',
    description: 'Keep production stable and predictable.',
    icon: ShieldCheck,
    bullets: ['Security & hardening', 'Observability & runbooks', 'DevOps / CI/CD'],
  },
] as const

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-t border-border/40 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center md:text-left">
          <p className="dc-kicker">Services</p>
          <h2 className="dc-animate-heading dc-h2 [--dc-delay:60ms] mt-3">
            Three ways we can help.
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
            Clear categories, no jargon—pick a starting point and we’ll scope the smallest useful first milestone.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {serviceGroups.map((group) => {
            const Icon = group.icon
            return (
              <div key={group.title} className="rounded-xl border border-border/60 bg-background/40 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{group.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{group.description}</p>
                  </div>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/60 bg-background/50">
                    <Icon className="h-4 w-4 text-primary" />
                  </span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{group.bullets.join(' • ')}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 rounded-xl border border-border/60 bg-background/40 p-4 text-center md:flex-row md:text-left">
          <p className="text-xs text-muted-foreground">
            Not sure where to start? Send a short brief—we’ll recommend the smallest scope that moves the needle.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild size="sm" variant="outline">
              <a href="/services">All services</a>
            </Button>
            <Button asChild size="sm">
              <a href="/contact">Start a project</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
