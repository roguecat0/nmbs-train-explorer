# NMBS Train Explorer

A mobile-first, client-only train repair tour. Physical QR codes open routes such
as `/repair/brake-system`; the app displays the related repair sheet and keeps
the visitor's completion progress in browser local storage.

## Development

```bash
pnpm dev
pnpm build
```

The first UI draft is structured around:

- `src/data/repairs.ts` for repair content and visual metadata;
- `src/components/` for the progress header, vertical train tour, repair sheet,
  and screen composition;
- `src/context/game-progress.tsx` for client-only progress state.

## Local verification

The agent verifies changes locally, then the user reviews them before deciding
whether to push to main. The required checks and visual review are maintained in
[the project testing skill](skills/train-explorer-testing/SKILL.md), which
`AGENTS.md` requires agents to read before handoff.

Vitest uses the existing Solid Vite configuration, jsdom, Testing Library, DOM
matchers, and cleanup of rendered components and local storage between tests.
The user writes test cases; none exist yet, so `pnpm test:run` currently reports
"No test files found" and exits with code 1.

```bash
pnpm test      # Interactive watch mode
pnpm test:run  # Single run, including for agent verification
```

For UI review, capture the running app in isolated browser contexts:

```bash
pnpm ui:capture --url http://localhost:5173/
pnpm ui:capture --url http://localhost:5173/ --width 390 --language fr --repair roof-ventilation
```

Use the actual app base URL, including a deployment base path when applicable.
The default capture covers both languages at 320, 390, and 768 pixels wide,
empty/partial/complete progress, all six repair sheets in pending/completed/expanded
states, and unknown URLs. Add `--height 568` to inspect short screens.
The helper does not start a server or modify your browser's progress.
It reuses installed Chrome/Chromium or an existing Playwright browser cache;
it never downloads a browser. Use `--browser /path/to/chrome` or `UI_BROWSER_PATH`
if the executable is elsewhere. The manifest records the executable and version.

Each run produces a new ignored `artifacts/ui/<timestamp>/` directory containing
screenshots, an HTML gallery, and a browser-error manifest. Sheet screenshots
include the actual viewport so clipping is visible. Inspect images at actual
size; capturing them successfully does not mean the design is correct.

Button alignment, wrapping, spacing, and progress colors are worth reviewing
visually first. Later, user-authored screenshot comparisons against approved
references can flag changes automatically. Keep the browser, OS, and fonts
consistent and review reference updates. Useful behavioral tests are repair
completion/persistence/reset and language switching/persistence; this app has no
API endpoints that need a separate backend test suite.

## Docker deployment

The `Dockerfile` builds the static app and serves it through Nginx on port `10000`, Render's default web-service port.

Create a Render **Web Service** with language set to **Docker** and the repository-root `Dockerfile`. No Docker command is needed. Set its Health Check Path to `/health`.

Nginx writes structured JSON access logs to stdout. The `path` field preserves the browser-requested route, including SPA routes such as `/repair/brake-system`, rather than the internal `/index.html` fallback. Render captures these logs for troubleshooting; Hobby workspaces retain them for 7 days.

Nginx assigns each browser a first-party `nmbs_visitor_id` cookie and includes it in every log event. Repair completions emit a `POST` request to `/events/repair-completed/<repair-id>` and are logged with `"type":"repair_completed"`.

Nginx sends each access log to both Render stdout and the in-container Grafana Alloy collector. Alloy parses the JSON and forwards it to Grafana Cloud Loki over HTTPS. In Render, configure these secret environment variables:

- `GRAFANA_LOKI_URL`: the full Grafana Cloud Loki push URL ending in `/loki/api/v1/push`.
- `GRAFANA_LOKI_USERNAME`: the Loki tenant or instance ID supplied by Grafana Cloud.
- `GRAFANA_CLOUD_TOKEN`: a Grafana Cloud access-policy token with `logs:write` permission.

Loki labels are limited to `environment`, `service_name`, and `source`. Request paths, IDs, IPs, and user agents remain JSON fields, preventing high-cardinality streams.

To run the production image locally:

```bash
docker build -t nmbs-train-explorer .
docker run --rm -p 10000:10000 nmbs-train-explorer
```
