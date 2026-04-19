import type { Offering } from '@/lib/offerings'

import { getOfferingVisual } from '@/features/offerings/visuals'

export function OfferingCard({ offering }: { offering: Offering }) {
  const visual = getOfferingVisual(offering.slug)
  const Illustration = visual.Illustration

  return (
    <a
      href={`/what-we-do/${offering.slug}`}
      className="group overflow-hidden rounded-2xl border border-border/60 bg-background/60 shadow-sm shadow-black/5 transition-[transform,box-shadow,border-color,background-color] hover:-translate-y-0.5 hover:border-border/80 hover:bg-background hover:shadow-md hover:shadow-black/10"
    >
      <div className="relative overflow-hidden border-b border-border/60 bg-secondary/20 px-5 py-5">
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${visual.backdropClassName}`} aria-hidden="true" />
        <Illustration className={`relative h-24 w-full ${visual.accentClassName}`} />
      </div>

      <div className="p-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{offering.category}</p>
        <p className="mt-2 text-sm font-semibold tracking-tight text-foreground">{offering.title}</p>
        <p className="mt-1 text-sm text-muted-foreground dc-clamp-2">{offering.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {offering.highlights.slice(0, 3).map((item) => (
            <span
              key={item}
              className="inline-flex items-center rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-xs font-medium text-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}

