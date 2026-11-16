# BlogSpace

Full-stack blogging app: React (Vite + Tailwind CSS) client, Express API, PostgreSQL. The app displays a welcome banner across its pages.

## Setup
1. `createdb blogspace`
2. `cd server && cp .env.example .env` — set `DATABASE_URL` and a random `JWT_SECRET` (32+ chars), then `npm install && npm run db:setup && npm run dev`
3. `cd client && npm install && npm run dev`

For an existing database, apply `psql "$DATABASE_URL" -f server/db/migrations/002_add_reposts.sql` before starting the updated API. The migration is safe to reapply. Fresh databases get the table through `db:setup`.

The API runs on port 5001. Vite proxies `/api` to it.
Set `CLIENT_ORIGIN` in `server/.env` to the Vite URL.

Reading time is calculated from each post's full content at 200 words per minute, rounded up with a one-minute minimum. It is shown on post cards and below the title on each post page. The comment section on a post is titled “Suggestions”.

Like hearts are red on post cards and post pages, for signed-in and signed-out visitors.

Reposts are counted actions, not copies or shares of a post. Signed-in users can repost once per post and undo it; visitors can see counts and sign in to repost. `POST` and `DELETE /api/posts/:id/repost` require authentication and return `{ reposted, repost_count }`; both are idempotent. Public post list and detail responses include `repost_count` and `reposted_by_me` (false for anonymous visitors).

Tests: `cd client && npm test` (client unit and component tests); `cd server && npm test` (API, requires the API and database to be running).
