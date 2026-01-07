import { Home } from '@/pages/Home'
import { ContactPage } from '@/pages/Contact'
import { ServicesPage } from '@/pages/Services'
import { ProcessPage } from '@/pages/Process'
import { WorkPage } from '@/pages/Work'

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
  if (pathname === '/contact') return <ContactPage />
  if (pathname === '/services') return <ServicesPage />
  if (pathname === '/work') return <WorkPage />
  if (pathname === '/process' || pathname === '/processes') return <ProcessPage />
  return <Home />
}

export default App
