## Summary
Add repost controls and counts

## What changed
- Added repost controls on cards and post pages, with sign-in, undo, pending and error states.
- Persisted one repost per user and post; exposed counts and viewer state on post reads and authenticated add/remove endpoints.
- Added an idempotent migration for existing databases.

## Decisions
A repost records an action and count; it does not create a new post. Users may undo and repost again. Deleted users and posts cascade to reposts.

## How each criterion is met
1. Users see a repost icon on cards and detail pages: `post card and repost control display an accessible repost icon`.
2. Signed-in users can repost and undo: `repost and undo use server response, guard pending and show errors` and `reposts: authentication, idempotent add and undo, viewer state`.
3. Repost counts persist and appear on reads and controls: `reposts: authentication, idempotent add and undo, viewer state` and `reposts cascade when a user is deleted`.

## How to verify
Apply the migration as described in README, start PostgreSQL and the API, and run `cd server && npm test`. Run `cd client && npm test`, `npm run build`, and `npm run lint`. Sign in and use the repost control on a card or post; reload, undo, and verify the count.

## Tests
- Added client rendering and interaction tests, including pending and error handling. `cd client && npm test`: 10 passed; `npm run build`: passed; `npm run lint`: passed with four existing warnings.
- Added API tests for authentication, invalid IDs, idempotency, two users, viewer state, counts, and user/post cascades. The normal `cd server && npm test` initially failed because no API or PostgreSQL was running. A temporary test harness started the Express app with PGlite (embedded PostgreSQL) in place of the unavailable database; `node --import /tmp/bl1-test/preload.mjs --test tests/api.test.js`: 13 passed. The harness applied fresh schema and migration; an additional PGlite check applied the migration twice to an existing schema and then reapplied the schema successfully. These temporary harness files are not part of the repository; the normal suite requires a live PostgreSQL server.
- Typecheck scripts are not defined in either package; server lint is also not defined.

## Docs updated
README: migration, behavior, and API contract.

## Open questions
None.
