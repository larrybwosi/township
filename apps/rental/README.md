# Township Rental Hub

This is the Interactive Rental Hub portal for **Township**, built with **Next.js**, **React**, and styled with **Tailwind CSS v4**.

## 🚀 Features

- **Interactive Property Search**: Property browsing, dynamic pricing info, and direct booking details.
- **Sanity CMS Data Binding**: Pulls listings dynamically from Sanity CMS with custom offline mock datasets as fallbacks to ensure unconfigured build environments never fail.
- **Port Mapping**: Configured to run on port **3002** in both development and production.
- **Review System**: Allows renters to read and submit reviews for listed accommodations.

---

## 🏃 Run the Application

Execute commands from the root of the monorepo:

```bash
# Start development server on port 3002
pnpm --filter rental dev

# Production build
pnpm --filter rental build

# Start production server on port 3002
pnpm --filter rental start
```

---

## 🧪 Testing

Unit and integration tests are handled via **Vitest**:

```bash
pnpm --filter rental test
```
