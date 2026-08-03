# Township Documentation Portal

This is the developer and system documentation portal for **Township**, built with **Next.js** and **React**.

## 🚀 Features

- **Developer Guides**: API structures, workflow integration instructions, and database model documentations.
- **System Design Map**: Outlines the architectural guidelines for the NestJS API monolith, Turborepo tasks, and the Next.js apps.
- **Port Mapping**: Runs on port **3001** to prevent conflicts with other frontend services.

---

## 🏃 Run the Application

Execute commands from the root of the monorepo:

```bash
# Start development server on port 3001
pnpm --filter docs dev

# Production build
pnpm --filter docs build

# Start production server
pnpm --filter docs start
```

---

## 🧪 Testing

Unified tests are executed with **Vitest**:

```bash
pnpm --filter docs test
```
