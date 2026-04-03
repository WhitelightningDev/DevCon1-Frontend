import { useEffect } from 'react'
import {
  ArrowRight,
  Activity,
  BadgeCheck,
  Boxes,
  Bot,
  Eye,
  FileText,
  HardHat,
  Radar,
  ServerCog,
  Shield,
  Wrench,
} from 'lucide-react'

import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { PageBackground } from '@/components/layout/PageBackground'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { setSeo } from '@/lib/seo'

const offerings = [
  {
    title: 'Product & Platform Engineering',
    description: 'React/TypeScript delivery with pragmatic architecture and predictable milestones.',
    icon: Boxes,
    includes: ['Component systems & design tokens', 'Feature delivery via PR milestones', 'Maintainable patterns for scale'],
  },
  {
    title: 'AI Integration (Existing Infrastructure)',
    description: 'Add AI capability to current systems without rewriting everything.',
    icon: Bot,
    includes: ['LLM APIs + tool integrations', 'RAG/search over internal knowledge', 'Guardrails, evals, and rollout strategy'],
  },
  {
    title: 'Integrations & APIs',
    description: 'API design and integration work with resilient data contracts and clear ownership.',
    icon: ServerCog,
    includes: ['API design & versioning strategy', 'Webhooks, third-party integrations', 'ETL/data sync reliability'],
  },
  {
    title: 'Security Hardening',
    description: 'Threat-aware implementation with secure defaults and reviewable controls.',
    icon: Shield,
    includes: ['AuthN/AuthZ patterns & least privilege', 'Dependency + secrets hygiene', 'Hardening checklist + handoff notes'],
  },
  {
    title: 'Performance & UX Optimization',
    description: 'Core Web Vitals, conversion flows, and usability fixes tied to measurable outcomes.',
    icon: Activity,
    includes: ['Core Web Vitals triage + fixes', 'UX flow improvements for key paths', 'Metrics + instrumentation guidance'],
  },
  {
    title: 'Accessibility & Compliance',
    description: 'WCAG-focused audit and remediation: keyboard, contrast, semantics, and forms.',
    icon: Eye,
    includes: ['Audit + prioritized remediation plan', 'Keyboard + screen reader testing', 'Accessible component patterns'],
  },
  {
    title: 'DevEx, CI/CD & Release',
    description: 'Build pipelines, release workflows, and environment strategy for calm delivery.',
    icon: Wrench,
    includes: ['CI/CD pipelines + quality gates', 'Release & environment strategy', 'Deployment checklist + runbook starter'],
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
    icon: BadgeCheck,
  },
  {
    title: 'Operational clarity',
    detail: 'Observability hooks and runbook-minded delivery for calm operations.',
    icon: Radar,
  },
] as const

export function ServicesPage() {
  useEffect(() => {
    setSeo({
      title: 'HKFT Services — Services',
      description:
        'Product & platform engineering, AI integration, integrations, performance/UX, accessibility, security hardening, and CI/CD delivery.',
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
            <div className="mx-auto max-w-3xl text-center">
              <p className="dc-kicker">Services</p>
              <h1 className="dc-animate-heading dc-h1 [--dc-delay:80ms] mt-3 text-foreground">
                Engineering support built for <span className="text-primary">high-stakes delivery</span>.
              </h1>
              <p className="mx-auto mt-4 max-w-2xl dc-lead">
                We help teams ship secure, reliable software with a repeatable process and clean UX—delivered in
                reviewable milestones and handed off for long-term ownership.
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild>
                  <a href="#contact">
                    Talk to us <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-border/60 bg-transparent hover:bg-muted">
                  <a href="#offerings">See offerings</a>
                </Button>
              </div>

              <ul className="mt-8 grid gap-3 text-left sm:grid-cols-2">
                {proofPoints.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.title} className="rounded-lg border border-border/60 bg-background/40 p-4">
                      <p className="flex items-center gap-2 text-sm font-semibold">
                        <Icon className="h-4 w-4 text-primary" />
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </section>

        <section id="offerings" className="scroll-mt-24 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="text-center md:text-left">
                <p className="dc-kicker">Offerings</p>
                <h2 className="dc-animate-heading dc-h2 [--dc-delay:60ms] mt-3">
                  A focused set of services.
                </h2>
                <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
                  Seven core capabilities—delivered as projects, sprint blocks, or ongoing support with a clean handoff.
                </p>
              </div>

              <div className="flex flex-col items-center gap-2 md:items-end">
                <Button asChild variant="outline">
                  <a href="#contact">Request a proposal</a>
                </Button>
                <p className="text-xs text-muted-foreground">Reply within 1 business day.</p>
              </div>
            </div>

            <Separator className="my-8" />

            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {offerings.map((item) => {
                const Icon = item.icon
                return (
                  <li
                    key={item.title}
                    className="group relative overflow-hidden rounded-2xl border border-border/70 bg-background/55 p-6 shadow-sm shadow-black/5 backdrop-blur transition-colors hover:border-primary/25 hover:bg-background/75"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-semibold tracking-tight">{item.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/15 bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </span>
                    </div>

                    <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                      {item.includes.map((line) => (
                        <li key={line} className="flex items-start gap-2">
                          <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/10">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          </span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              })}
            </ul>

            <p className="mt-6 text-center text-xs text-muted-foreground md:text-left">
              Need observability/runbooks, PWA work, or other specialist delivery? Ask—these are available by request.
            </p>
          </div>
        </section>

        <section id="engagement" className="scroll-mt-24 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center md:text-left">
              <p className="dc-kicker">Engagement</p>
              <h2 className="dc-animate-heading dc-h2 [--dc-delay:60ms] mt-3">
                Simple options, clear outcomes.
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
                Choose the engagement model that best fits your timeline and internal capacity.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {engagementModels.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="rounded-xl border border-border/60 bg-background/40 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">{item.title}</p>
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/60 bg-background/50">
                        <Icon className="h-4 w-4 text-primary" />
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <li>
                        <span className="font-medium text-foreground">Ideal for:</span> {item.idealFor}
                      </li>
                      <li>
                        <span className="font-medium text-foreground">Timeline:</span> {item.timeline}
                      </li>
                      <li>
                        <span className="font-medium text-foreground">Deliverables:</span> {item.deliverables}
                      </li>
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-24 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center md:text-left">
              <p className="dc-kicker">FAQ</p>
              <h2 className="dc-animate-heading dc-h2 [--dc-delay:60ms] mt-3">
                Answer the big questions.
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
                Short answers to help you evaluate fit quickly.
              </p>
            </div>

            <div className="mt-8 divide-y divide-border/60 rounded-xl border border-border/60 bg-background/40">
              {[
                {
                  q: 'What do you build?',
                  a: 'Web apps, dashboards, and internal tools—plus integrations, delivery enablement, and hardening work for teams in demanding environments.',
                },
                { q: 'How do engagements start?', a: 'Discovery call → short brief → proposal with milestones → kickoff.' },
                {
                  q: 'What’s your security posture?',
                  a: 'Secure defaults, least-privilege access, code review, and documented handoff practices.',
                },
                {
                  q: 'Can you work with our team?',
                  a: 'Yes — embedded delivery, pairing, PR reviews, or a take-ownership workstream with regular demos.',
                },
              ].map((item) => (
                <div key={item.q} className="p-5">
                  <p className="text-sm font-semibold">{item.q}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="rounded-xl border border-border/60 bg-background/40 p-6 md:p-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="text-center md:text-left">
                  <p className="dc-kicker">Next step</p>
                  <h2 className="dc-animate-heading dc-h2 [--dc-delay:60ms] mt-3">
                    Tell us what you’re building.
                  </h2>
                  <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
                    Email or call with a short brief and we’ll reply within 1 business day.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:items-end md:justify-end">
                  <Button asChild>
                    <a href="/contact">
                      Contact us <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-border/60 bg-transparent hover:bg-muted">
                    <a href="/">Back to home</a>
                  </Button>
                </div>
              </div>
              <p className="mt-6 text-center text-xs text-muted-foreground md:text-left">
                Brief template: goal, users, constraints, timeline, success metric.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
