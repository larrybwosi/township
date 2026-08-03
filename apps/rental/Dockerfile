# Base stage for shared configuration and dependencies
FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Pruning stage to isolate only files needed for the Rental app
FROM base AS pruner
RUN npm install -g turbo@2.10.4
COPY . .
RUN turbo prune rental --docker

# Installer stage to install dependencies and build
FROM base AS installer
# Define build-time argument for Next.js build
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --frozen-lockfile

# Copy source code
COPY --from=pruner /app/out/full/ .

# Build the Rental app
# Generate database schema client if needed
RUN pnpm --filter @repo/database exec prisma generate || true
RUN pnpm turbo run build --filter=rental

# Runner stage
FROM base AS runner
WORKDIR /app

# Copy production node_modules and built assets
COPY --from=installer /app .

EXPOSE 3002

ENV PORT=3002
ENV NODE_ENV=production

# Start Next.js app from apps/rental using start script
CMD ["pnpm", "--filter", "rental", "start"]
