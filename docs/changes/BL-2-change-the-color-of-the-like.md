## Summary
Make like hearts red

## What changed
- Colored the heart on post cards and post detail like controls red, without changing the surrounding labels or like behavior.
- Added rendering tests for cards, guests, and both authenticated like states.

## Decisions
- Used the existing Tailwind red palette, with a lighter red on the dark liked button for visibility. Kept the existing filled and outlined heart shapes and button styling.

## How each criterion is met
- Users see red like hearts: `post cards show a red heart next to the like count` checks the card, and `post detail hearts are red for guests and both like states` checks all detail-page states.

## How to verify
- Run `cd client && npm test`.
- Open the home page and a post page; check the red hearts signed out and signed in, before and after liking a post.

## Tests
- Added `client/src/likes.test.js`, rendering the actual components with a mocked authentication state.
- `cd client && npm test`: passed (6 tests).
- `cd client && npm run lint`: passed with four existing warnings in Home, PostDetail, Layout and AuthContext.
- `cd client && npm run build`: passed.
- `cd server && npm test`: failed because no API or PostgreSQL server was listening on ports 5001 and 5432; all 11 tests and cleanup failed to connect. PostgreSQL tools are not installed in this environment.
- `npm test` at repository root: unavailable (no root package.json).
- `npm run typecheck` in client and server: unavailable (no typecheck scripts). `npm run lint` in server: unavailable (no lint script).

## Docs updated
- `README.md`: described red hearts and updated test descriptions.
- `.gitignore`: added common build, coverage, and cache outputs.

## Open questions
- None.
