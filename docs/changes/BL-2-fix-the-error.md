## Summary

Validate PostgreSQL password configuration

## What changed

The database pool checks pg's resolved password before use and reports how to configure missing credentials instead of failing later with the SCRAM string error. Passwordless authentication remains available through an explicit opt-in.

## Decisions

Use pg's own connection parameter resolution to respect URL decoding and `PGPASSWORD`; do not invent a default password. `PG_ALLOW_PASSWORDLESS=true` supports deliberately configured peer/trust connections. A configured but incorrect password still requires a database administrator or user to correct the credentials.

## How each criterion is met

- **Resolve this:** `database URL supplies a decoded string password to pg` and `PGPASSWORD supplies the password when the URL omits it` verify credentials reach pg. `missing password fails early with actionable guidance` covers the reported missing-password case; `passwordless authentication can be explicitly enabled` covers the opt-in.

## How to verify

Configure actual PostgreSQL credentials in `server/.env` as described in the README, start PostgreSQL, run `cd server && npm run db:setup && npm start`, and request `/api/posts`. Run `node --test tests/db-config.test.js` from `server` for the isolated configuration tests. Run `npm test` there with the API and PostgreSQL running for integration coverage.

## Tests

- Added `server/tests/db-config.test.js`: four tests for URL credentials, `PGPASSWORD`, missing credentials and passwordless opt-in. `cd server && node --test tests/db-config.test.js`: 4 passed. An initial invocation from the repository root failed because the test path was relative to `server`.
- `cd server && npm test`: 4 configuration tests passed; 11 API tests and their cleanup failed because neither the API at port 5001 nor PostgreSQL at port 5432 is running in this environment. A live database connection was not verified.
- `cd client && npm test`: 10 passed.
- `cd client && npm run lint`: passed with four existing warnings in unrelated client files.
- Neither project defines a typecheck script, nor does the server define a lint script (`npm run`); `npm run typecheck --if-present` and server `npm run lint --if-present` completed without running checks. `node --check` passed for the changed server source and test.
- `git diff --check`: passed.

## Docs updated

README setup, credential troubleshooting and test instructions; `server/.env.example` clarifies placeholders and the passwordless option.

## Open questions

None. Deployment-specific PostgreSQL credentials must be supplied by the operator.
