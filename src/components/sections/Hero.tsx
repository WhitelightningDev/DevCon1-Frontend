import { ArrowRight, Radar, Shield, Sparkles } from 'lucide-react'

import { StartProjectDialog } from '@/components/project/StartProjectDialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-12 pt-12 md:pb-20 md:pt-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="max-w-3xl text-center md:text-left">
            <p className="dc-kicker">Engineering services</p>
            <h1 className="dc-animate-heading dc-h1 [--dc-delay:80ms] mt-3 text-foreground">
              Reliable software delivery for <span className="text-primary">performance, security, and growth</span>.
            </h1>

            <p className="mx-auto mt-4 max-w-2xl dc-lead md:mx-0">
              Web apps, integrations, and operational tooling—shipped with clear scope, reviewable milestones, and a handoff
              your team can own.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row md:justify-start">
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

            <ul className="mt-8 grid gap-2 text-sm text-muted-foreground sm:grid-cols-3 md:text-left">
              <li className="flex items-center justify-center gap-2 md:justify-start">
                <Shield className="h-4 w-4 text-primary" />
                Security-first defaults
              </li>
              <li className="flex items-center justify-center gap-2 md:justify-start">
                <Radar className="h-4 w-4 text-primary" />
                Operational clarity
              </li>
              <li className="flex items-center justify-center gap-2 md:justify-start">
                <Sparkles className="h-4 w-4 text-primary" />
                Polished, fast UX
              </li>
            </ul>
          </div>

          <div className="hidden lg:block">
            <Card className="border-border/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Latest</CardTitle>
                <CardDescription>Quick links to evaluate fit.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 pt-0">
                {[
                  { title: 'Services and offerings', href: '/services', description: 'What we do, how we engage.' },
                  { title: 'Work and case studies', href: '/work', description: 'Shipped work with outcomes.' },
                  { title: 'Delivery process', href: '/process', description: 'Clear phases and templates.' },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group block border border-border/60 bg-background p-4 transition-colors hover:bg-muted/30"
                  >
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                    <span className="mt-3 inline-flex items-center text-xs font-medium text-primary">
                      Explore <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </a>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
