type IllustrationProps = {
  className?: string
}

export function SignalBeacon({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 360 260"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="sbGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(180 120) rotate(90) scale(130 170)">
          <stop stopColor="currentColor" stopOpacity="0.18" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="24" y="24" width="312" height="212" rx="16" stroke="currentColor" strokeOpacity="0.18" />
      <path d="M60 70H300" stroke="currentColor" strokeOpacity="0.16" />
      <path d="M60 110H260" stroke="currentColor" strokeOpacity="0.14" />
      <path d="M60 150H220" stroke="currentColor" strokeOpacity="0.12" />

      <path
        d="M180 196C212 196 238 170 238 138C238 106 212 80 180 80C148 80 122 106 122 138C122 170 148 196 180 196Z"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="2"
      />
      <circle cx="180" cy="138" r="8" fill="currentColor" fillOpacity="0.7" />
      <path d="M180 138L246 92" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />

      <path d="M180 46C224 46 260 82 260 126" stroke="currentColor" strokeOpacity="0.18" strokeWidth="2" />
      <path d="M180 66C214 66 242 94 242 128" stroke="currentColor" strokeOpacity="0.22" strokeWidth="2" />
      <path d="M180 46C136 46 100 82 100 126" stroke="currentColor" strokeOpacity="0.18" strokeWidth="2" />
      <path d="M180 66C146 66 118 94 118 128" stroke="currentColor" strokeOpacity="0.22" strokeWidth="2" />

      <path d="M52 58C104 34 150 34 198 54C248 74 296 70 332 50V232H52V58Z" fill="url(#sbGlow)" />
    </svg>
  )
}

