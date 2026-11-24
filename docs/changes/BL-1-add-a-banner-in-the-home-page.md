# BL-1: Add a banner in the home page

## Summary
Add Factory greeting banner to home page

## What changed
- Added a styled, labeled banner displaying “Hello from Factory” on the home page.

## Decisions
- Kept the existing site-wide welcome banner intact and placed the new greeting only on the home page.

## How each criterion is met
- **Users now a banner:** `home displays the Factory greeting banner` renders the home route and checks the labeled banner and its text; it also checks that the greeting is absent from the posts route.

## How to verify
1. Run `npm --prefix client run dev` and open the home page.
2. Confirm the “Hello from Factory” banner appears above the home page title.

## Tests
- Added `home displays the Factory greeting banner` in `client/src/blogListing.test.js`.
- `cd client && node --test src/blogListing.test.js` — 3 passed.
- `npm --prefix client test` — 11 passed.
- `npm --prefix server test` — 4 passed, 12 failed: API and PostgreSQL were not running (connections refused on ports 5001 and 5432). PostgreSQL binaries are not available in this environment.
- `npm --prefix client run build` — passed.
- `npm --prefix client run lint` — passed with four existing warnings in Layout, AuthContext, PostDetail and Posts.
- `npm --prefix server run lint` — unavailable; no lint script configured.
- `npm --prefix client run typecheck` and `npm --prefix server run typecheck` — unavailable; neither project has a typecheck script.

## Docs updated
- Updated `README.md` to describe the home page banner.
- Added this change note.

## Open questions
- None.
