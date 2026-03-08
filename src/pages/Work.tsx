import { useEffect } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  BarChart3,
  BatteryCharging,
  Car,
  FileText,
  Globe,
  Gavel,
  HeartPulse,
  LayoutDashboard,
  PawPrint,
  Shield,
} from 'lucide-react'

import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { PageBackground } from '@/components/layout/PageBackground'
import { Button } from '@/components/ui/button'
import { setSeo } from '@/lib/seo'

type ProjectMockup = {
  src: string
  label: string
  alt?: string
}

type Project = {
  title: string
  href: string
  summary: string
  tags: readonly string[]
  icon: LucideIcon
  mockups?: readonly ProjectMockup[]
}

const projects: readonly Project[] = [
  {
    title: 'Bullion Beperk Co-operative',
    href: 'https://www.bullionlimited.co.za/',
    summary: 'Secure and transparent precious metals investments website for Bullion Beperk Co-operative.',
    tags: ['Website', 'Finance'],
    icon: Shield,
    mockups: [
      { src: '/work/bullion/hero.png', label: 'Hero' },
      { src: '/work/bullion/section.png', label: 'Key section' },
      { src: '/work/bullion/mobile.png', label: 'Mobile' },
    ],
  },
  {
    title: "Jet Ski And More (Gordon's Bay Harbour)",
    href: 'https://www.jetskiandmore.com/home',
    summary: 'Jet ski rentals and guided rides landing page with safety and booking information.',
    tags: ['Website', 'Bookings'],
    icon: Globe,
    mockups: [
      { src: '/work/jetski/hero.png', label: 'Hero' },
      { src: '/work/jetski/pricing.png', label: 'Pricing' },
      { src: '/work/jetski/mobile.png', label: 'Mobile' },
    ],
  },
  {
    title: 'Team Flow',
    href: 'https://teamflow-pearl.vercel.app/',
    summary: 'Vercel-hosted web app prototype exploring a lightweight team/workflow experience.',
    tags: ['Web App', 'Prototype'],
    icon: LayoutDashboard,
    mockups: [
      { src: '/work/teamflow/dashboard.png', label: 'Dashboard' },
      { src: '/work/teamflow/kanban.png', label: 'Workflow' },
      { src: '/work/teamflow/mobile.png', label: 'Mobile' },
    ],
  },
  {
    title: 'Kiings VIP Car Wash',
    href: 'https://kiingsvipcarwash.vercel.app/',
    summary: 'Service landing page for a car wash brand with offerings and contact/CTA sections.',
    tags: ['Website', 'Local Business'],
    icon: Car,
    mockups: [
      { src: '/work/kiings/hero.png', label: 'Hero' },
      { src: '/work/kiings/services.png', label: 'Services' },
      { src: '/work/kiings/mobile.png', label: 'Mobile' },
    ],
  },
  {
    title: 'Hong Kong Trust (HKNFT)',
    href: 'https://hongkongtrust.vercel.app/',
    summary: 'Landing page describing Hong Kong foreign trust setup: secure, private, and professionally crafted.',
    tags: ['Website', 'Legal/Trust'],
    icon: Gavel,
    mockups: [
      { src: '/work/hknft/hero.png', label: 'Hero' },
      { src: '/work/hknft/benefits.png', label: 'Benefits' },
      { src: '/work/hknft/mobile.png', label: 'Mobile' },
    ],
  },
  {
    title: 'Found Your Pet',
    href: 'https://www.foundyourpet.co.za/',
    summary: "Pet tracking application site for managing and finding your pets' whereabouts.",
    tags: ['Web App', 'Product'],
    icon: PawPrint,
    mockups: [
      { src: '/foundyourpet/Homepage.png', label: 'Homepage' },
      { src: '/foundyourpet/dashboard.png', label: 'Dashboard' },
      { src: '/foundyourpet/Mobile.png', label: 'Mobile' },
    ],
  },
  {
    title: 'AEM Co-operatives',
    href: 'https://aem-webpage.vercel.app/',
    summary: 'Informational landing page about medical self-funding structures with clear sections and CTAs.',
    tags: ['Website', 'Healthcare'],
    icon: HeartPulse,
    mockups: [
      { src: '/work/aem/hero.png', label: 'Hero' },
      { src: '/work/aem/cta.png', label: 'CTA' },
      { src: '/work/aem/mobile.png', label: 'Mobile' },
    ],
  },
  {
    title: 'EFC - Gazina',
    href: 'https://efc-batteries.vercel.app/',
    summary: 'Brand/site for Gazina (EFC) with clean structure for expanding product and technical details.',
    tags: ['Website', 'Industrial'],
    icon: BatteryCharging,
    mockups: [
      { src: '/work/efc/hero.png', label: 'Hero' },
      { src: '/work/efc/products.png', label: 'Products' },
      { src: '/work/efc/mobile.png', label: 'Mobile' },
    ],
  },
] as const

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
  useEffect(() => {
    setSeo({
      title: 'DevCon1 — Work',
      description: 'A selection of shipped sites and prototypes demonstrating repeatable delivery and clean UX.',
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
              <p className="text-xs font-medium tracking-wide text-muted-foreground">WORK</p>
              <h1 className="dc-animate-heading [--dc-delay:80ms] mt-3 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Proof, patterns, and{' '}
                <span className="text-primary">repeatable delivery</span>
                .
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
                A small selection of shipped sites and prototypes.
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild>
                  <a href="#projects">
                    View projects <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-border/60 bg-transparent hover:bg-muted">
                  <a href="/services">See services</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="scroll-mt-24 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center md:text-left">
              <p className="text-xs font-medium tracking-wide text-muted-foreground">PROJECTS</p>
              <h2 className="dc-animate-heading [--dc-delay:60ms] mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                Representative work.
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
                A selection of shipped sites and prototypes.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => {
                const Icon = project.icon
                const preview = project.mockups?.[0]?.src || ''
                return (
                  <div key={project.title} className="rounded-xl border border-border/60 bg-background/40 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold">{project.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{project.tags.join(' • ')}</p>
                      </div>
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/60 bg-background/50">
                        <Icon className="h-4 w-4 text-primary" />
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground">{project.summary}</p>

                    <div className="mt-4 overflow-hidden rounded-lg border border-border/60 bg-background/50">
                      <div className="relative aspect-video">
                        {preview ? (
                          <img
                            src={preview}
                            alt={`${project.title} preview`}
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover"
                            onError={(event) => {
                              event.currentTarget.style.display = 'none'
                            }}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs text-muted-foreground">Preview</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                      <Button asChild>
                        <a href={project.href} target="_blank" rel="noreferrer">
                          View site <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
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
              <p className="text-xs font-medium tracking-wide text-muted-foreground">WHAT YOU GET</p>
              <h2 className="dc-animate-heading [--dc-delay:60ms] mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                Deliverables that stick.
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
                Not just a build — outcomes and artifacts that make the work durable and easy to own.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {proofSections.map((section) => {
                const Icon = section.icon
                return (
                  <div key={section.title} className="rounded-xl border border-border/60 bg-background/40 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">{section.title}</p>
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/60 bg-background/50">
                        <Icon className="h-4 w-4 text-primary" />
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
            <div className="rounded-xl border border-border/60 bg-background/40 p-6 md:p-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="text-center md:text-left">
                  <p className="text-xs font-medium tracking-wide text-muted-foreground">NEXT STEP</p>
                  <h2 className="dc-animate-heading [--dc-delay:60ms] mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                    Want work like this?
                  </h2>
                  <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
                    Send a short brief and we’ll reply with next steps and timeline options.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:items-end md:justify-end">
                  <Button asChild>
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
