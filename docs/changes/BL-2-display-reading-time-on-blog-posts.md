# Display reading time on blog posts

## Summary
Show dynamic reading-time estimates on blog posts

## What changed
- Added a shared reading-time formatter that counts whitespace-separated words, assumes 200 words per minute, rounds up, and enforces a one-minute minimum.
- Displayed the estimate in post-card metadata and immediately below each individual post title.
- Added client-side Node test coverage and documented the feature and test command in the root README.

## Decisions
- Calculate from the current `post.content` at render time instead of storing a value. This keeps cards and detail pages consistent and ensures edits or updated content immediately affect the estimate.
- Treat empty or whitespace-only content as one minute, matching the minimum reading-time requirement.
- Use Node's built-in test runner because the client has no existing UI test framework; did not add a frontend dependency.

## How each criterion is met
- Each post card displays `N min read`: `PostCard reading-time display` (manual browser verification); output formatting comes from `getReadingTime rounds up at 200 words per minute with a one-minute minimum`.
- The same estimate is below the individual post title: `PostDetail reading-time display` (manual browser verification); both components use the shared formatter.
- The estimate uses an average speed of 200 words per minute: `getReadingTime rounds up at 200 words per minute with a one-minute minimum`.
- Reading time is dynamically based on post word count, rounds up, and stays at one minute for content below 200 words: `getReadingTime rounds up at 200 words per minute with a one-minute minimum`.
- Content updates refresh the estimate: `getReadingTime counts current content using whitespace-separated words` verifies recalculation after content changes; components derive it directly from the current content.
- Both views consistently show the same formatted value without interrupting layout: both are rendered with the shared formatter in unobtrusive metadata text; verify with `PostCard reading-time display` and `PostDetail reading-time display` (manual browser checks).
- Empty content has a defined minimum: `getReadingTime safely handles empty or whitespace-only content`.

## How to verify
1. Run `cd client && npm run dev` and open the homepage and a post detail page. Confirm each card and detail page display the same reading estimate, with the detail estimate below the title.
2. Confirm brief posts show `1 min read`; longer posts round up (for example 201 words displays `2 min read`).
3. Run `cd client && npm test` to test word-count boundaries, rounding, recalculation, and empty content.

## Tests
- Added `getReadingTime rounds up at 200 words per minute with a one-minute minimum` — passed.
- Added `getReadingTime counts current content using whitespace-separated words` — passed.
- Added `getReadingTime safely handles empty or whitespace-only content` — passed.
- `cd client && npm test` — passed, 3 tests.
- `cd client && npm run lint` — passed with four pre-existing warnings: `Home.jsx` (setState in effect), `Layout.jsx` (impure Date call), `PostDetail.jsx` (setState in effect), and `AuthContext.jsx` (component export). No warning concerns the reading-time changes.
- `cd client && npm run build` — passed.
- Typecheck — not available; the client is JavaScript and has no typecheck script or TypeScript configuration.
- `cd server && npm test` — 8 passed, 4 failed due to the existing database schema missing `password_hash`, `likes`, and `username`; unrelated to this client-only change.

## Docs updated
- Updated `README.md` with the reading-time behavior and client test command.
- Added this change note.

## Open questions
- None.
