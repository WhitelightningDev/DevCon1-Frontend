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
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const phases = [
  {
    title: 'Align',
    description: 'Placeholder: goals, constraints, stakeholders, and success criteria.',
    icon: ClipboardList,
    bullets: ['Discovery call', 'Scope & assumptions', 'Success metrics', 'Risks & mitigations'],
  },
  {
    title: 'Design',
    description: 'Placeholder: UX direction, IA, and UI components that support the workflow.',
    icon: Palette,
    bullets: ['Wireframes', 'Design system tokens', 'Key screens', 'Acceptance criteria'],
  },
  {
    title: 'Build',
    description: 'Placeholder: incremental delivery with reviewable PRs and predictable milestones.',
    icon: Code2,
    bullets: ['Type-safe implementation', 'Component library', 'API integration', 'Testing strategy'],
  },
  {
    title: 'Harden',
    description: 'Placeholder: security checks, performance tuning, and operational readiness.',
    icon: ShieldCheck,
    bullets: ['Threat review', 'Dependency hygiene', 'Perf pass', 'Logging/metrics hooks'],
  },
  {
    title: 'Launch',
    description: 'Placeholder: deploy plan, handoff artifacts, and post-launch stabilization.',
    icon: Rocket,
    bullets: ['Release checklist', 'Runbook', 'Monitoring', 'Stabilization window'],
  },
] as const

const templates = [
  {
    title: 'Project Brief',
    description: 'A short doc to capture scope, users, constraints, and timelines.',
    icon: FileText,
    placeholder: [
      'Problem statement: Launch a fast, credible DevCon1 site + lead intake.',
      'Primary users / JTBD: Teams needing a delivery partner; quickly assess fit and contact.',
      'In scope / out of scope: Pages + CTA flow; no custom backend/CRM/blog in v1.',
      'Constraints (tech/legal/brand): React/TS, accessible, high performance, minimal PII.',
      'Timeline + success metrics: MVP in days; Lighthouse 90+; measurable inbound leads.',
    ],
  },
  {
    title: 'Technical Plan',
    description: 'Architecture notes, milestones, and risks — written for review and handoff.',
    icon: Search,
    placeholder: [
      'Proposed approach + stack: Vite + React + TS, Tailwind, shadcn/ui, lucide-react.',
      'Milestones + demo checkpoints: Content pass → UI polish → contact flow → deploy.',
      'Dependencies (APIs, vendors, assets): Domain/DNS, hosting (Vercel/Netlify), email + optional analytics.',
      'Risks + mitigations: Content delays → ship with drafts; scope creep → keep v1 static.',
      'Rollback / migration notes: Atomic deploys + hosting rollback; keep prior build available.',
    ],
  },
  {
    title: 'Design Handoff',
    description: 'Design links, components, states, and accessibility notes for build-ready UI.',
    icon: Palette,
    placeholder: [
      'Figma / spec links: Build-from-code (add design links if you have them).',
      'Token decisions (type/spacing/colors): Emerald/cyan accents; subtle borders; roomy spacing; rounded-xl.',
      'Components + variants: Navbar/Footer, CTA blocks, cards, badges, buttons (primary/outline), dialogs.',
      'Edge states (empty/error/loading): Wizard validation, disabled states, copy-to-clipboard failure fallback.',
      'A11y requirements (keyboard/contrast): Visible focus, keyboard nav, dialog focus trap, readable contrast.',
    ],
  },
  {
    title: 'QA Checklist',
    description: 'A test plan for critical flows, devices, and acceptance criteria.',
    icon: ClipboardList,
    placeholder: [
      'Critical user journeys: Navigate pages → Start Project wizard → email/tel links work.',
      'Browser/device matrix: Chrome/Firefox/Safari/Edge; iOS Safari; Android Chrome.',
      'Acceptance criteria per feature: No console errors; links correct; responsive layout; copy works.',
      'Automation scope (unit/e2e): Optional; start with smoke checks + build verification.',
      'A11y + performance checks: Lighthouse + basic keyboard-only pass; check contrast and tap targets.',
    ],
  },
  {
    title: 'Security & Privacy Review',
    description: 'A lightweight checklist for data handling, permissions, and threats.',
    icon: ShieldCheck,
    placeholder: [
      'Data collected + retention: Contact brief; stored locally for UX; sent only via email action.',
      'Authn/authz assumptions: Public marketing site; no user accounts or protected data in v1.',
      'Third-party services + risks: Hosting + optional analytics; review vendors before adding.',
      'Threats + mitigations: Supply chain → lockfile; XSS → avoid unsafe HTML; add CSP when needed.',
      'Secrets/env handling plan: None for v1; use hosting env vars and never commit secrets.',
    ],
  },
  {
    title: 'Launch Checklist',
    description: 'Deploy steps, monitoring, and rollback so launch day is boring.',
    icon: Rocket,
    placeholder: [
      'Release train + owners: DevCon1 owner review + deploy checklist sign-off.',
      'Env vars / DNS / redirects: Connect domain; verify redirects; confirm mailto/tel links.',
      'Monitoring + alerts: Uptime + error tracking (optional Sentry); basic analytics if desired.',
      'Backups + rollback: Git repo is source of truth; hosting rollback to last good build.',
      'Post-launch stabilization: 48h monitoring; fix issues fast; iterate content + SEO basics.',
    ],
  },
  {
    title: 'Ops Handoff',
    description: 'Runbook-minded checklist for deploying and operating the system.',
    icon: HardHat,
    placeholder: [
      'Runbook link: README + hosting provider docs (deployment, rollbacks, domain).',
      'Deploy procedure: `npm run build` → deploy → smoke test key pages + contact CTAs.',
      'Alerts + SLOs: Uptime monitoring; page load targets; error rate threshold if instrumented.',
      'Backups + restores: Repo + lockfile; restore by redeploying a tagged release.',
      'On-call / escalation notes: Single owner; respond within 1 business day; hotfix path documented.',
    ],
  },
] as const

export function ProcessPage() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(16,185,129,0.18),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.10),transparent_45%)]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/20 to-background" />
      </div>

      <Navbar cta={{ label: 'Start a project', href: '/contact' }} />

      <main>
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
                  This page is a template. Replace the placeholders with your real steps, artifacts, and checklists.
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
                Swap in your real phases. Keep them consistent and outcome-oriented.
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
                Ready-made docs you can fill in.
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
                These are examples. Replace them with your own templates and links.
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
                      <p className="text-xs font-medium tracking-wide text-muted-foreground">EXAMPLE (EDIT ME)</p>
                      <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                        {item.placeholder.map((line) => (
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
                    Swap this with your real contact flow and add scheduling links when ready.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:items-end md:justify-end">
                  <Button asChild className="bg-emerald-500 text-emerald-950 hover:bg-emerald-400">
                    <a href="mailto:systems.devconone@gmail.com">
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
