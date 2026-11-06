# BL-4: Change the title

## Summary
Rename the homepage to BlogMake

## What changed
- Changed the homepage heading and shared navigation brand to BlogMake.
- Updated the document title, description, shared banner/footer, and authentication copy to use the new name consistently.
- Updated the README project heading.

## Decisions
Used the supplied name, BlogMake, as the site name throughout user-facing app branding instead of changing only one label. Kept the homepage's existing stories-oriented supporting copy. Centralized the app name in `client/src/siteName.js` so visible React branding stays consistent.

## How each criterion is met
- **Users should see a new name:** the homepage heading and navigation show BlogMake. The `the application name is BlogMake` test checks the shared name used by those components, and the production build verifies they compile.

## How to verify
1. Run `npm --prefix client run dev`.
2. Open the homepage and confirm its main heading and navigation brand read “BlogMake”.
3. Confirm the browser tab title reads “BlogMake”.

## Tests
- Added `client/src/siteName.test.js`; `npm --prefix client test` — passed (3 tests).
- `npm --prefix client run build` — passed.
- `npm --prefix client run lint` — completed with four existing warnings in `Home.jsx`, `PostDetail.jsx`, `Layout.jsx`, and `AuthContext.jsx`; no errors.
- `npm --prefix server test` — 8 passed, 4 failed due to existing database-schema mismatches (missing `password_hash`, `likes`, and `username`); unrelated to this client change.
- `npm --prefix client run typecheck` — unavailable; no typecheck script is configured and the client is JavaScript-based.

## Docs updated
- Updated the project name in `README.md`.
- Added this change note.

## Open questions
- None.
