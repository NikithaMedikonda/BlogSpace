import test from 'node:test'
import assert from 'node:assert/strict'
import React, { act, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createRoot } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import { JSDOM } from 'jsdom'
import { createServer } from 'vite'
import react from '@vitejs/plugin-react'

const server = await createServer({
  configFile: false, server: { middlewareMode: true, ws: false },
  plugins: [{
    name: 'test-auth', enforce: 'pre',
    resolveId(source) { if (source === '../context/AuthContext') return '\0test-repost-auth' },
    load(id) { if (id === '\0test-repost-auth') return 'export const useAuth = () => ({ user: globalThis.testRepostUser })' },
  }, react()],
})
test.after(async () => { await server.close() })
const { default: PostCard } = await server.ssrLoadModule('/src/components/PostCard.jsx')
const { default: RepostButton } = await server.ssrLoadModule('/src/components/RepostButton.jsx')
const render = (element) => renderToStaticMarkup(React.createElement(MemoryRouter, null, element))

test('post card and repost control display an accessible repost icon', () => {
  globalThis.testRepostUser = null
  const post = { id: 1, author_name: 'Alice', title: 'Story', content: 'Content', created_at: '2025-01-01', like_count: 3, comment_count: 0, repost_count: 2 }
  assert.match(render(React.createElement(PostCard, { post })), /<span aria-hidden="true">🔁<\/span> 2 reposts/)
  globalThis.testRepostUser = { id: 1 }
  for (const reposted of [true, false]) {
    const html = render(React.createElement(RepostButton, { postId: 1, reposted, count: 2 }))
    assert.match(html, new RegExp(`aria-pressed="${reposted}"`))
    assert.match(html, /🔁/)
  }
})

test('repost and undo use server response, guard pending and show errors', async () => {
  const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/' })
  globalThis.window = dom.window; globalThis.document = dom.window.document; globalThis.IS_REACT_ACT_ENVIRONMENT = true
  globalThis.testRepostUser = { id: 1 }
  let calls = [], resolveRequest
  globalThis.fetch = (url, options) => { calls.push([url, options.method]); return new Promise((resolve) => { resolveRequest = resolve }) }
  function Wrapper() {
    const [state, setState] = useState({ reposted: false, repost_count: 0 })
    return React.createElement(RepostButton, { postId: 1, reposted: state.reposted, count: state.repost_count, onChange: setState })
  }
  const root = createRoot(document.getElementById('root'))
  await act(async () => root.render(React.createElement(MemoryRouter, null, React.createElement(Wrapper))))
  const button = () => document.querySelector('button')
  await act(async () => { button().click(); button().click() })
  assert.equal(calls.length, 1); assert.equal(button().disabled, true)
  await act(async () => resolveRequest({ ok: true, json: async () => ({ reposted: true, repost_count: 4 }) }))
  assert.match(button().textContent, /Undo repost · 4 reposts/)
  await act(async () => button().click())
  assert.deepEqual(calls, [['/api/posts/1/repost', 'POST'], ['/api/posts/1/repost', 'DELETE']])
  await act(async () => resolveRequest({ ok: false, status: 500, json: async () => ({ error: 'Try again' }) }))
  assert.match(document.querySelector('[role=alert]').textContent, /Try again/)
  assert.equal(button().getAttribute('aria-pressed'), 'true')
  await act(async () => button().click())
  await act(async () => resolveRequest({ ok: true, json: async () => ({ reposted: false, repost_count: 3 }) }))
  assert.match(button().textContent, /Repost · 3 reposts/)
  await act(async () => root.unmount())
  dom.window.close(); delete globalThis.window; delete globalThis.document; delete globalThis.fetch
})
