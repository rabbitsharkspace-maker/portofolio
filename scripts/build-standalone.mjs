/*
 * Folds dist/ into one HTML file that runs off the filesystem — CSS and JS
 * inlined, every image swapped for a data URI. For sending the site to someone
 * who should just be able to double-click it.
 *
 *   npm run build:standalone
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs"
import { join, extname } from "node:path"

const root = new URL("..", import.meta.url).pathname
const dist = join(root, "dist")
const publicIp = join(root, "public", "ip")

const MIME = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
}

function dataUri(file) {
  const ext = extname(file).toLowerCase()
  const buf = readFileSync(file)
  if (ext === ".svg") return `data:image/svg+xml;base64,${buf.toString("base64")}`
  return `data:${MIME[ext]};base64,${buf.toString("base64")}`
}

let html = readFileSync(join(dist, "index.html"), "utf8")

const assets = readdirSync(join(dist, "assets"))
const jsFile = assets.find((f) => f.endsWith(".js"))
const cssFile = assets.find((f) => f.endsWith(".css"))

let js = readFileSync(join(dist, "assets", jsFile), "utf8")
let css = cssFile ? readFileSync(join(dist, "assets", cssFile), "utf8") : ""

// Runtime image paths are plain strings in the bundle, so Vite never rewrites
// them — swap each one for its data URI by hand.
let inlined = 0
for (const name of readdirSync(publicIp)) {
  const uri = dataUri(join(publicIp, name))
  const before = js
  js = js.split(`/ip/${name}`).join(uri)
  css = css.split(`/ip/${name}`).join(uri)
  if (js !== before) inlined++
}
// Replace the whole icon tag rather than the path inside it — with `--base ./`
// the href is "./favicon.svg", so a path-only swap leaves a stray dot behind.
const icon = dataUri(join(publicIp, "rocket.png"))
html = html.replace(
  /<link[^>]*rel="icon"[^>]*>/g,
  () => `<link rel="icon" type="image/png" href="${icon}">`
)

// A literal </script> anywhere in the bundle would close the tag early.
const safeJs = js.replaceAll("</script", "<\\/script")

// Replacement *functions*, not strings: in a string replacement `$&`, "$'" and
// a dollar-backtick are directives, and a minified React bundle contains all of
// them — passing it as a string splices the surrounding HTML back in and the
// file balloons to several megabytes.
html = html
  .replace(/<script[^>]*src="[^"]*"[^>]*><\/script>/g, () => `<script type="module">${safeJs}</script>`)
  .replace(/<link[^>]*rel="stylesheet"[^>]*>/g, () => `<style>${css}</style>`)
  .replace(/<link[^>]*rel="modulepreload"[^>]*>/g, () => "")

const out = join(root, "rabbitshark-preview.html")
writeFileSync(out, html)

const kb = (Buffer.byteLength(html) / 1024).toFixed(0)
console.log(`wrote rabbitshark-preview.html — ${kb} KB, ${inlined} images inlined`)
