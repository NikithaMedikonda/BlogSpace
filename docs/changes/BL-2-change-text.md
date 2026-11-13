## Summary
Rename Comments heading to Suggestions

## What changed
- Changed the post's comment-section heading and accessible section label to “Suggestions”; the count remains unchanged.

## Decisions
- Limited the text change to the requested heading and its matching accessible label. Comment actions, counts, and API names remain unchanged.

## How each criterion is met
- Users see “Suggestions” in the section heading: `the comments section displays Suggestions` renders the component and checks both the heading and accessible label.

## How to verify
- Run `cd client && npm test`.
- Open a post and check the section below the post for the “Suggestions” heading.

## Tests
- Added `client/src/comments.test.js` to render the section and check the heading and accessible label.
- `cd client && npm test`: passed, 5 tests.
- `cd client && npm run build`: passed.
- `cd client && npm run lint`: passed with four existing warnings in AuthContext, Layout, Home and PostDetail.
- `cd server && npm test`: failed; the API and PostgreSQL were not running (connections refused on ports 5001 and 5432).
- `npm test` at the repository root: unavailable (no root package.json).
- Typecheck is not configured in either package; server lint is also not configured.

## Docs updated
- `README.md` describes the section label and client tests.
- `.gitignore` additionally excludes common virtual environments and caches.

## Open questions
- None.
