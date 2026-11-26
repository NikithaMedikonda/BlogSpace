# Add a button in the home page

## Summary
Add Check button to home page

## What changed
- Added a Check button linking to the Hello message page.

## Decisions
- Reused the existing `/hello` route, shared layout, React Router link, and primary button styling; the existing Hello button remains available.

## How each criterion is met
- Users see a button: `home displays a Check button` checks its label, styling and destination.
- Users see a message: `Check links to the Hello message page` resolves the link through the app router and checks the Hello heading.

## How to verify
- Run `cd client && npm test`.
- Start the app as described in README, click **Check** on the home page, and confirm `/hello` displays Hello. Reload the page to check direct access.

## Tests
- Added the two tests above in `client/src/blogListing.test.js`; each targeted test passed individually.
- `cd client && npm test`: 15 passed. `npm run lint`: passed with four existing warnings in Layout, Posts, PostDetail, and AuthContext. `npm run build`: passed.
- PostgreSQL 18: `cd server && npm run db:setup` applied the schema; `npm test` against the running API and database: 15 passed.
- Neither project defines a typecheck script; the server has no lint script (`npm run` lists available scripts).

## Docs updated
- `README.md` describes the Check button and destination.

## Open questions
- None.
