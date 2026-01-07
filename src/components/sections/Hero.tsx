import { ArrowRight, Radar, Shield, Sparkles } from 'lucide-react'

import { RadarSweep } from '@/components/illustrations/RadarSweep'
import { StartProjectDialog } from '@/components/project/StartProjectDialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-12 pt-12 md:pb-20 md:pt-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
              <Badge variant="outline" className="border-emerald-500/25 bg-emerald-500/10 text-emerald-200">
                Secure delivery
              </Badge>
              <Badge variant="outline" className="border-border/60 bg-background/60 text-muted-foreground">
                React • TypeScript • Cloud
              </Badge>
            </div>

            <h1 className="dc-animate-heading [--dc-delay:80ms] mt-5 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Software that ships{' '}
              <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                clean, fast, and hardened
              </span>
              .
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg md:mx-0">
              DevCon1 builds modern web and internal systems for teams operating in demanding environments. Design,
              engineering, and delivery—built for reliability and security.
            </p>

            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:items-start md:justify-start">
              <StartProjectDialog
                trigger={
                  <Button className="bg-emerald-500 text-emerald-950 hover:bg-emerald-400">
                    Start a project <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                }
              />
              <Button asChild variant="outline" className="border-border/60 bg-transparent hover:bg-muted">
                <a href="#services">View services</a>
              </Button>
            </div>

            <div className="mt-8 grid gap-3 text-left sm:grid-cols-3">
              <div className="rounded-lg border border-border/60 bg-background/40 px-4 py-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Shield className="h-4 w-4 text-emerald-400" />
                  Security-first
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Threat-aware patterns, least-privilege by default.</p>
              </div>
              <div className="rounded-lg border border-border/60 bg-background/40 px-4 py-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Radar className="h-4 w-4 text-emerald-400" />
                  Mission-ready
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Operational clarity, observability, resilience.</p>
              </div>
              <div className="rounded-lg border border-border/60 bg-background/40 px-4 py-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                  Polished UX
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Modern UI without sacrificing performance.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-emerald-500/15 bg-gradient-to-b from-emerald-500/10 to-background/30 p-6">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.20),transparent_45%),radial-gradient(circle_at_70%_60%,rgba(34,211,238,0.12),transparent_50%)]" />
              <div className="pointer-events-none absolute right-3 top-3 h-40 w-40 opacity-90">
                <RadarSweep className="h-full w-full text-emerald-300/60" />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium tracking-wide text-muted-foreground">DELIVERY SNAPSHOT</p>
                <Badge variant="outline" className="border-emerald-500/25 bg-emerald-500/10 text-emerald-200">
                  2026
                </Badge>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-lg border border-border/60 bg-background/40 p-4">
                  <p className="text-sm font-medium">Discovery → Blueprint</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Clear scope, architecture notes, and delivery checkpoints.
                  </p>
                </div>
                <div className="rounded-lg border border-border/60 bg-background/40 p-4">
                  <p className="text-sm font-medium">Build → Validate</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Type-safe implementation, test coverage, and reviewable increments.
                  </p>
                </div>
                <div className="rounded-lg border border-border/60 bg-background/40 p-4">
                  <p className="text-sm font-medium">Deploy → Operate</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    CI/CD ready, observability hooks, and runbook-minded handoff.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
