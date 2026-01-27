import { useEffect, useMemo, useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ExternalLink } from 'lucide-react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export type WorkPinnedImage = {
  src?: string
  alt?: string
  label?: string
}

export type WorkPinnedSectionProps = {
  id: string
  title: string
  description: string
  tags?: readonly string[]
  href?: string
  icon?: LucideIcon
  images: readonly WorkPinnedImage[]
  sectionHeightClassName?: string
}

function WorkPinnedSlide({
  title,
  image,
  index,
  count,
  frameHeight,
  scrollYProgress,
  holdPortion,
}: {
  title: string
  image: WorkPinnedImage
  index: number
  count: number
  frameHeight: number
  scrollYProgress: MotionValue<number>
  holdPortion: number
}) {
  const resolvedAlt = image.alt ?? `${title} — ${image.label ?? `Image ${index + 1}`}`

  const step = count > 1 ? 1 / (count - 1) : 1
  const start = index * step
  const end = Math.min(1, start + step)
  const holdEnd = Math.min(1, start + step * holdPortion)
  const fade = step * 0.18

  const fadeInStart = Math.max(0, start - fade)
  const fadeInEnd = start
  const fadeOutStart = Math.min(1, holdEnd + (end - holdEnd) * 0.35)
  const fadeOutEnd = end

  const opacity = useTransform(
    scrollYProgress,
    count <= 1
      ? [0, 1]
      : index === 0
        ? [0, fadeOutStart, fadeOutEnd]
        : index === count - 1
          ? [fadeInStart, fadeInEnd, 1]
          : [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    count <= 1 ? [1, 1] : index === 0 ? [1, 1, 0] : index === count - 1 ? [0, 1, 1] : [0, 1, 1, 0]
  )

  const scale = useTransform(
    scrollYProgress,
    count <= 1
      ? [0, 1]
      : index === 0
        ? [0, fadeOutStart, fadeOutEnd]
        : index === count - 1
          ? [fadeInStart, fadeInEnd, 1]
          : [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    count <= 1 ? [1, 1] : index === 0 ? [1, 1, 0.992] : index === count - 1 ? [0.992, 1, 1] : [0.992, 1, 1, 0.992]
  )

  const y = useTransform(
    scrollYProgress,
    count <= 1
      ? [0, 1]
      : index === 0
        ? [0, fadeOutStart, fadeOutEnd]
        : index === count - 1
          ? [fadeInStart, fadeInEnd, 1]
          : [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    count <= 1 ? [0, 0] : index === 0 ? [0, 0, -24] : index === count - 1 ? [24, 0, 0] : [24, 0, 0, -24]
  )

  return (
    <motion.div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ height: frameHeight, opacity, scale, y, willChange: 'opacity, transform' }}
    >
      {image.src ? (
        <img
          src={image.src}
          alt={resolvedAlt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain"
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm text-muted-foreground">{image.label ?? 'Image'}</span>
        </div>
      )}
    </motion.div>
  )
}

export function WorkPinnedSection({
  id,
  title,
  description,
  tags,
  href,
  icon: Icon,
  images,
  sectionHeightClassName = 'h-[280vh]',
}: WorkPinnedSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const frameRef = useRef<HTMLDivElement | null>(null)
  const [frameHeight, setFrameHeight] = useState(260)
  const gapPx = 0
  const holdPortion = 0.42

  useEffect(() => {
    if (!frameRef.current) return

    const element = frameRef.current
    const update = () => setFrameHeight(Math.max(1, Math.round(element.getBoundingClientRect().height)))
    update()

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', update, { passive: true })
      return () => window.removeEventListener('resize', update)
    }

    const observer = new ResizeObserver(() => update())
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const yRanges = useMemo(() => {
    if (images.length <= 1) {
      return { input: [0, 1], output: [0, 0] }
    }

    const step = 1 / (images.length - 1)
    const input: number[] = [0]
    const output: number[] = [0]
    const perItemShift = frameHeight + gapPx

    for (let index = 0; index < images.length - 1; index += 1) {
      const stepStart = index * step
      const holdEnd = stepStart + step * holdPortion
      const next = (index + 1) * step
      input.push(holdEnd, next)
      output.push(-index * perItemShift, -(index + 1) * perItemShift)
    }

    return { input, output }
  }, [frameHeight, gapPx, holdPortion, images.length])

  const y = useTransform(scrollYProgress, yRanges.input, yRanges.output)

  return (
    <section
      ref={sectionRef}
      id={id}
      className={[
        'relative scroll-mt-24',
        sectionHeightClassName,
        'border-b border-border/40 bg-gradient-to-b from-background via-background to-background/80',
      ].join(' ')}
    >
      <div className="sticky top-0 flex h-[100svh] items-center">
        <div className="mx-auto w-full max-w-6xl px-4 py-8">
          <div className="flex h-full flex-col gap-6 lg:gap-8">
            <div className="w-full">
              <Card className="border-border/60 bg-background/50 backdrop-blur">
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium tracking-wide text-muted-foreground">PROJECT</p>
                      <CardTitle className="mt-2 text-xl tracking-tight text-foreground">{title}</CardTitle>
                    </div>
                    {Icon ? (
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-emerald-500/15 bg-emerald-500/10">
                        <Icon className="h-4 w-4 text-emerald-400" />
                      </span>
                    ) : null}
                  </div>

                  <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>

                  {tags?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-border/60 bg-background/50 text-muted-foreground">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    {href ? (
                      <Button asChild className="bg-emerald-500 text-emerald-950 hover:bg-emerald-400">
                        <a href={href} target="_blank" rel="noreferrer">
                          View site <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    ) : null}
                    <Button asChild variant="outline" className="border-border/60 bg-transparent hover:bg-muted">
                      <a href={`#${id}`}>Link</a>
                    </Button>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-border/50 bg-background/40 px-3 py-2">
                    <p className="text-xs text-muted-foreground">Scroll to browse screenshots</p>
                    <span className="text-xs font-medium text-emerald-300/80">{images.length} images</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="w-full">
              <div
                ref={frameRef}
                className="relative w-full overflow-hidden rounded-2xl h-[52svh] min-h-[320px] sm:h-[56svh] sm:min-h-[360px] md:h-[60svh] md:min-h-[440px] lg:h-[65svh] lg:min-h-[520px]"
              >
                <motion.div
                  className="flex w-full flex-col"
                  style={{
                    y,
                    gap: gapPx,
                    willChange: 'transform',
                  }}
                >
                  {images.map((image, index) => (
                    <WorkPinnedSlide
                      key={`${id}-${image.src ?? image.label ?? index}`}
                      title={title}
                      image={image}
                      index={index}
                      count={images.length}
                      frameHeight={frameHeight}
                      scrollYProgress={scrollYProgress}
                      holdPortion={holdPortion}
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
