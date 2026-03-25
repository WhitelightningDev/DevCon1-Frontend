export function PageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(59,130,246,0.08),transparent_55%),radial-gradient(circle_at_82%_14%,rgba(37,99,235,0.06),transparent_55%)]" />
      <div className="absolute inset-0 opacity-[0.18] dark:opacity-[0.08] [background-image:linear-gradient(to_right,rgba(2,6,23,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(2,6,23,0.06)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent_70%)]" />

      <svg
        aria-hidden="true"
        focusable="false"
        className="absolute inset-0 h-full w-full opacity-[0.35] dark:opacity-[0.18] [mask-image:radial-gradient(110%_70%_at_50%_0%,black,transparent_70%)]"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="dc-flow-a" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="0.35" stopColor="hsl(var(--primary))" stopOpacity="0.32" />
            <stop offset="0.65" stopColor="hsl(var(--primary))" stopOpacity="0.18" />
            <stop offset="1" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="dc-flow-b" x1="0" y1="0" x2="0" y2="800" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="0.4" stopColor="hsl(var(--primary))" stopOpacity="0.22" />
            <stop offset="1" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
          <filter id="dc-flow-soften" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.7" />
          </filter>
        </defs>

        <g fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#dc-flow-soften)">
          <path
            d="M -150 120 C 80 40, 240 160, 420 110 S 760 40, 980 130 S 1260 210, 1400 120"
            stroke="url(#dc-flow-a)"
            strokeWidth="1.2"
          />
          <path
            d="M -180 220 C 80 120, 260 320, 480 250 S 820 140, 1020 260 S 1260 380, 1400 240"
            stroke="url(#dc-flow-a)"
            strokeWidth="1"
            opacity="0.85"
          />
          <path
            d="M -160 360 C 120 260, 300 500, 520 420 S 840 300, 1040 430 S 1240 560, 1400 420"
            stroke="url(#dc-flow-a)"
            strokeWidth="0.9"
            opacity="0.75"
          />
          <path
            d="M 980 -60 C 860 80, 920 220, 1060 300 S 1280 420, 1160 640"
            stroke="url(#dc-flow-b)"
            strokeWidth="1.1"
            opacity="0.65"
          />
        </g>
      </svg>

      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/35 to-background/95" />
    </div>
  )
}
