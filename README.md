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

## Docker deployment

The `Dockerfile` builds the static app and serves it through Nginx on port `10000`, Render's default web-service port.

Create a Render **Web Service** with language set to **Docker** and the repository-root `Dockerfile`. No Docker command is needed.

Nginx writes structured JSON access logs to stdout. The `path` field preserves the browser-requested route, including SPA routes such as `/repair/brake-system`, rather than the internal `/index.html` fallback. Render captures these logs for troubleshooting; Hobby workspaces retain them for 7 days.

Nginx assigns each browser a first-party `nmbs_visitor_id` cookie and includes it in every log event. Repair completions emit a `POST` request to `/events/repair-completed/<repair-id>` and are logged with `"type":"repair_completed"`.

To run the production image locally:

```bash
docker build -t nmbs-train-explorer .
docker run --rm -p 10000:10000 nmbs-train-explorer
```
