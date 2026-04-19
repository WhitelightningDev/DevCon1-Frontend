import { useEffect, useMemo } from 'react'
import { ArrowRight } from 'lucide-react'

import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { StartProjectDialog } from '@/components/project/StartProjectDialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { OfferingCard } from '@/features/offerings/OfferingCard'
import { OfferingHeroVisual } from '@/features/offerings/OfferingHeroVisual'
import { getOffering, offerings } from '@/lib/offerings'
import { setSeo } from '@/lib/seo'

function slugFromPathname(pathname: string) {
  const parts = pathname.replace(/\/+$/, '').split('/')
  const slug = parts[2] || ''
  return slug.trim()
}

export function OfferingPage() {
  const pathname = useMemo(() => window.location.pathname, [])
  const slug = useMemo(() => slugFromPathname(pathname), [pathname])
  const offering = useMemo(() => getOffering(slug), [slug])

  useEffect(() => {
    const title = offering ? `HKFT Services — ${offering.title}` : 'HKFT Services — What we do'
    const description = offering
      ? offering.summary
      : 'Explore our service offerings across engineering, platforms, AI, security, and marketing.'
    setSeo({ title, description, imagePath: '/pwa/icon-512.png' })
  }, [offering])

  if (!offering) {
    return (
      <div id="top" className="min-h-screen text-foreground">
        <Navbar />
        <main id="main" className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <p className="dc-kicker">What we do</p>
            <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Service not found</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              This page doesn’t exist. Choose a service from the list.
            </p>
            <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-start">
              <Button asChild className="h-11 rounded-none px-5">
                <a href="/what-we-do">
                  Back to what we do <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <StartProjectDialog
                defaultToWizard
                trigger={<Button variant="outline" className="h-11 rounded-none px-5">Start a project</Button>}
              />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div id="top" className="min-h-screen text-foreground">
      <Navbar />

      <main id="main">
        <section className="relative overflow-hidden pb-10 pt-12 md:pb-16 md:pt-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div className="mx-auto max-w-3xl text-center md:text-left md:mx-0">
                <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                  <Badge variant="outline" className="rounded-full border-border/60 bg-background/60">
                    What we do
                  </Badge>
                  <Badge variant="secondary" className="rounded-full border-border/60 bg-secondary/60">
                    {offering.category}
                  </Badge>
                </div>

                <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">{offering.title}</h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{offering.intro}</p>

                <div className="mt-8 lg:hidden">
                  <OfferingHeroVisual offering={offering} />
                </div>

                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row md:justify-start">
                  <StartProjectDialog
                    defaultToWizard
                    trigger={
                      <Button className="h-11 rounded-none px-5">
                        Start a project <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    }
                  />
                  <Button asChild variant="outline" className="h-11 rounded-none px-5">
                    <a href="/what-we-do">All services</a>
                  </Button>
                </div>

                <p className="mt-6 text-sm text-muted-foreground">{offering.summary}</p>
              </div>

              <div className="hidden lg:block">
                <OfferingHeroVisual offering={offering} />
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border/40 bg-secondary/15 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border border-border/60 bg-background/55 p-6 shadow-sm shadow-black/5">
                <p className="dc-kicker">Why it matters</p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground">Relevant to delivery</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{offering.whyItMatters}</p>
              </div>

              <div className="rounded-2xl border border-border/60 bg-background/55 p-6 shadow-sm shadow-black/5">
                <p className="dc-kicker">Best for</p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground">When to choose this</h2>
                <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
                  {offering.bestFor.map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary/60" aria-hidden="true" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-border/60 bg-background/55 p-6 shadow-sm shadow-black/5">
                <p className="dc-kicker">Examples</p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground">What we build</h2>
                <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
                  {offering.examples.map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-foreground/30" aria-hidden="true" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div className="rounded-2xl border border-border/60 bg-background/60 p-6 shadow-sm shadow-black/5">
                <p className="dc-kicker">What we deliver</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">Scope you can ship</h2>
                <ul className="mt-5 grid gap-3 text-sm text-muted-foreground">
                  {offering.whatWeDeliver.map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-foreground/30" aria-hidden="true" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-border/60 bg-background/60 p-6 shadow-sm shadow-black/5">
                <p className="dc-kicker">Integrations</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">Fits your stack</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Common integrations we can introduce within this scope.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {offering.integrations.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <Separator className="my-6" />

                <p className="dc-kicker">Outcomes</p>
                <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                  {offering.outcomes.map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-foreground/30" aria-hidden="true" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-border/60 bg-background/40 p-6 md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="dc-kicker">Explore</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight">Other services</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Jump to another area of expertise.</p>
                </div>
                <Button asChild variant="outline" className="h-11 rounded-none px-5">
                  <a href="/what-we-do">See all services</a>
                </Button>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {offerings
                  .filter((item) => item.slug !== offering.slug)
                  .slice(0, 6)
                  .map((item) => (
                    <OfferingCard key={item.slug} offering={item} />
                  ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
