import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

import { StartProjectDialog } from '@/components/project/StartProjectDialog'
import { Button } from '@/components/ui/button'
import { useEffect, useMemo, useRef, useState } from 'react'

type LogoItem = {
  name: string
  src: string
  href: string
}

const logos: readonly LogoItem[] = [
  {
    name: 'Bullion Beperk',
    src: '/bullion-logo.png',
    href: 'https://www.bullionlimited.co.za/',
  },
  {
    name: 'Jet Ski And More',
    src: '/JetSkiLogo.png',
    href: 'https://www.jetskiandmore.com/home',
  },
  {
    name: 'Found Your Pet',
    src: '/foundyourpetlogo.png',
    href: 'https://www.foundyourpet.co.za/',
  },
  {
    name: 'Field Flow',
    src: '/fieldflow-logo.png',
    href: 'https://fieldflow-billing.vercel.app/',
  },
  {
    name: 'Team Flow',
    src: '/teamflow-logo.png',
    href: 'https://teamflow-pearl.vercel.app/',
  },
  {
    name: 'Kiings VIP',
    src: '/kingslogo.JPG',
    href: 'https://kiingsvipcarwash.vercel.app/',
  },
  {
    name: 'HKNFT',
    src: '/hkftlogo.png',
    href: 'https://hongkongtrust.vercel.app/',
  },
] as const

export function FeaturedWork() {
  const [visibleCount, setVisibleCount] = useState(4)
  const [activeIndex, setActiveIndex] = useState(logos.length)
  const [animate, setAnimate] = useState(true)
  const [paused, setPaused] = useState(false)
  const pauseRef = useRef(false)
  const dragRef = useRef<{ startX: number; dragging: boolean }>({ startX: 0, dragging: false })
  const reduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
  }, [])

  const extended = useMemo(() => [...logos, ...logos, ...logos], [])
  const slidePercent = 100 / visibleCount
  const activeSlot = Math.floor(visibleCount / 2) + 1
  const translatePercent = (activeIndex - activeSlot) * slidePercent

  useEffect(() => {
    function computeVisible() {
      const width = window.innerWidth
      if (width >= 1024) return 4
      if (width >= 768) return 3
      return 2
    }

    function onResize() {
      setVisibleCount(computeVisible())
    }

    onResize()
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    pauseRef.current = paused
  }, [paused])

  useEffect(() => {
    const id = window.setInterval(() => {
      if (pauseRef.current || reduceMotion) return
      setActiveIndex((value) => value + 1)
    }, 2800)
    return () => window.clearInterval(id)
  }, [reduceMotion])

  useEffect(() => {
    const n = logos.length
    if (activeIndex >= n * 2) {
      const id = window.setTimeout(() => {
        setAnimate(false)
        setActiveIndex((value) => value - n)
        window.setTimeout(() => setAnimate(true), 0)
      }, 360)
      return () => window.clearTimeout(id)
    }

    if (activeIndex < n) {
      const id = window.setTimeout(() => {
        setAnimate(false)
        setActiveIndex((value) => value + n)
        window.setTimeout(() => setAnimate(true), 0)
      }, 360)
      return () => window.clearTimeout(id)
    }
  }, [activeIndex])

  function prev() {
    setActiveIndex((value) => value - 1)
  }

  function next() {
    setActiveIndex((value) => value + 1)
  }

  return (
    <section id="featured" className="scroll-mt-24 border-t border-border/40 bg-secondary/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div className="text-center md:text-left">
            <p className="dc-kicker">Trusted by</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Logos, not a project grid.
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
              A few recent brands and builds we’ve supported—kept intentionally minimal on the homepage.
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center md:items-end md:justify-end">
            <StartProjectDialog
              defaultToWizard
              trigger={<Button className="h-11 rounded-none px-5">Start a project</Button>}
            />
            <Button asChild variant="outline" className="h-11 rounded-none px-5">
              <a href="/what-we-do">
                What we do <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <div
          className="relative mt-10 overflow-hidden rounded-2xl border border-border/60 bg-background/60 shadow-sm shadow-black/5"
          role="region"
          aria-roledescription="carousel"
          aria-label="Client logos"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background/95 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background/95 to-transparent" />

          <div className="flex items-center justify-between gap-3 border-b border-border/60 px-6 py-4 md:px-8">
            <p className="text-xs font-medium text-muted-foreground">Swipe or use arrows</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/60 text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Previous logos"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={next}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/60 text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Next logos"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="px-3 py-6 md:px-5">
            <div
              className="flex touch-pan-y select-none"
              style={{
                transform: `translateX(-${translatePercent}%)`,
                transition: animate ? 'transform 360ms cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none',
              }}
              onPointerDown={(event) => {
                event.currentTarget.setPointerCapture(event.pointerId)
                dragRef.current = { startX: event.clientX, dragging: true }
                setPaused(true)
              }}
              onPointerUp={(event) => {
                if (!dragRef.current.dragging) return
                const delta = event.clientX - dragRef.current.startX
                dragRef.current.dragging = false
                event.currentTarget.releasePointerCapture(event.pointerId)
                if (Math.abs(delta) < 40) return
                if (delta > 0) prev()
                else next()
                window.setTimeout(() => setPaused(false), 400)
              }}
              onPointerCancel={() => {
                dragRef.current.dragging = false
                setPaused(false)
              }}
            >
              {extended.map((logo, index) => {
                const isActive = index === activeIndex
                const content = (
                  <div
                    className={[
                      'flex w-full items-center justify-center rounded-2xl border border-border/60 bg-background/40 px-4 py-4 shadow-sm shadow-black/5',
                      'transition-[transform,opacity,background-color,border-color] duration-300',
                      isActive ? 'bg-background border-border/80 opacity-100 scale-[1.08]' : 'opacity-70 hover:opacity-90',
                    ].join(' ')}
                  >
                    <img
                      src={logo.src}
                      alt={logo.name}
                      loading="lazy"
                      draggable={false}
                      className={[
                        'h-9 w-auto max-w-[180px] object-contain',
                        'transition-[filter,transform,opacity] duration-300',
                        isActive ? 'grayscale-0 opacity-100' : 'grayscale opacity-85',
                      ].join(' ')}
                    />
                  </div>
                )

                return (
                  <a
                    key={`${logo.name}-${index}`}
                    href={logo.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group shrink-0 px-3 outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    style={{ flex: `0 0 ${slidePercent}%` }}
                    aria-label={logo.name}
                  >
                    {content}
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
