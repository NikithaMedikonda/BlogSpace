# Move All Stories navigation to the top

## Summary
Move All Stories navigation to the top

## What changed
- Added the Stories section heading and description to the top of a loaded story detail page, with the All Stories link on its own line below them.
- Removed the former link below the story comments; the link still routes to `/`.
- Added client-side structural regression tests and a client test script.

## Decisions
- Reused the existing Home page section copy and typography, and retained the existing link styling. The story title remains the page's primary heading; the section label uses an `h2`.
- The navigation appears with the story once its post data loads, avoiding changes to loading, error, or not-found states.
- No responsive-specific layout changes were needed: the section and link are normal-flow block content and retain the site's existing responsive heading sizes.

## How each criterion is met
- Move the navigation to the top, below the heading and description, and not alongside either: `post detail places a single All stories link below the stories heading and description` in `client/tests/post-detail-navigation.test.js` checks the ordering and parent section.
- Show the navigation near the top without a scroll and avoid duplication: the same test verifies the single link is in the header and that only one link exists in the component.
- Navigate to the existing Stories listing: the same test verifies the link targets `/`, which is the existing listing route.
- Preserve story content: `post detail retains the story content` in `client/tests/post-detail-navigation.test.js` verifies the post body remains rendered.
- Keep styling and responsive behavior: the section reuses existing Home heading/description styles and its responsive font-size classes; verified by the successful production build. No browser-based viewport test harness exists in the project.

## How to verify
- `cd client && npm test`
- `cd client && npm run lint`
- `cd client && npm run build`
- Open a story and verify the heading, description, then All stories link appear above the story title and content; select the link to return to the Stories listing.

## Tests
- Added `post detail places a single All stories link below the stories heading and description` and `post detail retains the story content`.
- `cd client && npm test`: passed (2 tests).
- `cd client && npm run lint`: completed with pre-existing warnings in `Layout.jsx`, `Home.jsx`, `AuthContext.jsx`, and the existing data-loading effect in `PostDetail.jsx`; no lint errors.
- `cd client && npm run build`: passed.
- `cd server && npm test`: 8 passed, 4 failed because the configured database schema lacks expected columns/tables (`password_hash`, `username`, and `likes`); unrelated to this client-only change.
- No typecheck script or TypeScript configuration is present in the client project.

## Docs updated
- Added this change note. README and other project docs do not describe page navigation behavior and were not changed.

## Open questions
- None.
