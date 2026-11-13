# Change the color of the like

## Summary
Make like hearts red

## What changed
- Made heart glyphs red on post cards and on the post page for signed-out, unliked, and liked states.
- Kept counts, labels, button states, and like behavior unchanged.
- Expanded `.gitignore` to cover common caches, virtual environments, and generated output.

## Decisions
- Used the existing Tailwind `text-red-600` styling on the heart alone, preserving surrounding text and button styles.
- Hid decorative hearts from assistive technology; existing labels and counts describe the likes.

## How each criterion is met
- Users see red like hearts on cards: `post card displays a red heart beside the like count`.
- Users see red like hearts on post pages in every authentication and like state: `post page displays a red heart for signed-out, unliked and liked states`.

## How to verify
- Run `cd client && npm test`.
- Start the app using the README setup; inspect a post card and post page while signed out, then sign in and toggle the like. The heart remains red in each state.

## Tests
- Added `client/src/likes.test.js` to render the card and all three post-page states and check the heart styling and labels.
- Client test suite: initial run failed because the auth test mock was not applied; after correcting its plugin priority, all 6 tests passed.
- Client lint: passed with four existing warnings in Layout, AuthContext, Home, and PostDetail.
- Client build: passed.
- Server test suite: failed (0 passed, 12 failed) because the API and PostgreSQL were unavailable on localhost ports 5001 and 5432; PostgreSQL tools are not installed in this environment.
- Client and server typecheck commands and server lint command: unavailable (no scripts configured).
- An initial test command from the repository root failed because there is no root package.json; the client suite was then run from `client`.

## Docs updated
- `README.md`: documented red hearts and clarified the test commands.

## Open questions
- None.
