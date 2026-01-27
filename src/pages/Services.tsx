import { useEffect } from 'react'
import {
  ArrowRight,
  Activity,
  BadgeCheck,
  Boxes,
  Eye,
  FileText,
  HardHat,
  Lock,
  Radar,
  ServerCog,
  Shield,
  Smartphone,
  Wrench,
} from 'lucide-react'

import { CircuitBoard } from '@/components/illustrations/CircuitBoard'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { PageBackground } from '@/components/layout/PageBackground'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { setSeo } from '@/lib/seo'

const offerings = [
  {
    title: 'Product & Platform Engineering',
    description: 'React/TypeScript delivery, component systems, performance, and pragmatic architecture.',
    icon: Boxes,
  },
  {
    title: 'Integrations & APIs',
    description: 'API design, third-party integrations, ETL/data sync, and reliable data contracts.',
    icon: ServerCog,
  },
  {
    title: 'Secure Web Delivery',
    description: 'Threat-aware implementation, authZ patterns, dependency hygiene, and security hardening.',
    icon: Shield,
  },
  {
    title: 'DevEx & CI/CD',
    description: 'Build pipelines, release workflows, environment strategy, and developer productivity.',
    icon: Wrench,
  },
  {
    title: 'Performance & UX Audit',
    description: 'Core Web Vitals, conversion paths, and usability improvements that move metrics.',
    icon: Activity,
  },
  {
    title: 'Accessibility Audit',
    description: 'WCAG-focused review and remediation: keyboard, contrast, semantics, and forms.',
    icon: Eye,
  },
  {
    title: 'Observability & Runbooks',
    description: 'Logging/metrics hooks, alerting basics, and operational documentation for ownership.',
    icon: BadgeCheck,
  },
  {
    title: 'PWA / Offline-first',
    description: 'Installable apps, caching strategy, update flows, and resilient UX.',
    icon: Smartphone,
  },
] as const

const engagementModels = [
  {
    title: 'Project Delivery',
    description: 'Fixed scope with clear milestones: discovery → build → harden → ship.',
    icon: FileText,
    idealFor: 'Marketing sites, MVPs, and well-defined features with a clear “done”.',
    timeline: '1–6 weeks (scope dependent)',
    deliverables: 'Milestones + PRs, docs, deployment checklist, and handoff.',
  },
  {
    title: 'Sprint Blocks',
    description: 'Time-boxed delivery for teams that want quick progress without long commitments.',
    icon: Radar,
    idealFor: 'Roadmap progress, UX improvements, integrations, or hardening work.',
    timeline: '1–2 week sprints',
    deliverables: 'Shipped increments, demos, backlog updates, and next-sprint plan.',
  },
  {
    title: 'Retainer',
    description: 'Ongoing engineering support for roadmap execution, reliability, and maintenance.',
    icon: HardHat,
    idealFor: 'Teams that want ongoing support: features, uptime, and iteration.',
    timeline: 'Monthly',
    deliverables: 'Dedicated capacity, optional SLAs, and continuous improvements.',
  },
] as const

const proofPoints = [
  {
    title: 'Security-first defaults',
    detail: 'Least privilege, safe-by-default patterns, and reviewable controls.',
    icon: Lock,
  },
  {
    title: 'Operational clarity',
    detail: 'Observability hooks and runbook-minded delivery for calm operations.',
    icon: BadgeCheck,
  },
] as const

export function ServicesPage() {
  useEffect(() => {
    setSeo({
      title: 'DevCon1 — Services',
      description:
        'Product & platform engineering, integrations, performance/UX, accessibility, security hardening, CI/CD, observability, and PWA delivery.',
      imagePath: '/pwa/icon-512.png',
    })
  }, [])

  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <PageBackground />

      <Navbar cta={{ label: 'Start a project', href: '/contact' }} />

      <main id="main">
        <section className="relative overflow-hidden pb-10 pt-12 md:pb-16 md:pt-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                  <Badge variant="outline" className="border-emerald-500/25 bg-emerald-500/10 text-emerald-200">
                    Services
                  </Badge>
                  <Badge variant="outline" className="border-border/60 bg-background/60 text-muted-foreground">
                    Clear scope • Reliable delivery
                  </Badge>
                </div>
                <h1 className="dc-animate-heading [--dc-delay:80ms] mt-5 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  Engineering support built for{' '}
                  <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                    high-stakes delivery
                  </span>
                  .
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg md:mx-0">
                  We help teams ship secure, reliable software with a repeatable process and clean UX—delivered in
                  reviewable milestones and handed off for long-term ownership.
                </p>

                <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:items-start md:justify-start">
                  <Button asChild className="bg-emerald-500 text-emerald-950 hover:bg-emerald-400">
                    <a href="#contact">
                      Talk to us <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-border/60 bg-transparent hover:bg-muted">
                    <a href="#offerings">See offerings</a>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative rounded-2xl border border-emerald-500/15 bg-gradient-to-b from-emerald-500/10 to-background/30 p-6">
                  <div className="pointer-events-none absolute inset-x-4 top-4 opacity-90">
                    <CircuitBoard className="h-28 w-full text-emerald-300/55" />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium tracking-wide text-muted-foreground">DELIVERY PRINCIPLES</p>
                    <Badge variant="outline" className="border-emerald-500/25 bg-emerald-500/10 text-emerald-200">
                      TEMPLATE
                    </Badge>
                  </div>
                  <div className="mt-24 grid gap-3">
                    {proofPoints.map((item) => {
                      const Icon = item.icon
                      return (
                        <div key={item.title} className="rounded-lg border border-border/60 bg-background/40 p-4">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <Icon className="h-4 w-4 text-emerald-400" />
                            {item.title}
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="offerings" className="scroll-mt-24 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Badge variant="outline" className="border-emerald-500/25 bg-emerald-500/10 text-emerald-200">
                  Offerings
                </Badge>
                <p className="text-xs tracking-wide text-muted-foreground">WHAT YOU CAN SELL</p>
              </div>
              <h2 className="dc-animate-heading [--dc-delay:60ms] mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                A focused set of services.
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
                A clear menu of services, sold as projects, sprint blocks, or ongoing support.
              </p>
            </div>

            <Separator className="my-8" />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {offerings.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-border/60 bg-background/40 p-5 transition-colors hover:border-emerald-500/20"
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

        <section id="engagement" className="scroll-mt-24 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Badge variant="outline" className="border-emerald-500/25 bg-emerald-500/10 text-emerald-200">
                  Engagement
                </Badge>
                <p className="text-xs tracking-wide text-muted-foreground">HOW YOU WORK</p>
              </div>
              <h2 className="dc-animate-heading [--dc-delay:60ms] mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                Simple options, clear outcomes.
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
                Choose the engagement model that best fits your timeline and internal capacity.
              </p>
            </div>

            <Separator className="my-8" />

            <div className="grid gap-4 md:grid-cols-3">
              {engagementModels.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="rounded-xl border border-border/60 bg-background/40 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">{item.title}</p>
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-emerald-500/15 bg-emerald-500/10">
                        <Icon className="h-4 w-4 text-emerald-400" />
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                    <div className="mt-4 rounded-lg border border-border/60 bg-background/50 p-4">
                      <p className="text-xs font-medium tracking-wide text-muted-foreground">DETAILS</p>
                      <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                        <li>Ideal for: {item.idealFor}</li>
                        <li>Typical timeline: {item.timeline}</li>
                        <li>Deliverables: {item.deliverables}</li>
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-24 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Badge variant="outline" className="border-emerald-500/25 bg-emerald-500/10 text-emerald-200">
                  FAQ
                </Badge>
                <p className="text-xs tracking-wide text-muted-foreground">COMMON QUESTIONS</p>
              </div>
              <h2 className="dc-animate-heading [--dc-delay:60ms] mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                Answer the big questions.
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
                Short answers to help you evaluate fit quickly.
              </p>
            </div>

            <Separator className="my-8" />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-border/60 bg-background/40 p-5">
                <p className="text-sm font-semibold">What do you build?</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Web apps, dashboards, and internal tools—plus integrations, delivery enablement, and hardening work for
                  teams in demanding environments.
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-background/40 p-5">
                <p className="text-sm font-semibold">How do engagements start?</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Discovery call → short brief → proposal with milestones → kickoff.
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-background/40 p-5">
                <p className="text-sm font-semibold">What’s your security posture?</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Secure defaults, least-privilege access, code review, and documented handoff practices.
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-background/40 p-5">
                <p className="text-sm font-semibold">Can you work with our team?</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Yes — embedded delivery, pairing, PR reviews, or a take-ownership workstream with regular demos.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="rounded-2xl border border-emerald-500/15 bg-gradient-to-b from-emerald-500/10 to-background/30 p-6 md:p-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center gap-2 md:justify-start">
                    <Badge variant="outline" className="border-emerald-500/25 bg-emerald-500/10 text-emerald-200">
                      Contact
                    </Badge>
                    <p className="text-xs tracking-wide text-muted-foreground">NEXT STEP</p>
                  </div>
                  <h2 className="dc-animate-heading [--dc-delay:60ms] mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                    Tell us what you’re building.
                  </h2>
                  <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
                    Email or call with a short brief and we’ll reply within 1 business day.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:items-end md:justify-end">
                  <Button asChild className="bg-emerald-500 text-emerald-950 hover:bg-emerald-400">
                    <a href="/contact">
                      Contact us <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-border/60 bg-transparent hover:bg-muted">
                    <a href="/">Back to home</a>
                  </Button>
                </div>
              </div>

              <Separator className="my-8" />

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-border/60 bg-background/40 p-5">
                  <p className="text-sm font-semibold">Brief template</p>
                  <p className="mt-1 text-sm text-muted-foreground">Goal, users, constraints, timeline, success metric.</p>
                </div>
                <div className="rounded-xl border border-border/60 bg-background/40 p-5">
                  <p className="text-sm font-semibold">Preferred stack</p>
                  <p className="mt-1 text-sm text-muted-foreground">React/TS, shadcn/ui, API-first, CI/CD ready.</p>
                </div>
                <div className="rounded-xl border border-border/60 bg-background/40 p-5">
                  <p className="text-sm font-semibold">Compliance</p>
                  <p className="mt-1 text-sm text-muted-foreground">We can align to your control set (SOC2/ISO/internal).</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
