import pg from 'pg'
import 'dotenv/config'

const config = {
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
}

// Resolve credentials the same way as pg, including PGPASSWORD and URL encoding.
const { password } = new pg.Client(config).connectionParameters
if (!password && process.env.PG_ALLOW_PASSWORDLESS !== 'true') {
  throw new Error('PostgreSQL password missing: set it in DATABASE_URL or PGPASSWORD (see README.md). For passwordless authentication, set PG_ALLOW_PASSWORDLESS=true.')
}

export const pool = new pg.Pool(config)

pool.on('error', (err) => console.error('Unexpected idle PG client error:', err))

// Always pass user input via `params` ($1, $2, ...) — never string-concatenate SQL.
export const query = (text, params = []) => pool.query(text, params)

export async function checkConnection() {
  await pool.query('SELECT 1')
  return true
}
