import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

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
        <div className="flex items-center justify-center gap-2 md:justify-start">
          <Badge variant="outline" className="border-emerald-500/25 bg-emerald-500/10 text-emerald-200">
            Work
          </Badge>
          <p className="text-xs tracking-wide text-muted-foreground">WHERE WE FIT</p>
        </div>
        <h2 className="dc-animate-heading [--dc-delay:60ms] mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          Experience where stakes are real.
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
          We partner with teams that need dependable delivery, crisp UX, and systems thinking.
        </p>
        </div>

        <Separator className="my-8" />

        <div className="grid gap-4 md:grid-cols-2">
          {industries.map((item) => (
            <div key={item.title} className="rounded-xl border border-border/60 bg-background/40 p-5">
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
