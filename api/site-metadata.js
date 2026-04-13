function json(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

function isSameOrigin(origin, host) {
  if (!origin || !host) return true
  try {
    const url = new URL(origin)
    return url.host === host
  } catch {
    return false
  }
}

function isBlockedHostname(hostname) {
  const host = String(hostname || '').toLowerCase().trim()
  if (!host) return true
  if (host === 'localhost' || host.endsWith('.localhost')) return true
  if (host.endsWith('.local')) return true
  if (host === '0.0.0.0') return true
  if (host === '127.0.0.1' || host.startsWith('127.')) return true
  if (host === '::1') return true
  if (host.startsWith('10.')) return true
  if (host.startsWith('192.168.')) return true
  if (host.startsWith('169.254.')) return true
  const match172 = host.match(/^172\.(\d+)\./)
  if (match172) {
    const second = Number(match172[1])
    if (Number.isFinite(second) && second >= 16 && second <= 31) return true
  }
  if (host.startsWith('fc') || host.startsWith('fd')) return true // fc00::/7
  if (host.startsWith('fe80:')) return true
  return false
}

function pickMetaContent(html, keys) {
  for (const key of keys) {
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const pattern = new RegExp(
      `<meta\\s+[^>]*?(?:property|name)=(["'])${escaped}\\1[^>]*?>`,
      'i'
    )
    const tag = html.match(pattern)?.[0]
    if (!tag) continue
    const content = tag.match(/content=(["'])(.*?)\1/i)?.[2]
    if (content && content.trim()) return content.trim()
  }
  return ''
}

function pickLinkHref(html, rels) {
  for (const rel of rels) {
    const escaped = rel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const pattern = new RegExp(`<link\\s+[^>]*?rel=(["'])${escaped}\\1[^>]*?>`, 'i')
    const tag = html.match(pattern)?.[0]
    if (!tag) continue
    const href = tag.match(/href=(["'])(.*?)\1/i)?.[2]
    if (href && href.trim()) return href.trim()
  }
  return ''
}

function normalizeWhitespace(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim()
}

function resolveMaybeRelative(baseUrl, maybeUrl) {
  const raw = String(maybeUrl || '').trim()
  if (!raw) return ''
  try {
    return new URL(raw, baseUrl).toString()
  } catch {
    return ''
  }
}

async function readTextUpTo(res, maxBytes) {
  if (!res.body || typeof res.body.getReader !== 'function') {
    return await res.text()
  }
  const reader = res.body.getReader()
  const chunks = []
  let total = 0
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    if (!value) continue
    if (total + value.byteLength > maxBytes) {
      const remaining = Math.max(0, maxBytes - total)
      if (remaining) chunks.push(value.slice(0, remaining))
      total = maxBytes
      break
    }
    chunks.push(value)
    total += value.byteLength
  }
  try {
    await reader.cancel()
  } catch {
    // ignore
  }
  const merged = new Uint8Array(total)
  let offset = 0
  for (const chunk of chunks) {
    merged.set(chunk, offset)
    offset += chunk.byteLength
  }
  return new TextDecoder('utf-8').decode(merged)
}

export default async function handler(req, res) {
  const origin = req.headers?.origin
  const host = req.headers?.host

  res.setHeader('Vary', 'Origin')
  if (origin && isSameOrigin(origin, host)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET, OPTIONS')
    json(res, 405, { ok: false, error: 'Method not allowed' })
    return
  }

  if (origin && !isSameOrigin(origin, host)) {
    json(res, 403, { ok: false, error: 'Forbidden' })
    return
  }

  const urlParam = typeof req.query?.url === 'string' ? req.query.url : ''
  if (!urlParam || urlParam.length > 2048) {
    json(res, 400, { ok: false, error: 'Missing url' })
    return
  }

  let targetUrl
  try {
    targetUrl = new URL(urlParam)
  } catch {
    json(res, 400, { ok: false, error: 'Invalid url' })
    return
  }

  if (targetUrl.protocol !== 'http:' && targetUrl.protocol !== 'https:') {
    json(res, 400, { ok: false, error: 'Invalid url protocol' })
    return
  }

  if (isBlockedHostname(targetUrl.hostname)) {
    json(res, 400, { ok: false, error: 'Blocked host' })
    return
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    const response = await fetch(targetUrl.toString(), {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': 'HKFT-Services-MetadataBot/1.0',
        Accept: 'text/html,application/xhtml+xml',
      },
    })

    if (!response.ok) {
      json(res, 502, { ok: false, error: 'Upstream error', status: response.status })
      return
    }

    const contentType = response.headers.get('content-type') || ''
    if (!contentType.toLowerCase().includes('text/html')) {
      json(res, 400, { ok: false, error: 'URL is not HTML' })
      return
    }

    const html = await readTextUpTo(response, 280_000)
    const head = html.split(/<\/head>/i)[0] || html

    const title =
      normalizeWhitespace(head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '') ||
      normalizeWhitespace(pickMetaContent(head, ['og:title', 'twitter:title']))

    const description =
      normalizeWhitespace(pickMetaContent(head, ['description', 'og:description', 'twitter:description'])) || ''

    const ogImage = pickMetaContent(head, ['og:image', 'twitter:image'])
    const icon = pickLinkHref(head, ['icon', 'shortcut icon', 'apple-touch-icon'])
    const siteName = normalizeWhitespace(pickMetaContent(head, ['og:site_name'])) || ''

    const resolvedImage = resolveMaybeRelative(response.url || targetUrl.toString(), ogImage)
    const resolvedIcon = resolveMaybeRelative(response.url || targetUrl.toString(), icon)

    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=604800')
    json(res, 200, {
      ok: true,
      url: response.url || targetUrl.toString(),
      title,
      description,
      image: resolvedImage,
      favicon: resolvedIcon,
      siteName,
    })
  } catch (err) {
    const aborted = err && typeof err === 'object' && 'name' in err && err.name === 'AbortError'
    json(res, 504, { ok: false, error: aborted ? 'Timeout' : 'Failed to fetch' })
  } finally {
    clearTimeout(timeout)
  }
}

