import { Mail, MapPin, MessageSquare, PhoneCall } from 'lucide-react'

import { SignalBeacon } from '@/components/illustrations/SignalBeacon'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export function ContactPage() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(16,185,129,0.18),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.10),transparent_45%)]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/20 to-background" />
      </div>

      <Navbar cta={{ label: 'Email us', href: 'mailto:systems.devconone@gmail.com' }} />

      <main>
        <section className="relative overflow-hidden pb-12 pt-12 md:pb-20 md:pt-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-6 text-center md:text-left">
                <div className="flex items-center justify-center gap-2 md:justify-start">
                  <Badge variant="outline" className="border-emerald-500/25 bg-emerald-500/10 text-emerald-200">
                    Contact
                  </Badge>
                  <p className="text-xs tracking-wide text-muted-foreground">LET'S TALK</p>
                </div>

                <h1 className="dc-animate-heading [--dc-delay:80ms] mt-5 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  Tell us what you’re building.
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg md:mx-0">
                  Share a short brief and we’ll respond with timeline options and a delivery plan.
                </p>

                <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:items-start md:justify-start">
                  <Button
                    asChild
                    className="h-auto whitespace-normal break-all bg-emerald-500 py-3 text-emerald-950 hover:bg-emerald-400"
                  >
                    <a href="mailto:systems.devconone@gmail.com">
                      <Mail className="mr-2 h-4 w-4" />
                      systems.devconone@gmail.com
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto whitespace-normal break-words border-border/60 bg-transparent py-3 hover:bg-muted"
                  >
                    <a href="tel:+27746588885">
                      <PhoneCall className="mr-2 h-4 w-4" />
                      +27 74 658 8885
                    </a>
                  </Button>
                </div>

                <Separator className="my-10" />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border/60 bg-background/40 p-5 text-left">
                    <p className="flex items-center gap-2 text-sm font-semibold">
                      <MessageSquare className="h-4 w-4 text-emerald-400" />
                      Brief template
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <li>• Goal and users</li>
                      <li>• Scope and constraints</li>
                      <li>• Timeline and budget band</li>
                      <li>• Definition of “done”</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-background/40 p-5 text-left">
                    <p className="flex items-center gap-2 text-sm font-semibold">
                      <MapPin className="h-4 w-4 text-emerald-400" />
                      Availability
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <li>• Remote-first</li>
                      <li>• US-aligned time zones</li>
                      <li>• Sprint blocks or retainers</li>
                      <li>• Fast turnaround</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-emerald-500/15 bg-gradient-to-b from-emerald-500/10 to-background/30 p-6 md:p-10">
                  <p className="text-xs font-medium tracking-wide text-muted-foreground">NEXT STEPS</p>
                  <h2 className="dc-animate-heading [--dc-delay:60ms] mt-3 text-2xl font-semibold tracking-tight">
                    What happens after you reach out
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We’ll reply within 1 business day with clarifying questions and a suggested next step.
                  </p>

                  <div className="mt-6">
                    <SignalBeacon className="h-28 w-full text-emerald-300/55" />
                  </div>

                  <Separator className="my-8" />

                  <ol className="grid gap-4">
                    {[
                      { title: 'Intro call', detail: 'A quick conversation to align on goals, constraints, and timing.' },
                      { title: 'Scope & plan', detail: 'A short proposal with milestones, risks, and an estimate range.' },
                      { title: 'Kickoff', detail: 'Access, repo setup, and first deliverable shipped in reviewable increments.' },
                    ].map((step, idx) => (
                      <li key={step.title} className="rounded-xl border border-border/60 bg-background/40 p-5">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold">{step.title}</p>
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-emerald-500/15 bg-emerald-500/10 text-sm font-semibold text-emerald-300">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{step.detail}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
