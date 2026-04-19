import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

type SearchLink = { label: string; href: string; description?: string }

const defaultLinks: readonly SearchLink[] = [
  { label: 'Home', href: '/', description: 'Back to the main page.' },
  { label: 'What we do', href: '/what-we-do', description: 'Engineering, platforms, AI/security, and marketing.' },
  { label: 'Process', href: '/process', description: 'How we deliver, step by step.' },
  { label: 'Contact', href: '/contact', description: 'Send a brief or request a quote.' },
] as const

export function SiteSearchDialog({
  links = defaultLinks,
}: {
  links?: readonly SearchLink[]
}) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return links
    return links.filter((link) => {
      return (
        link.label.toLowerCase().includes(normalized) ||
        (link.description ? link.description.toLowerCase().includes(normalized) : false)
      )
    })
  }, [links, query])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-none text-foreground hover:bg-slate-100"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl rounded-none p-0">
        <div className="border-b border-border/60 p-6 pb-5">
          <DialogHeader>
            <DialogTitle className="text-base">Search</DialogTitle>
            <DialogDescription>Quick links across the site.</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Input
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
              placeholder="Search pages…"
              autoFocus
            />
          </div>
        </div>

        <div className="max-h-[56vh] overflow-auto p-2">
          {results.length ? (
            <div className="grid gap-1">
              {results.map((link) => (
                <a
                  key={link.href + link.label}
                  href={link.href}
                  className="group flex items-start justify-between gap-4 rounded-none border border-transparent px-4 py-3 transition-colors hover:border-border/60 hover:bg-muted/30"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{link.label}</p>
                    {link.description ? <p className="mt-0.5 text-sm text-muted-foreground">{link.description}</p> : null}
                  </div>
                  <span className="mt-0.5 text-primary opacity-0 transition-opacity group-hover:opacity-100">→</span>
                </a>
              ))}
            </div>
          ) : (
            <div className="px-4 py-10 text-sm text-muted-foreground">No results.</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
