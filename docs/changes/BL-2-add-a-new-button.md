# Add a new button

## Summary
Add Hello button and page

## What changed
- Added a Hello button on the home page and a new page at `/hello`.

## Decisions
- Used the existing React Router link and primary button styling for navigation. The new page uses the shared layout and a simple Hello heading.

## How each criterion is met
- Users see Hello: `home displays a Hello button` checks the styled home page link.
- The button navigates to a new page: `Hello links to the new page` checks its destination and that the route renders the Hello page.

## How to verify
- Run `cd client && npm test`.
- Start the client as described in README, open the home page, click Hello, and confirm `/hello` displays the Hello heading. Reload the page to check direct access.

## Tests
- Added the two tests above to `client/src/blogListing.test.js`. Both targeted runs passed (one test each); `cd client && npm test` passed (12 tests).
- `cd client && npm run lint` passed with four existing warnings in AuthContext, Layout, PostDetail and Posts. `cd client && npm run build` passed.
- `cd server && npm test`: 4 database configuration tests passed; the unchanged API suite failed because the API and PostgreSQL were not running (connection refused on ports 5001 and 5432). The failures were `health reports database connected`, `signup validation + success + hashed password`, `duplicate signup rejected (case-insensitive email)`, `login ok / wrong password / unknown user`, `protected routes reject anonymous and forged tokens`, `create post: validation + success`, `list + get posts (public), 404s`, `likes: add, idempotent, count, liked_by_me, unlike`, `comments: validation, create, list, counts, authz, delete`, `delete post: only owner; cascades likes/comments`, `logout clears cookie`, and the `api.test.js` teardown.
- Client and server have no `typecheck` script; server has no `lint` script (the attempted commands reported missing scripts).

## Docs updated
- `README.md` documents the Hello button and route.

## Open questions
- None.
