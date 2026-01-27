import { useEffect, useRef } from 'react'

export function PageBackground() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)')
    const isDark = document.documentElement.classList.contains('dark')

    let raf = 0
    let pointerRaf = 0
    let lastX = 0
    let lastY = 0

    const update = () => {
      raf = 0
      const scrollY = window.scrollY || 0

      const y1 = Math.round(Math.min(scrollY * 0.06, 160))
      const y2 = Math.round(Math.min(scrollY * 0.035, 120))
      const y3 = Math.round(Math.min(scrollY * 0.025, 100))

      const r1 = Math.round(Math.min(scrollY * 0.02, 12))
      const r2 = Math.round(Math.min(scrollY * 0.015, 10))
      const r3 = Math.round(Math.min(scrollY * -0.012, 8))

      root.style.setProperty('--dc-y1', `${y1}px`)
      root.style.setProperty('--dc-y2', `${y2}px`)
      root.style.setProperty('--dc-y3', `${y3}px`)
      root.style.setProperty('--dc-r1', `${r1}deg`)
      root.style.setProperty('--dc-r2', `${r2}deg`)
      root.style.setProperty('--dc-r3', `${r3}deg`)
    }

    const updatePointer = () => {
      pointerRaf = 0
      root.style.setProperty('--dc-mx', `${lastX}px`)
      root.style.setProperty('--dc-my', `${lastY}px`)
    }

    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(update)
    }

    const onPointerMove = (event: PointerEvent) => {
      lastX = event.clientX
      lastY = event.clientY
      if (pointerRaf) return
      pointerRaf = window.requestAnimationFrame(updatePointer)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    if (isDark && canHover.matches) {
      root.style.setProperty('--dc-mx', '50%')
      root.style.setProperty('--dc-my', '30%')
      window.addEventListener('pointermove', onPointerMove, { passive: true })
    }
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointerMove)
      if (raf) window.cancelAnimationFrame(raf)
      if (pointerRaf) window.cancelAnimationFrame(pointerRaf)
    }
  }, [])

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(16,185,129,0.30),transparent_46%),radial-gradient(circle_at_85%_18%,rgba(34,197,94,0.22),transparent_44%),radial-gradient(circle_at_55%_90%,rgba(52,211,153,0.14),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.10),transparent_55%),radial-gradient(circle_at_8%_55%,rgba(56,189,248,0.08),transparent_50%),radial-gradient(circle_at_92%_65%,rgba(110,231,183,0.08),transparent_52%)]" />
      <div className="absolute inset-0 hidden md:block [background:radial-gradient(520px_circle_at_var(--dc-mx,50%)_var(--dc-my,30%),rgba(255,255,255,0.14),transparent_55%)]" />

      <div
        aria-hidden="true"
        className="absolute -left-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-emerald-500/18 blur-3xl"
        style={{ transform: 'translate3d(0,var(--dc-y1,0px),0) rotate(var(--dc-r1,0deg))' }}
      />
      <div
        aria-hidden="true"
        className="absolute -right-36 top-10 h-[26rem] w-[26rem] rounded-full bg-green-500/14 blur-3xl"
        style={{ transform: 'translate3d(0,var(--dc-y2,0px),0) rotate(var(--dc-r2,0deg))' }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-44 left-1/3 h-[34rem] w-[34rem] rounded-full bg-emerald-400/10 blur-3xl"
        style={{ transform: 'translate3d(0,var(--dc-y3,0px),0) rotate(var(--dc-r3,0deg))' }}
      />

      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(16,185,129,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.20)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/15 to-background/90" />
    </div>
  )
}
