const industries = [
  {
    title: 'Defense & National Security',
    detail: 'Operator-facing apps, mission support tooling, and secure delivery practices.',
  },
  {
    title: 'Critical Infrastructure',
    detail: 'UIs and integrations for reliability, safety, and operational continuity.',
  },
  {
    title: 'Aerospace & Robotics',
    detail: 'Telemetry dashboards, workflow tools, and data-heavy UX patterns.',
  },
  {
    title: 'GovTech & Public Sector',
    detail: 'Accessible, maintainable systems built for real-world constraints.',
  },
] as const

export function Industries() {
  return (
    <section id="work" className="scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center md:text-left">
          <p className="dc-kicker">Work</p>
          <h2 className="dc-animate-heading dc-h2 [--dc-delay:60ms] mt-3">
            Experience where stakes are real.
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
            We partner with teams that need dependable delivery, crisp UX, and systems thinking.
          </p>
        </div>

        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {industries.map((item) => (
            <li key={item.title} className="rounded-lg border border-border/60 bg-background/40 p-4">
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
