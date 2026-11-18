import test from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'

function loadConfig(env) {
  return spawnSync(process.execPath, ['--input-type=module', '-e', `
    import { pool } from './src/config/db.js'
    import pg from 'pg'
    const client = new pg.Client(pool.options)
    console.log(JSON.stringify({ password: client.connectionParameters.password }))
    await pool.end()
  `], {
    cwd: new URL('..', import.meta.url),
    env: { ...process.env, DATABASE_URL: '', PGPASSWORD: '', PG_ALLOW_PASSWORDLESS: '', ...env },
    encoding: 'utf8',
  })
}

test('database URL supplies a decoded string password to pg', () => {
  const result = loadConfig({ DATABASE_URL: 'postgresql://blog:pa%40ss%3Aword@localhost/blogspace' })
  assert.equal(result.status, 0, result.stderr)
  assert.equal(JSON.parse(result.stdout).password, 'pa@ss:word')
})

test('PGPASSWORD supplies the password when the URL omits it', () => {
  const result = loadConfig({ DATABASE_URL: 'postgresql://blog@localhost/blogspace', PGPASSWORD: 'secret' })
  assert.equal(result.status, 0, result.stderr)
  assert.equal(JSON.parse(result.stdout).password, 'secret')
})

test('missing password fails early with actionable guidance', () => {
  for (const DATABASE_URL of ['', 'postgresql://blog@localhost/blogspace']) {
    const result = loadConfig({ DATABASE_URL })
    assert.notEqual(result.status, 0)
    assert.match(result.stderr, /PostgreSQL password missing: set it in DATABASE_URL or PGPASSWORD/)
    assert.doesNotMatch(result.stderr, /SCRAM-SERVER-FIRST-MESSAGE/)
  }
})

test('passwordless authentication can be explicitly enabled', () => {
  const result = loadConfig({ DATABASE_URL: 'postgresql://blog@localhost/blogspace', PG_ALLOW_PASSWORDLESS: 'true' })
  assert.equal(result.status, 0, result.stderr)
  assert.equal(JSON.parse(result.stdout).password, null)
})
