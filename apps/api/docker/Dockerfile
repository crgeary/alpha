FROM node:18.4.0-alpine AS pnpm

RUN apk --no-cache add curl
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

# Todo: checksums


# ==========


FROM pnpm AS base

WORKDIR /app

RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store

COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .

COPY apps/api/package.json ./apps/api/package.json
COPY apps/api/src/db/schema.prisma ./apps/api/src/db/schema.prisma

# Todo: Use docker buildkit
COPY packages/common/package.json ./packages/common/package.json

RUN pnpm i --unsafe-perm --frozen-lockfile


# ==========


FROM base as development

WORKDIR /app/apps/api

ENV NODE_ENV=development

CMD ["pnpm", "dev"]


# ==========


# Todo, build & production steps
