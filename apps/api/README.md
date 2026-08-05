# Township API Service

This is the central monolithic backend application for the **Township** ecosystem, built with [NestJS](https://nestjs.com).

## 🚀 Features

The Township API is designed as a modular, high-performance in-process monolith that houses all crucial server-side logic:

- **Authentication Module**: Secure JWT-based registration and login, utilizing passport strategies.
- **RBAC (Role-Based Access Control)**: Enforces access levels for roles: `ADMIN`, `PRODUCER`, `CUSTOMER`, `RENTER`, and `HOMEOWNER`.
- **Towns Module**: Manages metadata, municipal structures, and regional details.
- **Real Estate Module**: Handles property listings, specifications, and physical locations.
- **Marketplace Module**: Power local listings, offers, search, and exchange information.
- **Database Connection**: Managed centrally via a global `PrismaModule` and `PrismaService` which communicates with PostgreSQL.

---

## 🛠️ Project Setup

From the root of the monorepo, make sure dependencies are installed:

```bash
pnpm install
```

Ensure the Prisma Client is generated:

```bash
pnpm --filter @repo/database exec prisma generate
```

---

## 🏃 Run the Application

You can execute the API commands from the root using the filter `--filter api`:

```bash
# Development (watch mode)
pnpm --filter api dev

# Debug mode
pnpm --filter api start:debug

# Production build & run
pnpm --filter api build
pnpm --filter api start:prod
```

---

## 🧪 Testing

Testing is fully integrated using **Vitest** with SWC compiling (`unplugin-swc`) for maximum speed. In E2E tests, the `PrismaService` is mocked or overridden to bypass direct PostgreSQL connectivity requirements, ensuring database-free test reliability in CI environments.

```bash
# Run unit and integration tests
pnpm --filter api test

# Run End-to-End (E2E) tests
pnpm --filter api test:e2e

# Run test coverage
pnpm --filter api test:cov
```
