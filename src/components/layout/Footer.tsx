import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'

import { Separator } from '@/components/ui/separator'

const footerLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
] as const

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background/60">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 text-center md:grid-cols-3 md:text-left">
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-sm font-semibold tracking-wide md:justify-start">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              DevCon1
            </div>
            <p className="text-sm text-muted-foreground">
              Modern software services for teams that ship in high-stakes environments: secure, reliable, and built to
              deploy.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold">Links</p>
            <div className="grid gap-2">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold">Contact</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a
                href="mailto:systems.devconone@gmail.com"
                className="flex items-center justify-center gap-2 break-all transition-colors hover:text-foreground md:justify-start"
              >
                <Mail className="h-4 w-4 text-emerald-400" />
                systems.devconone@gmail.com
              </a>
              <p className="flex items-center justify-center gap-2 md:justify-start">
                <MapPin className="h-4 w-4 text-emerald-400" />
                Remote-first • US & CAT time zones
              </p>
              <a
                href="tel:+27746588885"
                className="flex items-center justify-center gap-2 whitespace-nowrap transition-colors hover:text-foreground md:justify-start"
              >
                <Phone className="h-4 w-4 text-emerald-400" />
                +27 74 658 8885
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col gap-2 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} DevCon1. All rights reserved.</p>
          <p className="text-muted-foreground/80">Built with React, Vite, Tailwind, shadcn/ui.</p>
        </div>
      </div>
    </footer>
  )
}
