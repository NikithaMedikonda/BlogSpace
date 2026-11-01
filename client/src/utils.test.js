import test from 'node:test'
import assert from 'node:assert/strict'
import { formatReadingTime, readingTimeMinutes } from './utils.js'

const words = (count) => Array.from({ length: count }, (_, index) => `word${index}`).join(' ')

test('reading time rounds up at 200 words per minute and has a one-minute minimum', () => {
  assert.equal(readingTimeMinutes(''), 1)
  assert.equal(readingTimeMinutes('  one   two\nthree  '), 1)
  assert.equal(readingTimeMinutes(words(199)), 1)
  assert.equal(readingTimeMinutes(words(200)), 1)
  assert.equal(readingTimeMinutes(words(201)), 2)
  assert.equal(readingTimeMinutes(words(400)), 2)
  assert.equal(readingTimeMinutes(words(401)), 3)
})

test('reading time label is consistently formatted and recalculates for changed content', () => {
  assert.equal(formatReadingTime(words(1)), '1 min read')
  assert.equal(formatReadingTime(words(201)), '2 min read')
  assert.equal(formatReadingTime(words(401)), '3 min read')
})
