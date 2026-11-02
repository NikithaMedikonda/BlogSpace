import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import assert from 'node:assert/strict'

const source = await readFile(new URL('../src/pages/PostDetail.jsx', import.meta.url), 'utf8')

test('post detail places a single All stories link below the stories heading and description', () => {
  const header = source.match(/<header[^>]*>([\s\S]*?)<\/header>/)?.[1]

  assert.ok(header, 'post detail has a stories section header')
  const headingIndex = header.indexOf('Stories worth sharing')
  const descriptionIndex = header.indexOf('Read what the community is writing — or write your own.')
  const linkIndex = header.indexOf('← All stories')

  assert.ok(headingIndex >= 0, 'stories heading is present')
  assert.ok(descriptionIndex > headingIndex, 'description follows the heading')
  assert.ok(linkIndex > descriptionIndex, 'navigation follows the description')
  assert.match(header, /<div className="pt-4">\s*<Link to="\/"[^>]*>← All stories<\/Link>\s*<\/div>/, 'navigation is on its own line with padding above')
  assert.equal((source.match(/← All stories/g) || []).length, 1, 'navigation is not duplicated at the bottom')
})

test('post detail retains the story content', () => {
  assert.match(source, /<div className="mt-8 whitespace-pre-wrap break-words font-serif text-xl leading-\[1\.8\]">\{post\.content\}<\/div>/)
})
