import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

function normalizeOrigin(value) {
  if (!value) return null
  try {
    const url = new URL(value)
    return url.origin
  } catch {
    return null
  }
}

const siteUrl =
  normalizeOrigin(process.env.VITE_SITE_URL) ||
  normalizeOrigin(process.env.SITE_URL) ||
  null

const origin = siteUrl || 'https://www.hkftservices.co.za'

const routes = [
  '/',
  '/what-we-do',
  '/what-we-do/web-development',
  '/what-we-do/saas-development',
  '/what-we-do/paas-development',
  '/what-we-do/ai-integration',
  '/what-we-do/security-integration',
  '/what-we-do/marketing-basic',
  '/what-we-do/marketing-growth',
  '/what-we-do/marketing-advanced',
  '/process',
  '/contact',
]

const lastmod = new Date().toISOString().slice(0, 10)

const sitemapXml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes
    .map((path) => {
      const loc = `${origin}${path === '/' ? '/' : path}`
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
    })
    .join('\n') +
  `\n</urlset>\n`

const robotsTxt =
  `User-agent: *\n` +
  `Allow: /\n\n` +
  `Sitemap: ${origin}/sitemap.xml\n`

writeFileSync(resolve('public', 'sitemap.xml'), sitemapXml, 'utf8')
writeFileSync(resolve('public', 'robots.txt'), robotsTxt, 'utf8')

console.log(`[seo] Wrote public/sitemap.xml and public/robots.txt for ${origin}`)
