import { useEffect, useMemo, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  BarChart3,
  Car,
  ExternalLink,
  FileText,
  Globe,
  Gavel,
  HeartPulse,
  Images,
  LayoutDashboard,
  PawPrint,
  Search,
  Shield,
  SlidersHorizontal,
  X,
} from 'lucide-react'

import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { PageBackground } from '@/components/layout/PageBackground'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { setSeo } from '@/lib/seo'

type ProjectMockup = {
  src: string
  label: string
  alt?: string
  fit?: 'cover' | 'contain'
  aspectClass?: string
}

type Project = {
  id: string
  title: string
  href: string
  summary: string
  tags: readonly string[]
  icon: LucideIcon | string
  mockups?: readonly ProjectMockup[]
}

const projects: readonly Project[] = [
  {
    id: 'bullion',
    title: 'Bullion Beperk Co-operative',
    href: 'https://www.bullionlimited.co.za/',
    summary: 'Secure and transparent precious metals investments website for Bullion Beperk Co-operative.',
    tags: ['Website', 'Finance'],
    icon: Shield,
    mockups: [
      { src: '/work/bullion/hero.png', label: 'Hero' },
    ],
  },
  {
    id: 'jetski',
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
    id: 'teamflow',
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
    id: 'fieldflow',
    title: 'Field Flow',
    href: 'https://fieldflow-billing.vercel.app/',
    summary:
      'Schedule jobs, manage technicians, track inventory, and get paid — all from one platform. Built for service companies that move fast.',
    tags: ['Web App', 'Field Service'],
    icon: LayoutDashboard,
    mockups: [
      { src: '/work/fieldflow/hero.png', label: 'Hero' },
      { src: '/work/fieldflow/section.png', label: 'Key section' },
      { src: '/work/fieldflow/mobile.png', label: 'Mobile' },
    ],
  },
  {
    id: 'gbsquash',
    title: "GB Squash Hub (Gordon's Bay Squash Club)",
    href: 'https://gordon-s-bay-squash-hub.vercel.app/',
    summary: 'Club web app concept — book courts, challenge players, and climb the social league ladder.',
    tags: ['Web App', 'Sports'],
    icon: LayoutDashboard,
    mockups: [
      { src: '/work/gbsquash/hero.png', label: 'Hero' },
      { src: '/work/gbsquash/section.png', label: 'Club section' },
      { src: '/work/gbsquash/mobile.png', label: 'Mobile' },
    ],
  },
  {
    id: 'kiings',
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
    id: 'hknft',
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
    id: 'foundyourpet',
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
    id: 'aem',
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
 
] as const

type CaseStudy = {
  projectId: Project['id']
  label: string
  problem: string
  highlights: readonly string[]
  deliverables: readonly string[]
  stack: readonly string[]
}

const featuredCaseStudies: readonly CaseStudy[] = [
  {
    projectId: 'fieldflow',
    label: 'Field service platform',
    problem:
      'Unify scheduling, technician management, inventory, and getting paid into one fast platform built for service companies.',
    highlights: [
      'Job scheduling and technician workflows designed for speed',
      'Operational visibility: status, workload, and inventory cues',
      'Mobile-ready UI for teams in the field',
    ],
    deliverables: ['Scheduling + jobs UX', 'Technician management UI patterns', 'Inventory + payments-ready flows'],
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind'],
  },
  {
    projectId: 'teamflow',
    label: 'Workflow prototype',
    problem: 'Give teams a lightweight dashboard + workflow view that stays readable as complexity grows.',
    highlights: ['Dashboard + workflow patterns', 'Fast iteration loops', 'Responsive layouts with clean UI consistency'],
    deliverables: ['Dashboard view', 'Workflow/board view', 'Mobile layout'],
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind'],
  },
  {
    projectId: 'gbsquash',
    label: 'Club hub concept',
    problem: 'Centralize club activity (bookings + challenges) into one place that members actually use.',
    highlights: ['Community-first UX and navigation', 'Mobile usability for on-the-go members', 'Clear CTAs and structure'],
    deliverables: ['Landing + hub structure', 'Member-friendly flows', 'Deploy-ready prototype'],
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind'],
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
  const [selectedTypes, setSelectedTypes] = useState<readonly string[]>([])
  const [selectedIndustries, setSelectedIndustries] = useState<readonly string[]>([])
  const [query, setQuery] = useState<string>('')
  const [onlyWithScreenshots, setOnlyWithScreenshots] = useState<boolean>(false)
  const [sort, setSort] = useState<'featured' | 'title_asc' | 'title_desc'>('featured')
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false)

  const projectsById = useMemo(() => new Map(projects.map((project) => [project.id, project])), [])

  const types = useMemo<readonly string[]>(() => {
    const allTypes = new Set<string>()
    projects.forEach((project) => {
      allTypes.add(project.tags[0] || 'Other')
    })
    return Array.from(allTypes).sort((a, b) => a.localeCompare(b))
  }, [])

  const industries = useMemo<readonly string[]>(() => {
    const allIndustries = new Set<string>()
    projects.forEach((project) => {
      allIndustries.add(project.tags[1] || 'General')
    })
    return Array.from(allIndustries).sort((a, b) => a.localeCompare(b))
  }, [])

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const filtered = projects.filter((project) => {
      if (onlyWithScreenshots && !project.mockups?.length) return false
      const type = project.tags[0] || 'Other'
      const industry = project.tags[1] || 'General'
      if (selectedTypes.length && !selectedTypes.includes(type)) return false
      if (selectedIndustries.length && !selectedIndustries.includes(industry)) return false
      if (!normalizedQuery) return true
      const haystack = [
        project.title,
        project.summary,
        project.tags.join(' '),
        typeof project.href === 'string' ? project.href : '',
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(normalizedQuery)
    })

    if (sort === 'featured') return filtered
    const sorted = [...filtered].sort((a, b) => a.title.localeCompare(b.title))
    return sort === 'title_desc' ? sorted.reverse() : sorted
  }, [onlyWithScreenshots, query, selectedIndustries, selectedTypes, sort])

  const projectsByCategory = useMemo(() => {
    const categories = new Map<string, Project[]>()
    filteredProjects.forEach((project) => {
      const category = project.tags[0] || 'Other'
      const list = categories.get(category)
      if (list) {
        list.push(project)
      } else {
        categories.set(category, [project])
      }
    })
    return Array.from(categories.entries())
  }, [filteredProjects])

  const activeFilterCount = selectedTypes.length + selectedIndustries.length + (onlyWithScreenshots ? 1 : 0)

  useEffect(() => {
    setSeo({
      title: 'HKFT Services — Work',
      description:
        'Case studies and shipped work: websites, dashboards, and prototypes—delivered with clean UX, performance focus, and maintainable handoff.',
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
            <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
              <div className="max-w-3xl text-center md:text-left">
                <p className="dc-kicker">Work</p>
                <h1 className="dc-animate-heading dc-h1 [--dc-delay:80ms] mt-3 text-foreground">
                  Shipped software,{' '}
                  <span className="text-primary">measurable outcomes</span>.
                </h1>
                <p className="mt-4 max-w-2xl dc-lead">
                  Selected websites and prototypes focused on clarity, performance, and delivery you can repeat.
                </p>

	                <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row md:items-start md:justify-start">
	                  <Button asChild>
	                    <a href="#case-studies">
	                      View case studies <ArrowRight className="ml-2 h-4 w-4" />
	                    </a>
	                  </Button>
		                  <Button asChild variant="outline">
		                    <a href="#projects">Browse all work</a>
		                  </Button>
		                </div>
		              </div>

              <Card className="border-border/60 bg-background/40">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">At a glance</CardTitle>
                  <CardDescription>What you get when we work together.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 pt-0">
                  <div className="flex items-start justify-between gap-4 rounded-lg border border-border/60 bg-background/50 p-4">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Delivery style</p>
                      <p className="mt-1 text-sm font-semibold">Milestone-driven</p>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">Weekly</span>
                  </div>
                  <div className="flex items-start justify-between gap-4 rounded-lg border border-border/60 bg-background/50 p-4">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Quality bar</p>
                      <p className="mt-1 text-sm font-semibold">Performance + UX</p>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">Core Web Vitals</span>
                  </div>
                  <div className="flex items-start justify-between gap-4 rounded-lg border border-border/60 bg-background/50 p-4">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Handoff</p>
                      <p className="mt-1 text-sm font-semibold">Maintainable, documented</p>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">Runbook-minded</span>
                  </div>
                </CardContent>
              </Card>
	            </div>
	          </div>
	        </section>

        <section id="case-studies" className="scroll-mt-24 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
	            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
	              <div className="text-center md:text-left">
	                <p className="dc-kicker">Case studies</p>
	                <h2 className="dc-animate-heading dc-h2 [--dc-delay:60ms] mt-3">
	                  Work that sells itself.
	                </h2>
                <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
                  Three representative builds — presented like a client would evaluate them.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center md:items-end md:justify-end">
                <Button asChild>
                  <a href="/contact">Start a project</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="#projects">All projects</a>
                </Button>
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {featuredCaseStudies.map((caseStudy) => {
                const project = projectsById.get(caseStudy.projectId)
                if (!project) return null
                const previewSrc = project.mockups?.[0]?.src || ''
                const hasGallery = Boolean(project.mockups?.length)

                return (
                  <Card
                    key={caseStudy.projectId}
                    className="group overflow-hidden border-border/60 bg-background/40 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-border/60 bg-background/50">
                      {previewSrc ? (
                        <img
                          src={previewSrc}
                          alt={`${project.title} preview`}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">Preview</span>
                        </div>
                      )}
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/65 to-transparent" />
                    </div>

                    <CardHeader className="space-y-3 pb-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="dc-kicker">{caseStudy.label}</p>
                          <CardTitle className="mt-2 text-base">{project.title}</CardTitle>
                        </div>
                        <div className="flex flex-wrap justify-end gap-2">
                          <Badge variant="secondary" className="bg-secondary/70">
                            {project.tags[0]}
                          </Badge>
                          {project.tags[1] ? (
                            <Badge variant="secondary" className="bg-secondary/70">
                              {project.tags[1]}
                            </Badge>
                          ) : null}
                        </div>
                      </div>
                      <CardDescription>{project.summary}</CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-xs font-medium text-muted-foreground">Highlights</p>
                      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                        {caseStudy.highlights.slice(0, 3).map((bullet) => (
                          <li key={bullet}>• {bullet}</li>
                        ))}
                      </ul>
                    </CardContent>

                    <CardFooter className="flex items-center justify-between gap-3">
                      <Button asChild size="sm">
                        <a href={project.href} target="_blank" rel="noreferrer">
                          View live <ExternalLink className="ml-1 h-4 w-4" />
                        </a>
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button type="button" size="sm" variant="outline">
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-5xl max-h-[85vh] overflow-hidden p-0">
                          <div className="max-h-[85vh] overflow-y-auto p-6">
                            <DialogHeader>
                              <DialogTitle>{project.title}</DialogTitle>
                              <DialogDescription>{project.summary}</DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
                              <div className="space-y-6">
                                <div>
                                  <p className="dc-kicker">Problem</p>
                                  <p className="mt-2 text-sm text-muted-foreground">{caseStudy.problem}</p>
                                </div>
                                <div>
                                  <p className="dc-kicker">Deliverables</p>
                                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                                    {caseStudy.deliverables.map((bullet) => (
                                      <li key={bullet}>• {bullet}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <p className="dc-kicker">Highlights</p>
                                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                                    {caseStudy.highlights.map((bullet) => (
                                      <li key={bullet}>• {bullet}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              <div className="space-y-6">
                                <div className="rounded-xl border border-border/60 bg-background/40 p-4">
                                  <p className="dc-kicker">Stack</p>
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    {caseStudy.stack.map((entry) => (
                                      <Badge key={entry} variant="secondary" className="bg-secondary/70">
                                        {entry}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                <div className="rounded-xl border border-border/60 bg-background/40 p-4">
                                  <p className="dc-kicker">Next step</p>
                                  <p className="mt-2 text-sm text-muted-foreground">
                                    Want something similar for your team?
                                  </p>
                                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                                    <Button asChild size="sm">
                                      <a href="/contact">Start a project</a>
                                    </Button>
                                    <Button asChild size="sm" variant="outline">
                                      <a href={project.href} target="_blank" rel="noreferrer">
                                        View live <ExternalLink className="ml-1 h-4 w-4" />
                                      </a>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {hasGallery ? (
                              <div className="mt-6">
                                <Separator className="mb-5" />
                                <p className="dc-kicker">Screenshots</p>
                                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                  {project.mockups?.map((mockup) => (
                                    <div
                                      key={mockup.src}
                                      className="overflow-hidden rounded-xl border border-border/60 bg-background/40"
                                    >
                                      <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-background/50 px-4 py-2">
                                        <p className="text-xs font-medium text-muted-foreground">{mockup.label}</p>
                                      </div>
                                      <div className="relative aspect-video bg-background/50">
                                        <img
                                          src={mockup.src}
                                          alt={mockup.alt || `${project.title} ${mockup.label}`}
                                          loading="lazy"
                                          className="absolute inset-0 h-full w-full object-contain p-4"
                                          onError={(event) => {
                                            event.currentTarget.style.display = 'none'
                                          }}
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section id="projects" className="scroll-mt-24 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="text-center md:text-left">
                <p className="dc-kicker">Projects</p>
                <h2 className="dc-animate-heading dc-h2 [--dc-delay:60ms] mt-3">
                  Representative work.
                </h2>
                <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
                  Browse by type, or search by name.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-center md:justify-end">
                <div className="w-full sm:w-64">
                  <label className="text-xs font-medium text-muted-foreground">Search</label>
                  <div className="relative mt-2">
                    <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search projects..."
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="w-full sm:w-56">
                  <label className="text-xs font-medium text-muted-foreground">Filters</label>
                  <div className="mt-2 flex items-center gap-2">
                    <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
                      <PopoverTrigger asChild>
                        <Button type="button" variant="outline" className="w-full justify-between">
                          <span className="inline-flex items-center gap-2">
                            <SlidersHorizontal className="h-4 w-4" />
                            Filters
                          </span>
                          {activeFilterCount ? (
                            <Badge variant="secondary" className="ml-2 bg-secondary/70">
                              {activeFilterCount}
                            </Badge>
                          ) : null}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="end" className="w-[320px] p-0">
                        <div className="p-4">
                          <p className="text-sm font-semibold">Refine results</p>
                          <p className="mt-1 text-xs text-muted-foreground">Filter by project type and artifacts.</p>
                        </div>

                        <Separator />

                        <div className="p-4">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-xs font-medium text-muted-foreground">TYPE</p>
                            {selectedTypes.length ? (
                              <Button type="button" variant="ghost" size="sm" onClick={() => setSelectedTypes([])}>
                                Clear
                              </Button>
                            ) : null}
                          </div>

                          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
                            {types.map((entry) => {
                              const checked = selectedTypes.includes(entry)
                              const id = `type-${entry.toLowerCase().replace(/[^a-z0-9-_]+/g, '-')}`
                              return (
                                <div key={entry} className="flex items-center gap-2">
                                  <Checkbox
                                    id={id}
                                    checked={checked}
                                    onCheckedChange={(value) => {
                                      const nextChecked = Boolean(value)
                                      setSelectedTypes((current) => {
                                        const hasTag = current.includes(entry)
                                        if (nextChecked && !hasTag) return [...current, entry]
                                        if (!nextChecked && hasTag) return current.filter((item) => item !== entry)
                                        return current
                                      })
                                    }}
                                  />
                                  <Label htmlFor={id} className="text-sm font-normal">
                                    {entry}
                                  </Label>
                                </div>
                              )
                            })}
                          </div>

                          <Separator className="my-4" />

                          <div className="flex items-center justify-between gap-3">
                            <p className="text-xs font-medium text-muted-foreground">INDUSTRY</p>
                            {selectedIndustries.length ? (
                              <Button type="button" variant="ghost" size="sm" onClick={() => setSelectedIndustries([])}>
                                Clear
                              </Button>
                            ) : null}
                          </div>

                          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
                            {industries.map((entry) => {
                              const checked = selectedIndustries.includes(entry)
                              const id = `industry-${entry.toLowerCase().replace(/[^a-z0-9-_]+/g, '-')}`
                              return (
                                <div key={entry} className="flex items-center gap-2">
                                  <Checkbox
                                    id={id}
                                    checked={checked}
                                    onCheckedChange={(value) => {
                                      const nextChecked = Boolean(value)
                                      setSelectedIndustries((current) => {
                                        const hasTag = current.includes(entry)
                                        if (nextChecked && !hasTag) return [...current, entry]
                                        if (!nextChecked && hasTag) return current.filter((item) => item !== entry)
                                        return current
                                      })
                                    }}
                                  />
                                  <Label htmlFor={id} className="text-sm font-normal">
                                    {entry}
                                  </Label>
                                </div>
                              )
                            })}
                          </div>

                          <Separator className="my-4" />

                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="only-screenshots"
                              checked={onlyWithScreenshots}
                              onCheckedChange={(value) => setOnlyWithScreenshots(Boolean(value))}
                            />
                            <Label htmlFor="only-screenshots" className="text-sm font-normal">
                              Only with screenshots
                            </Label>
                          </div>
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between gap-3 p-4">
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => {
                              setSelectedTypes([])
                              setSelectedIndustries([])
                              setOnlyWithScreenshots(false)
                            }}
                          >
                            Clear filters
                          </Button>
                          <Button type="button" onClick={() => setFiltersOpen(false)}>
                            Done
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="w-full sm:w-48">
                  <label className="text-xs font-medium text-muted-foreground">Sort</label>
                  <div className="mt-2">
                    <Select value={sort} onValueChange={(value) => setSort(value as typeof sort)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent align="end">
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="title_asc">Title (A–Z)</SelectItem>
                        <SelectItem value="title_desc">Title (Z–A)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">
                Showing <span className="font-medium text-foreground">{filteredProjects.length}</span> project
                {filteredProjects.length === 1 ? '' : 's'}.
              </p>
              {(query.trim() || selectedTypes.length || selectedIndustries.length || onlyWithScreenshots) && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setQuery('')
                    setSelectedTypes([])
                    setSelectedIndustries([])
                    setOnlyWithScreenshots(false)
                    setSort('featured')
                  }}
                >
                  Clear
                </Button>
              )}
            </div>

            {(selectedTypes.length || selectedIndustries.length || onlyWithScreenshots) && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {selectedTypes.map((entry) => (
                  <button
                    key={`type-${entry}`}
                    type="button"
                    onClick={() => setSelectedTypes((current) => current.filter((item) => item !== entry))}
                    className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
                    aria-label={`Remove type filter ${entry}`}
                  >
                    Type: {entry} <X className="h-3.5 w-3.5" />
                  </button>
                ))}
                {selectedIndustries.map((entry) => (
                  <button
                    key={`industry-${entry}`}
                    type="button"
                    onClick={() => setSelectedIndustries((current) => current.filter((item) => item !== entry))}
                    className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
                    aria-label={`Remove industry filter ${entry}`}
                  >
                    Industry: {entry} <X className="h-3.5 w-3.5" />
                  </button>
                ))}
                {onlyWithScreenshots ? (
                  <button
                    type="button"
                    onClick={() => setOnlyWithScreenshots(false)}
                    className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
                    aria-label="Remove filter only with screenshots"
                  >
                    Screenshots <X className="h-3.5 w-3.5" />
                  </button>
                ) : null}
              </div>
            )}

            <div className="mt-8 space-y-10">
              {projectsByCategory.map(([category, items]) => (
                <div key={category}>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="dc-kicker">{category}</p>
                      <h3 className="mt-2 text-lg font-semibold tracking-tight">{category}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">{items.length}</span> project{items.length === 1 ? '' : 's'}
                    </p>
                  </div>

                  <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((project) => {
                      const isImageIcon = typeof project.icon === 'string'
                      const Icon = isImageIcon ? null : project.icon
                      const preview = project.mockups?.[0]
                      const previewSrc = preview?.src || ''
                      const hasGallery = Boolean(project.mockups?.length)

                      return (
                        <Card
                          key={project.title}
                          className="group overflow-hidden border-border/60 bg-background/40 shadow-sm transition-shadow hover:shadow-md"
                        >
                          <div className="relative aspect-[16/10] overflow-hidden border-b border-border/60 bg-background/50">
                            {previewSrc ? (
                              <img
                                src={previewSrc}
                                alt={`${project.title} preview`}
                                loading="lazy"
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs text-muted-foreground">No preview</span>
                              </div>
                            )}
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/65 to-transparent" />
                          </div>

                          <CardHeader className="space-y-3 pb-4">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <CardTitle className="text-base">{project.title}</CardTitle>
                                <CardDescription className="mt-1">{project.summary}</CardDescription>
                              </div>
                              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-background/50">
                                {Icon ? (
                                  <Icon className="h-4 w-4 text-primary" />
                                ) : (
                                  <img
                                    src={typeof project.icon === 'string' ? project.icon : undefined}
                                    alt=""
                                    loading="lazy"
                                    draggable={false}
                                    className="h-6 w-6 object-contain"
                                  />
                                )}
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {project.tags.map((entry) => (
                                <Badge key={entry} variant="secondary" className="bg-secondary/70">
                                  {entry}
                                </Badge>
                              ))}
                            </div>
                          </CardHeader>

                          <CardFooter className="flex items-center justify-between gap-3">
                            <Button asChild size="sm">
                              <a href={project.href} target="_blank" rel="noreferrer">
                                View site <ExternalLink className="ml-1 h-4 w-4" />
                              </a>
                            </Button>

                            {hasGallery ? (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button type="button" size="sm" variant="outline">
                                    Screenshots <Images className="ml-1 h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-5xl max-h-[85vh] overflow-hidden p-0">
                                  <div className="max-h-[85vh] overflow-y-auto p-6">
                                    <DialogHeader>
                                      <DialogTitle>{project.title}</DialogTitle>
                                      <DialogDescription>{project.summary}</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                      {project.mockups?.map((mockup) => (
                                        <div
                                          key={mockup.src}
                                          className="overflow-hidden rounded-xl border border-border/60 bg-background/40"
                                        >
                                          <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-background/50 px-4 py-2">
                                            <p className="text-xs font-medium text-muted-foreground">{mockup.label}</p>
                                          </div>
                                          <div className="relative aspect-video bg-background/50">
                                            <img
                                              src={mockup.src}
                                              alt={mockup.alt || `${project.title} ${mockup.label}`}
                                              loading="lazy"
                                              className="absolute inset-0 h-full w-full object-contain p-4"
                                              onError={(event) => {
                                                event.currentTarget.style.display = 'none'
                                              }}
                                            />
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            ) : null}
                          </CardFooter>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="approach" className="scroll-mt-24 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center md:text-left">
              <p className="dc-kicker">What you get</p>
              <h2 className="dc-animate-heading dc-h2 [--dc-delay:60ms] mt-3">
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
                  <Card key={section.title} className="border-border/60 bg-background/40">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between gap-3">
                        <CardTitle className="text-base">{section.title}</CardTitle>
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-background/50">
                          <Icon className="h-4 w-4 text-primary" />
                        </span>
                      </div>
                      <CardDescription>{section.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>• {bullet}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <Card className="border-border/60 bg-background/40">
              <CardContent className="p-6 md:p-10">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  <div className="text-center md:text-left">
                    <p className="dc-kicker">Next step</p>
                    <h2 className="dc-animate-heading dc-h2 [--dc-delay:60ms] mt-3">
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
                    <Button asChild variant="outline">
                      <a href="/">Back to home</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
