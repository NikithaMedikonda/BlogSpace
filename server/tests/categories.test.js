import test from 'node:test'
import assert from 'node:assert/strict'
import { pool } from '../src/config/db.js'
import { create, getPosts, getPost } from '../src/controllers/posts.js'
import app from '../src/app.js'

function response() {
  return { statusCode: 200, status(n) { this.statusCode = n; return this }, json(body) { this.body = body; return this } }
}

test('posts require a category and return it on create, list and detail', async () => {
  const original = pool.query
  const calls = []
  pool.query = async (sql, params) => {
    calls.push({ sql, params })
    if (sql.includes('INSERT INTO posts')) return { rows: [{ id: '1' }] }
    return { rows: [{ id: '1', category: 'Science' }] }
  }
  const next = (e) => { throw e }
  try {
    for (const category of [undefined, ' ', 42, 'x'.repeat(51)]) {
      const res = response()
      await create({ body: { title: 'Title', content: 'A long story', category }, user: { id: 1 } }, res, next)
      assert.equal(res.statusCode, 400)
      assert.ok(res.body.errors.category)
    }
    assert.equal(calls.length, 0)
    const res = response()
    await create({ body: { title: 'Title', content: 'A long story', category: ' Science ' }, user: { id: 1 } }, res, next)
    assert.equal(res.statusCode, 201)
    assert.equal(res.body.post.category, 'Science')
    assert.deepEqual(calls[0].params, [1, 'Title', 'A long story', 'Science'])
    assert.match(calls[0].sql, /INSERT INTO categories/)
    assert.match(calls[0].sql, /ON CONFLICT/)
    assert.match(calls[1].sql, /p\.category/)
    const list = response(), detail = response()
    await getPosts({ query: {} }, list, next)
    await getPost({ params: { id: '1' } }, detail, next)
    assert.equal(list.body.posts[0].category, 'Science')
    assert.equal(detail.body.post.category, 'Science')
  } finally {
    pool.query = original
  }
})

test('new categories are saved with posts and listed; database errors are reported', async () => {
  const original = pool.query
  const names = new Set()
  pool.query = async (sql, params) => {
    if (sql.includes('INSERT INTO posts')) {
      names.add(params[3])
      return { rows: [{ id: '1' }] }
    }
    if (sql.startsWith('SELECT name FROM categories')) return { rows: [...names].map((name) => ({ name })) }
    return { rows: [{ id: '1', category: 'My new topic' }] }
  }
  const server = app.listen(0)
  try {
    const res = response()
    await create({ body: { title: 'Title', content: 'A long story', category: 'My new topic' }, user: { id: 1 } }, res, (e) => { throw e })
    assert.equal(res.statusCode, 201)
    const url = `http://localhost:${server.address().port}/api/categories`
    const listed = await fetch(url)
    assert.deepEqual((await listed.json()).categories, ['My new topic'])
    pool.query = async () => { throw new Error('database unavailable') }
    assert.equal((await fetch(url)).status, 500)
  } finally {
    await new Promise((resolve) => server.close(resolve))
    pool.query = original
  }
})
