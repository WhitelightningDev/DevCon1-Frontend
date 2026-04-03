import { useEffect, useMemo, useState } from 'react'
import { ChevronDown, Menu } from 'lucide-react'

import { StartProjectDialog } from '@/components/project/StartProjectDialog'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

type NavLink = { kind: 'link'; label: string; href: string }
type MegaTile = { title: string; description: string; href: string }
type MegaGroup = { title: string; links: ReadonlyArray<{ label: string; href: string }> }
type NavMenu = { kind: 'menu'; label: string; tiles: ReadonlyArray<MegaTile>; groups: ReadonlyArray<MegaGroup> }
type NavItem = NavLink | NavMenu

const defaultNavItems: readonly NavItem[] = [
  { kind: 'link', label: 'Home', href: '/' },
  {
    kind: 'menu',
    label: 'Services',
    tiles: [
      { title: 'Platform engineering', description: 'Ship features with clean architecture.', href: '/services#offerings' },
      { title: 'AI integration', description: 'Add LLM workflows to existing systems.', href: '/services#offerings' },
      { title: 'Integrations & APIs', description: 'Reliable contracts, webhooks, and sync.', href: '/services#offerings' },
      { title: 'Security hardening', description: 'Threat-aware defaults and controls.', href: '/services#offerings' },
      { title: 'DevEx & CI/CD', description: 'Pipelines, releases, quality gates.', href: '/services#offerings' },
      { title: 'Performance & UX', description: 'Core Web Vitals and conversion flows.', href: '/services#offerings' },
    ],
    groups: [
      { title: 'Overview', links: [{ label: 'All services', href: '/services' }, { label: 'Engagement models', href: '/services#engagement' }] },
      { title: 'Get started', links: [{ label: 'Start a project', href: '/contact' }, { label: 'Work examples', href: '/work' }] },
    ],
  },
  {
    kind: 'menu',
    label: 'Work',
    tiles: [
      { title: 'Case studies', description: 'Representative builds with outcomes.', href: '/work#case-studies' },
      { title: 'Project library', description: 'Browse all shipped work.', href: '/work#projects' },
      { title: 'Deliverables', description: 'Artifacts for long-term ownership.', href: '/work#approach' },
      { title: 'Process', description: 'How we deliver reliably.', href: '/process' },
      { title: 'Contact', description: 'Send a short brief.', href: '/contact' },
      { title: 'Services', description: 'Capabilities and engagement options.', href: '/services' },
    ],
    groups: [{ title: 'Explore', links: [{ label: 'Work overview', href: '/work' }, { label: 'Start a project', href: '/contact' }] }],
  },
  { kind: 'link', label: 'Process', href: '/process' },
  { kind: 'link', label: 'Contact', href: '/contact' },
] as const

export function Navbar({
  items = defaultNavItems,
  cta = { label: 'Get a quote', href: '/contact' },
}: {
  items?: readonly NavItem[]
  cta?: { label: string; href: string }
}) {
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const pathname = useMemo(() => window.location.pathname.replace(/\/+$/, '') || '/', [])

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

  return (
    <header className="sticky top-0 z-50 relative">
      <div
        className={[
          'border-b bg-background transition-[border-color,box-shadow] duration-200',
          scrolled ? 'border-border/60 shadow-sm shadow-black/5' : 'border-border/40 shadow-none',
        ].join(' ')}
      >
        <div className="relative mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <a
            href="#main"
            className="sr-only rounded-md px-3 py-2 text-sm font-medium text-foreground focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-ring/40 focus:ring-offset-2 focus:ring-offset-background"
          >
            Skip to content
          </a>
          <a href="/" className="group inline-flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/60 bg-background">
              <img src="/brand/logo-mark.png" alt="" className="h-6 w-6 object-contain" />
            </span>
            <span className="text-sm font-semibold tracking-tight text-foreground">
              HKFT <span className="text-primary">Services</span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {items.map((item) => {
              if (item.kind === 'link') {
                const active = isActive(item.href)
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={[
                      active
                        ? 'relative text-sm font-medium text-foreground after:absolute after:-bottom-[18px] after:left-0 after:h-0.5 after:w-full after:bg-primary'
                        : 'relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground after:absolute after:-bottom-[18px] after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform hover:after:scale-x-100',
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
                  className={[
                    'relative inline-flex items-center gap-1 text-sm font-medium transition-colors',
                    expanded ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                    'after:absolute after:-bottom-[18px] after:left-0 after:h-0.5 after:w-full after:bg-primary after:transition-transform',
                    expanded ? 'after:scale-x-100' : 'after:origin-left after:scale-x-0 hover:after:scale-x-100',
                  ].join(' ')}
                >
                  {item.label}
                  <ChevronDown className={['h-4 w-4 transition-transform', expanded ? 'rotate-180' : ''].join(' ')} />
                </button>
              )
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {cta.href === '/contact' ? (
              <StartProjectDialog
                trigger={
                  <Button variant="outline" className="h-10 px-4">
                    {cta.label}
                  </Button>
                }
              />
            ) : (
              <Button asChild variant="outline" className="h-10 px-4">
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
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border/60 bg-background">
                      <img src="/brand/logo-mark.png" alt="" className="h-5 w-5 object-contain" />
                    </span>
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
                          {item.groups.flatMap((group) => group.links).map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground"
                            >
                              {link.label}
                            </a>
                          ))}
                        </div>
                      </details>
                    )
                  })}
                  {cta.href === '/contact' ? (
                    <StartProjectDialog
                      trigger={<Button className="mt-2 w-full">{cta.label}</Button>}
                    />
                  ) : (
                    <Button asChild className="mt-2">
                      <a href={cta.href}>{cta.label}</a>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {openMenu ? (
        <div className="fixed inset-0 z-40" onClick={() => setOpenMenu(null)} aria-hidden="true" />
      ) : null}

      <div className="absolute left-0 right-0 top-full z-50">
        {items
          .filter((item): item is NavMenu => item.kind === 'menu')
          .map((menu) => {
            const expanded = openMenu === menu.label
            if (!expanded) return null
            return (
              <div
                key={menu.label}
                role="dialog"
                aria-label={`${menu.label} menu`}
                className="border-b border-border/60 bg-background shadow-sm shadow-black/5"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mx-auto max-w-6xl px-4 py-6">
                  <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {menu.tiles.map((tile) => (
                        <a
                          key={tile.href + tile.title}
                          href={tile.href}
                          className="group border border-border/60 bg-background p-4 transition-colors hover:bg-muted/30"
                          onClick={() => setOpenMenu(null)}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-sm font-medium text-foreground">{tile.title}</p>
                              <p className="mt-1 text-sm text-muted-foreground">{tile.description}</p>
                            </div>
                            <span className="text-primary transition-transform group-hover:translate-x-0.5">→</span>
                          </div>
                        </a>
                      ))}
                    </div>

                    <div className="grid gap-5 border-l border-border/60 pl-6">
                      {menu.groups.map((group) => (
                        <div key={group.title}>
                          <p className="dc-kicker">{group.title}</p>
                          <div className="mt-3 grid gap-2">
                            {group.links.map((link) => (
                              <a
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-foreground/90 transition-colors hover:text-foreground"
                                onClick={() => setOpenMenu(null)}
                              >
                                {link.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                      <div className="border-t border-border/60 pt-4">
                        <Button asChild variant="outline" className="h-10 px-4">
                          <a href="/contact">Start a project</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </header>
  )
}
