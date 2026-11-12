# Add contact and display reading time

## Summary
Make footer contact text more visible

## What changed
- Kept the plain-text `Contact` label in the shared footer, including the home page, and made it larger, darker and semibold so it is easier to see.
- Added a shared reading-time utility that counts all whitespace-delimited words and calculates `ceil(wordCount / 200)`, with a one-minute minimum.
- Displayed the result in post-card metadata and below the post title on the individual post page. Both views derive it directly from the post's current content.
- Added client-side unit tests and documented the behavior and test command in the root README.

## Decisions
- The human requested text without redirection links; the footer uses `Contact` without inventing contact details. The existing shared layout shows it across pages. In response to the review, the label has higher contrast and prominence than the muted copyright text.
- Kept reading time derived in the client rather than storing it, so it always reflects the latest post content without a schema or API change.
- Used whitespace-delimited tokens as words; empty content resolves to the required one-minute minimum.
- Reused the existing muted metadata styling to keep the indicator visible without changing layout structure.

## How each criterion is met
- Users see a contact in the home-page footer: `home footer displays Contact as plain text without a link` renders the home route and checks the visible text styling and absence of links, buttons and hidden markup.
- Each post card displays `N min read`: `PostCard` renders shared `getReadingTime(post.content)`; `reading time rounds up at 200 words per minute and has a one-minute minimum` covers minimum and formatting value logic.
- The individual page displays the same value below the title: `PostDetail` uses the same utility on the same full content field.
- 200 words/minute, rounding up, and minimum one minute: covered by `reading time rounds up at 200 words per minute and has a one-minute minimum`, including 199/200/201/400/401-word boundaries.
- Dynamic calculation from full content and updates after changes: both views calculate from `post.content` at render time; `reading time is recalculated from the current content` verifies changed content produces the updated value.
- Consistent display: both components use the same helper and format.
- Visible, non-disruptive layout: muted small text is placed inline with existing card metadata and directly below the post title.

## How to verify
- Run `cd client && npm test`.
- Run the app, visit `/`, scroll to the footer, and check that `Contact` is clearly visible as non-interactive text.
- Run the app and inspect any post card and its individual post page; the same reading-time label should appear on both.
- Edit the post body and reload the views; the displayed time is calculated from the updated content.

## Tests
- Updated `client/src/home.test.js` to check the home footer's prominent text styling and non-interactive markup, in addition to the existing route and text checks.
- Current run: `cd client && npm test` passed (5 tests); `npm run lint` passed with the four pre-existing warnings listed below; `npm run build` passed.
- Current run: `cd server && npm test` failed (12 failures): API and PostgreSQL were not running (connections refused on ports 5001 and 5432); PostgreSQL tools are unavailable in this environment.
- Current run: root `npm test` and `npm run typecheck` failed because there is no root package.json. `npm run typecheck` in both packages and `npm run lint` in the server failed because those scripts are not defined.
- Earlier reading-time work:
  - Added `client/src/utils.test.js` with boundary/minimum/rounding cases and a changed-content case.
  - `cd client && npm test`: passed (2 tests).
  - `cd client && npm run build`: passed.
  - `cd client && npm run lint`: passed with four pre-existing warnings in `Layout.jsx`, `Home.jsx`, `AuthContext.jsx`, and `PostDetail.jsx` (existing set-state-in-effect warning in the latter).
  - `cd server && npm test`: failed in unrelated existing database setup/schema state (missing `password_hash`, `likes`, and `username`). 8 passed, 4 failed.
  - No typecheck script is configured in the client package.

## Docs updated
- `README.md`: prominent plain-text footer contact, reading-time behavior and client test command.

## Open questions
- None.
