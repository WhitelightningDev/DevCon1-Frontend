import { Github, Gauge, ShieldCheck, Timer } from 'lucide-react'

import { Button } from '@/components/ui/button'

const stats = [
  { label: 'Projects shipped', value: '35+', icon: Gauge },
  { label: 'Response time', value: '< 1 business day', icon: Timer },
  { label: 'Security-minded', value: 'Safe defaults', icon: ShieldCheck },
] as const

const logoNames = [
  'Bullion Beperk',
  'Found Your Pet',
  'Jet Ski And More',
  'HKNFT',
  'Kiings VIP',
  'AEM Co-operatives',
] as const

export function TrustSignals() {
  const githubUrl = (import.meta.env.VITE_GITHUB_URL as string | undefined) || ''

  return (
    <section aria-label="Trust signals" className="py-10 md:py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="text-center md:text-left">
            <p className="dc-kicker">Trust</p>
            <h2 className="dc-animate-heading dc-h2 [--dc-delay:60ms] mt-3">
              Proof you can scan quickly.
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
              A few simple signals—optimized for clarity.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center md:items-end md:justify-end">
            <Button asChild>
              <a href="/what-we-do">What we do</a>
            </Button>
            {githubUrl ? (
              <Button asChild variant="outline">
                <a href={githubUrl} target="_blank" rel="noreferrer">
                  GitHub <Github className="ml-2 h-4 w-4" />
                </a>
              </Button>
            ) : null}
          </div>
        </div>

        <dl className="mt-8 grid gap-4 rounded-xl border border-border/60 bg-background/40 p-5 md:grid-cols-3">
          {stats.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/60 bg-background/50">
                  <Icon className="h-4 w-4 text-primary" />
                </span>
                <div>
                  <dt className="text-sm font-semibold">{item.label}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{item.value}</dd>
                </div>
              </div>
            )
          })}
        </dl>

        <p className="mt-6 text-center text-xs text-muted-foreground md:text-left">Recent logos: {logoNames.join(' • ')}</p>
      </div>
    </section>
  )
}
