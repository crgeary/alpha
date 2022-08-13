# Todo:
#
# 1. Use `pnpm fetch` and `--offline`
# 2. Maybe use Turborepo cache
# 3. Find better soution for `prisma generate`

FROM node:18.6.0-alpine AS pnpm

RUN apk --no-cache add curl dumb-init
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm


# ==========


FROM pnpm AS base

WORKDIR /app

RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store

COPY turbo.json pnpm-workspace.yaml .
COPY package.json pnpm-lock.yaml .

COPY apps/demo/package.json ./apps/demo/package.json

COPY packages/common/package.json ./packages/common/package.json
COPY packages/http-server/package.json ./packages/http-server/package.json
COPY packages/logger/package.json ./packages/logger/package.json

RUN pnpm install --frozen-lockfile


# ==========


FROM base as development

WORKDIR /app/apps/demo

ENV NODE_ENV=development

CMD ["pnpm", "dev"]


# ==========


FROM base as builder

RUN apk add git

ENV NODE_ENV=production

COPY . .

RUN pnpx turbo run build --filter=@alpha/demo --no-cache


# ==========


FROM pnpm as production

WORKDIR /app
RUN chown -R node:node /app

ENV NODE_ENV=production

USER node

COPY --chown=node:node --from=builder /app/package.json \
                                      /app/pnpm-lock.yaml \
                                      /app/pnpm-workspace.yaml \
                                      ./

COPY --chown=node:node --from=builder /app/apps/demo/package.json ./apps/demo/package.json
COPY --chown=node:node --from=builder /app/apps/demo/dist ./apps/demo/dist

COPY --chown=node:node --from=builder /app/packages/common/package.json ./packages/common/package.json
COPY --chown=node:node --from=builder /app/packages/common/dist ./packages/common/dist

COPY --chown=node:node --from=builder /app/packages/logger/package.json ./packages/logger/package.json
COPY --chown=node:node --from=builder /app/packages/logger/dist ./packages/logger/dist

RUN pnpm install --filter=@alpha/* --frozen-lockfile --prod --no-optional

WORKDIR /app/apps/demo

CMD ["dumb-init", "node", "dist/server.js"]
