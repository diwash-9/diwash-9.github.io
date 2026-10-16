// Prerenders every route listed in dist/sitemap.xml into a real HTML file so
// crawlers (and JS-less clients) get fully rendered content instead of an empty
// SPA shell.
//
// How it works:
//   1. Vite's preview server serves the freshly built dist/ with SPA fallback.
//   2. A headless browser visits each route, lets React render, and we snapshot
//      the resulting document (including the <head> tags the Seo component sets).
//   3. Each snapshot is written to dist/<route>/index.html.
//
// The inline scripts in index.html still run first, so the app boots and takes
// over normally; the snapshots only improve the first byte that crawlers see.

import { mkdir, readFile, writeFile } from "node:fs/promises"
import { existsSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { preview } from "vite"
import puppeteer from "puppeteer"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const outDir = path.join(root, "dist")

const LAUNCH_ARGS = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-dev-shm-usage",
]

function log(...args) {
  console.log("[prerender]", ...args)
}

/** Find a system Chrome to fall back on if Puppeteer's own is unavailable. */
function systemBrowser() {
  const explicit =
    process.env.PUPPETEER_EXECUTABLE_PATH || process.env.CHROME_PATH
  if (explicit && existsSync(explicit)) return explicit

  const candidates = [
    "/usr/bin/google-chrome-stable",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/snap/bin/chromium",
  ]
  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate
  }
  return undefined
}

async function launchBrowser() {
  try {
    return await puppeteer.launch({ args: LAUNCH_ARGS })
  } catch (err) {
    const fallback = systemBrowser()
    if (!fallback) throw err
    log(`bundled browser unavailable, falling back to ${fallback}`)
    return await puppeteer.launch({
      args: LAUNCH_ARGS,
      executablePath: fallback,
    })
  }
}

async function readRoutes() {
  const sitemap = await readFile(path.join(outDir, "sitemap.xml"), "utf8")
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  const routes = locs.map((loc) => new URL(loc).pathname)
  // Keep order stable and drop duplicates.
  return [...new Set(routes)]
}

function outputFileFor(route) {
  if (route === "/") return path.join(outDir, "index.html")
  const clean = route.replace(/^\/+/, "").replace(/\/+$/, "")
  return path.join(outDir, clean, "index.html")
}

async function main() {
  const routes = await readRoutes()
  log(`routes: ${routes.join(", ")}`)

  const server = await preview({
    root,
    preview: { port: 4321, strictPort: true, host: "127.0.0.1" },
    logLevel: "warn",
  })
  const origin =
    server.resolvedUrls?.local?.[0]?.replace(/\/$/, "") ??
    "http://127.0.0.1:4321"

  const browser = await launchBrowser()
  const snapshots = new Map()

  try {
    for (const route of routes) {
      const page = await browser.newPage()
      await page.setViewport({ width: 1280, height: 900 })

      const problems = []
      page.on("pageerror", (err) => problems.push(String(err)))
      page.on("console", (msg) => {
        if (msg.type() === "error") problems.push(msg.text())
      })

      const url = `${origin}${route}`
      await page.goto(url, { waitUntil: "networkidle0", timeout: 60_000 })
      // Wait until React has mounted something into the root container.
      await page.waitForSelector("#root > *", { timeout: 20_000 })

      const html = await page.evaluate(
        () => `<!doctype html>\n${document.documentElement.outerHTML}`
      )

      if (html.length < 500) {
        throw new Error(`Suspiciously small snapshot for ${route}`)
      }

      snapshots.set(route, html)
      await page.close()

      if (problems.length) {
        log(`  warning on ${route}: ${problems.slice(0, 3).join(" | ")}`)
      }
    }
  } finally {
    await browser.close()
    await server.close()
  }

  for (const [route, html] of snapshots) {
    const file = outputFileFor(route)
    await mkdir(path.dirname(file), { recursive: true })
    await writeFile(file, html, "utf8")
    log(
      `wrote ${path.relative(root, file)} (${(html.length / 1024).toFixed(1)} kB)`
    )
  }

  log(`done: ${snapshots.size} pages prerendered`)
}

main().catch((err) => {
  console.error("[prerender] failed:", err)
  process.exitCode = 1
})
