import { useMemo, useState } from 'react'

type Company = {
  name: string
  href?: string
  logoSrc?: string
  logoFrameClassName?: string
  logoImgClassName?: string
}

const companies: readonly Company[] = [
  { name: 'Bullion Beperk', href: 'https://www.bullionlimited.co.za/', logoSrc: '/bullion-logo.png' },
  { name: 'Jet Ski And More', href: 'https://www.jetskiandmore.com/home', logoSrc: '/JetSkiLogo.png' },
  { name: 'Coastline Collective', logoSrc: '/coastline-collective-logo.png' },
  {
    name: 'Team Flow',
    href: 'https://teamflow-pearl.vercel.app/',
    logoSrc: '/teamflow-logo.png',
    logoFrameClassName: 'inline-flex items-center justify-center rounded-lg bg-white px-4 py-3 shadow-sm ring-1 ring-black/5',
    logoImgClassName: 'h-12 max-w-[220px] sm:h-14 sm:max-w-[260px] md:h-16 md:max-w-[300px]',
  },
  {
    name: 'Field Flow',
    href: 'https://fieldflow-billing.vercel.app/',
    logoSrc: '/fieldflow-logo.png',
    logoFrameClassName: 'inline-flex items-center justify-center rounded-lg bg-white px-4 py-3 shadow-sm ring-1 ring-black/5',
    logoImgClassName: 'h-12 max-w-[220px] sm:h-14 sm:max-w-[260px] md:h-16 md:max-w-[300px]',
  },
  { name: 'Kiings VIP', href: 'https://kiingsvipcarwash.vercel.app/', logoSrc: '/kingslogo.JPG' },
  { name: 'HKNFT', href: 'https://hongkongtrust.vercel.app/', logoSrc: '/hkftlogo.png' },
  { name: 'Found Your Pet', href: 'https://www.foundyourpet.co.za/', logoSrc: '/foundyourpetlogo.png' },
] as const

function LogoChip({ company }: { company: Company }) {
  const [showImage, setShowImage] = useState(Boolean(company.logoSrc))
  const logoFrameClassName =
    company.logoFrameClassName ??
    'inline-flex items-center justify-center rounded-lg bg-white px-3 py-2 shadow-sm ring-1 ring-black/5'

  const content = (
    <div className="flex min-w-[190px] items-center justify-center rounded-xl border border-border/60 bg-background/40 px-4 py-3 shadow-sm transition-colors group-hover:bg-background/55 sm:min-w-[230px] sm:px-5">
      {showImage && company.logoSrc ? (
        <span className={[logoFrameClassName, 'overflow-hidden transition-transform group-hover:scale-[1.02]'].join(' ')}>
          <img
            src={company.logoSrc}
            alt=""
            loading="lazy"
            draggable={false}
            className={[
              'h-10 w-auto max-w-[180px] rounded-md object-contain sm:h-11 sm:max-w-[220px] md:h-12 md:max-w-[250px]',
              'opacity-90 transition-opacity group-hover:opacity-100',
              company.logoImgClassName,
            ]
              .filter(Boolean)
              .join(' ')}
            onError={() => setShowImage(false)}
          />
          <span className="sr-only">{company.name}</span>
        </span>
      ) : (
        <span className="text-sm font-semibold tracking-wide text-muted-foreground">{company.name}</span>
      )}
    </div>
  )

  return company.href ? (
    <a
      href={company.href}
      target="_blank"
      rel="noreferrer"
      className="group transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={company.name}
    >
      {content}
    </a>
  ) : (
    <div className="group">{content}</div>
  )
}

export function CompanyLogos() {
  const items = useMemo(() => [...companies, ...companies], [])

  return (
    <section aria-label="Companies" className="py-10 md:py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center md:text-left">
          <p className="text-xs font-medium tracking-wide text-muted-foreground">COMPANIES</p>
          <h2 className="dc-animate-heading [--dc-delay:60ms] mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Built for teams that ship.
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
            A few of the companies and prototypes I’ve worked on recently.
          </p>
        </div>

        <div
          className="group relative mt-7 overflow-hidden rounded-2xl border border-border/60 bg-background/30 py-6 shadow-sm"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          }}
        >
          <div className="dc-marquee flex w-max items-center gap-5 px-4 [--dc-marquee-duration:38s] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {items.map((company, index) => (
              <LogoChip key={`${company.name}-${index}`} company={company} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
