import type { FormEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Mail, PhoneCall } from 'lucide-react'

import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { PageBackground } from '@/components/layout/PageBackground'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { setSeo } from '@/lib/seo'

export function ContactPage() {
  const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined
  const bookingUrl = (import.meta.env.VITE_BOOKING_URL as string | undefined) || ''

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    setSeo({
      title: 'DevCon1 — Contact',
      description: 'Send a short brief. We reply within 1 business day with next steps, timeline options, and a proposal outline.',
      imagePath: '/pwa/icon-512.png',
    })
  }, [])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('devcon1:start-project')
      if (!raw) return
      const parsed = JSON.parse(raw) as { name?: string; email?: string; company?: string; summary?: string }
      if (parsed.name) setName(parsed.name)
      if (parsed.email) setEmail(parsed.email)
      if (parsed.company) setCompany(parsed.company)
      if (parsed.summary) setMessage(parsed.summary)
    } catch {
      // ignore
    }
  }, [])

  const canSubmit = useMemo(() => Boolean(name.trim()) && Boolean(email.trim()) && Boolean(message.trim()), [email, message, name])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!formspreeEndpoint) {
      setStatus('error')
      return
    }
    if (!canSubmit) return

    setStatus('sending')
    try {
      const res = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          company,
          message,
          page: window.location.href,
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <PageBackground />

      <Navbar cta={{ label: 'Start a project', href: '/contact' }} />

      <main id="main">
        <section className="relative overflow-hidden pb-12 pt-12 md:pb-20 md:pt-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-6 text-center md:text-left">
                <p className="dc-kicker">Contact</p>

                <h1 className="dc-animate-heading dc-h1 [--dc-delay:80ms] mt-3 text-foreground">
                  Tell us what you’re building.
                </h1>
                <p className="mx-auto mt-4 max-w-2xl dc-lead md:mx-0">
                  Share a short brief and we’ll respond within 1 business day with next steps and timeline options.
                </p>

                <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:items-start md:justify-start">
                  {bookingUrl ? (
                    <Button asChild>
                      <a href={bookingUrl} target="_blank" rel="noreferrer">
                        Book a call <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  ) : null}
                  <Button asChild variant="outline" className="border-border/60 bg-transparent hover:bg-muted">
                    <a href="tel:+27746588885">
                      <PhoneCall className="mr-2 h-4 w-4" />
                      Call
                    </a>
                  </Button>
                </div>
                <p className="mt-8 text-sm text-muted-foreground">
                  Brief template: goal, users, scope/constraints, timeline/budget band, definition of “done”.
                </p>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-xl border border-border/60 bg-background/40 p-6 md:p-10">
                  <p className="dc-kicker">Send a brief</p>
                  <h2 className="dc-animate-heading dc-h2 [--dc-delay:60ms] mt-3">Contact form</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Prefer email? That works too. Use the form for the fastest intake and easiest follow-up.
                  </p>

                  <form onSubmit={onSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="contact-name">Name</Label>
                      <Input id="contact-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="contact-email">Email</Label>
                      <Input
                        id="contact-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        inputMode="email"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="contact-company">Company (optional)</Label>
                      <Input
                        id="contact-company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        autoComplete="organization"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="contact-message">What do you need help with?</Label>
                      <Textarea
                        id="contact-message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="min-h-[160px]"
                        placeholder="Goal, users, scope, constraints, timeline, and links (if any)."
                      />
                    </div>

                    {!formspreeEndpoint ? (
                      <p className="text-xs text-muted-foreground">
                        To enable in-app submissions, set `VITE_FORMSPREE_ENDPOINT` (Formspree) and redeploy. For now, use email/phone.
                      </p>
                    ) : null}

                    {status === 'sent' ? (
                      <div className="rounded-lg border border-primary/20 bg-primary/10 p-4 text-sm text-foreground">
                        Thanks — your message was sent. We’ll reply within 1 business day.
                      </div>
                    ) : null}

                    {status === 'error' ? (
                      <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-muted-foreground">
                        Something went wrong sending the form. Please email `systems.devconone@gmail.com`.
                      </div>
                    ) : null}

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <Button
                        type="submit"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                        disabled={!canSubmit || status === 'sending' || !formspreeEndpoint}
                      >
                        {status === 'sending' ? 'Sending…' : 'Send message'}
                      </Button>
                      <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-end">
                        <Button asChild variant="outline" className="border-border/60 bg-transparent hover:bg-muted">
                          <a href="mailto:systems.devconone@gmail.com">
                            <Mail className="mr-2 h-4 w-4" />
                            Email
                          </a>
                        </Button>
                        <Button asChild variant="outline" className="border-border/60 bg-transparent hover:bg-muted">
                          <a href="tel:+27746588885">
                            <PhoneCall className="mr-2 h-4 w-4" />
                            Call
                          </a>
                        </Button>
                      </div>
                    </div>
                  </form>
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
