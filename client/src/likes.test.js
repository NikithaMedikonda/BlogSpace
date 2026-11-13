import test from 'node:test'
import assert from 'node:assert/strict'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'
import react from '@vitejs/plugin-react'

// Render the actual components with a controllable authentication state.
const vite = await createServer({
  configFile: false,
  server: { middlewareMode: true },
  appType: 'custom',
  plugins: [
    {
      name: 'test-auth',
      enforce: 'pre',
      resolveId(source) {
        if (source === '../context/AuthContext') return '\0test-auth'
      },
      load(id) {
        if (id === '\0test-auth') return 'export const useAuth = () => ({ user: globalThis.testUser })'
      },
    },
    react(),
  ],
})
test.after(() => vite.close())

const { default: LikeButton } = await vite.ssrLoadModule('/src/components/LikeButton.jsx')
const { default: PostCard } = await vite.ssrLoadModule('/src/components/PostCard.jsx')
const render = (component) => renderToStaticMarkup(createElement(MemoryRouter, null, component))

test('post cards show a red heart next to the like count', () => {
  const html = render(createElement(PostCard, { post: {
    id: 1, author_name: 'Author', title: 'Story', content: 'Text',
    created_at: '2024-01-01', like_count: 2, comment_count: 0,
  } }))
  assert.match(html, /aria-label="2 likes"><span class="text-red-600">♥<\/span> 2/)
})

test('post detail hearts are red for guests and both like states', () => {
  const button = (liked) => render(createElement(LikeButton, { postId: 1, liked, count: 1, onChange: () => {} }))
  globalThis.testUser = null
  assert.match(button(false), /<span class="text-red-600">♡<\/span> 1 like.*Sign in to like/)
  globalThis.testUser = { id: 1 }
  assert.match(button(false), /aria-pressed="false".*<span class="text-red-600">♡<\/span> Like · 1 like/)
  assert.match(button(true), /aria-pressed="true".*<span class="text-red-400">♥<\/span> Liked · 1 like/)
  delete globalThis.testUser
})
