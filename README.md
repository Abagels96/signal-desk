# Signal Desk

A **local-first** editorial control room for AI-assisted content. Drafts, sessions, template favorites, and preferences stay in your browser — **no backend** in this build (mock data + `localStorage` via Zustand).

## Stack

- **Next.js** 16 (App Router), **React** 19  
- **Tailwind CSS** 4  
- **Zustand** + `persist` for the Signal store  
- Fonts: Geist, Geist Mono, DM Serif Display  

## Features

- **Dashboard**, **Generate**, **Drafts**, **Templates** (gallery + detail), **Insights**, **Productivity**, **Settings**
- **Appearance**: **Light**, **Dark**, or **System** (follows OS `prefers-color-scheme`). Toggle from the **site header** or **Settings → Appearance**. Theme is applied on `<html data-signal-appearance="light|dark">` (system is resolved to light or dark).
- Glass-style UI, command chips, and editorial layouts tuned for both themes

## Scripts

```bash
npm run dev       # dev server (webpack)
npm run dev:turbo # optional: Next dev with Turbopack
npm run build     # production build
npm run start     # run production server
npm run lint      # ESLint
```

Open [http://localhost:3000](http://localhost:3000) after `npm run dev`.

## Data & storage

- Persisted under a single store key (see `STORAGE_KEYS` in `src/lib/storage.ts`)
- **Settings → Reset demo data** restores bundled seed drafts/sessions; **appearance** is kept

## Deploy

Any static-friendly host that supports Next.js works (e.g. [Vercel](https://vercel.com), Node adapter for other platforms). Configure `basePath` / asset URLs if the app is not served from the site root (`src/lib/base-path.ts`).

---

Bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). See [Next.js documentation](https://nextjs.org/docs) for framework details.
