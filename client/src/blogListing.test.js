import test from 'node:test'
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'
import react from '@vitejs/plugin-react'

const server = await createServer({
  configFile: false,
  server: { middlewareMode: true, ws: false },
  plugins: [
    {
      name: 'test-auth',
      enforce: 'pre',
      resolveId(source) {
        if (source === '../context/AuthContext') return '\0test-auth'
      },
      load(id) {
        if (id === '\0test-auth') return 'export const useAuth = () => ({ user: null })'
      },
    },
    react(),
  ],
})
test.after(async () => { await server.close() })

const { default: Home } = await server.ssrLoadModule('/src/pages/Home.jsx')
const { default: App } = await server.ssrLoadModule('/src/App.jsx')
const render = (element, path = '/') => renderToStaticMarkup(React.createElement(MemoryRouter, { initialEntries: [path] }, element))

test('home displays a start reading button', () => {
  const html = render(React.createElement(Home))
  assert.match(html, /<a class="[^"]*rounded-full[^"]*" href="\/posts"[^>]*>Start reading<\/a>/)
  assert.doesNotMatch(html, /aria-busy="true"/)
})

test('start reading links to the stories listing route', () => {
  const home = render(React.createElement(App))
  const destination = home.match(/href="([^"]+)"[^>]*>Start reading<\/a>/)?.[1]
  assert.equal(destination, '/posts')
  const listing = render(React.createElement(App), destination)
  assert.match(listing, />Stories<\/h1>/)
  assert.match(listing, /aria-busy="true"/)
  assert.doesNotMatch(listing, /Start reading<\/a>/)
})
