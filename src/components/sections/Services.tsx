import { Binary, Eye, ShieldCheck } from 'lucide-react'

import { StartProjectDialog } from '@/components/project/StartProjectDialog'
import { Button } from '@/components/ui/button'

const serviceGroups = [
  {
    title: 'Build',
    description: 'Ship new capability with clean architecture.',
    icon: Binary,
    image: { src: '/imagery/infrastructure.jpg', alt: 'Modern infrastructure and systems' },
    bullets: ['Product & platform engineering', 'Integrations & APIs', 'Offline-ready PWAs'],
  },
  {
    title: 'Improve',
    description: 'Make existing product faster and clearer.',
    icon: Eye,
    image: { src: '/imagery/collaboration.jpg', alt: 'Collaboration and refinement' },
    bullets: ['Performance & UX audit', 'Accessibility audit', 'Design system cleanup'],
  },
  {
    title: 'Operate',
    description: 'Keep production stable and predictable.',
    icon: ShieldCheck,
    image: { src: '/imagery/ai-security.jpg', alt: 'Security and hardening' },
    bullets: ['Security & hardening', 'Observability & runbooks', 'DevOps / CI/CD'],
  },
] as const

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-t border-border/40 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center md:text-left">
          <p className="dc-kicker">What we do</p>
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
              <div
                key={group.title}
                className="group overflow-hidden rounded-2xl border border-border/60 bg-background/60 shadow-sm shadow-black/5 transition-[transform,box-shadow,border-color,background-color] hover:-translate-y-0.5 hover:border-border/80 hover:bg-background hover:shadow-md hover:shadow-black/10"
              >
                <div className="relative h-28 overflow-hidden border-b border-border/60 bg-secondary/30 md:h-32">
                  <img
                    src={group.image.src}
                    alt={group.image.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-5 py-4">
                    <p className="text-sm font-semibold text-white">{group.title}</p>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur">
                      <Icon className="h-4 w-4 text-white" />
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-sm text-muted-foreground">{group.description}</p>
                  <p className="mt-4 text-sm text-foreground/90">{group.bullets.join(' • ')}</p>
                </div>
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
              <a href="/what-we-do">What we do</a>
            </Button>
            <StartProjectDialog
              defaultToWizard
              trigger={
                <Button size="sm">
                  Start a project
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </section>
  )
}
