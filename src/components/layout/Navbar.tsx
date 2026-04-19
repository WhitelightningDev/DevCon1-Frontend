import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, Globe, Menu } from 'lucide-react'

import { StartProjectDialog } from '@/components/project/StartProjectDialog'
import { SiteSearchDialog } from '@/components/layout/SiteSearchDialog'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

type NavLink = { kind: 'link'; label: string; href: string }
type NavMenuEntry =
  | { kind: 'link'; label: string; href: string }
  | { kind: 'separator' }
type NavMenu = {
  kind: 'menu'
  label: string
  heading?: string
  links: ReadonlyArray<NavMenuEntry>
}
type NavItem = NavLink | NavMenu

const defaultNavItems: readonly NavItem[] = [
  {
    kind: 'menu',
    label: 'Company',
    heading: 'Company',
    links: [
      { kind: 'link', label: 'How we work', href: '/process' },
      { kind: 'link', label: 'What we do', href: '/what-we-do' },
      { kind: 'link', label: 'Trusted by', href: '/#featured' },
      { kind: 'link', label: 'Contact', href: '/contact' },
    ],
  },
  {
    kind: 'menu',
    label: 'What we do',
    heading: 'What we do',
    links: [
      { kind: 'link', label: 'Overview', href: '/what-we-do' },
      { kind: 'link', label: 'Web development', href: '/what-we-do/web-development' },
      { kind: 'link', label: 'SaaS development', href: '/what-we-do/saas-development' },
      { kind: 'link', label: 'PaaS / internal platform', href: '/what-we-do/paas-development' },
      { kind: 'link', label: 'AI integration', href: '/what-we-do/ai-integration' },
      { kind: 'link', label: 'Security integration', href: '/what-we-do/security-integration' },
      { kind: 'separator' },
      { kind: 'link', label: 'Marketing (basic)', href: '/what-we-do/marketing-basic' },
      { kind: 'link', label: 'Marketing (growth)', href: '/what-we-do/marketing-growth' },
      { kind: 'link', label: 'Marketing (advanced)', href: '/what-we-do/marketing-advanced' },
    ],
  },
  { kind: 'link', label: 'Contact', href: '/contact' },
] as const

export function Navbar({
  items = defaultNavItems,
  cta = null,
}: {
  items?: readonly NavItem[]
  cta?: { label: string; href: string } | null
}) {
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const pathname = useMemo(() => window.location.pathname.replace(/\/+$/, '') || '/', [])
  const closeTimerRef = useRef<number | null>(null)

  const isActive = useMemo(() => {
    return (href: string) => {
      const normalizedHref = href.replace(/\/+$/, '') || '/'
      if (normalizedHref === '/process') return pathname === '/process' || pathname === '/processes'
      return normalizedHref === pathname
    }
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!openMenu) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpenMenu(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [openMenu])

  useEffect(() => {
    if (!openMenu) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [openMenu])

  function cancelCloseTimer() {
    if (closeTimerRef.current == null) return
    window.clearTimeout(closeTimerRef.current)
    closeTimerRef.current = null
  }

  function scheduleCloseMenu() {
    cancelCloseTimer()
    closeTimerRef.current = window.setTimeout(() => {
      setOpenMenu(null)
      closeTimerRef.current = null
    }, 120)
  }

  const openMenuItem = useMemo(() => {
    if (!openMenu) return null
    return items.find((item): item is NavMenu => item.kind === 'menu' && item.label === openMenu) ?? null
  }, [items, openMenu])

  return (
    <header className="sticky top-0 z-50 relative">
      <div
        className={[
          'border-b bg-background transition-[border-color,box-shadow] duration-200',
          scrolled ? 'border-border/60 shadow-md shadow-black/10' : 'border-border/40 shadow-sm shadow-black/5',
        ].join(' ')}
      >
        <div className="relative mx-auto h-20 max-w-7xl px-4">
          <a
            href="#main"
            className="sr-only rounded-md px-3 py-2 text-sm font-medium text-foreground focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-ring/40 focus:ring-offset-2 focus:ring-offset-background"
          >
            Skip to content
          </a>
          <div className="grid h-full grid-cols-[auto_1fr_auto] items-center">
            <a href="/" className="group inline-flex items-center gap-3">
              <img src="/brand/logo-mark.png" alt="HKFT Services" className="h-7 w-auto object-contain" />
              <span className="hidden text-sm font-semibold tracking-tight text-foreground sm:inline">
                HKFT <span className="text-primary">Services</span>
              </span>
            </a>

            <nav
              className="hidden items-center justify-center gap-10 md:flex"
              onMouseEnter={cancelCloseTimer}
              onMouseLeave={scheduleCloseMenu}
            >
              {items.map((item) => {
                if (item.kind === 'link') {
                  const active = isActive(item.href)
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={[
                        'text-sm font-medium tracking-tight transition-colors',
                        active ? 'text-primary' : 'text-foreground hover:text-primary',
                      ].join(' ')}
                    >
                      {item.label}
                    </a>
                  )
                }

                const expanded = openMenu === item.label
                return (
                  <button
                    key={item.label}
                    type="button"
                    aria-expanded={expanded}
                    aria-haspopup="dialog"
                    onClick={() => setOpenMenu((value) => (value === item.label ? null : item.label))}
                    onMouseEnter={() => setOpenMenu(item.label)}
                    onFocus={() => setOpenMenu(item.label)}
                    className={[
                      'inline-flex items-center gap-2 text-sm font-medium tracking-tight transition-colors',
                      expanded ? 'text-primary' : 'text-foreground hover:text-primary',
                    ].join(' ')}
                  >
                    {item.label}
                    <ChevronDown
                      className={['h-4 w-4 transition-transform', expanded ? 'rotate-180' : ''].join(' ')}
                      aria-hidden="true"
                    />
                  </button>
                )
              })}
            </nav>

            <div className="justify-self-end">
              <div className="hidden items-center gap-1 md:flex">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-none text-foreground hover:bg-slate-100"
                      aria-label="Language"
                    >
                      <Globe className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-64 rounded-none p-3">
                    <p className="text-xs font-medium text-muted-foreground">Region</p>
                    <div className="mt-2 grid gap-1">
                      <a href="/" className="px-2 py-2 text-sm hover:bg-muted/40">
                        Global (default)
                      </a>
                      <a href="/" className="px-2 py-2 text-sm hover:bg-muted/40">
                        South Africa
                      </a>
                      <a href="/" className="px-2 py-2 text-sm hover:bg-muted/40">
                        United States
                      </a>
                    </div>
                  </PopoverContent>
                </Popover>

                <SiteSearchDialog />

                {cta ? (
                  cta.href === '/contact' ? (
                    <StartProjectDialog
                      trigger={
                        <Button variant="outline" className="ml-2 h-10 rounded-none px-4">
                          {cta.label}
                        </Button>
                      }
                    />
                  ) : (
                    <Button asChild variant="outline" className="ml-2 h-10 rounded-none px-4">
                      <a href={cta.href}>{cta.label}</a>
                    </Button>
                  )
                ) : null}
              </div>

              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" aria-label="Open menu" className="h-10 w-10 rounded-none">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-2">
                        <img src="/brand/logo-mark.png" alt="" className="h-5 w-auto object-contain" />
                        HKFT Services
                      </SheetTitle>
                    </SheetHeader>

                    <div className="mt-6 grid gap-2">
                      {items.map((item) => {
                        if (item.kind === 'link') {
                          const active = isActive(item.href)
                          return (
                            <a
                              key={item.href}
                              href={item.href}
                              aria-current={active ? 'page' : undefined}
                              className={[
                                'border border-border/60 px-4 py-3 text-sm transition-colors',
                                active ? 'bg-primary/10 text-foreground' : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground',
                              ].join(' ')}
                            >
                              {item.label}
                            </a>
                          )
                        }

                        return (
                          <details key={item.label} className="border border-border/60">
                            <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium text-foreground">
                              {item.label}
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            </summary>
                            <div className="grid gap-1 border-t border-border/60 p-2">
                              {item.links.map((entry, index) => {
                                if (entry.kind === 'separator') {
                                  return <div key={`sep-${index}`} className="my-1 border-t border-border/60" aria-hidden="true" />
                                }
                                return (
                                  <a
                                    key={entry.href}
                                    href={entry.href}
                                    className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground"
                                  >
                                    {entry.label}
                                  </a>
                                )
                              })}
                            </div>
                          </details>
                        )
                      })}
                      {cta ? (
                        cta.href === '/contact' ? (
                          <StartProjectDialog trigger={<Button className="mt-2 w-full rounded-none">{cta.label}</Button>} />
                        ) : (
                          <Button asChild className="mt-2 rounded-none">
                            <a href={cta.href}>{cta.label}</a>
                          </Button>
                        )
                      ) : null}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openMenuItem ? (
        <div
          className="fixed inset-0 top-20 z-50 bg-black/70"
          role="dialog"
          aria-label={`${openMenuItem.label} menu`}
          onMouseEnter={cancelCloseTimer}
          onMouseLeave={scheduleCloseMenu}
          onClick={() => setOpenMenu(null)}
        >
          <div className="mx-auto h-full w-full max-w-7xl px-4">
            <div
              className="h-full w-[440px] bg-background shadow-xl shadow-black/25"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-b border-border/60 px-8 py-7">
                <p className="text-xl font-semibold tracking-tight text-foreground">{openMenuItem.heading ?? openMenuItem.label}</p>
              </div>
              <div className="px-4 py-4">
                <div className="grid">
                  {openMenuItem.links.map((entry, index) => {
                    if (entry.kind === 'separator') {
                      return <div key={`sep-${index}`} className="my-2 border-t border-border/60" aria-hidden="true" />
                    }
                    return (
                      <a
                        key={entry.href + entry.label}
                        href={entry.href}
                        className="group flex items-center justify-between gap-4 rounded-none px-4 py-3 text-sm text-foreground transition-colors hover:bg-muted/30"
                        onClick={() => setOpenMenu(null)}
                      >
                        <span className="font-medium">{entry.label}</span>
                        <span className="text-muted-foreground transition-transform group-hover:translate-x-0.5">→</span>
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
