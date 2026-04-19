import { ArrowRight, ClipboardList, Code2, Palette, Rocket, ShieldCheck } from 'lucide-react'

const steps = [
  {
    title: 'Align',
    detail: 'Goals, constraints, and a thin-slice plan that de-risks early.',
    icon: ClipboardList,
  },
  {
    title: 'Design',
    detail: 'Wireframes and UI direction: sleek, readable, and operationally useful.',
    icon: Palette,
  },
  {
    title: 'Build',
    detail: 'Type-safe implementation with shippable increments and reviewable PRs.',
    icon: Code2,
  },
  {
    title: 'Harden',
    detail: 'Security checks, performance tuning, and production readiness.',
    icon: ShieldCheck,
  },
  {
    title: 'Launch',
    detail: 'Deployment, monitoring hooks, and a calm handoff with documentation.',
    icon: Rocket,
  },
] as const

export function Process() {
  return (
    <section id="process" className="relative scroll-mt-24 border-t border-border/40 bg-background/20 py-16 md:py-24">
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div className="text-center md:text-left">
            <p className="dc-kicker">Process</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Tight loops. Clear checkpoints.
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
              A pragmatic flow that keeps risk down and quality up—especially when requirements evolve.
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center md:items-end md:justify-end">
            <a
              href="/process"
              className="inline-flex h-11 items-center justify-center rounded-none border border-border/60 bg-background/60 px-5 text-sm font-semibold text-foreground shadow-sm shadow-black/5 transition-[background-color,border-color,transform,box-shadow] hover:-translate-y-0.5 hover:bg-background hover:border-border/80 hover:shadow-md hover:shadow-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View full process <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>

        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <li
                key={step.title}
                className="group rounded-2xl border border-border/60 bg-background/60 p-6 shadow-sm shadow-black/5 transition-[transform,box-shadow,border-color,background-color] hover:-translate-y-0.5 hover:border-border/80 hover:bg-background hover:shadow-md hover:shadow-black/10"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-secondary/40 text-xs font-semibold text-foreground"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-sm font-semibold tracking-tight text-foreground">{step.title}</p>
                  </div>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-secondary/40 transition-colors group-hover:bg-secondary/60">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
