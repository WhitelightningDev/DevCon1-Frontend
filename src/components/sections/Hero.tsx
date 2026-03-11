import { ArrowRight, Radar, Shield, Sparkles } from 'lucide-react'

import { StartProjectDialog } from '@/components/project/StartProjectDialog'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-12 pt-12 md:pb-20 md:pt-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="dc-animate-heading [--dc-delay:80ms] text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Reliable software delivery for{' '}
            <span className="text-primary">performance, security, and growth</span>
            .
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            Web apps, integrations, and operational tooling—shipped with clear scope, reviewable milestones, and a handoff
            your team can own.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <StartProjectDialog
              trigger={
                <Button>
                  Start a project <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              }
            />
            <Button asChild variant="outline">
              <a href="#services">View services</a>
            </Button>
          </div>

          <ul className="mt-8 grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
            <li className="flex items-center justify-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Security-first defaults
            </li>
            <li className="flex items-center justify-center gap-2">
              <Radar className="h-4 w-4 text-primary" />
              Operational clarity
            </li>
            <li className="flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Polished, fast UX
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
