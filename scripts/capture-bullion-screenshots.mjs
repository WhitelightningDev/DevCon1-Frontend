import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

import { chromium } from 'playwright'

const SITE_URL = 'https://www.bullionlimited.co.za/'
const OUT_DIR = path.join(process.cwd(), 'public', 'work', 'bullion')

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function tryDismissCookie(page) {
  const candidates = [
    page.getByRole('button', { name: /accept/i }),
    page.getByRole('button', { name: /agree/i }),
    page.getByRole('button', { name: /allow all/i }),
    page.getByRole('button', { name: /got it/i }),
    page.getByRole('button', { name: /ok/i }),
  ]

  for (const locator of candidates) {
    try {
      if ((await locator.first().count()) > 0) {
        const button = locator.first()
        if (await button.isVisible().catch(() => false)) {
          await button.click({ timeout: 1500 }).catch(() => {})
          await page.waitForTimeout(250)
          break
        }
      }
    } catch {
      // ignore
    }
  }
}

async function captureDesktop() {
  const browser = await chromium.launch()
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    const page = await context.newPage()

    await page.goto(SITE_URL, { waitUntil: 'load', timeout: 90000 })
    await page.waitForTimeout(1500)
    await tryDismissCookie(page)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(400)

    // Matches existing Work.tsx path: /work/bullion/hero.png
    await page.screenshot({ path: path.join(OUT_DIR, 'hero.png'), fullPage: false })

    // Try to find a "section" worth capturing (e.g., services/offerings); fallback to mid-page.
    const sectionTarget =
      (await page.getByRole('heading', { name: /services|offer|solutions|features|about/i }).first().count()) > 0
        ? page.getByRole('heading', { name: /services|offer|solutions|features|about/i }).first()
        : null

    if (sectionTarget) {
      await sectionTarget.scrollIntoViewIfNeeded()
      await page.waitForTimeout(450)
      await page.screenshot({ path: path.join(OUT_DIR, 'section.png'), fullPage: false })
    } else {
      const height = await page.evaluate(() => document.documentElement.scrollHeight || document.body.scrollHeight || 0)
      await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, Math.round(height * 0.55)))
      await page.waitForTimeout(450)
      await page.screenshot({ path: path.join(OUT_DIR, 'section.png'), fullPage: false })
    }
  } finally {
    await browser.close()
  }
}

async function captureMobile() {
  const browser = await chromium.launch()
  try {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    })
    const page = await context.newPage()

    await page.goto(SITE_URL, { waitUntil: 'load', timeout: 90000 })
    await page.waitForTimeout(1500)
    await tryDismissCookie(page)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(400)

    // Matches existing Work.tsx path: /work/bullion/mobile.png
    await page.screenshot({ path: path.join(OUT_DIR, 'mobile.png'), fullPage: false })
  } finally {
    await browser.close()
  }
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
