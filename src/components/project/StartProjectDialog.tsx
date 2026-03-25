import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { format } from 'date-fns'
import { ArrowRight, CalendarIcon, ClipboardList, Mail, Sparkles } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

type BudgetRange = string
type ProjectType = string

type ProjectStage = 'New build' | 'Redesign' | 'MVP' | 'Feature add-on' | 'Maintenance' | 'Not sure'

type Timeline =
  | 'ASAP'
  | '2–4 weeks'
  | '1–2 months'
  | '3–6 months'
  | '6+ months'
  | 'Not sure'

type CurrencyCode = 'ZAR' | 'USD' | 'ZMW' | 'GBP' | 'EUR'

type WizardData = {
  name: string
  email: string
  phone: string
  role: string

  company: string
  location: string
  companySize: string
  industry: string
  industryOther: string

  projectType: ProjectType
  projectTypeOther: string
  projectStage: ProjectStage | ''
  existingSite: string
  primaryGoal: string
  targetUsers: string
  primaryCta: string

  problemStatement: string
  targetSegments: string
  decisionMakers: string
  differentiators: string
  acquisitionChannels: string
  pricingModel: string
  discoveryLinks: string

  description: string
  pagesOrScreens: string
  keyFlows: string
  mustHave: string
  niceToHave: string

  features: string[]
  integrations: string[]
  successMetrics: string
  constraints: string
  references: string

  timeline: Timeline | ''
  goLiveDate: string
  currency: CurrencyCode | ''
  budget: BudgetRange | ''

  hasBranding: boolean
  hasContent: boolean
  hasDomain: boolean
  needsDesign: boolean
  brandLink: string
  domainName: string
  accessNeeds: string

  notes: string
}

const STORAGE_KEY = 'devcon1:start-project'

const CURRENCIES: ReadonlyArray<{
  code: CurrencyCode
  label: string
  ranges: readonly string[]
}> = [
  {
    code: 'ZAR',
    label: 'Rands (ZAR)',
    ranges: ['Under R10k', 'R10k–R25k', 'R25k–R50k', 'R50k–R100k', 'R100k+', 'Not sure'],
  },
  {
    code: 'USD',
    label: 'US Dollar (USD)',
    ranges: ['Under $1k', '$1k–$5k', '$5k–$10k', '$10k–$25k', '$25k+', 'Not sure'],
  },
  {
    code: 'ZMW',
    label: 'Kwacha (ZMW)',
    ranges: ['Under K5k', 'K5k–K25k', 'K25k–K50k', 'K50k–K150k', 'K150k+', 'Not sure'],
  },
  {
    code: 'GBP',
    label: 'Pound Sterling (GBP)',
    ranges: ['Under £1k', '£1k–£5k', '£5k–£10k', '£10k–£25k', '£25k+', 'Not sure'],
  },
  {
    code: 'EUR',
    label: 'Euro (EUR)',
    ranges: ['Under €1k', '€1k–€5k', '€5k–€10k', '€10k–€25k', '€25k+', 'Not sure'],
  },
] as const

const INDUSTRIES = [
  'Aerospace & Defense',
  'Agriculture',
  'Automotive',
  'Banking',
  'Biotech',
  'Construction',
  'Consulting',
  'Consumer Goods',
  'Cybersecurity',
  'Data & Analytics',
  'E-commerce',
  'Education',
  'Energy & Utilities',
  'Engineering',
  'Entertainment & Media',
  'Environmental Services',
  'Event Services',
  'Financial Services',
  'Fitness & Wellness',
  'Food & Beverage',
  'Government',
  'Healthcare',
  'Hospitality & Tourism',
  'Insurance',
  'Legal',
  'Logistics & Supply Chain',
  'Manufacturing',
  'Mining',
  'Nonprofit',
  'Professional Services',
  'PropTech / Real Estate',
  'Retail',
  'SaaS / Software',
  'Telecommunications',
  'Transportation',
  'Venture / Startup',
  'Other',
] as const

const PROJECT_TYPES = [
  'Marketing website (service business)',
  'Landing page',
  'Portfolio / personal site',
  'Blog / content site',
  'CMS-backed website',
  'E-commerce',
  'Marketplace',
  'Booking / appointments',
  'Membership / subscriptions',
  'SaaS product',
  'Web app (custom)',
  'Internal tool / dashboard',
  'Admin portal',
  'CRM / lead management',
  'ERP / operations tool',
  'Analytics / reporting',
  'Data pipeline / ETL',
  'API / integration',
  'Automation / workflows',
  'DevOps / CI/CD / infra',
  'Observability / monitoring',
  'Security review / hardening',
  'Mobile app',
  'Desktop app',
  'AI integration / chatbot',
  'Other',
] as const

const COMPANY_SIZES = ['Solo', '2–5', '6–20', '21–50', '51–200', '200+', 'Not sure'] as const

const PROJECT_STAGES: readonly ProjectStage[] = ['New build', 'Redesign', 'MVP', 'Feature add-on', 'Maintenance', 'Not sure'] as const

const INTEGRATION_OPTIONS = [
  'Google Analytics (GA4)',
  'Meta Pixel',
  'Formspree / email forms',
  'Mailchimp / email marketing',
  'HubSpot / CRM',
  'Stripe / payments',
  'PayFast / payments',
  'WhatsApp',
  'Google Maps',
  'Calendly / booking',
  'Intercom / chat',
  'Airtable / Notion',
  'Contentful / Sanity (CMS)',
  'Auth0 / Clerk',
  'Other',
] as const

const FEATURE_OPTIONS = {
  website: ['Design refresh', 'SEO basics', 'Analytics (GA4)', 'Copywriting help', 'Blog / content', 'CMS', 'Animations', 'Multi-language'] as const,
  booking: ['Availability calendar', 'Deposits / payments', 'WhatsApp booking', 'Email/SMS reminders', 'Staff / team scheduling', 'Locations'] as const,
  ecommerce: ['Product catalog', 'Cart + checkout', 'Payments', 'Shipping rules', 'Discounts/coupons', 'Inventory', 'Order management'] as const,
  app: ['Auth (login)', 'Roles/permissions', 'Admin area', 'Dashboard', 'File uploads', 'Notifications', 'Payments/subscriptions', 'Realtime'] as const,
  api: ['Integrations', 'Automation', 'Webhooks', 'Reporting', 'Admin tooling', 'Error monitoring', 'Security hardening'] as const,
} as const

function inferCategory(projectType: string) {
  const value = projectType.toLowerCase()
  if (value.includes('e-commerce') || value.includes('marketplace')) return 'ecommerce'
  if (value.includes('booking')) return 'booking'
  if (value.includes('website') || value.includes('landing') || value.includes('portfolio') || value.includes('blog') || value.includes('cms')) {
    return 'website'
  }
  if (value.includes('api') || value.includes('automation') || value.includes('etl') || value.includes('devops') || value.includes('observability')) {
    return 'api'
  }
  return 'app'
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

function formatList(value: string) {
  const lines = value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
  return lines.length ? lines.map((line) => `- ${line}`).join('\n') : '—'
}

function toggleValue(list: readonly string[], value: string, checked: boolean) {
  if (checked) return Array.from(new Set([...list, value]))
  return list.filter((item) => item !== value)
}

function buildSummary(data: WizardData) {
  const resolvedIndustry = data.industry === 'Other' ? (data.industryOther || 'Other') : data.industry
  const resolvedProjectType = data.projectType === 'Other' ? (data.projectTypeOther || 'Other') : data.projectType
  const goLiveLine = data.goLiveDate ? `Desired go-live date: ${data.goLiveDate}` : `Desired timeline: ${data.timeline || '—'}`
  const assets = [
    data.hasBranding ? 'Branding' : null,
    data.hasContent ? 'Content ready' : null,
    data.hasDomain ? 'Domain/hosting' : null,
    data.needsDesign ? 'Needs design support' : null,
  ].filter(Boolean)

  return [
    'Project intake (generated by wizard)',
    '',
    `Name: ${data.name || '—'}`,
    `Email: ${data.email || '—'}`,
    `Phone: ${data.phone || '—'}`,
    `Role: ${data.role || '—'}`,
    `Business / Company: ${data.company || '—'}`,
    `Location: ${data.location || '—'}`,
    `Company size: ${data.companySize || '—'}`,
    `Industry: ${resolvedIndustry || '—'}`,
    `Project type: ${resolvedProjectType || '—'}`,
    `Project stage: ${data.projectStage || '—'}`,
    `Existing site/app: ${data.existingSite?.trim() ? data.existingSite.trim() : '—'}`,
    `Primary goal: ${data.primaryGoal?.trim() ? data.primaryGoal.trim() : '—'}`,
    `Target users: ${data.targetUsers?.trim() ? data.targetUsers.trim() : '—'}`,
    `Primary CTA: ${data.primaryCta?.trim() ? data.primaryCta.trim() : '—'}`,
    `Problem statement: ${data.problemStatement?.trim() ? data.problemStatement.trim() : '—'}`,
    `Target segments / ICP: ${data.targetSegments?.trim() ? data.targetSegments.trim() : '—'}`,
    `Decision makers / stakeholders: ${data.decisionMakers?.trim() ? data.decisionMakers.trim() : '—'}`,
    `Differentiators / positioning: ${data.differentiators?.trim() ? data.differentiators.trim() : '—'}`,
    `Acquisition channels: ${data.acquisitionChannels?.trim() ? data.acquisitionChannels.trim() : '—'}`,
    `Pricing / business model: ${data.pricingModel?.trim() ? data.pricingModel.trim() : '—'}`,
    `Discovery links: ${data.discoveryLinks?.trim() ? data.discoveryLinks.trim() : '—'}`,
    goLiveLine,
    `Currency: ${data.currency ? CURRENCIES.find((c) => c.code === data.currency)?.label || data.currency : '—'}`,
    `Budget: ${data.budget || '—'}`,
    `Assets: ${assets.length ? assets.join(', ') : '—'}`,
    `Brand link: ${data.brandLink?.trim() ? data.brandLink.trim() : '—'}`,
    `Domain name: ${data.domainName?.trim() ? data.domainName.trim() : '—'}`,
    `Access needed: ${data.accessNeeds?.trim() ? data.accessNeeds.trim() : '—'}`,
    '',
    'Scope / what needs to be built:',
    data.description?.trim() ? data.description.trim() : '—',
    '',
    'Pages / screens:',
    formatList(data.pagesOrScreens),
    '',
    'Key flows:',
    formatList(data.keyFlows),
    '',
    'Must-have:',
    formatList(data.mustHave),
    '',
    'Nice-to-have:',
    formatList(data.niceToHave),
    '',
    'Features selected:',
    data.features.length ? data.features.map((value) => `- ${value}`).join('\n') : '—',
    '',
    'Integrations:',
    data.integrations.length ? data.integrations.map((value) => `- ${value}`).join('\n') : '—',
    '',
    'Success metrics:',
    formatList(data.successMetrics),
    '',
    'Constraints / risks:',
    formatList(data.constraints),
    '',
    'References / examples:',
    formatList(data.references),
    '',
    'Additional notes:',
    data.notes?.trim() ? data.notes.trim() : '—',
  ].join('\n')
}

function saveToStorage(data: WizardData) {
  const payload = {
    ...data,
    summary: buildSummary(data),
    createdAt: new Date().toISOString(),
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  return payload
}

const emptyWizardData: WizardData = {
  name: '',
  email: '',
  phone: '',
  role: '',
  company: '',
  location: '',
  companySize: '',
  industry: '',
  industryOther: '',
  projectType: '',
  projectTypeOther: '',
  projectStage: '',
  existingSite: '',
  primaryGoal: '',
  targetUsers: '',
  primaryCta: '',
  problemStatement: '',
  targetSegments: '',
  decisionMakers: '',
  differentiators: '',
  acquisitionChannels: '',
  pricingModel: '',
  discoveryLinks: '',
  description: '',
  pagesOrScreens: '',
  keyFlows: '',
  mustHave: '',
  niceToHave: '',
  features: [],
  integrations: [],
  successMetrics: '',
  constraints: '',
  references: '',
  timeline: '',
  goLiveDate: '',
  currency: '',
  budget: '',
  hasBranding: false,
  hasContent: false,
  hasDomain: false,
  needsDesign: false,
  brandLink: '',
  domainName: '',
  accessNeeds: '',
  notes: '',
}

export function StartProjectDialog({
  trigger,
  defaultToWizard = false,
}: {
  trigger: ReactNode
  defaultToWizard?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<'choice' | 'wizard'>(defaultToWizard ? 'wizard' : 'choice')
  const [step, setStep] = useState(0)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmAction, setConfirmAction] = useState<'skip' | 'back-to-choice'>('skip')
  const [data, setData] = useState<WizardData>(emptyWizardData)

  const steps = useMemo(
    () => [
      { title: 'Basics' },
      { title: 'Business' },
      { title: 'Goals' },
      { title: 'Discovery' },
      { title: 'Scope' },
      { title: 'Features' },
      { title: 'Timeline & budget' },
      { title: 'Assets & access' },
      { title: 'Review' },
    ],
    [],
  )

  const percent = useMemo(() => Math.round(((step + 1) / steps.length) * 100), [step, steps.length])
  const summary = useMemo(() => buildSummary(data), [data])
  const category = useMemo(() => inferCategory(data.projectType || ''), [data.projectType])

  const briefStrength = useMemo(() => {
    const checks = [
      Boolean(data.name.trim()),
      isValidEmail(data.email),
      Boolean(data.company.trim()),
      Boolean(data.industry.trim()),
      Boolean(data.projectType.trim()),
      Boolean(data.projectStage),
      Boolean(data.primaryGoal.trim()),
      Boolean(data.targetUsers.trim()),
      Boolean(data.problemStatement.trim()),
      Boolean(data.targetSegments.trim()),
      Boolean(data.description.trim()),
      Boolean(data.pagesOrScreens.trim()),
      Boolean(data.timeline),
      Boolean(data.currency),
      Boolean(data.budget),
      Boolean(data.successMetrics.trim()),
      Boolean(data.references.trim()),
    ]
    const score = checks.filter(Boolean).length
    return { score, total: checks.length }
  }, [data])

  const canNext = useMemo(() => {
    if (step === 0) return Boolean(data.name.trim()) && isValidEmail(data.email)
    if (step === 1) {
      if (!data.company.trim()) return false
      if (!data.industry.trim()) return false
      if (data.industry === 'Other' && !data.industryOther.trim()) return false
      return true
    }
    if (step === 2) {
      if (!data.projectType) return false
      if (data.projectType === 'Other' && !data.projectTypeOther.trim()) return false
      if (!data.projectStage) return false
      if (!data.primaryGoal.trim()) return false
      if (!data.targetUsers.trim()) return false
      return true
    }
    if (step === 3) return Boolean(data.problemStatement.trim()) && Boolean(data.targetSegments.trim())
    if (step === 4) return Boolean(data.description.trim()) && Boolean(data.pagesOrScreens.trim())
    if (step === 6) return Boolean(data.timeline) && Boolean(data.currency) && Boolean(data.budget)
    return true
  }, [data, step])

  function resetWizard() {
    setMode(defaultToWizard ? 'wizard' : 'choice')
    setStep(0)
    setData(emptyWizardData)
  }

  function goContact(withPrefill: boolean) {
    if (withPrefill) saveToStorage(data)
    window.location.href = '/contact'
  }

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // ignore
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next)
          if (!next) resetWizard()
        }}
      >
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="z-[60] max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          {mode === 'choice' ? (
            <>
              <DialogHeader>
                <DialogTitle>Start a project</DialogTitle>
                <DialogDescription>Choose the fastest way to get started.</DialogDescription>
              </DialogHeader>

              <div className="grid gap-3 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => goContact(false)}
                  className="rounded-xl border border-border/60 bg-background/40 p-5 text-left transition-colors hover:border-primary/20 hover:bg-muted/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">Use the contact page</p>
                      <p className="mt-1 text-sm text-muted-foreground">Write what you need help with and send it.</p>
                    </div>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-primary/15 bg-primary/10">
                      <Mail className="h-4 w-4 text-primary" />
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setMode('wizard')}
                  className="rounded-xl border border-border/60 bg-background/40 p-5 text-left transition-colors hover:border-primary/20 hover:bg-muted/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">Follow an advanced wizard</p>
                      <p className="mt-1 text-sm text-muted-foreground">More questions → a better brief → faster quotes.</p>
                    </div>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-primary/15 bg-primary/10">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </span>
                  </div>
                </button>
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" />
                    Project wizard
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Step {step + 1} of {steps.length}
                  </span>
                </DialogTitle>
                <DialogDescription className="flex items-center justify-between gap-3">
                  <span>{steps[step]?.title}</span>
                  <span className="text-xs text-muted-foreground">
                    Brief strength: {briefStrength.score}/{briefStrength.total}
                  </span>
                </DialogDescription>
              </DialogHeader>

              <Progress value={percent} className="h-2" />

              {step === 0 && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="sp-name">Name</Label>
                    <Input
                      id="sp-name"
                      value={data.name}
                      onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sp-email">Email</Label>
                    <Input
                      id="sp-email"
                      value={data.email}
                      onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="you@company.com"
                      autoComplete="email"
                      inputMode="email"
                    />
                    {!data.email.trim() ? null : isValidEmail(data.email) ? null : (
                      <p className="text-xs text-muted-foreground">Enter a valid email address.</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sp-phone">Phone (optional)</Label>
                    <Input
                      id="sp-phone"
                      value={data.phone}
                      onChange={(e) => setData((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="Phone / WhatsApp"
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sp-role">Your role (optional)</Label>
                    <Input
                      id="sp-role"
                      value={data.role}
                      onChange={(e) => setData((prev) => ({ ...prev, role: e.target.value }))}
                      placeholder="Founder, marketing, ops, product…"
                    />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="sp-company">Business / Company</Label>
                    <Input
                      id="sp-company"
                      value={data.company}
                      onChange={(e) => setData((prev) => ({ ...prev, company: e.target.value }))}
                      placeholder="Company name"
                      autoComplete="organization"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sp-location">Location (optional)</Label>
                    <Input
                      id="sp-location"
                      value={data.location}
                      onChange={(e) => setData((prev) => ({ ...prev, location: e.target.value }))}
                      placeholder="City, Country"
                      autoComplete="address-level2"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Industry</Label>
                    <Select value={data.industry} onValueChange={(value) => setData((prev) => ({ ...prev, industry: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an industry" />
                      </SelectTrigger>
                      <SelectContent className="z-[70] max-h-80">
                        {INDUSTRIES.map((value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Company size (optional)</Label>
                    <Select value={data.companySize} onValueChange={(value) => setData((prev) => ({ ...prev, companySize: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a size" />
                      </SelectTrigger>
                      <SelectContent className="z-[70]">
                        {COMPANY_SIZES.map((value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {data.industry === 'Other' ? (
                    <div className="grid gap-2 md:col-span-2">
                      <Label htmlFor="sp-industry-other">Industry (other)</Label>
                      <Input
                        id="sp-industry-other"
                        value={data.industryOther}
                        onChange={(e) => setData((prev) => ({ ...prev, industryOther: e.target.value }))}
                        placeholder="Type your industry"
                      />
                    </div>
                  ) : null}
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2 md:col-span-2">
                    <Label>Project type</Label>
                    <Select
                      value={data.projectType}
                      onValueChange={(value) =>
                        setData((prev) => ({
                          ...prev,
                          projectType: value,
                          projectTypeOther: '',
                          features: [],
                          integrations: [],
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a project type" />
                      </SelectTrigger>
                      <SelectContent className="z-[70] max-h-80">
                        {PROJECT_TYPES.map((value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {data.projectType === 'Other' ? (
                    <div className="grid gap-2 md:col-span-2">
                      <Label htmlFor="sp-project-other">Project type (other)</Label>
                      <Input
                        id="sp-project-other"
                        value={data.projectTypeOther}
                        onChange={(e) => setData((prev) => ({ ...prev, projectTypeOther: e.target.value }))}
                        placeholder="Describe what you want built"
                      />
                    </div>
                  ) : null}

                  <div className="grid gap-2">
                    <Label>Project stage</Label>
                    <Select
                      value={data.projectStage}
                      onValueChange={(value) => setData((prev) => ({ ...prev, projectStage: value as ProjectStage }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a stage" />
                      </SelectTrigger>
                      <SelectContent className="z-[70]">
                        {PROJECT_STAGES.map((value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="sp-existing-site">Existing site/app (optional)</Label>
                    <Input
                      id="sp-existing-site"
                      value={data.existingSite}
                      onChange={(e) => setData((prev) => ({ ...prev, existingSite: e.target.value }))}
                      placeholder="https://…"
                      inputMode="url"
                    />
                  </div>

                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="sp-goal">Primary goal</Label>
                    <Textarea
                      id="sp-goal"
                      value={data.primaryGoal}
                      onChange={(e) => setData((prev) => ({ ...prev, primaryGoal: e.target.value }))}
                      placeholder="What should this project achieve? (e.g. increase inquiries, enable bookings, launch MVP, reduce ops work)"
                      className="min-h-[90px]"
                    />
                  </div>

                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="sp-users">Target users</Label>
                    <Textarea
                      id="sp-users"
                      value={data.targetUsers}
                      onChange={(e) => setData((prev) => ({ ...prev, targetUsers: e.target.value }))}
                      placeholder="Who uses it? What do they need? Any user roles?"
                      className="min-h-[90px]"
                    />
                  </div>

                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="sp-cta">Primary call-to-action (optional)</Label>
                    <Input
                      id="sp-cta"
                      value={data.primaryCta}
                      onChange={(e) => setData((prev) => ({ ...prev, primaryCta: e.target.value }))}
                      placeholder="Book now, Request a quote, Sign up, Contact, Buy…"
                    />
                  </div>

                  <div className="rounded-xl border border-border/60 bg-background/40 p-4 text-sm text-muted-foreground md:col-span-2">
                    <p className="font-medium text-foreground">Smart prompts</p>
                    <p className="mt-1">
                      {category === 'booking'
                        ? 'Include: services/prices, availability rules, deposits, confirmations, reminders, and where bookings should go.'
                        : category === 'ecommerce'
                          ? 'Include: products count, payments, shipping rules, discounts, who manages orders, and admin needs.'
                          : category === 'website'
                            ? 'Include: pages, key section (pricing/services), proof/trust signals, and SEO/analytics priorities.'
                            : category === 'api'
                              ? 'Include: systems involved, triggers, data fields, edge cases, and a clear definition of success.'
                              : 'Include: roles, auth, core flows, admin needs, and integrations.'}
                    </p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="grid gap-4">
                  <div className="rounded-xl border border-border/60 bg-background/40 p-4 text-sm text-muted-foreground">
                    <p className="font-medium text-foreground">Product discovery (fast, but useful)</p>
                    <p className="mt-1">
                      These answers help us shape scope, reduce risk, and design the right UX. Keep it short — bullet points are perfect.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2 md:col-span-2">
                      <Label htmlFor="sp-problem">Problem statement</Label>
                      <Textarea
                        id="sp-problem"
                        value={data.problemStatement}
                        onChange={(e) => setData((prev) => ({ ...prev, problemStatement: e.target.value }))}
                        placeholder="What problem are you solving, for who, and why now?"
                        className="min-h-[110px]"
                      />
                    </div>

                    <div className="grid gap-2 md:col-span-2">
                      <Label htmlFor="sp-segments">Target segments / ICP</Label>
                      <Textarea
                        id="sp-segments"
                        value={data.targetSegments}
                        onChange={(e) => setData((prev) => ({ ...prev, targetSegments: e.target.value }))}
                        placeholder="Who is the ideal customer? Region/industry/company size? Any non-ideal customers?"
                        className="min-h-[110px]"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="sp-buyers">Decision makers / stakeholders (optional)</Label>
                      <Textarea
                        id="sp-buyers"
                        value={data.decisionMakers}
                        onChange={(e) => setData((prev) => ({ ...prev, decisionMakers: e.target.value }))}
                        placeholder="Who buys/approves? Who operates it? Any legal/compliance sign-off?"
                        className="min-h-[110px]"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="sp-positioning">Differentiators / positioning (optional)</Label>
                      <Textarea
                        id="sp-positioning"
                        value={data.differentiators}
                        onChange={(e) => setData((prev) => ({ ...prev, differentiators: e.target.value }))}
                        placeholder="Why you? What’s unique vs alternatives? Any “must” requirements?"
                        className="min-h-[110px]"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="sp-channels">Acquisition channels (optional)</Label>
                      <Textarea
                        id="sp-channels"
                        value={data.acquisitionChannels}
                        onChange={(e) => setData((prev) => ({ ...prev, acquisitionChannels: e.target.value }))}
                        placeholder="How do users find you? SEO, ads, referrals, outbound, partnerships, marketplaces…"
                        className="min-h-[110px]"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="sp-pricing">Pricing / business model (optional)</Label>
                      <Textarea
                        id="sp-pricing"
                        value={data.pricingModel}
                        onChange={(e) => setData((prev) => ({ ...prev, pricingModel: e.target.value }))}
                        placeholder="Free/trial, subscription tiers, once-off purchases, bookings, lead-gen, internal tool…"
                        className="min-h-[110px]"
                      />
                    </div>

                    <div className="grid gap-2 md:col-span-2">
                      <Label htmlFor="sp-discovery-links">Discovery links (optional)</Label>
                      <Textarea
                        id="sp-discovery-links"
                        value={data.discoveryLinks}
                        onChange={(e) => setData((prev) => ({ ...prev, discoveryLinks: e.target.value }))}
                        placeholder="Links to docs, Notion, existing briefs, user research notes, analytics screenshots, etc. (one per line)"
                        className="min-h-[110px]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="sp-description">What needs to be built?</Label>
                    <Textarea
                      id="sp-description"
                      value={data.description}
                      onChange={(e) => setData((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the scope in plain language. What exists today, what should change, what ‘done’ looks like."
                      className="min-h-[130px]"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="sp-pages">Pages / screens (one per line)</Label>
                    <Textarea
                      id="sp-pages"
                      value={data.pagesOrScreens}
                      onChange={(e) => setData((prev) => ({ ...prev, pagesOrScreens: e.target.value }))}
                      placeholder={category === 'website' ? 'Home\nServices\nPricing\nAbout\nContact' : 'Login\nDashboard\nSettings\nAdmin'}
                      className="min-h-[140px]"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="sp-flows">Key flows (one per line)</Label>
                    <Textarea
                      id="sp-flows"
                      value={data.keyFlows}
                      onChange={(e) => setData((prev) => ({ ...prev, keyFlows: e.target.value }))}
                      placeholder={category === 'booking' ? 'Select service → choose time → pay deposit → confirmation' : 'User signs up → completes action → confirmation'}
                      className="min-h-[140px]"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="sp-must">Must-have (one per line)</Label>
                    <Textarea
                      id="sp-must"
                      value={data.mustHave}
                      onChange={(e) => setData((prev) => ({ ...prev, mustHave: e.target.value }))}
                      placeholder="Must ship items (non-negotiable)"
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="sp-nice">Nice-to-have (one per line)</Label>
                    <Textarea
                      id="sp-nice"
                      value={data.niceToHave}
                      onChange={(e) => setData((prev) => ({ ...prev, niceToHave: e.target.value }))}
                      placeholder="Great-to-have items if time/budget allows"
                      className="min-h-[120px]"
                    />
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label>Feature checklist (optional)</Label>
                    <div className="grid gap-3 md:grid-cols-2">
                      {(FEATURE_OPTIONS[category] ?? FEATURE_OPTIONS.app).map((value) => (
                        <label key={value} className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/40 p-3">
                          <Checkbox
                            checked={data.features.includes(value)}
                            onCheckedChange={(checked) =>
                              setData((prev) => ({ ...prev, features: toggleValue(prev.features, value, checked === true) }))
                            }
                          />
                          <span className="text-sm text-muted-foreground">{value}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <Label>Integrations (optional)</Label>
                    <div className="grid gap-3 md:grid-cols-2">
                      {INTEGRATION_OPTIONS.map((value) => (
                        <label key={value} className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/40 p-3">
                          <Checkbox
                            checked={data.integrations.includes(value)}
                            onCheckedChange={(checked) =>
                              setData((prev) => ({ ...prev, integrations: toggleValue(prev.integrations, value, checked === true) }))
                            }
                          />
                          <span className="text-sm text-muted-foreground">{value}</span>
                        </label>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">If you pick “Other”, list specifics in References/Notes.</p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="sp-metrics">Success metrics (optional, one per line)</Label>
                    <Textarea
                      id="sp-metrics"
                      value={data.successMetrics}
                      onChange={(e) => setData((prev) => ({ ...prev, successMetrics: e.target.value }))}
                      placeholder="e.g. +30% inquiries\n<2s load on mobile\nReduce manual booking time"
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="sp-constraints">Constraints / risks (optional, one per line)</Label>
                    <Textarea
                      id="sp-constraints"
                      value={data.constraints}
                      onChange={(e) => setData((prev) => ({ ...prev, constraints: e.target.value }))}
                      placeholder="e.g. compliance requirements\nmust match existing branding\n3rd-party API limits"
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="sp-refs">References / examples (optional, one per line)</Label>
                    <Textarea
                      id="sp-refs"
                      value={data.references}
                      onChange={(e) => setData((prev) => ({ ...prev, references: e.target.value }))}
                      placeholder="Links to competitor sites, inspiration, docs, Figma, Notion, etc."
                      className="min-h-[120px]"
                    />
                  </div>
                </div>
              )}

              {step === 6 && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label>When do you want it live?</Label>
                    <RadioGroup
                      value={data.timeline}
                      onValueChange={(value) => setData((prev) => ({ ...prev, timeline: value as Timeline }))}
                      className="grid gap-2"
                    >
                      {(['ASAP', '2–4 weeks', '1–2 months', '3–6 months', '6+ months', 'Not sure'] as const).map((value) => (
                        <div key={value} className="flex items-center gap-2">
                          <RadioGroupItem value={value} id={`sp-timeline-${value}`} />
                          <Label htmlFor={`sp-timeline-${value}`} className="font-normal">
                            {value}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label>Currency</Label>
                      <Select
                        value={data.currency}
                        onValueChange={(value) =>
                          setData((prev) => ({
                            ...prev,
                            currency: value as CurrencyCode,
                            budget: '',
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a currency" />
                        </SelectTrigger>
                        <SelectContent className="z-[70]">
                          {CURRENCIES.map((currency) => (
                            <SelectItem key={currency.code} value={currency.code}>
                              {currency.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label>Budget range</Label>
                      <Select
                        value={data.budget}
                        onValueChange={(value) => setData((prev) => ({ ...prev, budget: value as BudgetRange }))}
                        disabled={!data.currency}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={data.currency ? 'Select a budget range' : 'Select currency first'} />
                        </SelectTrigger>
                        <SelectContent className="z-[70]">
                          {(CURRENCIES.find((c) => c.code === data.currency)?.ranges ?? []).map((value) => (
                            <SelectItem key={value} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label>Specific go-live date (optional)</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start border-border/60 bg-transparent text-left font-normal hover:bg-muted"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {data.goLiveDate ? format(new Date(data.goLiveDate), 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="z-[70] w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={data.goLiveDate ? new Date(data.goLiveDate) : undefined}
                            onSelect={(date) =>
                              setData((prev) => ({
                                ...prev,
                                goLiveDate: date ? format(date, 'yyyy-MM-dd') : '',
                              }))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              )}

              {step === 7 && (
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label>Assets & constraints</Label>
                    <div className="grid gap-3 md:grid-cols-2">
                      {[
                        { key: 'hasBranding', label: 'Branding / logo already exists' },
                        { key: 'hasContent', label: 'Content (copy/images) is ready' },
                        { key: 'hasDomain', label: 'Domain + hosting already exists' },
                        { key: 'needsDesign', label: 'Need design support' },
                      ].map((item) => (
                        <label key={item.key} className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/40 p-3">
                          <Checkbox
                            checked={data[item.key as keyof WizardData] as boolean}
                            onCheckedChange={(checked) => setData((prev) => ({ ...prev, [item.key]: checked === true }))}
                          />
                          <span className="text-sm text-muted-foreground">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="sp-brand-link">Brand link (optional)</Label>
                      <Input
                        id="sp-brand-link"
                        value={data.brandLink}
                        onChange={(e) => setData((prev) => ({ ...prev, brandLink: e.target.value }))}
                        placeholder="Figma / brand guide / Drive folder link"
                        inputMode="url"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="sp-domain-name">Domain name (optional)</Label>
                      <Input
                        id="sp-domain-name"
                        value={data.domainName}
                        onChange={(e) => setData((prev) => ({ ...prev, domainName: e.target.value }))}
                        placeholder="example.com"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="sp-access">Access needed (optional)</Label>
                    <Textarea
                      id="sp-access"
                      value={data.accessNeeds}
                      onChange={(e) => setData((prev) => ({ ...prev, accessNeeds: e.target.value }))}
                      placeholder="Hosting login, domain registrar, GitHub repo, analytics accounts, etc."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="sp-notes">Anything else we should know? (optional)</Label>
                    <Textarea
                      id="sp-notes"
                      value={data.notes}
                      onChange={(e) => setData((prev) => ({ ...prev, notes: e.target.value }))}
                      placeholder="Anything sensitive, deadlines, stakeholders, compliance requirements, etc."
                      className="min-h-[120px]"
                    />
                  </div>
                </div>
              )}

              {step === 8 && (
                <div className="grid gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">Review</p>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-border/60 bg-transparent hover:bg-muted"
                        onClick={() => copy(summary)}
                      >
                        Copy
                      </Button>
                      <Button type="button" onClick={() => goContact(true)}>
                        Send via contact form <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Textarea readOnly value={summary} className="min-h-[240px]" />
                  <p className="text-xs text-muted-foreground">
                    This takes you to the contact form with the brief prefilled so you can submit it directly.
                  </p>
                </div>
              )}

              <div className="mt-2 flex items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="border-border/60 bg-transparent hover:bg-muted"
                  onClick={() => {
                    if (step === 0) {
                      setConfirmAction('back-to-choice')
                      setConfirmOpen(true)
                    } else {
                      setStep((s) => Math.max(0, s - 1))
                    }
                  }}
                >
                  Back
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setConfirmAction('skip')
                      setConfirmOpen(true)
                    }}
                  >
                    Skip wizard
                  </Button>
                  {step < steps.length - 1 ? (
                    <Button
                      type="button"
                      disabled={!canNext}
                      onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
                    >
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : null}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent className="z-[80]">
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmAction === 'skip' ? 'Skip the wizard?' : 'Exit the wizard?'}</AlertDialogTitle>
            <AlertDialogDescription>
              You’ll lose the guided questions that help capture a detailed brief. You can still submit details on the contact page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue wizard</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (confirmAction === 'skip') {
                  goContact(false)
                  return
                }
                if (confirmAction === 'back-to-choice') {
                  setMode('choice')
                  return
                }
              }}
            >
              {confirmAction === 'skip' ? 'Yes, skip' : 'Yes, exit'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
