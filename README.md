# BlogSpace

Full-stack blogging app: React (Vite + Tailwind CSS) client, Express API, PostgreSQL. The app displays a welcome banner across its pages.

## Setup
1. `createdb blogspace`
2. `cd server && cp .env.example .env` — set `DATABASE_URL` and a random `JWT_SECRET` (32+ chars), then `npm install && npm run db:setup && npm run dev`
3. `cd client && npm install && npm run dev`

The API runs on port 5001. Vite proxies `/api` to it.
Set `CLIENT_ORIGIN` in `server/.env` to the Vite URL. For an existing database, run `cd server && npm run db:migrate` before starting the updated API. Existing posts are assigned `Uncategorized`.

Reading time is calculated from each post's full content at 200 words per minute, rounded up with a one-minute minimum. It is shown on post cards and below the title on each post page. The comment section on a post is titled “Suggestions”.

Like hearts are red on post cards and post pages, for signed-in and signed-out visitors.

Each post has one category, displayed on its card and detail page. Authors choose from suggested Technology, Science, Lifestyle, Travel and Arts categories or enter a new name (1–50 characters). New names are saved when the post is published and offered to future authors, even if the post is deleted; names are case-sensitive.

API: `POST /api/posts` requires a `category` string in addition to `title` and `content`; category is returned on created, listed and fetched posts. `GET /api/categories` returns `{ "categories": ["..."] }` with saved names (the client also provides the predefined suggestions).

Tests: `cd client && npm test` (client unit and component tests); `cd server && npm test` (API, requires the API and database to be running).
