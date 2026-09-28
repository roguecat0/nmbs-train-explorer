## Code style

- Write explicit return types for exported functions, async functions, and helpers that transform domain types.
- Scope try / catch blocks to a small number of statements to make it clear which operations can fail.

## tooling

- Never run `pnpm dev` or `pnpm run dev`. The user manages the development server.
- Before completing a code change, read and follow the project testing skill at
  [skills/train-explorer-testing/SKILL.md](skills/train-explorer-testing/SKILL.md).
  It defines the required local checks and UI review before handing changes to the user.
- The workflow is local: the agent implements and verifies, the user reviews, then
  changes may be pushed to main when the user asks. Do not add CI testing or require pull requests.
- Vitest is installed. The user writes the tests; do not author test cases or
  screenshot assertion suites unless the user explicitly changes this preference.
  Testing infrastructure, screenshot capture tooling, and agent browser checks are allowed.
