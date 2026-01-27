import { Github, Gauge, ShieldCheck, Timer } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const stats = [
  { label: 'Projects shipped', value: '8+', icon: Gauge },
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
        <div className="rounded-2xl border border-emerald-500/15 bg-gradient-to-b from-emerald-500/10 to-background/30 p-6 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Badge variant="outline" className="border-emerald-500/25 bg-emerald-500/10 text-emerald-200">
                  Trusted by
                </Badge>
                <p className="text-xs tracking-wide text-muted-foreground">SIGNALS</p>
              </div>
              <h2 className="dc-animate-heading [--dc-delay:60ms] mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                Proof you can scan in seconds.
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
                A few quick signals to reduce uncertainty—plus links to shipped work.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center md:items-end md:justify-end">
              <Button asChild className="bg-emerald-500 text-emerald-950 hover:bg-emerald-400">
                <a href="/work">View work</a>
              </Button>
              {githubUrl ? (
                <Button asChild variant="outline" className="border-border/60 bg-transparent hover:bg-muted">
                  <a href={githubUrl} target="_blank" rel="noreferrer">
                    GitHub <Github className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              ) : null}
            </div>
          </div>

          <Separator className="my-8" />

          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="rounded-xl border border-border/60 bg-background/40 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold">{item.label}</p>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-emerald-500/15 bg-emerald-500/10">
                      <Icon className="h-4 w-4 text-emerald-400" />
                    </span>
                  </div>
                  <p className="mt-2 text-lg font-semibold tracking-tight">{item.value}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-8">
            <p className="text-xs font-medium tracking-wide text-muted-foreground text-center md:text-left">RECENT WORK</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
              {logoNames.map((name) => (
                <span
                  key={name}
                  className="rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs text-muted-foreground"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

