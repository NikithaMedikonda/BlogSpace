# BlogSpace

Full-stack blogging app: React (Vite + Tailwind CSS) client, Express API, PostgreSQL. The app displays a welcome banner across its pages.

## Setup
1. `createdb blogspace`
2. `cd server && cp .env.example .env` — set `DATABASE_URL` and a random `JWT_SECRET` (32+ chars), then `npm install && npm run db:setup && npm run dev`
3. `cd client && npm install && npm run dev`

The API runs on port 5001. Vite proxies `/api` to it.
Set `CLIENT_ORIGIN` in `server/.env` to the Vite URL.

Reading time is calculated from each post's full content at 200 words per minute, rounded up with a one-minute minimum. It is shown on post cards and below the title on each post page.

## Activity
Signed-in users can open Activity from the desktop or mobile menu. It shows their current posts, comments and likes, and others' comments and likes on their posts. Self-engagement appears once. This is a private current-state feed, not an audit log: deleting a post or comment or unliking removes the corresponding entries. Use Refresh to reload it; offset-based pages can shift if activity changes between requests.

`GET /api/activity` requires the normal authentication cookie or bearer token. It returns `{ activity, hasMore }`, newest first (ties sorted by type and event ID). Entries contain `type`, `event_id`, `created_at`, `actor_id`, `actor_name`, `post_id`, `post_title`, and `comment` (null except for comments). `limit` defaults to 20 and must be 1–50; `offset` defaults to 0 and must be 0–1000000. Invalid pagination returns 400. The authenticated user always determines the feed; no account credentials are returned.

For existing databases, run `cd server && node scripts/migrate.js` to apply migrations, including the Activity lookup index. New databases receive the index via `db:setup`.

Tests: `cd client && npm test`; `cd server && npm test` (API integration tests require a running API and PostgreSQL with the current schema).
