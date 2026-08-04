import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { SITE, metaFor } from "./data/meta"
import { useLang } from "./lang"

const set = (selector, attr, value) => {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement(selector.startsWith("link") ? "link" : "meta")
    const [, kind, key] = selector.match(/\[(.+?)="(.+?)"\]/) ?? []
    if (kind) el.setAttribute(kind, key)
    if (selector.startsWith("link")) el.setAttribute("rel", "canonical")
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

/*
 * Keeps the tab, and anything reading the live DOM, in step with where you are
 * and which language you are in. The build bakes the English version of all of
 * this into a file per route for the crawlers that never run scripts — this is
 * what updates when a visitor moves between the three pages without a reload,
 * or switches to Chinese.
 */
export default function useDocumentMeta() {
  const { pathname } = useLocation()
  const { lang } = useLang()

  useEffect(() => {
    const page = metaFor(pathname)
    const c = page[lang] ?? page.en
    const url = SITE + (pathname === "/" ? "" : pathname)

    document.title = c.title
    set('meta[name="description"]', "content", c.desc)
    set('meta[property="og:title"]', "content", c.title)
    set('meta[property="og:description"]', "content", c.desc)
    set('meta[property="og:url"]', "content", url)
    set('meta[property="og:image"]', "content", SITE + page.image)
    set('meta[name="twitter:title"]', "content", c.title)
    set('meta[name="twitter:description"]', "content", c.desc)
    set('meta[name="twitter:image"]', "content", SITE + page.image)
    set('link[rel="canonical"]', "href", url)
  }, [pathname, lang])
}
