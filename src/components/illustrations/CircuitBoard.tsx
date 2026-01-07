type IllustrationProps = {
  className?: string
}

export function CircuitBoard({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 480 300"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cbGlow" x1="48" y1="40" x2="432" y2="260" gradientUnits="userSpaceOnUse">
          <stop stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
        <pattern id="cbGrid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
        </pattern>
      </defs>

      <rect x="28" y="22" width="424" height="256" rx="18" stroke="currentColor" strokeOpacity="0.18" />
      <rect x="28" y="22" width="424" height="256" rx="18" fill="url(#cbGrid)" opacity="0.7" />
      <path
        d="M70 86H160V138H242V92H330V158H408"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M96 212H206V176H272V228H344V200H408"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {[
        [70, 86],
        [160, 86],
        [160, 138],
        [242, 138],
        [242, 92],
        [330, 92],
        [330, 158],
        [408, 158],
        [96, 212],
        [206, 212],
        [206, 176],
        [272, 176],
        [272, 228],
        [344, 228],
        [344, 200],
        [408, 200],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="5.5" fill="currentColor" fillOpacity="0.14" />
          <circle cx={cx} cy={cy} r="2.5" fill="currentColor" fillOpacity="0.6" />
        </g>
      ))}

      <path d="M48 60C112 38 154 40 212 70C272 100 330 96 432 60V260H48V60Z" fill="url(#cbGlow)" />
    </svg>
  )
}

