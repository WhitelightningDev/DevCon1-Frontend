import { useEffect } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Code2,
  FileText,
  HardHat,
  Palette,
  Rocket,
  Search,
  ShieldCheck,
} from 'lucide-react'

import { Pipeline } from '@/components/illustrations/Pipeline'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { PageBackground } from '@/components/layout/PageBackground'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { setSeo } from '@/lib/seo'

const phases = [
  {
    title: 'Align',
    description: 'Align on goals, constraints, stakeholders, and what success looks like.',
    icon: ClipboardList,
    bullets: ['Discovery call', 'Scope & assumptions', 'Success metrics', 'Risks & mitigations'],
  },
  {
    title: 'Design',
    description: 'Define UX direction, information architecture, and build-ready UI components.',
    icon: Palette,
    bullets: ['Wireframes', 'Design system tokens', 'Key screens', 'Acceptance criteria'],
  },
  {
    title: 'Build',
    description: 'Ship in reviewable increments with predictable milestones and clear demos.',
    icon: Code2,
    bullets: ['Type-safe implementation', 'Component library', 'API integration', 'Testing strategy'],
  },
  {
    title: 'Harden',
    description: 'Improve security, performance, and production readiness before release.',
    icon: ShieldCheck,
    bullets: ['Threat review', 'Dependency hygiene', 'Perf pass', 'Logging/metrics hooks'],
  },
  {
    title: 'Launch',
    description: 'Deploy with a checklist, hand off durable artifacts, and stabilize post-launch.',
    icon: Rocket,
    bullets: ['Release checklist', 'Runbook', 'Monitoring', 'Stabilization window'],
  },
] as const

const templates = [
  {
    title: 'Project Brief',
    description: 'A short doc that makes scope, roles, and success unambiguous.',
    icon: FileText,
    bullets: [
      'Goals, target users, and primary CTA',
      'In-scope vs out-of-scope (what we will/won’t build)',
      'Assumptions, constraints, and risks',
      'Timeline and budget guardrails',
      'Success metrics and launch checklist owner',
    ],
  },
  {
    title: 'Technical Plan',
    description: 'Architecture notes, milestones, and risks — written for review and handoff.',
    icon: Search,
    bullets: [
      'Stack + architecture outline (data flow, pages, integrations)',
      'Milestones + demo checkpoints (reviewable PRs)',
      'Dependencies (vendors, APIs, analytics, email, DNS/hosting)',
      'Risk register + mitigations (scope, schedule, tech)',
      'Deploy/rollback plan + environment notes',
    ],
  },
  {
    title: 'Design Handoff',
    description: 'Build-ready UI notes: components, states, and accessibility requirements.',
    icon: Palette,
    bullets: [
      'Design links (Figma/refs) + brand notes (type, spacing, color)',
      'Component inventory + variants (buttons, cards, dialogs, forms)',
      'Responsive rules (breakpoints, stacking behavior, spacing)',
      'Edge states (empty/error/loading) + motion rules',
      'Accessibility requirements (keyboard, focus, contrast)',
    ],
  },
  {
    title: 'QA Checklist',
    description: 'A test plan for critical flows, devices, and acceptance criteria.',
    icon: ClipboardList,
    bullets: [
      'Critical journeys (navigation, contact/wizard, conversions)',
      'Browser/device coverage (desktop + iOS/Android)',
      'Acceptance criteria per feature (no console errors, correct links, responsive)',
      'Performance + accessibility checks (Lighthouse + keyboard pass)',
      'Release smoke test steps (pre/post deploy)',
    ],
  },
  {
    title: 'Security & Privacy Review',
    description: 'A lightweight checklist for data handling, permissions, and threats.',
    icon: ShieldCheck,
    bullets: [
      'Data collected + retention (forms, analytics, cookies)',
      'Auth/authz assumptions + permissions model (if applicable)',
      'Third-party services review (what runs where, vendor risks)',
      'Threats + mitigations (XSS, supply chain, rate limiting, spam)',
      'Secrets/env handling + deployment hardening notes',
    ],
  },
  {
    title: 'Launch Checklist',
    description: 'Deploy steps, monitoring, and rollback so launch day is boring.',
    icon: Rocket,
    bullets: [
      'Release owner + sign-off checklist',
      'DNS/redirects, env vars, and form delivery verification',
      'Monitoring + alerts (uptime + optional error tracking)',
      'Rollback plan (last-known-good deploy)',
      'Post-launch stabilization window and follow-up tasks',
    ],
  },
  {
    title: 'Ops Handoff',
    description: 'Runbook-minded checklist for deploying and operating the system.',
    icon: HardHat,
    bullets: [
      'Runbook: how to deploy, roll back, and verify',
      'Routine checks (forms, links, uptime, performance)',
      'SLOs/targets (load time, error rate, uptime) when instrumented',
      'Backups/restores (repo, content, vendor accounts)',
      'Escalation path + ownership (who fixes what, when)',
    ],
  },
] as const

export function ProcessPage() {
  useEffect(() => {
    setSeo({
      title: 'DevCon1 — Process',
      description: 'A clear delivery flow: align early, ship in reviewable increments, and hand off work your team can own.',
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
                    Process
                  </Badge>
                  <Badge variant="outline" className="border-border/60 bg-background/60 text-muted-foreground">
                    Repeatable • Reviewable
                  </Badge>
                </div>
                <h1 className="dc-animate-heading [--dc-delay:80ms] mt-5 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  A delivery flow built for{' '}
                  <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                    reliability and speed
                  </span>
                  .
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg md:mx-0">
                  A clear delivery flow: align early, ship in reviewable increments, and hand off work your team can own.
                </p>

                <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:items-start md:justify-start">
                  <Button asChild className="bg-emerald-500 text-emerald-950 hover:bg-emerald-400">
                    <a href="#phases">
                      View phases <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-border/60 bg-transparent hover:bg-muted">
                    <a href="#templates">See templates</a>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-emerald-500/15 bg-gradient-to-b from-emerald-500/10 to-background/30 p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium tracking-wide text-muted-foreground">QUALITY GATES</p>
                    <Badge variant="outline" className="border-emerald-500/25 bg-emerald-500/10 text-emerald-200">
                      TEMPLATE
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <Pipeline className="h-24 w-full text-emerald-300/55" />
                  </div>
                  <div className="mt-5 space-y-3">
                    {[
                      'Every milestone is a reviewable PR.',
                      'Security & performance are checked before launch.',
                      'Handoff includes artifacts for long-term ownership.',
                    ].map((line) => (
                      <div key={line} className="flex items-start gap-2 rounded-lg border border-border/60 bg-background/40 p-4">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />
                        <p className="text-sm text-muted-foreground">{line}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="phases" className="scroll-mt-24 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Badge variant="outline" className="border-emerald-500/25 bg-emerald-500/10 text-emerald-200">
                  Phases
                </Badge>
                <p className="text-xs tracking-wide text-muted-foreground">HOW YOU SHIP</p>
              </div>
              <h2 className="dc-animate-heading [--dc-delay:60ms] mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                A clear sequence, flexible scope.
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
                These phases keep delivery predictable while still allowing scope to flex where it’s safe.
              </p>
            </div>

            <Separator className="my-8" />

            <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {phases.map((phase, index) => {
                const Icon = phase.icon
                return (
                  <li key={phase.title} className="rounded-xl border border-border/60 bg-background/40 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">{phase.title}</p>
                      <span className="inline-flex h-9 items-center gap-2 rounded-md border border-emerald-500/15 bg-emerald-500/10 px-3 text-sm font-semibold text-emerald-300">
                        <Icon className="h-4 w-4" />
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{phase.description}</p>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      {phase.bullets.map((bullet) => (
                        <li key={bullet}>• {bullet}</li>
                      ))}
                    </ul>
                  </li>
                )
              })}
            </ol>
          </div>
        </section>

        <section id="templates" className="scroll-mt-24 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Badge variant="outline" className="border-emerald-500/25 bg-emerald-500/10 text-emerald-200">
                  Templates
                </Badge>
                <p className="text-xs tracking-wide text-muted-foreground">ARTIFACTS TO REUSE</p>
              </div>
              <h2 className="dc-animate-heading [--dc-delay:60ms] mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                Templates we provide for every project.
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
                These artifacts keep scope, risk, and handoff crisp from day one.
              </p>
            </div>

            <Separator className="my-8" />

            <div className="grid gap-4 md:grid-cols-3">
              {templates.map((item) => {
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
                      <p className="text-xs font-medium tracking-wide text-muted-foreground">INCLUDED</p>
                      <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                        {item.bullets.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
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
                    Want this process applied to you?
                  </h2>
                  <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
                    Answer a few questions and we’ll reply with next steps, timeline options, and a clear plan.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:items-end md:justify-end">
                  <Button asChild className="bg-emerald-500 text-emerald-950 hover:bg-emerald-400">
                    <a href="/contact">
                      Start a conversation <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-border/60 bg-transparent hover:bg-muted">
                    <a href="/">Back to home</a>
                  </Button>
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
