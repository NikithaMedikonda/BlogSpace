import test from 'node:test'
import assert from 'node:assert/strict'
import { HOME_TITLE, SITE_NAME } from './siteName.js'

test('the application name is BlogMake', () => {
  assert.equal(SITE_NAME, 'BlogMake')
})

test('the homepage title is BlogSpace', () => {
  assert.equal(HOME_TITLE, 'BlogSpace')
})
