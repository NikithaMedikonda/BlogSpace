import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { listActivity } from '../models/activity.js'

const router = Router()
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const parse = (value, fallback, min, max) => {
      if (value === undefined) return fallback
      if (typeof value !== 'string' || !/^\d+$/.test(value)) return null
      const n = Number(value)
      return Number.isSafeInteger(n) && n >= min && n <= max ? n : null
    }
    const limit = parse(req.query.limit, 20, 1, 50)
    const offset = parse(req.query.offset, 0, 0, 1000000)
    if (limit === null || offset === null) return res.status(400).json({ error: 'Invalid pagination' })
    res.json(await listActivity(req.user.id, limit, offset))
  } catch (e) { next(e) }
})

export default router
