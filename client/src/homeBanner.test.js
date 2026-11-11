import test from 'node:test'
import assert from 'node:assert/strict'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'

test('homepage renders a banner with Blog. Read. Repeat', async () => {
  const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
  try {
    const { default: App } = await vite.ssrLoadModule('/src/App.jsx')
    const { AuthProvider } = await vite.ssrLoadModule('/src/context/AuthContext.jsx')
    const html = renderToStaticMarkup(
      createElement(MemoryRouter, { initialEntries: ['/'] },
        createElement(AuthProvider, null, createElement(App))),
    )

    assert.match(html, /<aside aria-label="Homepage banner"[^>]*><p[^>]*>Blog\. Read\. Repeat<\/p><\/aside>/)
  } finally {
    await vite.close()
  }
})
