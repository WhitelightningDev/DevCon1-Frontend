import { useEffect, useMemo, useState } from 'react'
import { safeJsonParse } from '@/lib/validation'

export type SiteMetadata = {
  url: string
  title: string
  description: string
  image: string
  favicon: string
  siteName: string
}

type ApiResponse =
  | ({ ok: true } & SiteMetadata)
  | { ok: false; error?: string }

const CACHE_TTL_MS = 1000 * 60 * 60 * 24

function cacheKey(url: string) {
  return `devcon1:site-metadata:${url}`
}

function readCache(url: string): SiteMetadata | null {
  if (typeof window === 'undefined') return null
  try {
    const parsed = safeJsonParse<{ ts?: number; data?: SiteMetadata }>(localStorage.getItem(cacheKey(url)))
    if (!parsed) return null
    if (!parsed?.ts || !parsed?.data) return null
    if (Date.now() - parsed.ts > CACHE_TTL_MS) return null
    return parsed.data
  } catch {
    return null
  }
}

function writeCache(url: string, data: SiteMetadata) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(cacheKey(url), JSON.stringify({ ts: Date.now(), data }))
  } catch {
    // ignore
  }
}

async function fetchSiteMetadata(url: string, signal: AbortSignal): Promise<SiteMetadata | null> {
  const res = await fetch(`/api/site-metadata?url=${encodeURIComponent(url)}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    signal,
  })
  if (!res.ok) return null
  const payload = (await res.json()) as ApiResponse
  if (!payload.ok) return null
  return payload
}

export function useSiteMetadata(url: string | undefined) {
  const [remote, setRemote] = useState<{ url: string; data: SiteMetadata | null } | null>(null)
  const [statusByUrl, setStatusByUrl] = useState<Record<string, 'idle' | 'loading' | 'ready' | 'error'>>({})

  const normalizedUrl = useMemo(() => (url || '').trim(), [url])
  const cached = useMemo(() => (normalizedUrl ? readCache(normalizedUrl) : null), [normalizedUrl])
  const remoteData = remote?.url === normalizedUrl ? remote.data : null
  const data = remoteData || cached
  const status = normalizedUrl ? (statusByUrl[normalizedUrl] || (data ? 'ready' : 'idle')) : 'idle'

  useEffect(() => {
    if (!normalizedUrl) return
    if (cached) return

    const controller = new AbortController()
    Promise.resolve().then(() => {
      setStatusByUrl((current) => ({ ...current, [normalizedUrl]: 'loading' }))
    })
    fetchSiteMetadata(normalizedUrl, controller.signal)
      .then((value) => {
        if (!value) throw new Error('metadata missing')
        writeCache(normalizedUrl, value)
        setRemote({ url: normalizedUrl, data: value })
        setStatusByUrl((current) => ({ ...current, [normalizedUrl]: 'ready' }))
      })
      .catch(() => {
        setStatusByUrl((current) => ({ ...current, [normalizedUrl]: 'error' }))
      })

    return () => controller.abort()
  }, [cached, normalizedUrl])

  return { data, status }
}
