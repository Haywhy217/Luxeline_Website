This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

# Luxeline

Luxeline is a Next.js storefront prototype with product pages, editorial collections and journal pages, a contact page, and a Supabase-backed owner dashboard.

## Run Locally

From `Luxeline_Website`:

```bash
npm ci
```

Copy `.env.local.example` to `.env.local`, then set the Supabase project URL, publishable/anon key, and store contact email. Apply `supabase/schema.sql` in the Supabase SQL editor. Create the owner account in Supabase Authentication, and disable public sign-ups if this is a single-owner store.

Start the development server:

```bash
npm run dev
```

The site runs at http://localhost:3000. The owner signs in at `/login`; product management is at `/dashboard`.

## Existing Products

New products are assigned to the signed-in owner. If products were created before ownership checks were added, assign them to the owner once in the Supabase SQL editor. Replace the placeholder with the owner's user ID from Supabase Authentication:

```sql
update public.products
set owner_id = 'YOUR-AUTH-USER-UUID'
where owner_id is null;
```

The schema keeps product reads public for the storefront, but restricts product changes to the authenticated account that owns each row. Product image uploads must be stored under that account's user ID folder.

## Current Scope

The cart persists in the shopper's browser and supports quantity changes and removal. Checkout prepares an order request in the shopper's email app; the store must confirm shipping, availability, and payment. No payment is collected and no order is stored by the site. Search and category filtering are not connected yet. Collections and journal content are static, and the contact page also hands off to the visitor's email app.

These gaps are intentionally deferred. The project is at a pause point for later automation work; there is currently no test script. A useful first automation milestone is a production build check plus smoke coverage for public product browsing and owner-only dashboard access.

## Commands

```bash
npm run dev
npm run lint
npm run build
npm start
```
