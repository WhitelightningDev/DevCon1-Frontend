import type { Offering } from '@/lib/offerings'

import { getOfferingVisual } from '@/features/offerings/visuals'

export function OfferingHeroVisual({ offering }: { offering: Offering }) {
  const visual = getOfferingVisual(offering.slug)
  const Illustration = visual.Illustration

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-background/60 p-6 shadow-sm shadow-black/5">
      <div className={`pointer-events-none absolute -inset-24 bg-gradient-to-br ${visual.backdropClassName}`} aria-hidden="true" />
      <div className="relative">
        <Illustration className={`h-44 w-full ${visual.accentClassName}`} />
        <div className="mt-5 flex flex-wrap gap-2">
          {offering.highlights.slice(0, 3).map((item) => (
            <span
              key={item}
              className="inline-flex items-center rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium text-foreground shadow-sm shadow-black/5"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

