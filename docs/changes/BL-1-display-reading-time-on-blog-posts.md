# BL-1: Display reading time on blog posts

## Summary
Show dynamic reading time on posts

## What changed
- Added a shared reading-time calculation based on 200 words per minute, rounded up with a one-minute minimum.
- Displayed the shared `N min read` label in post card metadata and immediately below the individual post title.
- Added client unit tests and documented the feature and test command.

## Decisions
Count whitespace-separated content tokens as words. The client computes reading time directly from each post's current `content` on render rather than persisting derived data, so updated content is reflected automatically and both views use exactly the same calculation. Kept the indicator in existing metadata/title spacing and used muted, readable text to avoid disturbing layout.

## How each criterion is met
- **Every post card shows `N min read`:** `PostCard` renders `formatReadingTime(post.content)`; the shared formatter is verified by `reading time label is consistently formatted and recalculates for changed content` in `client/src/utils.test.js`.
- **Post detail shows the same value below the title:** `PostDetail` uses the same formatter directly below its title; the shared formatter test verifies the consistent output.
- **200 words per minute, dynamic count, and rounding up:** `reading time rounds up at 200 words per minute and has a one-minute minimum` checks below/at/above the 200-word boundary and multiple increments. Calling the helper with changed content is covered by `reading time label is consistently formatted and recalculates for changed content`.
- **Fewer than 200 words show one minute:** Covered for empty and short content, plus 199 words, by `reading time rounds up at 200 words per minute and has a one-minute minimum`.
- **Updates when content changes:** Both components calculate from `post.content` at render time (rather than cached or stored values); changed values passed to the shared helper are checked by `reading time label is consistently formatted and recalculates for changed content`.
- **Consistency across cards and detail pages:** Both render the same shared `formatReadingTime` function; verified by `reading time label is consistently formatted and recalculates for changed content` and production build.
- **Visible without disrupting layout:** Added a small muted metadata label in existing metadata/title whitespace; verify visually using the steps below. `npm --prefix client run build` validates both views compile.

## How to verify
1. Run `npm --prefix client run dev` and open the app.
2. Check the reading-time label in a post card and in that post's detail view below its title; both should match.
3. Create posts with fewer than 200 words and with over 200 words to observe the one-minute minimum and rounded-up estimate. Edit content and reload/list the post to see the estimate change.
4. Run `npm --prefix client test`, `npm --prefix client run lint`, and `npm --prefix client run build`.

## Tests
- Added `reading time rounds up at 200 words per minute and has a one-minute minimum` and `reading time label is consistently formatted and recalculates for changed content` in `client/src/utils.test.js`.
- `npm --prefix client test` — passed, 2 tests.
- `npm --prefix client run lint` — passed with four existing warnings in `Layout.jsx`, `AuthContext.jsx`, `Home.jsx`, and `PostDetail.jsx`.
- `npm --prefix client run build` — passed.
- `npm --prefix server test` — 8 passed, 4 failed due to the local database schema missing existing `password_hash`, `username`, and `likes` fields/tables; unrelated to this client-only change.
- Typecheck — no typecheck script is configured; the client is JavaScript-based.

## Docs updated
- Updated the root `README.md` with the calculation behavior and client test command.
- Added this change note.

## Open questions
- None.
