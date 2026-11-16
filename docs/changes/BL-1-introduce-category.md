# Summary

Add categories to blog posts

## What changed

Posts require a category, show it on cards and detail pages, and offer predefined and previously created suggestions. Publishing with a new name saves it for future posts. Added a categories API and migrations.

## Decisions

Existing posts become `Uncategorized`. Names are trimmed, case-sensitive, and limited to 50 characters. A new category is saved atomically with its first post and remains after deletion. Predefined suggestions are client-side; the API lists saved names.

## How each criterion is met

1. Each blog has a category: `posts require a category and return it on create, list and detail`; `post card displays its category`; integration test `create post: validation + success` and `list + get posts (public), 404s`.
2. Predefined categories: `create form suggests predefined categories`.
3. Users can create new categories: `new categories are saved with posts and listed; database errors are reported`; integration test `custom categories persist and are suggested after their post is deleted`.

## How to verify

Set up PostgreSQL and the server as in README. On an existing database run `cd server && npm run db:migrate`, then start the API and client. Publish posts with a suggested and a new category; check the card, detail and subsequent create form. Run both test suites with the API and database running.

## Tests

- Added server controller/API tests with a mocked database, including validation, persistence query, listing and error response: `cd server && node --test tests/categories.test.js` passed (2 tests).
- Added live API tests for category validation, retrieval, creation and persistence after deletion. `cd server && npm test` failed: API and PostgreSQL unavailable (connection refused on ports 5001 and 5432); live integration and migrations remain unverified in this environment.
- `cd server && node scripts/migrate.js` failed because PostgreSQL was unavailable.
- Added client rendering tests for suggestions and card category. `cd client && npm test` passed (10 tests).
- `cd client && npm run lint` passed with four existing warnings; `npm run build` passed.
- Neither package defines a typecheck script; server has no lint script. `npm run typecheck --if-present` and server `npm run lint --if-present` exited successfully without running checks.
- `git diff --check` passed.

## Docs updated

README: migration, category behavior, and API contract.

## Open questions

None.
