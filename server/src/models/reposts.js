import { query } from '../config/db.js'

export async function addRepost(userId, postId) {
  await query('INSERT INTO reposts (user_id, post_id) VALUES ($1, $2) ON CONFLICT (user_id, post_id) DO NOTHING', [userId, postId])
}

export async function removeRepost(userId, postId) {
  await query('DELETE FROM reposts WHERE user_id = $1 AND post_id = $2', [userId, postId])
}

export async function countReposts(postId) {
  const { rows } = await query('SELECT COUNT(*)::int AS count FROM reposts WHERE post_id = $1', [postId])
  return rows[0].count
}
