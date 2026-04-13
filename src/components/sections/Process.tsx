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
    <section id="process" className="scroll-mt-24 border-t border-border/40 bg-background/30 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center md:text-left">
          <p className="dc-kicker">Process</p>
          <h2 className="dc-animate-heading dc-h2 [--dc-delay:60ms] mt-3">
            Tight loops. Clear checkpoints.
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
            A pragmatic flow that keeps risk down and quality up—especially when requirements evolve.
          </p>
        </div>

        <ol className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-lg border border-border/60 bg-background/40 p-4">
              <p className="text-sm font-semibold">
                <span className="mr-2 text-primary">{String(index + 1).padStart(2, '0')}.</span>
                {step.title}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
