# BS-1: Update title

## Summary
Set the homepage title to BlogSpace

## What changed
- Added a dedicated `HOME_TITLE` value and used it for the homepage heading.
- Kept the existing `BlogMake` application name for shared navigation branding.
- Added a test for the homepage title.

## Decisions
The request specifies the homepage title, so the existing application name remains unchanged outside the homepage heading. This builds on the existing centralized site-name module and its test rather than replacing the prior branding implementation.

## How each criterion is met
- **Users should see a new title:** the homepage heading uses `HOME_TITLE`, whose value is BlogSpace. The `the homepage title is BlogSpace` test in `client/src/siteName.test.js` covers the title value; the production build checks the homepage compiles with the new heading.

## How to verify
1. Run `npm --prefix client run dev`.
2. Open the home page and confirm the main heading reads “BlogSpace”.
3. Confirm shared navigation still shows “BlogMake”.

## Tests
- `npm --prefix client test` — passed (4 tests, including `the homepage title is BlogSpace`).
- `npm --prefix client run build` — passed.
- `npm --prefix client run lint` — completed with four existing warnings in `Home.jsx`, `PostDetail.jsx`, `Layout.jsx`, and `AuthContext.jsx`; no errors.
- `npm --prefix server test` — 8 passed, 4 failed because the configured database schema is missing the `password_hash`, `likes`, and `username` columns/tables. These failures are unrelated to the client title change.
- Typecheck — not available; the client is JavaScript-based and has no typecheck script configured.

## Docs updated
- Added this change note. The README and other project docs do not describe the homepage heading, so no further documentation updates were needed.

## Open questions
- None.
