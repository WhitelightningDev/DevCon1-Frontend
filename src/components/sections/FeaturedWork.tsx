import { ExternalLink, ArrowRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useSiteMetadata } from '@/lib/site-metadata'

type FeaturedSite = {
  title: string
  href: string
  tags: readonly string[]
  fallbackDescription: string
  fallbackImage: string
}

const featured: readonly FeaturedSite[] = [
  {
    title: 'MyCoop Asset Management',
    href: 'https://www.myco-op.co.za/',
    tags: ['Web App', 'Finance', 'Co-operatives'],
    fallbackDescription: 'Cooperative asset management platform for pooled investments, member accounts and financial administration.',
    fallbackImage: 'https://www.myco-op.co.za/mycoop-og.png',
  },
  {
    title: 'ShopSage',
    href: 'https://www.shopsage.co.za/',
    tags: ['Web App', 'Commerce', 'B2B'],
    fallbackDescription:
      'The smart B2B wholesale ordering platform. Manage orders, track stock, and streamline your wholesale business online.',
    fallbackImage: 'https://www.shopsage.co.za/icons/icon-512x512.png',
  },
] as const

function FeaturedSiteCard({ site }: { site: FeaturedSite }) {
  const { data } = useSiteMetadata(site.href)
  const previewSrc = data?.image || site.fallbackImage
  const favicon = data?.favicon || ''
  const title = data?.title || site.title
  const description = data?.description || site.fallbackDescription

  return (
    <Card className="group overflow-hidden border-border/60 bg-background/40 shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[16/8] overflow-hidden border-b border-border/60 bg-background/60">
        {previewSrc ? (
          <img
            src={previewSrc}
            alt={`${title} preview`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            onError={(event) => {
              event.currentTarget.style.display = 'none'
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {favicon ? (
              <img src={favicon} alt="" className="h-10 w-10 object-contain opacity-80" loading="lazy" />
            ) : (
              <span className="text-xs text-muted-foreground">Preview loading…</span>
            )}
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/70 to-transparent" />
      </div>

      <CardHeader className="space-y-2 pb-4">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="flex flex-wrap gap-2 pt-1">
          {site.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-secondary/70">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardFooter className="flex items-center justify-between gap-3">
        <Button asChild size="sm">
          <a href={site.href} target="_blank" rel="noreferrer">
            View live <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </Button>
        <Button asChild size="sm" variant="outline">
          <a href="/work#projects">
            More work <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

export function FeaturedWork() {
  return (
    <section id="featured" className="scroll-mt-24 border-t border-border/40 bg-background/30 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="text-center md:text-left">
            <p className="dc-kicker">Featured work</p>
            <h2 className="dc-animate-heading dc-h2 [--dc-delay:60ms] mt-3">
              MyCoop and ShopSage, live.
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
              Two recent builds—pulled in dynamically from the live sites.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center md:items-end md:justify-end">
            <Button asChild>
              <a href="/work">See all work</a>
            </Button>
            <Button asChild variant="outline">
              <a href="/contact">Start a project</a>
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {featured.map((site) => (
            <FeaturedSiteCard key={site.href} site={site} />
          ))}
        </div>
      </div>
    </section>
  )
}
