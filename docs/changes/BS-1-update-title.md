# BS-1: Update title

## Summary
Update BlogSpace branding and preserve homepage title

## What changed
- Updated shared application branding from `BlogMake` to `BlogSpace`, including the navigation name, browser title, description metadata, and README heading.
- Set the homepage heading to “Stories that need to be heard” as requested.
- Updated the site-name tests to check both visible title values.

## Decisions
The human clarification requests a brand rename to BlogSpace while explicitly retaining “Stories that need to be heard” as the homepage title. The existing `SITE_NAME` and `HOME_TITLE` constants remain the shared source of truth for application and homepage titles. The browser tab and metadata also use the new application name for consistent branding.

## How each criterion is met
- **Users should see a new title:** the homepage displays “Stories that need to be heard” through `HOME_TITLE`; `the homepage title remains Stories that need to be heard` in `client/src/siteName.test.js` verifies the requested exact text. `the application name is BlogSpace` verifies the new application branding.

## How to verify
1. Run `npm --prefix client run dev`.
2. Open the homepage and confirm its heading reads “Stories that need to be heard”.
3. Confirm the navigation brand and browser tab title read “BlogSpace”.

## Tests
- `npm --prefix client test` — passed (4 tests, including both title checks).
- `npm --prefix client run build` — passed.
- `npm --prefix client run lint` — completed with four pre-existing warnings in `Home.jsx`, `PostDetail.jsx`, `Layout.jsx`, and `AuthContext.jsx`; no errors.
- `npm --prefix server test` — 8 passed, 4 failed because the configured database is missing the `password_hash` and `username` columns and `likes` table. These database schema failures are unrelated to the client branding change.
- Typecheck — unavailable; the client is JavaScript-based and has no typecheck script configured.
- Initial root-level `npm test`, `npm run build`, and `npm run lint` attempts could not run because the repository root has no `package.json`; reran using the client/server prefixes above.

## Docs updated
- Updated the README heading from BlogMake to BlogSpace.
- Updated this change note. Other project documentation does not document the app name or homepage heading.

## Open questions
- None.
