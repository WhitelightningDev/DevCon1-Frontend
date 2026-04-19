import type { ReactNode } from 'react'

type SectionHeaderProps = {
  index: string
  kicker: string
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
}

export function SectionHeader({ index, kicker, title, description, actions }: SectionHeaderProps) {
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
      <div className="relative text-center md:text-left">
        <span
          aria-hidden="true"
          className="dc-section-index absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 md:left-0 md:translate-x-0"
        >
          {index}
        </span>
        <div className="flex items-center justify-center gap-3 md:justify-start">
          <span className="dc-section-rail" aria-hidden="true" />
          <p className="dc-kicker">{kicker}</p>
        </div>
        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h2>
        {description ? (
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">{description}</p>
        ) : null}
      </div>

      {actions ? (
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center md:items-end md:justify-end">
          {actions}
        </div>
      ) : null}
    </div>
  )
}

