# Rename BlogSpace to BlogMake

## Summary
Rename BlogSpace to BlogMake

## What changed
- Updated the browser document title and description to BlogMake.
- Updated the navbar brand, footer, and login/signup branding to BlogMake.
- Updated the README product heading and branding description.
- Added a test for the document title.

## Decisions
- Updated all user-facing brand references so the name is consistent throughout the app; retained `blogspace` in database setup/configuration identifiers because they are internal technical names, not visible product branding.
- The earlier change note referenced by the ticket was not present in the checkout, so this note was created with the required details.

## How each criterion is met
- **Users should see updated title:** `document title uses the BlogMake brand` checks the HTML document title, and the navbar/login/signup/footer display BlogMake in the user interface.

## How to verify
- Run `cd client && npm test` and confirm the branding test passes.
- Run `cd client && npm run dev`, then verify the browser tab title and the visible navbar/footer and authentication-page branding read BlogMake.

## Tests
- Added `client/src/branding.test.js`: `document title uses the BlogMake brand` verifies the document title.
- `cd client && npm test`: passed, 4/4 tests.
- `cd client && npm run lint`: completed successfully with four existing warnings in `Home.jsx`, `Layout.jsx`, `AuthContext.jsx`, and `PostDetail.jsx`; no lint errors.
- `cd client && npm run build`: passed.
- `cd server && npm test`: 8 passed and 4 failed due to the configured database being incompatible with existing API tests (`password_hash`/`username` columns and the `likes` relation are missing). This is unrelated to the branding change.
- Typecheck: no typecheck script or TypeScript configuration is present.

## Docs updated
- `README.md` now identifies the app as BlogMake and documents the user-facing branding.
- This change note records the implementation and verification.

## Open questions
- None.
