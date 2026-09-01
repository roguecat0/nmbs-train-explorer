FROM node:22-bookworm AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM nginx:mainline-bookworm

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates gpg supervisor wget \
  && mkdir -p /etc/apt/keyrings \
  && wget -q -O /etc/apt/keyrings/grafana.asc https://apt.grafana.com/gpg-full.key \
  && chmod 644 /etc/apt/keyrings/grafana.asc \
  && echo "deb [signed-by=/etc/apt/keyrings/grafana.asc] https://apt.grafana.com stable main" > /etc/apt/sources.list.d/grafana.list \
  && apt-get update \
  && apt-get install -y --no-install-recommends alloy \
  && rm -rf /var/lib/apt/lists/*

COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker/alloy/config.alloy /etc/alloy/config.alloy
COPY docker/supervisor/supervisord.conf /etc/supervisor/supervisord.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 10000

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]
