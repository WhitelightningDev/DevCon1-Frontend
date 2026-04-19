import type { ComponentType } from 'react'

import { CircuitBoard } from '@/components/illustrations/CircuitBoard'
import { Pipeline } from '@/components/illustrations/Pipeline'
import { RadarSweep } from '@/components/illustrations/RadarSweep'
import { SignalBeacon } from '@/components/illustrations/SignalBeacon'
import type { OfferingCategory } from '@/lib/offerings'

export type OfferingVisual = {
  Illustration: ComponentType<{ className?: string }>
  accentClassName: string
  backdropClassName: string
}

export function getOfferingVisual(slug: string): OfferingVisual {
  switch (slug) {
    case 'web-development':
      return {
        Illustration: CircuitBoard,
        accentClassName: 'text-primary/80',
        backdropClassName: 'from-primary/12 via-transparent to-secondary/50',
      }
    case 'saas-development':
      return {
        Illustration: SignalBeacon,
        accentClassName: 'text-primary/85',
        backdropClassName: 'from-primary/14 via-transparent to-secondary/55',
      }
    case 'paas-development':
      return {
        Illustration: Pipeline,
        accentClassName: 'text-primary/75',
        backdropClassName: 'from-primary/10 via-transparent to-secondary/60',
      }
    case 'ai-integration':
      return {
        Illustration: RadarSweep,
        accentClassName: 'text-primary/80',
        backdropClassName: 'from-primary/12 via-transparent to-secondary/55',
      }
    case 'security-integration':
      return {
        Illustration: CircuitBoard,
        accentClassName: 'text-primary/70',
        backdropClassName: 'from-primary/10 via-transparent to-secondary/60',
      }
    case 'marketing-basic':
      return {
        Illustration: SignalBeacon,
        accentClassName: 'text-primary/70',
        backdropClassName: 'from-primary/10 via-transparent to-secondary/55',
      }
    case 'marketing-growth':
      return {
        Illustration: Pipeline,
        accentClassName: 'text-primary/70',
        backdropClassName: 'from-primary/10 via-transparent to-secondary/60',
      }
    case 'marketing-advanced':
      return {
        Illustration: RadarSweep,
        accentClassName: 'text-primary/70',
        backdropClassName: 'from-primary/10 via-transparent to-secondary/60',
      }
    default:
      return {
        Illustration: SignalBeacon,
        accentClassName: 'text-primary/70',
        backdropClassName: 'from-primary/10 via-transparent to-secondary/55',
      }
  }
}

export function getOfferingCategoryVisual(category: OfferingCategory): OfferingVisual {
  switch (category) {
    case 'Engineering':
      return {
        Illustration: CircuitBoard,
        accentClassName: 'text-primary/75',
        backdropClassName: 'from-primary/10 via-transparent to-secondary/55',
      }
    case 'Platforms':
      return {
        Illustration: Pipeline,
        accentClassName: 'text-primary/75',
        backdropClassName: 'from-primary/10 via-transparent to-secondary/60',
      }
    case 'AI & Security':
      return {
        Illustration: RadarSweep,
        accentClassName: 'text-primary/75',
        backdropClassName: 'from-primary/10 via-transparent to-secondary/60',
      }
    case 'Marketing':
      return {
        Illustration: SignalBeacon,
        accentClassName: 'text-primary/70',
        backdropClassName: 'from-primary/10 via-transparent to-secondary/55',
      }
    default:
      return {
        Illustration: SignalBeacon,
        accentClassName: 'text-primary/70',
        backdropClassName: 'from-primary/10 via-transparent to-secondary/55',
      }
  }
}
