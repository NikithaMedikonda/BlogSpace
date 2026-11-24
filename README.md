# BlogSpace

Full-stack blogging app: React (Vite + Tailwind CSS) client, Express API, PostgreSQL. The app displays a welcome banner across its pages.

## Setup
1. `createdb blogspace`
2. `cd server && cp .env.example .env` — set `DATABASE_URL` to your PostgreSQL connection details and `JWT_SECRET` to a random string (32+ chars), then `npm install && npm run db:setup && npm run dev`
3. `cd client && npm install && npm run dev`

The API runs on port 5001. Vite proxies `/api` to it.
Set `CLIENT_ORIGIN` in `server/.env` to the Vite URL.

### PostgreSQL credentials

The example URL uses placeholder credentials, not a guaranteed local PostgreSQL account. Set `DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/blogspace` using a real PostgreSQL role and its password. Percent-encode special characters in the username and password (for example, `@` becomes `%40`); do not commit `.env`. Alternatively, omit the password from the URL and set `PGPASSWORD` in `server/.env` or the environment. Environment variables already set by the shell take precedence over `.env`; restart the server after changes.

If startup reports `PostgreSQL password missing`, supply those credentials before running the server or database setup. A wrong password still requires correcting the PostgreSQL role or credentials. For a PostgreSQL server deliberately configured for passwordless authentication (such as local peer or trust), set `PG_ALLOW_PASSWORDLESS=true` in `server/.env` instead; this does not bypass authentication on a server requiring a password.

The home page displays a **Hello from Factory** banner. Its **Start reading** button opens the story listing at `/posts`. The listing shows loading, empty, and retryable error states as appropriate.

Reading time is calculated from each post's full content at 200 words per minute, rounded up with a one-minute minimum. It is shown on post cards and below the title on each post page. The comment section on a post is titled “Suggestions”.

Like hearts are red on post cards and post pages, for signed-in and signed-out visitors.

Tests: `cd client && npm test` (client unit and component tests); `cd server && npm test` (database configuration tests and API integration tests, which require the API and database to be running). Run only the configuration tests with `cd server && node --test tests/db-config.test.js`.
