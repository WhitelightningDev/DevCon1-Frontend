import { lazy, Suspense, useMemo } from 'react'

import { PageBackground } from '@/components/layout/PageBackground'
import { FloatingContactFab } from '@/components/layout/FloatingContactFab'

const Home = lazy(() => import('./pages/Home').then((mod) => ({ default: mod.Home })))
const ContactPage = lazy(() => import('./pages/Contact').then((mod) => ({ default: mod.ContactPage })))
const ServicesPage = lazy(() => import('./pages/Services').then((mod) => ({ default: mod.ServicesPage })))
const ProcessPage = lazy(() => import('./pages/Process').then((mod) => ({ default: mod.ProcessPage })))
const OfferingPage = lazy(() => import('./pages/Offering').then((mod) => ({ default: mod.OfferingPage })))

function App() {
  const pathname = useMemo(() => window.location.pathname.replace(/\/+$/, '') || '/', [])

  const Page = useMemo(() => {
    if (pathname === '/contact') return ContactPage
    if (pathname === '/services' || pathname === '/what-we-do') return ServicesPage
    if (pathname.startsWith('/what-we-do/')) return OfferingPage
    if (pathname === '/process' || pathname === '/processes') return ProcessPage
    return Home
  }, [pathname])

  return (
    <Suspense
      fallback={
        <div className="min-h-screen text-foreground">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="h-5 w-40 animate-pulse rounded bg-muted" />
            <div className="mt-6 h-10 w-3/4 animate-pulse rounded bg-muted" />
            <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-muted" />
          </div>
        </div>
      }
    >
      <div className="relative">
        <PageBackground />
        <div className="relative z-10">
          <Page />
          <FloatingContactFab />
        </div>
      </div>
    </Suspense>
  )
}

export default App
