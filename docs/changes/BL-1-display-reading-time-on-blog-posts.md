# Activity tab

## Summary
Add a private activity tab

## What changed
- Added a protected Activity page, desktop/mobile navigation, refresh, pagination, and loading, empty and error states.
- Added an authenticated feed derived from posts, comments and likes, plus a likes-user index in the schema and migration.

## Decisions
- Following the human's request to use judgment, chose a private current-state feed of the user's posts and engagement and others' engagement on their posts. These are useful existing activity signals without exposing account details or inventing an audit log; deleted or undone actions disappear. Existing records are included.
- Self-engagement is returned once. Offset pagination is deterministic for a fixed dataset but may shift when activity changes; refresh reloads from the start.

## How each criterion is met
- Activity tab and tracked information: `activity is private, scoped, deduplicated, ordered and paginated; removals disappear` exercises own and others' activity, scope, ties, paging and removal against the live API; `activity request includes credentials and pagination` checks the client request. Page navigation and rendering still require manual verification.
- Privacy and input handling: `activity requires auth and validates pagination before querying`, `activity uses authenticated identity and requests one extra row for pagination`, and `protected routes reject anonymous and forged tokens` cover authentication, bounds and identity. The live activity test checks sensitive fields and unrelated activity are excluded.
- Failure paths: `activity returns a safe error on database failure` and `activity request exposes errors for retry` cover server and client errors. Retry rendering requires manual verification.

## How to verify
- Set up PostgreSQL and the API as in README, run `cd server && node scripts/migrate.js` for an existing database, then run `npm test` with the API running.
- Sign in on desktop and mobile, open Activity, inspect links and comment text, exercise load more and refresh after deleting or undoing engagement; sign out and visit `/activity` to check the login redirect.
- With no activity check the empty state; interrupt the API to check error/retry and restore it. Run client tests, build and lint.

## Tests
- Added `server/tests/activity.test.js` (stubbed route/auth/error tests) and expanded `server/tests/api.test.js` (live feed integration); added `client/src/activity.test.js` (API request/error tests).
- `cd server && node --test tests/activity.test.js`: passed (3).
- `cd server && npm test`: 3 passed; 12 integration tests and their cleanup failed because no API or PostgreSQL is listening on ports 5001/5432. Live SQL, migration and UI flows remain unverified in this environment.
- `cd client && npm test`: passed (6); `npm run build`: passed; `npm run lint`: passed with four pre-existing warnings in Layout, AuthContext, Home and PostDetail.
- No typecheck scripts are configured; no server lint script is configured.

## Docs updated
- `README.md`: Activity scope, API, migration and verification prerequisites.

## Open questions
- None; scope and retention chosen as requested. Live integration and browser verification remain to be run with infrastructure available.

---

# Earlier change: Display reading time on blog posts

## Summary
Display dynamic reading times on blog posts

## What changed
- Added a shared reading-time utility that counts all whitespace-delimited words and calculates `ceil(wordCount / 200)`, with a one-minute minimum.
- Displayed the result in post-card metadata and below the post title on the individual post page. Both views derive it directly from the post's current content.
- Added client-side unit tests and documented the behavior and test command in the root README.

## Decisions
- Kept reading time derived in the client rather than storing it, so it always reflects the latest post content without a schema or API change.
- Used whitespace-delimited tokens as words; empty content resolves to the required one-minute minimum.
- Reused the existing muted metadata styling to keep the indicator visible without changing layout structure.

## How each criterion is met
- Each post card displays `N min read`: `PostCard` renders shared `getReadingTime(post.content)`; `reading time rounds up at 200 words per minute and has a one-minute minimum` covers minimum and formatting value logic.
- The individual page displays the same value below the title: `PostDetail` uses the same utility on the same full content field.
- 200 words/minute, rounding up, and minimum one minute: covered by `reading time rounds up at 200 words per minute and has a one-minute minimum`, including 199/200/201/400/401-word boundaries.
- Dynamic calculation from full content and updates after changes: both views calculate from `post.content` at render time; `reading time is recalculated from the current content` verifies changed content produces the updated value.
- Consistent display: both components use the same helper and format.
- Visible, non-disruptive layout: muted small text is placed inline with existing card metadata and directly below the post title.

## How to verify
- Run `cd client && npm test`.
- Run the app and inspect any post card and its individual post page; the same reading-time label should appear on both.
- Edit the post body and reload the views; the displayed time is calculated from the updated content.

## Tests
- Added `client/src/utils.test.js` with boundary/minimum/rounding cases and a changed-content case.
- `cd client && npm test`: passed (2 tests).
- `cd client && npm run build`: passed.
- `cd client && npm run lint`: passed with four pre-existing warnings in `Layout.jsx`, `Home.jsx`, `AuthContext.jsx`, and `PostDetail.jsx` (existing set-state-in-effect warning in the latter).
- `cd server && npm test`: failed in unrelated existing database setup/schema state (missing `password_hash`, `likes`, and `username`). 8 passed, 4 failed.
- No typecheck script is configured in the client package.

## Docs updated
- `README.md`: reading-time behavior and client test command.

## Open questions
- None.
