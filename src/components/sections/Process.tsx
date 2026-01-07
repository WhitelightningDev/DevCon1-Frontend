import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const steps = [
  {
    title: 'Align',
    detail: 'Goals, constraints, and a thin-slice plan that de-risks early.',
  },
  {
    title: 'Design',
    detail: 'Wireframes and UI direction: sleek, readable, and operationally useful.',
  },
  {
    title: 'Build',
    detail: 'Type-safe implementation with shippable increments and reviewable PRs.',
  },
  {
    title: 'Harden',
    detail: 'Security checks, performance tuning, and production readiness.',
  },
  {
    title: 'Launch',
    detail: 'Deployment, monitoring hooks, and a calm handoff with documentation.',
  },
] as const

export function Process() {
  return (
    <section id="process" className="scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center gap-2 md:justify-start">
            <Badge variant="outline" className="border-emerald-500/25 bg-emerald-500/10 text-emerald-200">
              Process
            </Badge>
            <p className="text-xs tracking-wide text-muted-foreground">HOW WE SHIP</p>
          </div>
          <h2 className="dc-animate-heading [--dc-delay:60ms] mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            Tight loops. Clear checkpoints.
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
            A pragmatic flow that keeps risk down and quality up—especially when requirements evolve.
          </p>
        </div>

        <Separator className="my-8" />

        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-xl border border-border/60 bg-background/40 p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">{step.title}</p>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-emerald-500/15 bg-emerald-500/10 text-sm font-semibold text-emerald-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
