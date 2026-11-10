# Update the title and retain reading-time work

## Summary
Update the BlogSpace browser title

## What changed
- Changed the browser tab title from `BlogSpace` to `BlogSpace | Share your stories` in `client/index.html`.
- Earlier work retained on this branch:
- Added a shared reading-time utility that counts all whitespace-delimited words and calculates `ceil(wordCount / 200)`, with a one-minute minimum.
- Displayed the result in post-card metadata and below the post title on the individual post page. Both views derive it directly from the post's current content.
- Added client-side unit tests and documented the behavior and test command in the root README.

## Decisions
- The clarification leaves the choice to our judgment. We chose the browser title and added a concise invitation to share stories: it describes the app while retaining the BlogSpace brand and the homepage heading explicitly preserved by the earlier BS-1 change.
- Kept reading time derived in the client rather than storing it, so it always reflects the latest post content without a schema or API change.
- Used whitespace-delimited tokens as words; empty content resolves to the required one-minute minimum.
- Reused the existing muted metadata styling to keep the indicator visible without changing layout structure.

## How each criterion is met
- **Change the title:** the browser tab displays `BlogSpace | Share your stories`; `the browser title invites users to share stories` checks the HTML title in `client/src/siteName.test.js`.
- Earlier reading-time criteria:
- Each post card displays `N min read`: `PostCard` renders shared `getReadingTime(post.content)`; `reading time rounds up at 200 words per minute and has a one-minute minimum` covers minimum and formatting value logic.
- The individual page displays the same value below the title: `PostDetail` uses the same utility on the same full content field.
- 200 words/minute, rounding up, and minimum one minute: covered by `reading time rounds up at 200 words per minute and has a one-minute minimum`, including 199/200/201/400/401-word boundaries.
- Dynamic calculation from full content and updates after changes: both views calculate from `post.content` at render time; `reading time is recalculated from the current content` verifies changed content produces the updated value.
- Consistent display: both components use the same helper and format.
- Visible, non-disruptive layout: muted small text is placed inline with existing card metadata and directly below the post title.

## How to verify
- Run `cd client && npm run dev` and check the browser tab says `BlogSpace | Share your stories`; the homepage heading remains unchanged.
- Run `cd client && npm test`.
- Run the app and inspect any post card and its individual post page; the same reading-time label should appear on both.
- Edit the post body and reload the views; the displayed time is calculated from the updated content.

## Tests
- Added `the browser title invites users to share stories` to `client/src/siteName.test.js`.
- Current run: `cd client && npm test` passed (5 tests); `npm run build` passed; `npm run lint` passed with the same four pre-existing warnings listed below.
- Current run: `cd server && npm test` initially failed and timed out with no running API/database. Retried against a temporary PostgreSQL database with the schema and migration applied and a live API: 11 passed.
- No typecheck script is configured in either package; the server also has no lint script.
- A root `npm ci` attempt failed because the root has no package lock; `npm ci` succeeded separately in client and server.
- Earlier reading-time work: added `client/src/utils.test.js` with boundary/minimum/rounding cases and a changed-content case.

Earlier runs:
- `cd client && npm test`: passed (2 tests).
- `cd client && npm run build`: passed.
- `cd client && npm run lint`: passed with four pre-existing warnings in `Layout.jsx`, `Home.jsx`, `AuthContext.jsx`, and `PostDetail.jsx` (existing set-state-in-effect warning in the latter).
- `cd server && npm test`: failed in unrelated existing database setup/schema state (missing `password_hash`, `likes`, and `username`). 8 passed, 4 failed.
- No typecheck script is configured in the client package.

## Docs updated
- `README.md`: browser title and title test coverage; earlier reading-time behavior and client test command retained.
- This change note records the title choice and earlier reading-time work.

## Open questions
- None.
