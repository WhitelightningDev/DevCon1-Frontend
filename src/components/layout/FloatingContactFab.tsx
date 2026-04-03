import type { ComponentType } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, Mail, MessageCircle, PhoneCall, X } from 'lucide-react'

import { cn } from '@/lib/utils'

type ContactPerson = {
  name: string
  email: string
  phoneE164?: string
  whatsappNumber?: string
}

type MenuAction = {
  label: string
  href?: string
  icon: ComponentType<{ className?: string }>
  external?: boolean
  onSelect?: () => void
}

const CONTACTS: readonly ContactPerson[] = [
  {
    name: 'Daniel Mommsen',
    email: 'danielmommsen2@gmail.com',
    phoneE164: '+27746588885',
    whatsappNumber: '27746588885',
  },
  {
    name: 'Willem Pretorius',
    email: 'willemp75@gmail.com',
  },
]

function buildWhatsAppLink(message: string) {
  return (whatsappNumber: string) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
}

function buildMailtoLink(subject: string, body: string) {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const query = params.toString()
  return (email: string) => `mailto:${email}${query ? `?${query}` : ''}`
}

export function FloatingContactFab({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const [panel, setPanel] = useState<'root' | 'whatsapp' | 'email'>('root')
  const reduceMotion = useReducedMotion()

  const rootActions = useMemo((): MenuAction[] => {
    const primaryPhone = CONTACTS.find((person) => person.phoneE164)?.phoneE164
    return [
      {
        label: 'WhatsApp',
        icon: MessageCircle,
        onSelect: () => setPanel('whatsapp'),
      },
      {
        label: 'Email',
        icon: Mail,
        onSelect: () => setPanel('email'),
      },
      {
        label: 'Call',
        icon: PhoneCall,
        href: primaryPhone ? `tel:${primaryPhone}` : undefined,
      },
    ]
  }, [])

  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <div
      className={cn(
        'fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-5 z-40',
        className,
      )}
    >
      <AnimatePresence>
        {open ? (
          <motion.button
            key="overlay"
            type="button"
            aria-label="Close contact options"
            aria-hidden="true"
            tabIndex={-1}
            className="fixed inset-0 z-30 cursor-default bg-transparent"
            onClick={() => setOpen(false)}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
          />
        ) : null}
      </AnimatePresence>

      <div className="relative z-40 flex flex-col items-end gap-3">
        <AnimatePresence>
          {open ? (
            <motion.div
              key={panel}
              role="dialog"
              aria-label="Quick contact"
              className="flex flex-col items-end gap-2"
              initial={reduceMotion ? false : { opacity: 0, x: 10, scale: 0.98 }}
              animate={reduceMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: 10, scale: 0.98 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {panel === 'root' ? (
                <div role="menu" aria-label="Contact options" className="flex flex-col items-end gap-2">
                  {rootActions.map((action, index) => {
                    const Icon = action.icon
                    const disabled = !action.href && !action.onSelect
                    const shared = cn(
                      'group inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm shadow-sm backdrop-blur',
                      'transition-colors hover:border-primary/25 hover:bg-background/90',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                      disabled ? 'pointer-events-none opacity-50' : '',
                    )

                    const content = (
                      <>
                        <span className="text-foreground">{action.label}</span>
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary/15 bg-primary/10">
                          <Icon className="h-4 w-4 text-primary" />
                        </span>
                      </>
                    )

                    return (
                      <motion.div
                        key={action.label}
                        initial={reduceMotion ? false : { opacity: 0, x: 8 }}
                        animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                        transition={{ delay: reduceMotion ? 0 : index * 0.03, duration: 0.16, ease: 'easeOut' }}
                      >
                        {action.href ? (
                          <a
                            role="menuitem"
                            href={action.href}
                            target={action.external ? '_blank' : undefined}
                            rel={action.external ? 'noreferrer' : undefined}
                            onClick={() => setOpen(false)}
                            className={shared}
                          >
                            {content}
                          </a>
                        ) : (
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => action.onSelect?.()}
                            className={shared}
                          >
                            {content}
                          </button>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              ) : null}

              {panel === 'whatsapp' ? (
                <div className="w-[18.5rem] overflow-hidden rounded-2xl border border-border/60 bg-background/80 shadow-sm backdrop-blur">
                  <div className="flex items-center justify-between gap-3 border-b border-border/60 px-3 py-2">
                    <button
                      type="button"
                      onClick={() => setPanel('root')}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-background/60 text-muted-foreground transition-colors hover:text-foreground"
                      aria-label="Back"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <div className="flex-1 text-left">
                      <p className="dc-kicker">WhatsApp</p>
                      <p className="text-sm font-semibold">Choose a contact</p>
                    </div>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-primary/15 bg-primary/10">
                      <MessageCircle className="h-4 w-4 text-primary" />
                    </span>
                  </div>

                  <div className="p-2">
                    {CONTACTS.map((person) => {
                      const canWhatsApp = Boolean(person.whatsappNumber)
                      const href = canWhatsApp
                        ? buildWhatsAppLink('Hi HKFT Services — we’d like to discuss a project.')(person.whatsappNumber!)
                        : ''

                      return (
                        <a
                          key={person.email}
                          href={href}
                          target={canWhatsApp ? '_blank' : undefined}
                          rel={canWhatsApp ? 'noreferrer' : undefined}
                          aria-disabled={!canWhatsApp}
                          onClick={(event) => {
                            if (!canWhatsApp) {
                              event.preventDefault()
                              return
                            }
                            setOpen(false)
                          }}
                          className={cn(
                            'flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-left transition-colors',
                            canWhatsApp ? 'hover:bg-muted/60' : 'opacity-50',
                          )}
                        >
                          <div>
                            <p className="text-sm font-semibold leading-tight">{person.name}</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">{person.email}</p>
                            {!canWhatsApp ? (
                              <p className="mt-1 text-xs text-muted-foreground">WhatsApp number not set</p>
                            ) : null}
                          </div>
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-primary/15 bg-primary/10">
                            <MessageCircle className="h-4 w-4 text-primary" />
                          </span>
                        </a>
                      )
                    })}
                  </div>
                </div>
              ) : null}

              {panel === 'email' ? (
                <div className="w-[18.5rem] overflow-hidden rounded-2xl border border-border/60 bg-background/80 shadow-sm backdrop-blur">
                  <div className="flex items-center justify-between gap-3 border-b border-border/60 px-3 py-2">
                    <button
                      type="button"
                      onClick={() => setPanel('root')}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-background/60 text-muted-foreground transition-colors hover:text-foreground"
                      aria-label="Back"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <div className="flex-1 text-left">
                      <p className="dc-kicker">Email</p>
                      <p className="text-sm font-semibold">Choose a contact</p>
                    </div>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-primary/15 bg-primary/10">
                      <Mail className="h-4 w-4 text-primary" />
                    </span>
                  </div>

                  <div className="p-2">
                    {CONTACTS.map((person) => {
                      const href = buildMailtoLink(
                        'Project enquiry',
                        'Hi HKFT Services — we’d like to discuss a project.\n\nContext:\n- Company:\n- Timeline:\n- Scope:\n',
                      )(person.email)
                      return (
                        <a
                          key={person.email}
                          href={href}
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-muted/60"
                        >
                          <div>
                            <p className="text-sm font-semibold leading-tight">{person.name}</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">{person.email}</p>
                          </div>
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-primary/15 bg-primary/10">
                            <Mail className="h-4 w-4 text-primary" />
                          </span>
                        </a>
                      )
                    })}
                  </div>
                </div>
              ) : null}

              <p className="pr-1 text-xs text-muted-foreground">Reply within 1 business day.</p>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.button
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label={open ? 'Close contact options' : 'Open contact options'}
          onClick={() => {
            setOpen((value) => {
              const next = !value
              if (next) setPanel('root')
              return next
            })
          }}
          className={cn(
            'relative inline-flex h-14 w-14 items-center justify-center rounded-full',
            'border border-primary/20 bg-primary text-primary-foreground shadow-lg shadow-primary/15',
            'transition-[transform,background-color,border-color] hover:bg-primary/90 active:scale-[0.98]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          )}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        >
          <span className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-xl" aria-hidden="true" />
          {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        </motion.button>
      </div>
    </div>
  )
}
