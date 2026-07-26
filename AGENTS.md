## Code style

- Write explicit return types for exported functions, async functions, and helpers that transform domain types.
- Scope try / catch blocks to a small number of statements to make it clear which operations can fail.
-

## tooling

- Before completing a code change, run the relevant checks and report the result.
  - For most code changes, run `pnpm lint:fix`, `pnpm lint`, `pnpm typecheck`, and `pnpm format:check`. Run `pnpm format` if formatting is needed.
  - Run `pnpm build` when the change touches SolidStart routing, Vite/build config, server/client entry files, dependencies, or anything that could affect production output.
  - If a check cannot be run, explain exactly why and what risk remains.
  - If a check fails because of pre-existing or unrelated issues, do not hide that. Summarize the failure and separate it from the current change.
- vitest will need to be added. but you do not write your own test
  - I notice how ai tests give a false sense of security without having too much benifit
  - I'm not good enough at spotting bad and creating good tests so this too is a skill that I will develop myself if this turns out to be needed
