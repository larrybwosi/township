# Township Main Client Web Application

This is the main client-facing web portal for **Township**, built with **Next.js**, **React**, and **Tailwind CSS v4**.

## 🚀 Features

- **Sanity CMS Integration**: Dynamic rendering of rich homepage, explore section, and institution pages utilizing `@sanity/client` and Sanity CMS schemas.
- **Optimized Media Delivery**: Serving optimized WebP image URLs via the `@sanity/image-url` builder and `resolveImageUrl` helper, with robust mock data fallbacks.
- **Server-Side Fetching**: Custom server-side `safeSanityFetch` helper ensuring graceful offline fallback data when Sanity is unconfigured.
- **Real-Time Visual Editing**: Live content revalidation and update previews using `<SanityLive />`.
- **Runtime Env Injection**: Environment variables are injected dynamically via the root layout into `window.__ENV` to ensure zero-prebake environment flexibility during production builds.
- **Port Mapping**: Configured to run on port **3000**.

---

## 🏃 Run the Application

Execute commands from the root of the monorepo:

```bash
# Start development server on port 3000
pnpm --filter web dev

# Production build
pnpm --filter web build

# Start production server
pnpm --filter web start
```

---

## 🧪 Testing

Unit and integration tests are handled via **Vitest**:

```bash
pnpm --filter web test
```
