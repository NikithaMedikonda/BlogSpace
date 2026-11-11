# BL-1: Add a banner in homepage

## Summary
Add homepage banner

## What changed
- Added a responsive, labelled banner with “Blog. Read. Repeat” above the homepage heading.
- Kept the existing site-wide welcome banner unchanged.

## Decisions
- Put the new banner in `Home` rather than the shared layout so it is specific to the homepage. Used existing theme colors and typography.

## How each criterion is met
- **Users see a banner:** `homepage renders a banner with Blog. Read. Repeat` renders the `/` route and checks for a labelled banner.
- **Banner contains “Blog. Read. Repeat”:** the same test checks the exact text inside that banner.

## How to verify
1. Run `npm --prefix client run dev` and open the homepage.
2. Confirm the banner above the heading reads “Blog. Read. Repeat”, including on a narrow viewport.
3. Run `npm --prefix client test`.

## Tests
- Added a Node test rendering the homepage route with React server rendering and Vite's module loader. `cd client && npm test` passed twice (5 tests each).
- `cd client && npm run lint` passed twice with four existing warnings in Layout, Home, AuthContext and PostDetail.
- `cd client && npm run build` passed.
- `cd server && npm test` failed (0 passed, 12 failures): the required API and PostgreSQL were not running, with connections refused on ports 5001 and 5432.
- Root `npm test` was unavailable because there is no root package.json.
- Client and server `npm run typecheck` are unavailable; neither package defines that script. Server `npm run lint` is also unavailable.

## Docs updated
- Updated `README.md` to describe the homepage banner and client tests.
- Added this change note.

## Open questions
- None.
