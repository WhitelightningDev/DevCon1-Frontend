export type OfferingCategory = 'Engineering' | 'Platforms' | 'AI & Security' | 'Marketing'

export type Offering = {
  slug: string
  title: string
  category: OfferingCategory
  summary: string
  intro: string
  whatWeDeliver: readonly string[]
  integrations: readonly string[]
  outcomes: readonly string[]
}

export const offerings: readonly Offering[] = [
  {
    slug: 'web-development',
    title: 'Web Development',
    category: 'Engineering',
    summary: 'High-quality websites and web apps with clean UX, performance, and maintainable code.',
    intro:
      'From marketing sites to complex frontends, we build fast, accessible experiences with a professional handoff your team can own.',
    whatWeDeliver: [
      'Modern React/TypeScript implementation with clean component patterns',
      'Responsive UI, accessibility-first, and performance tuning',
      'SEO basics, analytics setup, and deployment best practices',
      'Forms, content sections, and conversion-focused UX improvements',
    ],
    integrations: ['Analytics (GA4)', 'Forms (SMTP / API)', 'CMS (Sanity / Contentful)', 'Payments (Stripe / PayFast)', 'Maps & location'],
    outcomes: ['Faster load times and stronger UX', 'Higher conversion clarity', 'Maintainable UI patterns and documentation'],
  },
  {
    slug: 'saas-development',
    title: 'SaaS Development',
    category: 'Platforms',
    summary: 'Subscription software built with product-grade UX and operational readiness.',
    intro:
      'We design and build SaaS capability: authentication, billing, roles, dashboards, and reliable workflows—shipped in reviewable milestones.',
    whatWeDeliver: [
      'Auth, roles/permissions, and secure account flows',
      'Dashboards, admin areas, and core feature workflows',
      'Billing/subscriptions, plan gating, and upgrade flows',
      'Production hardening: logging, error handling, and performance checks',
    ],
    integrations: ['Auth (Clerk / Auth0)', 'Billing (Stripe)', 'Email (Resend / SMTP)', 'Monitoring (Sentry)', 'CRM (HubSpot)'],
    outcomes: ['Shippable MVPs and iterations', 'Clean UX for key flows', 'Operational artifacts for long-term ownership'],
  },
  {
    slug: 'paas-development',
    title: 'PaaS / Internal Platform',
    category: 'Platforms',
    summary: 'Platform features and internal tools that keep teams shipping: portals, automation, and governance.',
    intro:
      'When product teams scale, the platform needs to scale too. We help build portals, tooling, and automation that improves reliability and speed.',
    whatWeDeliver: [
      'Internal portals and operational dashboards',
      'Workflow automation and approvals',
      'API integrations, webhooks, and data synchronization',
      'Security-minded patterns: access control and auditability',
    ],
    integrations: ['SSO / IdP', 'Webhooks', 'Data sync (ETL)', 'Queues / background jobs', 'Observability tooling'],
    outcomes: ['Reduced manual ops work', 'More predictable releases', 'Clear ownership via runbooks and docs'],
  },
  {
    slug: 'ai-integration',
    title: 'AI Integration',
    category: 'AI & Security',
    summary: 'Add AI features to existing systems without rewriting everything.',
    intro:
      'We integrate LLM capability where it provides real leverage: search, summarization, support tooling, and internal assistants—built with guardrails.',
    whatWeDeliver: [
      'LLM-enabled workflows (assistants, summarization, drafting, classification)',
      'Tool integrations and structured outputs',
      'Search/RAG over documents (where appropriate)',
      'Evaluation, guardrails, and rollout strategy',
    ],
    integrations: ['LLM provider APIs', 'Knowledge bases (docs, Notion, Drive)', 'Support tools', 'Internal admin systems', 'Monitoring + cost tracking'],
    outcomes: ['Reduced turnaround time on repetitive work', 'Better internal tooling', 'Safer AI deployment with guardrails'],
  },
  {
    slug: 'security-integration',
    title: 'Security Integration',
    category: 'AI & Security',
    summary: 'Security-minded delivery: hardening, reviewable controls, and safer defaults.',
    intro:
      'We embed security into delivery: from auth and access control to dependency hygiene and environment practices—documented for handoff.',
    whatWeDeliver: [
      'AuthN/AuthZ patterns with least privilege',
      'Secure form handling and input validation',
      'Dependency review and secrets hygiene',
      'Security checklist + handoff notes (practical, not theoretical)',
    ],
    integrations: ['SSO/Auth providers', 'Secrets management', 'Security headers/CSP', 'Monitoring/alerting', 'Audit logging patterns'],
    outcomes: ['Lower risk with secure defaults', 'Clear, reviewable controls', 'Practical security posture improvements'],
  },
  {
    slug: 'marketing-basic',
    title: 'Marketing — Basic',
    category: 'Marketing',
    summary: 'Clean foundations: pages, messaging clarity, SEO basics, and tracking.',
    intro:
      'A strong baseline for teams that need clarity and credibility quickly—without overbuilding.',
    whatWeDeliver: [
      'Landing pages and conversion-ready sections',
      'SEO basics (titles, metadata, sitemap, indexing)',
      'Analytics instrumentation (events + goals)',
      'Performance and accessibility baseline',
    ],
    integrations: ['GA4', 'Meta Pixel', 'Forms + CRM handoff', 'Basic email capture', 'Site monitoring'],
    outcomes: ['Clearer conversion paths', 'Measurable tracking', 'A credible, modern web presence'],
  },
  {
    slug: 'marketing-growth',
    title: 'Marketing — Growth',
    category: 'Marketing',
    summary: 'Experimentation-ready marketing: funnels, content structure, and iteration.',
    intro:
      'For teams that want ongoing improvement: better funnels, better content structure, and clean measurement that informs what to build next.',
    whatWeDeliver: [
      'Funnel improvements (forms, lead capture, booking flows)',
      'Content templates and scalable page patterns',
      'A/B testing readiness and measurement strategy',
      'Performance, UX, and conversion iteration loops',
    ],
    integrations: ['CRM (HubSpot)', 'Email marketing (Mailchimp)', 'Booking tools (Calendly)', 'Heatmaps/session replay', 'Tag manager'],
    outcomes: ['Improved conversion rate over time', 'Faster iteration cycles', 'Clear insight into what works'],
  },
  {
    slug: 'marketing-advanced',
    title: 'Marketing — Advanced',
    category: 'Marketing',
    summary: 'Advanced instrumentation, attribution thinking, and high-signal reporting.',
    intro:
      'For teams running serious campaigns or scaling acquisition: deeper tracking, cleaner reporting, and reliable conversion data.',
    whatWeDeliver: [
      'Advanced event tracking strategy (naming, governance, QA)',
      'Attribution-minded funnel design and reporting',
      'Performance hardening for campaign traffic',
      'Integration planning across marketing + product systems',
    ],
    integrations: ['GA4 + custom events', 'Server-side tracking (where needed)', 'CRM + pipeline', 'Ad platforms', 'Data exports/reporting'],
    outcomes: ['Higher quality acquisition data', 'Cleaner reporting for decisions', 'A scalable measurement foundation'],
  },
] as const

export function getOffering(slug: string) {
  return offerings.find((item) => item.slug === slug) ?? null
}

export const offeringsByCategory = offerings.reduce<Record<OfferingCategory, Offering[]>>(
  (acc, item) => {
    acc[item.category].push(item)
    return acc
  },
  { Engineering: [], Platforms: [], 'AI & Security': [], Marketing: [] },
)

