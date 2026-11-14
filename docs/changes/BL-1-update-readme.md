# Update README tech stack

## Summary
Document the project tech stack

## What changed
- Added a tech stack section to the root README covering the frontend, backend, database, and development tools.
- Added a README content test alongside the client tests.

## Decisions
- Listed technologies used by the project without pinning versions, which are maintained in the package manifests.

## How each criterion is met
- Users can see the tech stack in the root README. The `the root README presents the project tech stack` test checks the section and its main technologies.

## How to verify
- Read the Tech stack section in `README.md`.
- Run `cd client && node --test src/readme.test.js`.

## Tests
- Added `client/src/readme.test.js`: targeted test passed (1 test).
- `cd client && npm test`: passed (9 tests).
- `cd client && npm run lint`: passed with four existing warnings in AuthContext, PostDetail, Layout, and Home.
- `cd server && npm test`: failed (12 failures); the required API and PostgreSQL were not running (connections refused on ports 5001 and 5432). PostgreSQL tools are not installed in this environment.
- No typecheck script is configured in either package; no server lint script is configured.

## Docs updated
- `README.md`: added the project tech stack.

## Open questions
- None.
