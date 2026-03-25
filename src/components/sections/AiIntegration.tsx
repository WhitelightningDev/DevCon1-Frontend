import { ArrowRight } from 'lucide-react'

const cards = [
  {
    title: 'AI integration into existing infrastructure',
    description: 'Introduce LLM capability to current apps, workflows, and data contracts without a rewrite.',
    imageSrc: '/imagery/infrastructure.jpg',
    href: '/services#offerings',
    cta: 'Explore AI integration',
  },
  {
    title: 'Secure-by-default implementation',
    description: 'Threat-aware patterns, guardrails, and reviewable controls for high-stakes environments.',
    imageSrc: '/imagery/ai-security.jpg',
    href: '/services#offerings',
    cta: 'See hardening approach',
  },
  {
    title: 'Delivery that scales with your team',
    description: 'Milestone-driven PRs, clear handoff, and operational clarity so work stays maintainable.',
    imageSrc: '/imagery/collaboration.jpg',
    href: '/process',
    cta: 'View delivery process',
  },
] as const

export function AiIntegration() {
  return (
    <section id="ai" className="scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="text-center md:text-left">
            <p className="dc-kicker">AI integration</p>
            <h2 className="dc-animate-heading dc-h2 [--dc-delay:60ms] mt-3">
              Orchestrate AI into your existing stack.
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base md:mx-0">
              Add AI workflows where they create leverage: knowledge retrieval, automation, assisted operations, and safer decision support.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="group border border-border/60 bg-background transition-colors hover:bg-muted/30"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-border/60 bg-muted/20">
                <img
                  src={card.imageSrc}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover brightness-110 contrast-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
              </div>

              <div className="p-5">
                <p className="text-sm font-medium text-foreground">{card.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{card.description}</p>
                <span className="mt-4 inline-flex items-center text-xs font-medium text-primary">
                  {card.cta}
                  <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

