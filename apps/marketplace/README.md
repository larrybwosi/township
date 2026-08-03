# Township Marketplace

This is the community local Marketplace application for **Township**, built with **Next.js**, **React**, and **Tailwind CSS v4**.

## 🚀 Features

- **Local Listings**: Allows users to post items, browse active local listings, and initiate trades or purchases.
- **CMS Content Integration**: Seamlessly syncs with Sanity CMS for list structures and image assets, supporting dynamic rendering with reliable offline fallback data.
- **Port Mapping**: Configured to run on port **3003** in both development and production.

---

## 🏃 Run the Application

Execute commands from the root of the monorepo:

```bash
# Start development server on port 3003
pnpm --filter marketplace dev

# Production build
pnpm --filter marketplace build

# Start production server on port 3003
pnpm --filter marketplace start
```

---

## 🧪 Testing

Testing is fully managed by **Vitest**:

```bash
pnpm --filter marketplace test
```
