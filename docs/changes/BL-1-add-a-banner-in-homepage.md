# BL-1: Add a banner in homepage

## Summary
Update homepage banner text

## What changed
- Kept the responsive, labelled homepage banner above the heading and changed its text to “Repeat. Blog. Read.”
- Kept the existing site-wide welcome banner unchanged.

## Decisions
- Put the new banner in `Home` rather than the shared layout so it is specific to the homepage. Used existing theme colors and typography.
- The human's requested wording supersedes the original “Blog. Read. Repeat” criterion.

## How each criterion is met
- **Users see a banner:** `homepage renders a banner with Repeat. Blog. Read.` renders the `/` route and checks for a labelled banner.
- **Banner text:** the same test checks the exact revised wording “Repeat. Blog. Read.” inside that banner, as requested by the human.

## How to verify
1. Run `npm --prefix client run dev` and open the homepage.
2. Confirm the banner above the heading reads “Repeat. Blog. Read.”, including on a narrow viewport.
3. Run `npm --prefix client test`.

## Tests
- Updated the existing Node test rendering the homepage route with React server rendering and Vite's module loader to check the revised text. `cd client && npm test` passed (5 tests); the previous version passed twice (5 tests each).
- `cd client && npm run lint` passed with four existing warnings in Layout, Home, AuthContext and PostDetail (also passed twice in the earlier attempt).
- `cd client && npm run build` passed.
- `cd server && npm test` failed (0 passed, 12 failures): the required API and PostgreSQL were not running, with connections refused on ports 5001 and 5432.
- Root `npm test` and `npm run typecheck` were unavailable because there is no root package.json.
- Client and server `npm run typecheck` are unavailable; neither package defines that script. Server `npm run lint` is also unavailable.

## Docs updated
- Updated `README.md` to describe the homepage banner and client tests.
- Updated this change note with the requested wording and verification results.

## Open questions
- None.
