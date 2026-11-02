# BL-5: Change background color

## Summary
Change the home page background to light blue

## What changed
- Replaced the warm paper background with a light blue background (`#eff6ff`).
- Added a client test that checks the background color token and its use on the page body.

## Decisions
The requested color was Blue. Chose a pale blue shade to make the change visible while retaining strong contrast with the existing dark text and white content surfaces. Kept the existing global body-background approach and gave its token the descriptive name `home-background`.

## How each criterion is met
- **Users should see a new color:** `the page background uses a light blue color` in `client/src/background-color.test.js` verifies the light blue theme token and confirms the body uses it. The production build also verifies Tailwind generates the CSS.

## How to verify
1. Run `npm --prefix client run dev`.
2. Open the home page and confirm its background is pale blue (`#eff6ff`).

## Tests
- `npm --prefix client test` — passed, 5 tests including the background-color test.
- `npm --prefix client run build` — passed.
- `npm --prefix client run lint` — passed with four existing warnings in `Layout.jsx`, `AuthContext.jsx`, `Home.jsx`, and `PostDetail.jsx`.
- `npm --prefix server test` — 8 passed, 4 failed because the configured database is missing existing schema columns/tables (`password_hash`, `username`, and `likes`); unrelated to this client-side styling change.
- Typecheck — not available; the project is JavaScript-based and defines no typecheck script.
- `git diff --check` — passed.

## Docs updated
- Added this BL-5 change note. No README or API documentation changes are needed for this visual update.

## Open questions
- None.
