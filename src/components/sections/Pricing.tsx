import { useEffect, useMemo, useState } from 'react'
import { BadgeDollarSign, CheckCircle2, Sparkles } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

type CurrencyCode = 'ZAR' | 'USD' | 'EUR' | 'GBP'

const currencyOptions = [
  { code: 'ZAR', label: 'Rands', symbol: 'R' },
  { code: 'USD', label: 'Dollars', symbol: '$' },
  { code: 'EUR', label: 'Euros', symbol: '€' },
  { code: 'GBP', label: 'Pounds', symbol: '£' },
] as const satisfies readonly { code: CurrencyCode; label: string; symbol: string }[]

const currencyLocales: Record<CurrencyCode, string> = {
  ZAR: 'en-ZA',
  USD: 'en-US',
  EUR: 'en-IE',
  GBP: 'en-GB',
}

type TierPrice =
  | { kind: 'range'; min: number; max: number }
  | { kind: 'custom' }

const tiers = [
  {
    name: 'Starter',
    pricing: {
      ZAR: { kind: 'range', min: 30000, max: 100000 },
      USD: { kind: 'range', min: 1500, max: 5000 },
      EUR: { kind: 'range', min: 1400, max: 4600 },
      GBP: { kind: 'range', min: 1200, max: 4000 },
    } satisfies Record<CurrencyCode, TierPrice>,
    description: 'Best for a fast, credible web presence with a conversion-focused contact flow.',
    icon: Sparkles,
    featured: false,
    features: ['Single-page or small site', 'Responsive + accessible UI', 'SEO + share metadata', 'Contact / intake flow'],
  },
  {
    name: 'Growth',
    pricing: {
      ZAR: { kind: 'range', min: 100000, max: 400000 },
      USD: { kind: 'range', min: 5000, max: 20000 },
      EUR: { kind: 'range', min: 4600, max: 18400 },
      GBP: { kind: 'range', min: 4000, max: 15600 },
    } satisfies Record<CurrencyCode, TierPrice>,
    description: 'For dashboards, internal tools, and product features with integrations and iteration.',
    icon: BadgeDollarSign,
    features: ['Multi-page app or dashboard', 'API integration + data flows', 'Component system + design tokens', 'Deployment + handoff docs'],
    featured: true,
  },
  {
    name: 'Enterprise',
    pricing: {
      ZAR: { kind: 'custom' },
      USD: { kind: 'custom' },
      EUR: { kind: 'custom' },
      GBP: { kind: 'custom' },
    } satisfies Record<CurrencyCode, TierPrice>,
    description: 'Security, hardening, performance, and delivery enablement for high-stakes environments.',
    icon: CheckCircle2,
    featured: false,
    features: ['Threat-aware patterns', 'Perf + reliability pass', 'CI/CD + release process', 'Operational runbook-minded handoff'],
  },
] as const

export function Pricing() {
  const [currency, setCurrency] = useState<CurrencyCode>('ZAR')

  useEffect(() => {
    const stored = localStorage.getItem('devcon1.currency')
    if (stored && currencyOptions.some((option) => option.code === stored)) {
      setCurrency(stored as CurrencyCode)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('devcon1.currency', currency)
  }, [currency])

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(currencyLocales[currency], {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
      }),
    [currency],
  )

  const tierPriceLabel = useMemo(() => {
    return (price: TierPrice) => {
      if (price.kind === 'custom') return 'Custom'
      return `From ${formatter.format(price.min)}–${formatter.format(price.max)}`
    }
  }, [formatter])

  return (
    <section id="pricing" className="scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <Badge variant="outline" className="border-emerald-500/25 bg-emerald-500/10 text-emerald-200">
                Pricing
              </Badge>
              <p className="text-xs tracking-wide text-muted-foreground">RANGES & TIERS</p>
            </div>
            <h2 className="dc-animate-heading [--dc-delay:60ms] mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              Transparent packages to set expectations.
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
              These are starting ranges. Final pricing depends on scope, timeline, and risk. If you’re unsure, we’ll help
              you choose the right tier.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 md:items-end">
            <div
              role="group"
              aria-label="Currency"
              className="inline-flex flex-wrap items-center justify-center gap-1 rounded-full border border-border/60 bg-background/40 p-1 md:justify-end"
            >
              {currencyOptions.map((option) => {
                const active = option.code === currency
                return (
                  <button
                    key={option.code}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setCurrency(option.code)}
                    className={[
                      'rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                      active
                        ? 'bg-emerald-500 text-emerald-950'
                        : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                    ].join(' ')}
                  >
                    {option.symbol} {option.label}
                  </button>
                )
              })}
            </div>

            <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center md:items-end md:justify-end">
              <Button asChild className="bg-emerald-500 text-emerald-950 hover:bg-emerald-400">
                <a href="/contact">Get a quote</a>
              </Button>
              <Button asChild variant="outline" className="border-border/60 bg-transparent hover:bg-muted">
                <a href="#services">See services</a>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="grid gap-4 lg:grid-cols-3">
          {tiers.map((tier) => {
            const Icon = tier.icon
            return (
              <div
                key={tier.name}
                className={[
                  'rounded-xl border border-border/60 bg-background/40 p-6',
                  tier.featured ? 'border-emerald-500/25 bg-emerald-500/5' : '',
                ].join(' ')}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{tier.name}</p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight">{tierPriceLabel(tier.pricing[currency])}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
                  </div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-emerald-500/15 bg-emerald-500/10">
                    <Icon className="h-5 w-5 text-emerald-400" />
                  </span>
                </div>

                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/10">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <Button
                    asChild
                    variant={tier.featured ? 'default' : 'outline'}
                    className={[
                      'w-full',
                      tier.featured ? 'bg-emerald-500 text-emerald-950 hover:bg-emerald-400' : 'border-border/60 bg-transparent hover:bg-muted',
                    ].join(' ')}
                  >
                    <a href="/contact">Ask about {tier.name}</a>
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground md:text-left">
          Need something in-between? We also offer sprint blocks and retainers.
        </p>
      </div>
    </section>
  )
}
