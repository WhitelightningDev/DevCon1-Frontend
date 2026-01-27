type SeoConfig = {
  title: string
  description: string
  imagePath?: string
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

export function setSeo(config: SeoConfig) {
  const url = window.location.href
  const imageUrl = config.imagePath ? new URL(config.imagePath, window.location.origin).toString() : undefined

  document.title = config.title
  upsertLink('canonical', url)

  upsertMetaByName('description', config.description)
  upsertMetaByProperty('og:title', config.title)
  upsertMetaByProperty('og:description', config.description)
  upsertMetaByProperty('og:url', url)
  upsertMetaByProperty('og:type', 'website')

  upsertMetaByName('twitter:title', config.title)
  upsertMetaByName('twitter:description', config.description)
  upsertMetaByName('twitter:card', 'summary')

  if (imageUrl) {
    upsertMetaByProperty('og:image', imageUrl)
    upsertMetaByName('twitter:image', imageUrl)
  }
}

