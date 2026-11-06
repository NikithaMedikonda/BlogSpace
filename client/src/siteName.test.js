import test from 'node:test'
import assert from 'node:assert/strict'
import { HOME_TITLE, SITE_NAME } from './siteName.js'

test('the application name is BlogSpace', () => {
  assert.equal(SITE_NAME, 'BlogSpace')
})

test('the homepage title remains Stories that need to be heard', () => {
  assert.equal(HOME_TITLE, 'Stories that need to be heard')
})
