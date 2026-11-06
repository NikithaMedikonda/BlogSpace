import test from 'node:test'
import assert from 'node:assert/strict'
import { SITE_NAME } from './siteName.js'

test('the application name is BlogMake', () => {
  assert.equal(SITE_NAME, 'BlogMake')
})
