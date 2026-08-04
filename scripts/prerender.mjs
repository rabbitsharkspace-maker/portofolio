/*
 * One real HTML file per route, written after the bundle is built.
 *
 * The site is a single-page app: every URL is served the same index.html and
 * React decides what to draw. That is invisible to a person and fatal to a link
 * preview — WeChat, LinkedIn, WhatsApp, Slack and iMessage fetch the URL, read
 * the <head> and never run a line of JavaScript, so all three pages shared the
 * studio's title, the studio's description and the studio's og:url no matter
 * which one you sent.
 *
 * So each route gets its own file with its own head: dist/jenny/index.html,
 * dist/jane/index.html. Cloudflare Pages serves a matching static file before it
 * falls back to the SPA, and the bundle inside each is identical, so routing,
 * navigation and the language toggle carry on exactly as before.
 *
 * These are baked in English — a static file can only hold one language, and the
 * browser gets the Chinese version from useDocumentMeta the moment it boots.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const dist = join(root, "dist")

// The data file is plain ESM with no imports of its own, so it can be pulled in
// here as well as by the app.
const { META, SITE } = await import(join(root, "src/data/meta.js"))

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;")

const head = (route, page) => {
  const { title, desc } = page.en
  const url = SITE + (route === "/" ? "" : route)
  const image = SITE + page.image
  return `<title>${esc(title)}</title>
    <meta name="description" content="${esc(desc)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(desc)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="RabbitShark" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(desc)}" />
    <meta name="twitter:image" content="${image}" />`
}

const template = readFileSync(join(dist, "index.html"), "utf8")

/*
 * Marked off explicitly rather than matched by tag. Matching from the first
 * <title> spliced the block into the middle of a comment that happened to
 * mention one — the markers cannot be hit by accident, and their absence is
 * worth failing the build over rather than shipping three identical cards again.
 */
const BLOCK = /<!-- meta:start -->[\s\S]*?<!-- meta:end -->/
if (!BLOCK.test(template)) throw new Error("index.html has no <!-- meta:start --> block")

for (const [route, page] of Object.entries(META)) {
  const html = template.replace(BLOCK, `<!-- meta:start -->\n    ${head(route, page)}\n    <!-- meta:end -->`)
  /*
   * Flat files, not directories. Written as dist/jenny/index.html, Cloudflare
   * Pages answers a request for /jenny with a 308 to /jenny/ before serving
   * anything — so every shared link picked up a redirect and a trailing slash it
   * was never sent with. As dist/jenny.html the same request is served directly,
   * 200, at the URL the visitor actually has.
   */
  const out = route === "/" ? join(dist, "index.html") : join(dist, `${route.slice(1)}.html`)
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, html)
  console.log("prerendered", route, "→", out.replace(root + "/", ""))
}
