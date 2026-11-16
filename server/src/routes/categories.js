import { Router } from 'express'
import { query } from '../config/db.js'

const router = Router()
router.get('/', async (_req, res, next) => {
  try {
    const { rows } = await query('SELECT name FROM categories ORDER BY name')
    res.json({ categories: rows.map((row) => row.name) })
  } catch (e) { next(e) }
})

export default router
