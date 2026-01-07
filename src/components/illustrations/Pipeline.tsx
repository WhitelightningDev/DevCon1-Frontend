type IllustrationProps = {
  className?: string
}

export function Pipeline({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 480 220"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="plGlow" x1="40" y1="40" x2="440" y2="180" gradientUnits="userSpaceOnUse">
          <stop stopColor="currentColor" stopOpacity="0.2" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect x="24" y="24" width="432" height="172" rx="16" stroke="currentColor" strokeOpacity="0.18" />
      <path d="M84 110H396" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
      <path d="M254 110L240 102V118L254 110Z" fill="currentColor" fillOpacity="0.45" />
      <path d="M338 110L324 102V118L338 110Z" fill="currentColor" fillOpacity="0.45" />

      {[
        { x: 84, label: 'Plan' },
        { x: 168, label: 'Build' },
        { x: 252, label: 'Test' },
        { x: 336, label: 'Deploy' },
        { x: 396, label: 'Operate' },
      ].map((s) => (
        <g key={s.label}>
          <circle cx={s.x} cy="110" r="14" fill="currentColor" fillOpacity="0.12" />
          <circle cx={s.x} cy="110" r="6" fill="currentColor" fillOpacity="0.7" />
          <text x={s.x} y="148" textAnchor="middle" fontSize="12" fill="currentColor" fillOpacity="0.55">
            {s.label}
          </text>
        </g>
      ))}

      <path d="M44 56C120 30 186 32 248 58C314 86 370 86 436 58V188H44V56Z" fill="url(#plGlow)" />
    </svg>
  )
}

