import test from 'node:test'
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'
import react from '@vitejs/plugin-react'

const server = await createServer({
  configFile: false,
  server: { middlewareMode: true },
  plugins: [
    {
      name: 'test-auth',
      enforce: 'pre',
      resolveId(source) {
        if (source === '../context/AuthContext') return '\0test-auth'
      },
      load(id) {
        if (id === '\0test-auth') return 'export const useAuth = () => ({ user: globalThis.testLikeUser })'
      },
    },
    react(),
  ],
})
test.after(async () => { await server.close() })

const { default: LikeButton } = await server.ssrLoadModule('/src/components/LikeButton.jsx')
const { default: PostCard } = await server.ssrLoadModule('/src/components/PostCard.jsx')
const render = (element) => renderToStaticMarkup(React.createElement(MemoryRouter, null, element))

test('post card displays a red heart beside the like count', () => {
  const post = { id: 1, author_name: 'Alice', title: 'Story', content: 'Content', created_at: '2025-01-01', like_count: 3, comment_count: 0 }
  const html = render(React.createElement(PostCard, { post }))
  assert.match(html, /aria-label="3 likes"><span class="text-red-600" aria-hidden="true">♥<\/span> 3/)
})

test('post page displays a red heart for signed-out, unliked and liked states', () => {
  for (const { user, liked, heart, label } of [
    { user: null, liked: false, heart: '♡', label: 'Sign in to like' },
    { user: { id: 1 }, liked: false, heart: '♡', label: 'Like' },
    { user: { id: 1 }, liked: true, heart: '♥', label: 'Liked' },
  ]) {
    globalThis.testLikeUser = user
    const html = render(React.createElement(LikeButton, { postId: 1, liked, count: 3, onChange: () => {} }))
    assert.ok(html.includes(`<span class="text-red-600" aria-hidden="true">${heart}</span>`))
    assert.ok(html.includes(label))
    assert.ok(html.includes('3 likes'))
    if (user) assert.ok(html.includes(`aria-pressed="${liked}"`))
  }
})
