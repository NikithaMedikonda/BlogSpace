-- Existing stories predate categories.
ALTER TABLE posts ADD COLUMN IF NOT EXISTS category VARCHAR(50);
UPDATE posts SET category = 'Uncategorized' WHERE category IS NULL OR trim(category) = '';
ALTER TABLE posts ALTER COLUMN category SET NOT NULL;
ALTER TABLE posts DROP CONSTRAINT IF EXISTS posts_category_nonempty;
ALTER TABLE posts ADD CONSTRAINT posts_category_nonempty CHECK (length(trim(category)) > 0);
