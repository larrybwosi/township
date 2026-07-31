# Base stage for shared configuration and dependencies
FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Pruning stage to isolate only files needed for the API
FROM base AS pruner
RUN pnpm add -g turbo@2.10.4
COPY . .
RUN turbo prune api --docker

# Installer stage to install dependencies and build
FROM base AS installer
# Install OpenSSL 3.0.x for Prisma
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --frozen-lockfile

# Copy source code
COPY --from=pruner /app/out/full/ .

# Generate Prisma client
RUN pnpm --filter @repo/database exec prisma generate

# Build the app
RUN pnpm turbo run build --filter=api

# Runner stage
FROM base AS runner
# Install OpenSSL and netcat (to wait for PostgreSQL database)
RUN apt-get update && apt-get install -y openssl netcat-openbsd && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy production node_modules and built assets
COPY --from=installer /app .

EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=production

# Custom start script to wait for db, run prisma migrate deploy to prevent data loss, and then start the API
CMD ["sh", "-c", "until nc -z -v -w30 postgres 5432; do echo 'Waiting for database...'; sleep 2; done; pnpm --filter @repo/database exec prisma migrate deploy --schema=prisma/schema.prisma && pnpm --filter api start"]
