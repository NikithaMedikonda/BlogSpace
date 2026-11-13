import { query } from '../config/db.js'

// Each engagement appears once even when the actor also owns the post.
export async function listActivity(userId, limit, offset) {
  const { rows } = await query(`
    SELECT * FROM (
      SELECT 'post' AS type, p.id AS event_id, p.created_at, u.id AS actor_id,
             u.username AS actor_name, p.id AS post_id, p.title AS post_title, NULL::text AS comment
      FROM posts p JOIN users u ON u.id = p.user_id
      WHERE p.user_id = $1
      UNION ALL
      SELECT 'comment', c.id, c.created_at, u.id, u.username, p.id, p.title, c.content
      FROM comments c JOIN posts p ON p.id = c.post_id JOIN users u ON u.id = c.user_id
      WHERE c.user_id = $1 OR p.user_id = $1
      UNION ALL
      SELECT 'like', l.id, l.created_at, u.id, u.username, p.id, p.title, NULL::text
      FROM likes l JOIN posts p ON p.id = l.post_id JOIN users u ON u.id = l.user_id
      WHERE l.user_id = $1 OR p.user_id = $1
    ) activity
    ORDER BY created_at DESC, type ASC, event_id DESC
    LIMIT $2 OFFSET $3`, [userId, limit + 1, offset])
  return { activity: rows.slice(0, limit), hasMore: rows.length > limit }
}
