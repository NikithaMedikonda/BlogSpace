import test from 'node:test'
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'

test('home footer displays Contact as plain text without a link', async () => {
  const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
  try {
    const { default: App } = await vite.ssrLoadModule('/src/App.jsx')
    const { AuthProvider } = await vite.ssrLoadModule('/src/context/AuthContext.jsx')
    const html = renderToStaticMarkup(
      React.createElement(MemoryRouter, { initialEntries: ['/'] },
        React.createElement(AuthProvider, null, React.createElement(App))),
    )
    const footer = html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/)?.[1]
    assert.ok(footer, 'home page should render a footer')
    assert.match(footer, /© .*BlogSpace/)
    assert.match(footer, /<p class="mt-2 text-base font-semibold text-ink">Contact<\/p>/)
    assert.doesNotMatch(footer, /<a\b|<button\b|\bhidden\b|aria-hidden/i)
  } finally {
    await vite.close()
  }
})
