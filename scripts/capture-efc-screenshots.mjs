import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

import { chromium } from 'playwright'

const SITE_URL = 'https://efc-batteries.vercel.app/'
const OUT_DIR = path.join(process.cwd(), 'public', 'work', 'efc')

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function captureDesktop() {
  const browser = await chromium.launch()
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()

  await page.goto(SITE_URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(650)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(250)

  // Matches existing Work.tsx path: /work/efc/hero.png
  await page.screenshot({ path: path.join(OUT_DIR, 'hero.png'), fullPage: false })

  const productsTarget =
    (await page.getByRole('heading', { name: /products?|batteries|catalog|range/i }).first().count()) > 0
      ? page.getByRole('heading', { name: /products?|batteries|catalog|range/i }).first()
      : null

  if (productsTarget) {
    await productsTarget.scrollIntoViewIfNeeded()
    await page.waitForTimeout(350)
    await page.screenshot({ path: path.join(OUT_DIR, 'products.png'), fullPage: false })
  } else {
    const height = await page.evaluate(() => document.documentElement.scrollHeight || document.body.scrollHeight || 0)
    await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, Math.round(height * 0.55)))
    await page.waitForTimeout(350)
    await page.screenshot({ path: path.join(OUT_DIR, 'products.png'), fullPage: false })
  }

  await browser.close()
}

async function captureMobile() {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  })
  const page = await context.newPage()

  await page.goto(SITE_URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(650)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(250)

  // Matches existing Work.tsx path: /work/efc/mobile.png
  await page.screenshot({ path: path.join(OUT_DIR, 'mobile.png'), fullPage: false })

  await browser.close()
}

async function main() {
  await ensureDir(OUT_DIR)
  await captureDesktop()
  await captureMobile()
  // eslint-disable-next-line no-console
  console.log('Saved screenshots to', OUT_DIR)
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error)
  process.exitCode = 1
})

