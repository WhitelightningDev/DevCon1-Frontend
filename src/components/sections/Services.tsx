import { Binary, Eye, ShieldCheck } from 'lucide-react'

const serviceGroups = [
  {
    title: 'Build',
    description: 'Ship features and systems that scale.',
    icon: Binary,
    bullets: ['Product & platform engineering', 'Integrations & APIs', 'PWA / offline-first'],
  },
  {
    title: 'Improve',
    description: 'Make what you have faster, clearer, and more usable.',
    icon: Eye,
    bullets: ['Performance & UX audit', 'Accessibility audit', 'Design system cleanup'],
  },
  {
    title: 'Operate',
    description: 'Reliability, safety, and calm production delivery.',
    icon: ShieldCheck,
    bullets: ['Security & hardening', 'Observability & runbooks', 'DevOps / CI/CD'],
  },
] as const

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center md:text-left">
          <p className="dc-kicker">Services</p>
          <h2 className="dc-animate-heading dc-h2 [--dc-delay:60ms] mt-3">
            A simple menu of help.
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
            Grouped into three buckets so it’s easy to pick the right starting point.
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
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {group.bullets.map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground md:text-left">
          Need help choosing? Use the contact form and we’ll recommend the smallest starting scope.
        </p>
      </div>
    </section>
  )
}
