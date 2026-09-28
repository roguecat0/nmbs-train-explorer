---
name: train-explorer-testing
description: Verify changes to NMBS Train Explorer before handoff, using local code checks and browser screenshot review focused on mobile layout, button text, and progress colors.
---

# Train Explorer testing

Use this skill for code changes in this repository. This is a client-only Solid
SPA with six repair routes, Dutch/French copy, and local storage. Verification is
local; the user reviews afterwards and decides when to push to main.

## Required checks before handoff

1. Run `pnpm lint:fix`, then `pnpm lint` and `pnpm typecheck`.
2. Run `pnpm format:check`. If formatting fails, format the changed files and rerun
   the check. Preserve unrelated user edits.
3. Run `pnpm test:run`. Test failures must be resolved within the authorized scope.
   While no user-authored test files exist, Vitest exits with code 1. Report this
   as missing behavioral coverage, never as passing tests; do not suppress it with
   `passWithNoTests` or create placeholder tests.
4. Run `pnpm build` for routes, Vite/build configuration, entry files, dependency
   changes, and changes that can affect production output.
5. For UI, CSS, translation, or progress changes, complete the browser review below.

The user writes repeatable test cases. Do not author Vitest tests or screenshot
assertion suites without explicit authorization. Browser inspection and the
capture helper are verification tools, not a substitute for behavioral coverage.

## Browser and visual review

Never start `pnpm dev` or `pnpm run dev`. Use the user's existing server. For
production verification, build and start an isolated `pnpm preview --host
127.0.0.1 --port 4173 --strictPort` process, then stop only that process when done.

Capture UI states with `pnpm ui:capture --url http://localhost:5173/`. Specify the
actual URL, including any base path. Use `--url http://127.0.0.1:4173/` for preview.
The helper reuses installed Chrome/Chromium or an existing Playwright cache. Use
`--browser /path/to/chrome` or `UI_BROWSER_PATH` if discovery misses it; do not
download a browser when an installed one is available. Keep the browser version
consistent for before/after comparisons; the manifest records it.
The helper uses fresh browser contexts, so it does not change the user's saved
progress. Captures go to a new directory under `artifacts/ui/`, with an HTML gallery
and a JSON manifest of browser errors and capture details.

The default matrix covers NL and FR at 320, 390, and 768 CSS pixels wide:

- Home with 0/6, mixed 3/6, and 6/6 repairs completed.
- Each repair sheet before completion, after completion, and with facts expanded.
- An unknown URL and an unknown repair ID.

For focused reruns, use `--width 390 --language fr --repair roof-ventilation`.
These filters reduce review coverage: state exactly which combinations were checked.
Use `--height 568` for short screens when a fixed sheet or long copy changes.

Open and inspect screenshots with the available image viewer; successful capture
alone does not satisfy visual review. Inspect the affected component at actual
size, not just a full-page thumbnail. For broad styling changes inspect the full
matrix; for narrow changes inspect every affected state in both languages at all
three widths. Check:

- Button labels fit, align as designed, wrap cleanly, and remain readable.
- Header title, language controls, count, and repair headings do not collide.
- No horizontal overflow, clipped copy, or obscured controls; fixed sheets fit
  short screens, including when facts expand.
- Progress fill matches 0/6, 3/6, and 6/6; completed markers and section states
  match the completed IDs. In mixed progress, both completed and pending sections
  remain visually distinguishable. A permanently yellow locomotive decoration
  is not itself a completion indicator.
- Compare colors and spacing to the user-approved design or earlier screenshots.
  A CSS class or computed color alone does not prove the design looks correct.
- Images load and remain legible. Check browser errors in the manifest.

For visual edits, capture before and after using the same browser, widths,
languages, and states when feasible. Preserve reference captures separately.
Never silently replace approved reference images or claim new captures are an
approved baseline. If no reference exists, report this and provide the current
images for the user's review. Future user-authored screenshot comparisons should
run in a consistent browser/OS/font environment.

## Interaction checks when relevant

The helper seeds visual states; it does not prove the interactions work. Use an
isolated browser context to check the affected behavior directly:

- Open a QR repair URL, complete it, close the sheet, refresh, and verify the
  repair stays completed. Reopening it must not increase the count. Reset clears
  the count and completed states.
- Switch NL/FR while a repair sheet is open, verify all visible text and document
  language/title, then refresh to verify the preference persists.
- Open each changed route directly and refresh it. Unknown repair IDs currently
  show the home screen; unknown paths show the not-found screen.
- For deployment/base-path changes, repeat direct-route and asset checks against
  a production build with the relevant base path. Vite preview does not prove
  GitHub Pages' deployed 404 fallback works.
- For persistence changes, inspect malformed JSON, valid JSON of the wrong shape,
  duplicate/unknown IDs, and unavailable storage in an isolated context.

## Completion report

Report the checks that passed, any failing or unavailable checks and their exact
cause, and the remaining risk. Distinguish pre-existing failures from regressions.
Include links to the screenshot gallery and any images that need user judgment,
plus the viewport/language/state coverage and visual findings. Do not claim the
UI is verified if images were not inspected or interactions were only seeded.
Do not commit, push, or add CI/PR workflows as part of verification.
