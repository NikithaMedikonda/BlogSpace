import test from 'node:test'
import assert from 'node:assert/strict'
import { fetchActivity, ApiError } from './services/api.js'

test('activity request includes credentials and pagination', async () => {
  const original = globalThis.fetch
  try {
    globalThis.fetch = async (url, options) => {
      assert.equal(url, '/api/activity?offset=20&limit=10')
      assert.equal(options.credentials, 'include')
      return { ok: true, json: async () => ({ activity: [], hasMore: false }) }
    }
    assert.deepEqual(await fetchActivity(20, 10), { activity: [], hasMore: false })
  } finally { globalThis.fetch = original }
})

test('activity request exposes errors for retry', async () => {
  const original = globalThis.fetch
  try {
    globalThis.fetch = async () => ({ ok: false, status: 500, json: async () => ({ error: 'Unavailable' }) })
    await assert.rejects(fetchActivity(), (error) => error instanceof ApiError && error.message === 'Unavailable' && error.status === 500)
  } finally { globalThis.fetch = original }
})
