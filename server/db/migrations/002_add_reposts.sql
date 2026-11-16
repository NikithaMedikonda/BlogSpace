-- Reposts are unique per user and disappear with their user or post.
CREATE TABLE IF NOT EXISTS reposts (
  id         BIGSERIAL PRIMARY KEY,
  user_id    BIGINT      NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id    BIGINT      NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_reposts_user_post UNIQUE (user_id, post_id)
);
CREATE INDEX IF NOT EXISTS idx_reposts_post_id ON reposts(post_id);
