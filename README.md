# BlogSpace

Full-stack blogging app with a welcome banner across its pages.

## Tech stack
- **Frontend:** React and React Router, built with Vite and styled with Tailwind CSS.
- **Backend:** Node.js and Express provide the API; JWT and bcrypt handle authentication and password hashing.
- **Database:** PostgreSQL, accessed from the server with node-postgres (`pg`).
- **Testing and linting:** Node.js test runner and Oxlint (client).

## Setup
1. `createdb blogspace`
2. `cd server && cp .env.example .env` — set `DATABASE_URL` and a random `JWT_SECRET` (32+ chars), then `npm install && npm run db:setup && npm run dev`
3. `cd client && npm install && npm run dev`

The API runs on port 5001. Vite proxies `/api` to it.
Set `CLIENT_ORIGIN` in `server/.env` to the Vite URL.

Reading time is calculated from each post's full content at 200 words per minute, rounded up with a one-minute minimum. It is shown on post cards and below the title on each post page. The comment section on a post is titled “Suggestions”.

Like hearts are red on post cards and post pages, for signed-in and signed-out visitors.

Tests: `cd client && npm test` (client unit and component tests); `cd server && npm test` (API, requires the API and database to be running).
