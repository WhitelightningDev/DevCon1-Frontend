import { ArrowRight } from 'lucide-react'

import { StartProjectDialog } from '@/components/project/StartProjectDialog'
import { SectionHeader } from '@/components/sections/SectionHeader'
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
  const [activeIndex, setActiveIndex] = useState(2)
  const [animate, setAnimate] = useState(true)
  const [paused, setPaused] = useState(false)
  const dragRef = useRef<{ startX: number; dragging: boolean }>({ startX: 0, dragging: false })
  const reduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
  }, [])

  const slidePercent = 100 / visibleCount
  const activeSlot = Math.floor(visibleCount / 2) + 1
  const wrapIndex = Math.min(logos.length - 1, Math.max(0, activeSlot - 1))
  const maxStart = Math.max(0, logos.length - visibleCount)
  const startIndex = Math.min(Math.max(activeIndex - (activeSlot - 1), 0), maxStart)
  const translatePercent = startIndex * slidePercent
  const canPrev = activeIndex > 0
  const canNext = activeIndex < logos.length - 1

  useEffect(() => {
    function computeVisible() {
      const width = window.innerWidth
      if (width >= 1024) return 4
      if (width >= 768) return 3
      return 2
    }

    function onResize() {
      const next = computeVisible()
      setVisibleCount(next)
    }

    onResize()
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (reduceMotion || paused) return
    const id = window.setInterval(() => {
      setActiveIndex((value) => {
        if (value >= logos.length - 1) {
          setAnimate(false)
          window.setTimeout(() => setAnimate(true), 0)
          return wrapIndex
        }
        return value + 1
      })
    }, 2800)
    return () => window.clearInterval(id)
  }, [paused, reduceMotion, wrapIndex])

  function prev() {
    if (!canPrev) return
    setActiveIndex((value) => Math.max(0, value - 1))
  }

  function next() {
    if (!canNext) return
    setActiveIndex((value) => Math.min(logos.length - 1, value + 1))
  }

  return (
    <section id="featured" className="scroll-mt-24 border-t border-border/40 bg-secondary/30 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          index="01"
          kicker="Trusted by"
          title="A few teams we’ve supported."
          description="A small selection of recent builds and collaborations—logos are linked for reference."
          actions={
            <>
              <StartProjectDialog
                defaultToWizard
                trigger={<Button className="h-11 rounded-none px-5">Start a project</Button>}
              />
              <Button asChild variant="outline" className="h-11 rounded-none px-5">
                <a href="/what-we-do">
                  What we do <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </>
          }
        />

        <div
          className="relative mt-10 overflow-hidden rounded-2xl border border-border/60 bg-background/60 shadow-sm shadow-black/5"
          role="region"
          aria-roledescription="carousel"
          aria-label="Client logos"
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            const next = event.relatedTarget as Node | null
            if (next && event.currentTarget.contains(next)) return
            setPaused(false)
          }}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background/95 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background/95 to-transparent" />

          <div className="px-3 py-7 md:px-5">
            <ul
              className="flex touch-pan-y select-none"
              aria-label="Client logo list"
              style={{
                transform: `translateX(-${translatePercent}%)`,
                transition: animate ? 'transform 420ms cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none',
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
                if (Math.abs(delta) < 40) {
                  window.setTimeout(() => setPaused(false), 220)
                  return
                }
                if (delta > 0) prev()
                else next()
                window.setTimeout(() => setPaused(false), 420)
              }}
              onPointerCancel={() => {
                dragRef.current.dragging = false
                setPaused(false)
              }}
            >
              {logos.map((logo, index) => {
                const isActive = index === activeIndex
                const inView = index >= startIndex && index < startIndex + visibleCount

                return (
                  <li
                    key={logo.href}
                    className="shrink-0 px-3"
                    style={{ flex: `0 0 ${slidePercent}%` }}
                  >
                    <a
                      href={logo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      aria-label={logo.name}
                      tabIndex={inView ? 0 : -1}
                    >
                      <div
                        className={[
                          'flex w-full items-center justify-center rounded-2xl border border-border/60 bg-background/40 px-4 py-4 shadow-sm shadow-black/5',
                          'transition-[transform,opacity,background-color,border-color] duration-300',
                          isActive ? 'bg-background border-border/80 opacity-100 scale-[1.06]' : 'opacity-75 hover:opacity-95',
                        ].join(' ')}
                      >
                        <img
                          src={logo.src}
                          alt={logo.name}
                          loading="lazy"
                          width={180}
                          height={36}
                          draggable={false}
                          className={[
                            'h-9 w-auto max-w-[180px] object-contain',
                            'transition-[filter,transform,opacity] duration-300',
                            isActive ? 'grayscale-0 opacity-100' : 'grayscale opacity-85',
                          ].join(' ')}
                        />
                      </div>
                    </a>
                  </li>
                )
              })}
            </ul>
            <p className="sr-only">Swipe to browse client logos. The carousel advances automatically.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
