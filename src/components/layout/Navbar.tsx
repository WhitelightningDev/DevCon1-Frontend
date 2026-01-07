import { useEffect, useState } from 'react'
import { Menu, Shield } from 'lucide-react'

import { StartProjectDialog } from '@/components/project/StartProjectDialog'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const defaultNavItems = [
  { label: "Home", href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Process', href: '/process' },
  { label: 'Contact', href: '/contact' },
] as const

type NavItem = { label: string; href: string }

export function Navbar({
  items = defaultNavItems,
  cta = { label: 'Get a quote', href: '/contact' },
}: {
  items?: readonly NavItem[]
  cta?: { label: string; href: string }
}) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50">
      <div
        className={[
          'border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50',
          scrolled ? 'border-border/60' : 'border-transparent',
        ].join(' ')}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <a href="/" className="group inline-flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-emerald-500/20 bg-emerald-500/10">
              <Shield className="h-5 w-5 text-emerald-400" />
            </span>
            <span className="text-sm font-semibold tracking-wide text-foreground">
              DevCon<span className="text-emerald-400">1</span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {cta.href === '/contact' ? (
              <StartProjectDialog
                trigger={
                  <Button variant="outline" className="border-emerald-500/20 bg-transparent hover:bg-emerald-500/10">
                    {cta.label}
                  </Button>
                }
              />
            ) : (
              <Button asChild variant="outline" className="border-emerald-500/20 bg-transparent hover:bg-emerald-500/10">
                <a href={cta.href}>{cta.label}</a>
              </Button>
            )}
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-emerald-500/20 bg-emerald-500/10">
                      <Shield className="h-4 w-4 text-emerald-400" />
                    </span>
                    DevCon1
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-6 grid gap-2">
                  {items.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  ))}
                  {cta.href === '/contact' ? (
                    <StartProjectDialog
                      trigger={<Button className="mt-2 w-full bg-emerald-500 text-emerald-950 hover:bg-emerald-400">{cta.label}</Button>}
                    />
                  ) : (
                    <Button asChild className="mt-2 bg-emerald-500 text-emerald-950 hover:bg-emerald-400">
                      <a href={cta.href}>{cta.label}</a>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
