// Route tests with a stubbed database; api.test.js exercises the real SQL on PostgreSQL.
import test from 'node:test'
import assert from 'node:assert/strict'
import app from '../src/app.js'
import { pool } from '../src/config/db.js'
import { signToken } from '../src/utils/token.js'

const original = pool.query
let calls = []
let fail = false
let server, base

test.before(async () => {
  pool.query = async (sql, params) => {
    calls.push({ sql, params })
    if (sql.includes('FROM users WHERE id')) return { rows: [{ id: '123', username: 'alice' }] }
    if (fail) throw new Error('database unavailable')
    return { rows: [{ type: 'post', event_id: '1' }, { type: 'like', event_id: '2' }] }
  }
  server = app.listen(0)
  await new Promise((resolve) => server.once('listening', resolve))
  base = `http://127.0.0.1:${server.address().port}/api/activity`
})
test.after(async () => {
  pool.query = original
  await new Promise((resolve) => server.close(resolve))
  await pool.end()
})

test('activity requires auth and validates pagination before querying', async () => {
  assert.equal((await fetch(base)).status, 401)
  assert.equal((await fetch(base, { headers: { Authorization: 'Bearer invalid' } })).status, 401)
  const headers = { Authorization: `Bearer ${signToken({ id: 123 })}` }
  for (const suffix of ['?limit=0', '?limit=51', '?offset=-1', '?offset=3x', '?limit=1&limit=2']) {
    calls = []
    assert.equal((await fetch(base + suffix, { headers })).status, 400)
    assert.equal(calls.length, 1)
  }
})

test('activity uses authenticated identity and requests one extra row for pagination', async () => {
  calls = []
  const headers = { Authorization: `Bearer ${signToken({ id: 123 })}` }
  const response = await fetch(base + '?user_id=999&limit=1&offset=2', { headers })
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { activity: [{ type: 'post', event_id: '1' }], hasMore: true })
  assert.deepEqual(calls[1].params, ['123', 2, 2])
})

test('activity returns a safe error on database failure', async () => {
  fail = true
  const response = await fetch(base, { headers: { Authorization: `Bearer ${signToken({ id: 123 })}` } })
  assert.equal(response.status, 500)
  assert.deepEqual(await response.json(), { error: 'Internal Server Error' })
  fail = false
})
