import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { HOME_TITLE, SITE_NAME } from './siteName.js'

test('the application name is BlogSpace', () => {
  assert.equal(SITE_NAME, 'BlogSpace')
})

test('the homepage title remains Stories that need to be heard', () => {
  assert.equal(HOME_TITLE, 'Stories that need to be heard')
})

test('the browser title invites users to share stories', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
  assert.match(html, /<title>BlogSpace \| Share your stories<\/title>/)
})
