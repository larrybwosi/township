# Township

Welcome to **Township**! Township is an advanced, high-performance web platform designed to handle town management, properties, rentals, and marketplaces in a single, cohesive ecosystem.

## 🏗️ Architecture & Stack Overview

Township is managed as a high-performance monorepo utilizing **Turborepo** and **pnpm** workspaces, built entirely with **TypeScript**.

### Applications (`apps/`)

- **`api`** (NestJS): The unified, in-process monolithic backend.
  - Consolidates all core services: authentication (JWT-based + RBAC), user management, town data, real estate listings, and the marketplace.
  - Connects directly to PostgreSQL via Prisma.
  - Employs Rest controllers registered locally within specific feature modules.
- **`web`** (Next.js): The main public homepage and portal.
  - Implements Tailwind CSS v4 and integrates with Sanity CMS for dynamic CMS content.
  - Utilizes `<SanityLive />` for real-time visual editing and server-side fetching with offline fallbacks.
  - Runs on port **3000**.
- **`docs`** (Next.js): The documentation and developer portal.
  - Guides engineers through the Township framework and APIs.
  - Runs on port **3001**.
- **`rental`** (Next.js): The Interactive Rental Hub.
  - Features real-time property browsing, booking management, and user reviews.
  - Runs on port **3002**.
- **`marketplace`** (Next.js): The community local Marketplace.
  - Serves local listings, listings creation, and search.
  - Runs on port **3003**.

### Shared Packages (`packages/`)

- **`database`**: Centralized database layer using **Prisma** and **PostgreSQL**.
- **`ui`**: Shared UI component library styled with **Tailwind CSS v4** and built on modern primitive elements.
- **`eslint-config`**: Standardized ESLint rule configurations.
- **`typescript-config`**: Standardized TypeScript compiler options (`tsconfig.json`) used across the workspace.

---

## 🛠️ Getting Started

To set up, run, and develop the Township ecosystem locally, follow these steps.

### Prerequisites

Ensure you have **Node.js >= 18** and **pnpm >= 9.0.0** installed.

### Installation

Run the installation command from the **root** of the monorepo:

```bash
pnpm install
```

> ⚠️ **Important:** Always run `pnpm install` from the root of the workspace rather than inside subdirectories to avoid pruning workspace lockfile dependencies.

### Database Setup

To generate the Prisma client with the correct Prisma schema definitions:

```bash
pnpm --filter @repo/database exec prisma generate
```

To deploy database migrations:

```bash
pnpm --filter @repo/database exec prisma migrate deploy
```

---

## 🚀 Running the Project

You can run individual apps or the entire monorepo simultaneously using Turborepo.

### Run All Applications in Development Mode

```bash
pnpm dev
```

This starts all the microservices/applications in parallel:
- **`api`**: [http://localhost:3000/api](http://localhost:3000/api) (or backend port)
- **`web`**: [http://localhost:3000](http://localhost:3000)
- **`docs`**: [http://localhost:3001](http://localhost:3001)
- **`rental`**: [http://localhost:3002](http://localhost:3002)
- **`marketplace`**: [http://localhost:3003](http://localhost:3003)

### Run a Specific Application

To develop a specific app (e.g., `rental`), run:

```bash
pnpm --filter rental dev
```

---

## 🧪 Testing

Testing is unified across the monorepo under **Vitest**, providing fast and efficient testing.

### Run All Workspace Tests

```bash
pnpm test
```

### Run Tests with Coverage

```bash
pnpm test:cov
```

### Run Tests for a Specific Application/Package

```bash
pnpm --filter api test
```

---

## 📦 Building for Production

To build all apps and packages in the monorepo:

```bash
pnpm build
```

The apps are containerized using optimized multi-stage Dockerfiles utilizing `turbo prune` based on the `node:22-slim` image.

---

## 🔄 Versioning & Release

Township uses `@changesets/cli` at the workspace level for automated version bumping and release management. Package versions are synchronized under a single unified version scheme. Git tagging and GitHub releases are managed under a single, unified `v$VERSION` release tag.
