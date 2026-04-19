import { Button } from '@/components/ui/button'

export function AppErrorFallback() {
  return (
    <div className="min-h-screen text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="dc-kicker">Something went wrong</p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">This page failed to load.</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Refresh the page. If the issue persists, contact us and we’ll fix it quickly.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => window.location.reload()}>Refresh</Button>
          <Button asChild variant="outline">
            <a href="/contact">Contact</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

