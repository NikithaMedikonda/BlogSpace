# Move All Stories navigation to the top

## Summary
Move All Stories navigation to the top

## What changed
- Kept the Stories section heading and description at the top of a loaded story detail page, followed by the All Stories link on its own line.
- Added top padding above the navigation link as requested.
- Removed the former link below the story comments; the link still routes to `/`.
- Added client-side structural regression coverage.

## Decisions
- Reused the existing Home page section copy and typography, and retained the existing link styling. The story title remains the page's primary heading; the section label uses an `h2`.
- The navigation appears with the story once its post data loads, avoiding changes to loading, error, or not-found states.
- Put the link in a separate block with `pt-4` so it is visually distinct below the description and has top padding without changing its destination or the surrounding layout.
- No responsive-specific layout changes were needed: the section and link are normal-flow block content and retain the site's existing responsive heading sizes.

## How each criterion is met
- Move the navigation to the top, below the heading and description, and not alongside either: `post detail places a single All stories link below the stories heading and description` in `client/tests/post-detail-navigation.test.js` checks the content order and that the link is in its own padded block.
- Show the navigation near the top without a scroll and avoid duplication: the same test verifies the header contains the single link and the source contains no duplicate.
- Navigate to the existing Stories listing: the same test verifies the link targets `/`, the existing listing route.
- Preserve story content: `post detail retains the story content` in `client/tests/post-detail-navigation.test.js` verifies the post body remains rendered.
- Keep consistent styling and responsive behavior: the section reuses the existing heading/description styles and responsive font-size classes; the link retains its text styling and is normal-flow content. Production build passed. No browser-based viewport test harness exists in the project.

## How to verify
- `cd client && npm test`
- `cd client && npm run lint`
- `cd client && npm run build`
- Open a story and verify the heading, description, then padded All stories link appear above the story title and content; select the link to return to the Stories listing.

## Tests
- Added/updated `post detail places a single All stories link below the stories heading and description` to check heading/description/link order, the `/` destination, dedicated block with top padding, and absence of duplication.
- `post detail retains the story content` confirms the article body remains present.
- `cd client && npm test`: passed (2 tests).
- `cd client && npm run lint`: completed with 4 existing warnings (state updates in effects in `PostDetail.jsx` and `Home.jsx`, `AuthContext.jsx` fast-refresh export, and `Layout.jsx` render purity); no errors.
- `cd client && npm run build`: passed.
- `cd server && npm test`: 8 passed, 4 failed because the configured database schema lacks expected columns/tables (`password_hash`, `username`, and `likes`); unrelated to this client-only change.
- No typecheck script or TypeScript configuration is present in the client project.

## Docs updated
- Updated this change note. README and other project docs do not describe page navigation behavior and were not changed.

## Open questions
- None.
