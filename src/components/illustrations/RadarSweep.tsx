type IllustrationProps = {
  className?: string
}

export function RadarSweep({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 320 320"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="rsGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(160 160) rotate(90) scale(140)">
          <stop stopColor="currentColor" stopOpacity="0.25" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="rsSweep" x1="160" y1="160" x2="292" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx="160" cy="160" r="144" stroke="currentColor" strokeOpacity="0.16" />
      <circle cx="160" cy="160" r="108" stroke="currentColor" strokeOpacity="0.14" />
      <circle cx="160" cy="160" r="72" stroke="currentColor" strokeOpacity="0.12" />
      <circle cx="160" cy="160" r="36" stroke="currentColor" strokeOpacity="0.10" />
      <path d="M16 160H304" stroke="currentColor" strokeOpacity="0.12" />
      <path d="M160 16V304" stroke="currentColor" strokeOpacity="0.12" />

      <path
        d="M160 160L288 96A144 144 0 0 1 224 288Z"
        fill="url(#rsSweep)"
        opacity="0.9"
      />
      <circle cx="160" cy="160" r="140" fill="url(#rsGlow)" />

      {[
        [118, 124, 2.5],
        [214, 132, 3],
        [242, 206, 2.5],
        [110, 220, 2],
      ].map(([cx, cy, r]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r={r as number} fill="currentColor" fillOpacity="0.85" />
          <circle cx={cx} cy={cy} r={(r as number) + 7} stroke="currentColor" strokeOpacity="0.12" />
        </g>
      ))}

      <circle cx="160" cy="160" r="4" fill="currentColor" fillOpacity="0.9" />
    </svg>
  )
}

