# Todo:
# 
# 1. Use `pnpm fetch` and `--offline`
# 2. Maybe use Turborepo cache
# 3. Find better soution for `prisma generate`

FROM node:18.4.0-alpine AS pnpm

RUN apk --no-cache add curl dumb-init
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm


# ==========


FROM pnpm AS base

WORKDIR /app

ENV PRISMA_SKIP_POSTINSTALL_GENERATE=true

RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store

COPY turbo.json pnpm-workspace.yaml .
COPY package.json pnpm-lock.yaml .

COPY apps/api/package.json ./apps/api/package.json
COPY apps/api/src/db/schema.prisma ./apps/api/src/db/schema.prisma

COPY packages/common/package.json ./packages/common/package.json

RUN pnpm install --frozen-lockfile


# ==========


FROM base as development

WORKDIR /app/apps/api

ENV NODE_ENV=development

CMD ["pnpm", "dev"]


# ==========


FROM base as builder

RUN apk add git

ENV NODE_ENV=production

COPY . .

RUN pnpx turbo run build --filter=@alpha/api --no-cache


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

COPY --chown=node:node --from=builder /app/apps/api/package.json ./apps/api/package.json
COPY --chown=node:node --from=builder /app/apps/api/src/db/schema.prisma ./apps/api/src/db/schema.prisma
COPY --chown=node:node --from=builder /app/apps/api/dist ./apps/api/dist

COPY --chown=node:node --from=builder /app/packages/common/package.json ./packages/common/package.json
COPY --chown=node:node --from=builder /app/packages/common/dist ./packages/common/dist

RUN pnpm install --filter=@alpha/api --frozen-lockfile --prod --no-optional

WORKDIR /app/apps/api

RUN pnpm dlx prisma generate --schema=./src/db/schema.prisma
RUN rm ./src/db/schema.prisma

CMD ["dumb-init", "node", "dist/server.js"]
