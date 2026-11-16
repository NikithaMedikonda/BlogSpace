import test from 'node:test'
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'
import react from '@vitejs/plugin-react'

const server = await createServer({ configFile: false, server: { middlewareMode: true, ws: false }, plugins: [{
  name: 'test-auth', enforce: 'pre',
  resolveId(source) { if (source === '../context/AuthContext') return '\0test-auth' },
  load(id) { if (id === '\0test-auth') return 'export const useAuth = () => ({ user: null })' },
}, react()] })
test.after(async () => { await server.close() })
const { default: CreatePost } = await server.ssrLoadModule('/src/pages/CreatePost.jsx')
const { default: PostCard } = await server.ssrLoadModule('/src/components/PostCard.jsx')

test('create form suggests predefined categories', () => {
  const html = renderToStaticMarkup(React.createElement(MemoryRouter, null, React.createElement(CreatePost)))
  assert.match(html, /list="category-suggestions"/)
  for (const name of ['Technology', 'Science', 'Lifestyle', 'Travel', 'Arts']) {
    assert.ok(html.includes(`value="${name}"`))
  }
  assert.match(html, /Choose a suggestion or enter a new category/)
})

test('post card displays its category', () => {
  const post = { id: 1, author_name: 'Alice', title: 'Story', content: 'Content', category: 'Travel', created_at: '2025-01-01', like_count: 0, comment_count: 0 }
  const html = renderToStaticMarkup(React.createElement(MemoryRouter, null, React.createElement(PostCard, { post })))
  assert.match(html, /<span>Travel<\/span>/)
})
