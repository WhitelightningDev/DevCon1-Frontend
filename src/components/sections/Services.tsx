import { Binary, Database, ShieldCheck, Wrench } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const services = [
  {
    title: 'Web Apps & Dashboards',
    description: 'Operator-friendly UIs with secure auth, role-based access, and fast performance.',
    icon: Binary,
  },
  {
    title: 'Systems Integration',
    description: 'APIs, data pipelines, and glue code to connect legacy systems to modern stacks.',
    icon: Database,
  },
  {
    title: 'Security & Hardening',
    description: 'Threat modeling, secure patterns, dependency hygiene, and best-practice reviews.',
    icon: ShieldCheck,
  },
  {
    title: 'Delivery Enablement',
    description: 'CI/CD, environments, build tooling, and engineering workflows that scale.',
    icon: Wrench,
  },
] as const

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <Badge variant="outline" className="border-emerald-500/25 bg-emerald-500/10 text-emerald-200">
                Services
              </Badge>
              <p className="text-xs tracking-wide text-muted-foreground">WHAT WE DO</p>
            </div>
            <h2 className="dc-animate-heading [--dc-delay:60ms] mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              Built for clarity and control.
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
              A small set of high-leverage offerings that help teams move quickly—without compromising safety,
              maintainability, or UX.
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="group rounded-xl border border-border/60 bg-background/40 p-5 transition-colors hover:border-emerald-500/20"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-emerald-500/15 bg-emerald-500/10">
                    <Icon className="h-4 w-4 text-emerald-400" />
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
