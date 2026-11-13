import test from 'node:test'
import assert from 'node:assert/strict'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'

test('the comments section displays Suggestions', async () => {
  const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
  try {
    const { default: Comments } = await vite.ssrLoadModule('/src/components/Comments.jsx')
    const { AuthProvider } = await vite.ssrLoadModule('/src/context/AuthContext.jsx')
    const html = renderToStaticMarkup(
      createElement(MemoryRouter, null,
        createElement(AuthProvider, null, createElement(Comments, { postId: 1 }))),
    )
    assert.match(html, /<section[^>]*aria-label="Suggestions"/)
    assert.match(html, /<h2[^>]*>Suggestions<\/h2>/)
    assert.doesNotMatch(html, />Comments(?:\s|<)/)
  } finally {
    await vite.close()
  }
})
