import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  BarChart3,
  BatteryCharging,
  Car,
  Code2,
  ExternalLink,
  FileText,
  Globe,
  Gavel,
  HeartPulse,
  Image,
  LayoutDashboard,
  PawPrint,
  Shield,
  TrendingUp,
  TriangleAlert,
} from 'lucide-react'

import { Pipeline } from '@/components/illustrations/Pipeline'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const projects = [
  {
    title: 'Bullion Beperk Co-operative',
    href: 'https://www.bullionlimited.co.za/',
    summary: 'Secure and transparent precious metals investments website for Bullion Beperk Co-operative.',
    tags: ['Website', 'Finance'],
    icon: Shield,
  },
  {
    title: "Jet Ski And More (Gordon's Bay Harbour)",
    href: 'https://www.jetskiandmore.com/home',
    summary: 'Jet ski rentals and guided rides landing page with safety and booking information.',
    tags: ['Website', 'Bookings'],
    icon: Globe,
  },
  {
    title: 'Team Flow',
    href: 'https://teamflow-pearl.vercel.app/',
    summary: 'Vercel-hosted web app prototype for a team/workflow experience (template project).',
    tags: ['Web App', 'Prototype'],
    icon: LayoutDashboard,
  },
  {
    title: 'Kiings VIP Car Wash',
    href: 'https://kiingsvipcarwash.vercel.app/',
    summary: 'Service landing page for a car wash brand with offerings and contact/CTA sections.',
    tags: ['Website', 'Local Business'],
    icon: Car,
  },
  {
    title: 'Hong Kong Trust (HKNFT)',
    href: 'https://hongkongtrust.vercel.app/',
    summary: 'Landing page describing Hong Kong foreign trust setup: secure, private, and professionally crafted.',
    tags: ['Website', 'Legal/Trust'],
    icon: Gavel,
  },
  {
    title: 'Found Your Pet',
    href: 'https://www.foundyourpet.co.za/',
    summary: "Pet tracking application site for managing and finding your pets' whereabouts.",
    tags: ['Web App', 'Product'],
    icon: PawPrint,
  },
  {
    title: 'AEM Co-operatives',
    href: 'https://aem-webpage.vercel.app/',
    summary: 'Informational landing page about medical self-funding structures (template content).',
    tags: ['Website', 'Healthcare'],
    icon: HeartPulse,
  },
  {
    title: 'EFC - Gazina',
    href: 'https://efc-batteries.vercel.app/',
    summary: 'Brand/site for Gazina (EFC) with placeholder sections you can expand with products and details.',
    tags: ['Website', 'Industrial'],
    icon: BatteryCharging,
  },
] satisfies readonly {
  title: string
  href: string
  summary: string
  tags: readonly string[]
  icon: LucideIcon
}[]

const proofSections = [
  {
    title: 'Outcomes',
    description: 'Clear improvements you can point to after launch — performance, UX clarity, and operational smoothness.',
    icon: BarChart3,
    bullets: [
      'Faster time-to-ship via tight milestones and reviewable PRs',
      'Improved usability through clean IA, consistent UI, and responsive layouts',
      'Better performance (Core Web Vitals, bundle size, load time) where it matters',
      'Reduced friction with clearer CTAs, content structure, and conversion paths',
    ],
  },
  {
    title: 'Artifacts',
    description: 'A handoff that helps teams own the project — not just a deployed site.',
    icon: FileText,
    bullets: [
      'Source code with a clean structure and reusable components',
      'Design tokens + UI patterns (shadcn/ui + Tailwind) for consistent growth',
      'Deployment notes: environments, secrets, and release checklist',
      'Runbook-minded notes: monitoring hooks, error handling, and edge cases',
      'Security hygiene: dependency review, basic hardening, and safe defaults',
    ],
  },
] as const

export function WorkPage() {
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
                    Work
                  </Badge>
                  <Badge variant="outline" className="border-border/60 bg-background/60 text-muted-foreground">
                    Case studies • Templates
                  </Badge>
                </div>
                <h1 className="dc-animate-heading [--dc-delay:80ms] mt-5 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  Proof, patterns, and{' '}
                  <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                    repeatable delivery
                  </span>
                  .
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg md:mx-0">
                  Use this page as a starter: add real case studies, screenshots, metrics, and references when ready.
                </p>

                <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:items-start md:justify-start">
                  <Button asChild className="bg-emerald-500 text-emerald-950 hover:bg-emerald-400">
                    <a href="#case-studies">
                      View case studies <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-border/60 bg-transparent hover:bg-muted">
                    <a href="/services">See services</a>
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block lg:col-span-5">
                <div className="rounded-2xl border border-emerald-500/15 bg-gradient-to-b from-emerald-500/10 to-background/30 p-6">
                  <p className="text-xs font-medium tracking-wide text-muted-foreground">DELIVERY FLOW</p>
                  <div className="mt-4">
                    <Pipeline className="h-28 w-full text-emerald-300/55" />
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Consistent milestones, reviewable PRs, and a handoff that’s easy to own.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-10">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium tracking-wide text-muted-foreground">WHAT TO INCLUDE</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  A quick checklist for writing case studies (swap this for your real project specifics).
                </p>
              </div>
              <Badge variant="outline" className="border-emerald-500/25 bg-emerald-500/10 text-emerald-200">
                TEMPLATE
              </Badge>
            </div>

            <Separator className="my-6" />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-border/60 bg-background/40 p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold">Problem</p>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-emerald-500/15 bg-emerald-500/10">
                    <TriangleAlert className="h-4 w-4 text-emerald-400" />
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">What was broken, slow, risky, or unclear—and why it mattered.</p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>• Performance or reliability issues</li>
                  <li>• Confusing UX / weak conversion path</li>
                  <li>• Mobile layout problems</li>
                  <li>• Missing SEO or accessibility basics</li>
                </ul>
              </div>

              <div className="rounded-xl border border-border/60 bg-background/40 p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold">Approach</p>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-emerald-500/15 bg-emerald-500/10">
                    <Code2 className="h-4 w-4 text-emerald-400" />
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">How you worked: discovery → plan → build → harden → ship.</p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>• Audit + scope + success metrics</li>
                  <li>• IA/content structure + key screens</li>
                  <li>• Componentized build (Tailwind/shadcn)</li>
                  <li>• Perf + accessibility pass</li>
                </ul>
              </div>

              <div className="rounded-xl border border-border/60 bg-background/40 p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold">Outcome</p>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-emerald-500/15 bg-emerald-500/10">
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">What improved after launch—measurable where possible.</p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>• Clearer UX and stronger CTAs</li>
                  <li>• Better SEO metadata/structure</li>
                  <li>• Faster iteration via reusable components</li>
                  <li>• Safer defaults + dependency hygiene</li>
                </ul>
              </div>

              <div className="rounded-xl border border-border/60 bg-background/40 p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold">Images</p>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-emerald-500/15 bg-emerald-500/10">
                    <Image className="h-4 w-4 text-emerald-400" />
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Add 2–3 screenshots: hero, key section, and mobile view.</p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {['Hero', 'Section', 'Mobile'].map((label) => (
                    <div
                      key={label}
                      className="flex aspect-video items-center justify-center rounded-md border border-border/60 bg-background/50"
                    >
                      <span className="text-xs text-muted-foreground">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="case-studies" className="scroll-mt-24 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Badge variant="outline" className="border-emerald-500/25 bg-emerald-500/10 text-emerald-200">
                  Projects
                </Badge>
                <p className="text-xs tracking-wide text-muted-foreground">EXAMPLES TO FILL IN</p>
              </div>
              <h2 className="dc-animate-heading [--dc-delay:60ms] mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                Representative work.
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
                A selection of shipped sites and prototypes. Add more details (role, stack, metrics) as you iterate.
              </p>
            </div>

            <Separator className="my-8" />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="rounded-xl border border-border/60 bg-background/40 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold">{item.title}</p>
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-emerald-500/15 bg-emerald-500/10">
                        <Icon className="h-4 w-4 text-emerald-400" />
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-border/60 bg-background/50 text-muted-foreground">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <Button asChild variant="outline" className="border-border/60 bg-transparent hover:bg-muted">
                        <a href={item.href} target="_blank" rel="noreferrer">
                          View site <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                      <p className="text-xs text-muted-foreground">Details (role/stack/metrics): ____</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section id="approach" className="scroll-mt-24 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Badge variant="outline" className="border-emerald-500/25 bg-emerald-500/10 text-emerald-200">
                  Approach
                </Badge>
                <p className="text-xs tracking-wide text-muted-foreground">WHAT YOU DELIVER</p>
              </div>
              <h2 className="dc-animate-heading [--dc-delay:60ms] mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                Deliverables that stick.
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
                Not just a build — a set of outcomes and artifacts that make the work durable, maintainable, and easy to
                extend.
              </p>
            </div>

            <Separator className="my-8" />

            <div className="grid gap-4 md:grid-cols-2">
              {proofSections.map((section) => {
                const Icon = section.icon
                return (
                  <div key={section.title} className="rounded-xl border border-border/60 bg-background/40 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">{section.title}</p>
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-emerald-500/15 bg-emerald-500/10">
                        <Icon className="h-4 w-4 text-emerald-400" />
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{section.description}</p>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>• {bullet}</li>
                      ))}
                    </ul>
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
                    Want work like this?
                  </h2>
                  <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
                    Send a short brief and we’ll reply with next steps and timeline options.
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
