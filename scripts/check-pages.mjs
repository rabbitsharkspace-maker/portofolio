import { createServer } from 'vite'
import { existsSync } from 'node:fs'
import assert from 'node:assert/strict'

// Render every route and locale without a browser or a listening server.
const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' })
try {
  const React = await import('react')
  const { renderToStaticMarkup } = await import('react-dom/server')
  const { MemoryRouter, Routes, Route } = await import('react-router-dom')
  const { LangProvider } = await server.ssrLoadModule('/src/lang.jsx')
  const { default: Home } = await server.ssrLoadModule('/src/routes/Home.jsx')
  const { default: Person } = await server.ssrLoadModule('/src/routes/Person.jsx')
  const { default: Nav } = await server.ssrLoadModule('/src/components/PillNav.jsx')
  const h = React.createElement
  for (const lang of ['en', 'zh']) {
    globalThis.localStorage = { getItem: () => lang }
    for (const route of ['/', '/jane', '/jenny']) {
      const html = renderToStaticMarkup(h(LangProvider, null, h(MemoryRouter, { initialEntries: [route] }, h(Nav), h('main', { id: 'main-content' }, h(Routes, null, h(Route, { path: '/', element: h(Home) }), h(Route, { path: '/:who', element: h(Person) }))))))
      assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: one page title`)
      assert(!html.includes('<iframe'), 'No embedded live apps')
      assert(!html.includes('undefined'), 'No missing copy')
      const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1])
      assert.equal(new Set(ids).size, ids.length, 'Unique ids')
      for (const match of html.matchAll(/href="#([^"]+)"/g)) assert(ids.includes(match[1]), `Missing anchor ${match[1]}`)
      for (const match of html.matchAll(/src="(\/ip\/[^"]+)"/g)) assert(existsSync(`public${match[1]}`), `Missing asset ${match[1]}`)
      for (const match of html.matchAll(/aria-controls="([^"]+)"/g)) assert(ids.includes(match[1]), 'Tab panel exists')
      const solo = route === '/jane' ? 'fastresume' : route === '/jenny' ? 'serene' : null
      if (solo) assert(html.indexOf(`id="case-${solo}"`) < html.indexOf('id="case-mkr"'), 'Independent work first')
      console.log(`PASS ${route} (${lang}): rendered, assets, anchors, tab panels, ownership order`)
    }
  }
} finally { await server.close() }
