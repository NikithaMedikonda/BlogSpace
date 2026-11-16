CREATE TABLE IF NOT EXISTS categories (
  name VARCHAR(50) PRIMARY KEY CHECK (length(trim(name)) > 0)
);
INSERT INTO categories (name) SELECT DISTINCT category FROM posts ON CONFLICT DO NOTHING;
