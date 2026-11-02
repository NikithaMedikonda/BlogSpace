import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const stylesheet = readFileSync(new URL('./index.css', import.meta.url), 'utf8')

test('the page background uses a light blue color', () => {
  assert.match(stylesheet, /--color-home-background:\s*#eff6ff;/)
  assert.match(stylesheet, /body\s*\{\s*@apply bg-home-background\b/)
})
