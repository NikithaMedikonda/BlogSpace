# Introduce blog listing

## Summary
Move blog listing to a dedicated page

## What changed
- Replaced the home page list with a Start reading link styled as a button.
- Moved the existing post list, loading, empty and retryable error states to `/posts`.

## Decisions
- Used a React Router link for accessible navigation and the existing primary button styling. The listing retains the existing fetch and post card behavior.

## How each criterion is met
- Home shows Start reading: `home displays a start reading button` verifies the styled link and absence of the list loading state.
- The button opens the blog list: `start reading links to the stories listing route` verifies the destination resolves to the listing. A browser smoke test also clicked the link and confirmed a fetched post appears.

## How to verify
- Run `cd client && npm test`.
- Start the app as described in README, open `/`, click Start reading, and check that `/posts` displays the stories. Reload `/posts` to visit it directly.

## Tests
- Added `client/src/blogListing.test.js` for the home button and listing route. The first targeted run failed due to an extra React Router attribute in the test expectation; after correcting it, the targeted run passed (1 test), and the final targeted run passed (2 tests).
- `cd client && npm test`: passed (10 tests).
- Browser smoke test with mocked API: passed navigation, direct reload, populated listing, error/retry and empty state. The first run incorrectly expected one request under React Strict Mode and failed; the corrected run passed.
- `cd client && npm run lint`: passed with four existing warnings (the Home effect warning moved to Posts, plus Layout, AuthContext and PostDetail).
- `cd client && npm run build`: passed.
- `cd server && npm test`: failed (12 failures): API and PostgreSQL were not running; connections to ports 5001 and 5432 were refused.
- Client and server have no `typecheck` script; server has no `lint` script (attempted commands reported missing scripts).

## Docs updated
- `README.md`: documented the home button, listing route and listing states.

## Open questions
- None.
