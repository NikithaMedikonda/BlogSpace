import test from 'node:test'
import assert from 'node:assert/strict'
import { getReadingTime } from './utils.js'

const words = (count) => Array(count).fill('word').join(' ')

test('getReadingTime rounds up at 200 words per minute with a one-minute minimum', () => {
  assert.equal(getReadingTime('word'), '1 min read')
  assert.equal(getReadingTime(words(199)), '1 min read')
  assert.equal(getReadingTime(words(200)), '1 min read')
  assert.equal(getReadingTime(words(201)), '2 min read')
  assert.equal(getReadingTime(words(400)), '2 min read')
  assert.equal(getReadingTime(words(401)), '3 min read')
})

test('getReadingTime counts current content using whitespace-separated words', () => {
  assert.equal(getReadingTime('  one\n two\tthree  '), '1 min read')
  let content = words(200)
  assert.equal(getReadingTime(content), '1 min read')
  content += ' added'
  assert.equal(getReadingTime(content), '2 min read')
})

test('getReadingTime safely handles empty or whitespace-only content', () => {
  assert.equal(getReadingTime(''), '1 min read')
  assert.equal(getReadingTime(' \n\t '), '1 min read')
})
