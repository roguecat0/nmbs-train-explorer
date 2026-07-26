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

## Static Docker + Grafana LGTM observability

This repo includes a local observability stack for learning Grafana with a static Nginx deployment:

- `app`: static Solid app served by Nginx with the official Nginx OpenTelemetry module.
- `alloy`: receives OTLP traces from Nginx and tails Nginx logs.
- `tempo`: stores traces.
- `loki`: stores logs.
- `prometheus`: stores metrics from the Nginx Prometheus exporter and Alloy.
- `grafana`: visualizes Prometheus, Loki, and Tempo.

Run it with Docker Compose:

```bash
docker compose up --build
```

If your Docker install uses the legacy binary, use:

```bash
docker-compose up --build
```

Local URLs:

- App: http://localhost:8080
- Grafana: http://localhost:3000
- Prometheus: http://localhost:9090
- Loki: http://localhost:3100
- Tempo: http://localhost:3200
- Alloy UI: http://localhost:12345
- Nginx exporter: http://localhost:9113/metrics

Useful first checks in Grafana:

- Explore > Prometheus: `nginx_http_requests_total`
- Explore > Loki: `{job="nginx"}`
- Explore > Tempo: search service `nmbs-train-explorer-nginx`

Nginx exports spans to Alloy at `alloy:4317`. Alloy batches and forwards those traces to Tempo at `tempo:4317`. Nginx access logs are written as JSON and include `trace_id` and `span_id` so logs can link back to Tempo traces.
