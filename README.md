Mazad Yaghi is an auction catalog and admin app built with Next.js, React, Tailwind CSS, and Supabase.

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

## Admin product management

Sign in at `/login`, then open `/admin/products` to add, edit, delete, search, and reorder products. New items are appended to the list. Reordering or deleting products renumbers the remaining lots consecutively, and the `Lot` entry in each product's specs is kept in sync. Product changes are read from the Supabase `products` table by the public catalog and auction pages.

Configure these server-side environment variables in `.env.local` and in the deployment environment:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY` (server-only; used for admin database operations)
- `SUPABASE_PRODUCT_BUCKET` (optional; Storage bucket name, defaults to `mazad-bucket`)
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET` (recommended, separate signing secret; falls back to `SUPABASE_SECRET_KEY` if unset)

Never prefix the Supabase secret key or admin credentials with `NEXT_PUBLIC_`. Product image uploads use the **public** Supabase Storage bucket `mazad-bucket` by default (or the bucket specified by `SUPABASE_PRODUCT_BUCKET`). Uploaded files are stored under `items/` and their public URL is saved in the product row. You can also use a local public path such as `/products/item.jpg` or paste a direct image URL.

## Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npm run lint
npx tsc --noEmit
npm run build
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
