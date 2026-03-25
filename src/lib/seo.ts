type SeoConfig = {
  title: string
  description: string
  imagePath?: string
}

function readSiteUrl() {
  const raw = (import.meta.env.VITE_SITE_URL as string | undefined) || ''
  if (!raw) return window.location.origin
  try {
    return new URL(raw).origin
  } catch {
    return window.location.origin
  }
}

function normalizePathname(pathname: string) {
  if (!pathname) return '/'
  if (pathname !== '/' && pathname.endsWith('/')) return pathname.replace(/\/+$/, '')
  return pathname
}

function upsertMetaByName(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertMetaByProperty(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertJsonLd(id: string, data: unknown) {
  const selector = `script[type="application/ld+json"][data-dc="${id}"]`
  let el = document.querySelector<HTMLScriptElement>(selector)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.setAttribute('data-dc', id)
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export function setSeo(config: SeoConfig) {
  const siteUrl = readSiteUrl()
  const canonicalPath = normalizePathname(window.location.pathname)
  const url = new URL(canonicalPath, siteUrl).toString()
  const imageUrl = config.imagePath ? new URL(config.imagePath, window.location.origin).toString() : undefined

  document.title = config.title
  upsertLink('canonical', url)

  upsertMetaByName('description', config.description)
  upsertMetaByName('robots', 'index, follow')

  upsertMetaByProperty('og:title', config.title)
  upsertMetaByProperty('og:description', config.description)
  upsertMetaByProperty('og:url', url)
  upsertMetaByProperty('og:type', 'website')
  upsertMetaByProperty('og:site_name', 'DevCon1')
  upsertMetaByProperty('og:locale', 'en_US')

  upsertMetaByName('twitter:title', config.title)
  upsertMetaByName('twitter:description', config.description)
  upsertMetaByName('twitter:url', url)
  upsertMetaByName('twitter:card', imageUrl ? 'summary_large_image' : 'summary')

  if (imageUrl) {
    upsertMetaByProperty('og:image', imageUrl)
    upsertMetaByProperty('og:image:alt', config.title)
    upsertMetaByName('twitter:image', imageUrl)
  }

  upsertJsonLd('site', {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}#organization`,
        name: 'DevCon1',
        url: siteUrl,
        logo: new URL('/DevCon1Logo.png', window.location.origin).toString(),
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}#website`,
        url: siteUrl,
        name: 'DevCon1',
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: config.title,
        description: config.description,
        isPartOf: { '@id': `${siteUrl}#website` },
        about: { '@id': `${siteUrl}#organization` },
      },
    ],
  })
}
