# Mazad Yaghi

Mazad Yaghi is a product-catalog and live auction control application built with Next.js 16, React 19, and Supabase. Visitors can browse auction lots and read the auction terms. Signed-in administrators manage the catalog and control the live auction display.

## Contents

- [Requirements](#requirements)
- [Run locally](#run-locally)
- [Configure Supabase](#configure-supabase)
- [Environment configuration](#environment-configuration)
- [Using the application](#using-the-application)
- [Deploy](#deploy)
- [Validation](#validation)
- [Troubleshooting](#troubleshooting)

## Requirements

- Node.js 20.9 or later
- npm
- A Supabase project for the catalog, auction state, and optional product-image uploads

## Run locally

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Configure the environment variables listed below in a local `.env.local` file. Enter the values from your own Supabase project and your own administrator account; **do not put credential values in this README, source control, screenshots, or public deployment logs**. Environment files are ignored by Git in this project.

3. Set up the Supabase tables and, if using image uploads, the Storage bucket (see [Configure Supabase](#configure-supabase)).

4. Optionally load the starter catalog into Supabase:

   ```bash
   npx tsx scripts/migrate-products.ts
   ```

   This imports or updates the starter items in `app/data/products.ts` by ID and initializes the auction row. It does not remove other rows from the database. Run it only when you intend to import that starter catalog; it can overwrite existing rows with matching IDs and resets the auction to stopped at the first lot.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Visit [http://localhost:3000](http://localhost:3000).

The application reads its catalog and auction state from Supabase, or from the local offline snapshot when one has been downloaded (see [Offline auction mode](#offline-auction-mode)). The TypeScript product list is the optional seed data for the migration script, not a local fallback when the database is unavailable.

## Configure Supabase

### Environment variables

Set these variable **names** in `.env.local` for local development and in the deployment provider for production. This documentation intentionally contains no credential values.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL. Used by the server for catalog, auction, and Storage operations. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | No | Only used as a safeguard by the upload route to detect a misconfigured secret key. The browser no longer connects to Supabase directly. |
| `SUPABASE_SECRET_KEY` | Yes | Server-only Supabase secret key used by the application and seed script for database administration and Storage operations. Never prefix it with `NEXT_PUBLIC_`. |
| `ADMIN_USERNAME` | Yes | Username checked by the admin login endpoint. |
| `ADMIN_PASSWORD` | Yes | Password checked by the admin login endpoint. |
| `ADMIN_SESSION_SECRET` | Recommended | Separate secret for signing admin sessions. If omitted, the app falls back to `SUPABASE_SECRET_KEY`. |
| `SUPABASE_PRODUCT_BUCKET` | No | Public Storage bucket for product images; defaults to `mazad-bucket`. |
| `SUPABASE_PRODUCT_BUCKET_CAPACITY_MB` | No | Optional capacity estimate used to show remaining space in the admin storage meter. It does not enforce a Supabase bucket limit. |
| `NEXT_PUBLIC_SITE_URL` | No | Public site URL used for canonical URLs, Open Graph tags, and the sitemap. Defaults to `https://mazad-yaghi.vercel.app`. Set it to your custom domain (for example `https://mazadyaghi.com`) if you add one. |

Keep all real values in private environment configuration. Never commit `.env.local`, put secret keys or admin credentials in client-side code, or expose the Supabase secret key to the browser. The publishable key is used only for Realtime subscriptions; privileged database changes go through authenticated server routes.

### Database tables

The application expects `public.products` and `public.auction`. If you are setting up a new project, the following is a compatible starting schema:

```sql
create table if not exists public.products (
  id text primary key,
  lot integer not null,
  name text not null,
  code text,
  current_bid numeric not null default 0,
  image text,
  accent text,
  description text,
  details jsonb not null default '[]'::jsonb,
  specs jsonb not null default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.auction (
  id integer primary key,
  current_lot integer not null default 1,
  status text not null default 'stopped'
    check (status in ('stopped', 'sold'))
);
```

The auction state is stored in the row with `id = 1`; the migration script creates or updates it. Product `details` are a JSON array of strings, and `specs` are JSON arrays of `[label, value]` pairs. Lot numbers are positive integers, should be unique, and are kept in sync with the catalog order by the admin tools. Do not add a database uniqueness constraint to `lot`: the admin reordering operation updates lot values in place.

The application uses the server-only secret key for its database reads and writes. Live bid and auction updates reach the `/mazad` display through a server-sent events stream from the application server, so the Supabase Realtime publication is optional. To keep Supabase Realtime available as a secondary channel, configure Supabase as follows:

1. In the Supabase dashboard, enable **`public.products`** and **`public.auction`** for the `supabase_realtime` publication (Database → Publications/Replication). Do not add a table again if it is already included.
2. If row-level security is enabled, allow `SELECT` for the `anon` role on the public auction data so the browser Realtime subscriptions can receive updates. Keep writes restricted to the server-side admin routes; do not grant anonymous insert, update, or delete access.

### Product image storage (optional)

Create a **public** Supabase Storage bucket. The default bucket name is `mazad-bucket`; if you use another name, set `SUPABASE_PRODUCT_BUCKET` consistently in the local and deployment environments. Admin uploads accept JPG, PNG, WEBP, and GIF files smaller than 8 MB and place them under `items/`. The image's public URL is saved in the product row.

You can also use a path from the app's `public` directory (for example, `/products/item.jpg`) or paste an image URL instead of uploading. The admin storage meter counts objects in the configured bucket. Set `SUPABASE_PRODUCT_BUCKET_CAPACITY_MB` if you want it to display remaining capacity; Supabase Storage does not expose a bucket-wide capacity limit through the API, so this number is only a display estimate.

## Using the application

### Public catalog

- **`/` — Auction List:** Browse the current catalog. Search matches item names and product codes. Select a product card to open its detail view.
- **`/item/<product-id>` — Item detail:** View the selected item's image, product code, description, specifications, and details. Use the previous/next controls to move through the catalog.
- **`/rules` — Auction Rules:** Read the auction terms in English and switch to Arabic with the language button. The page includes the participation deposit and the other published auction rules.

### Administrator sign-in

1. Open **`/login`** and enter the administrator username and password configured in the private environment.
2. After signing in, open **`/admin/products`** to manage the catalog or **`/mazad`** to view the live auction screen. Both routes require a valid admin session; `/mazad` is not an unauthenticated public route.
3. Use **Sign out** in the admin console when finished. Admin sessions are stored in an HTTP-only cookie and expire after 12 hours.

### Manage products — `/admin/products`

The **Products** tab provides catalog management:

- **Add product:** A new product is appended to the end of the catalog and receives the next lot number. A name is required; product code, bid, image, accent color, description, details, and specifications can be supplied in the editor.
- **Edit product:** Update its information or change its lot number to move it in the order. The lot number in the specifications is maintained automatically.
- **Images:** Enter a local public path or image URL, or upload a JPG, PNG, WEBP, or GIF under 8 MB. Uploads require the configured public Storage bucket and a server-side secret key.
- **Details and specifications:** Enter one detail per line. Enter specifications one per line in `label: value` format. Lot is managed from the product order and is not entered as a regular specification.
- **Search:** Filter by product name, code, or lot number. Clear the search before reordering.
- **Reorder:** Drag rows or use the up/down arrows. The saved order renumbers lots consecutively and updates each item's Lot specification. Adding, moving, or deleting items can therefore change lot numbers.
- **Delete one:** Removes the selected product and renumbers the remaining lots. If its image is in the configured bucket, that uploaded image is also removed.
- **Delete selected:** Tick the checkboxes (or use the header checkbox to select everything currently shown) and use **Delete selected** to remove several products at once with their uploaded images. Remaining lots are renumbered and the offline snapshot is updated automatically.
- **Delete all items:** Permanently deletes all catalog rows and matching uploaded product images, and resets the auction to stopped at lot 1. This action is destructive; use it only when you intend to clear the catalog.
- **Image storage:** Shows bucket usage. If a capacity estimate is configured, it also displays estimated remaining capacity. Use **Refresh** to recalculate.

### Run the live auction — admin **Live bid** tab and `/mazad`

The **Live bid** tab in `/admin/products` controls the item shown on the `/mazad` display. Keep the display open on the presentation screen; it updates in real time when the admin changes the current bid or auction state.

1. Select **Live bid** in the admin console. The panel follows the currently selected lot.
2. Edit **Current bid ($)**. A valid non-negative amount is saved automatically after a short pause; the UI reports whether it saved.
3. Select **SOLD** when the lot is sold. The `/mazad` display shows a SOLD overlay with the current bid briefly.
4. Select **Next** to advance to the next lot. Next is available after marking the current lot SOLD. **Previous** moves back and reopens bidding for that lot.

The `/mazad` page is a display, not a bidder-facing bid submission form. Bid amounts and auction progression are controlled by an administrator. Bid changes reach the display through a server-sent events stream (`/api/auction/stream`) from the application server itself; Supabase Realtime is not required.

### Offline auction mode

The **Offline auction data** card in `/admin/products` prepares the application to run the live auction without an internet connection:

- **Download offline data:** Downloads every product with its image from the Supabase database and bucket onto the application server. Images are written under `public/offline/` and the catalog is written to `offline/snapshot.json` (both are machine-local and ignored by Git). While a snapshot exists, `/mazad`, `/admin/products`, and the public catalog load from that local copy, and bid and auction changes are written to the snapshot first and pushed to the display over server-sent events. Supabase is still updated best-effort in the background so the database stays the master copy while online.
- **Update offline data:** Regenerate the snapshot after changing the catalog (add, edit, reorder, or delete products) so the local copy stays current. Catalog changes made while a snapshot exists are also mirrored into it automatically.
- **Turn off:** Deletes the snapshot and the local image copies; the application reads from Supabase again.

Running the auction offline only requires the admin browser and the display screen to reach the application server (for example, over the venue LAN); no connection to Supabase is needed while bidding. If a bid is submitted with no internet connection and no snapshot, the request fails with a message telling you to download the offline data first.

## Deploy

Deploy as a Node.js Next.js application. Install dependencies with `npm ci`, configure the same required environment variable names in the hosting provider (using private values), and make sure the production Supabase project has the expected tables, Realtime settings, and optional public Storage bucket. Build and start with:

```bash
npm run build
npm run start
```

The `NEXT_PUBLIC_` variables are included in browser-side code as configured at build time; the Supabase secret key and admin credentials must remain server-only. If changing environment values for a deployment, rebuild/redeploy as required by the hosting provider.

## Validation

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Troubleshooting

- **Catalog or auction page fails to load:** Check the Supabase project URL and server-only secret configuration, and confirm that both expected tables and queried columns exist.
- **Admin page redirects to login:** Sign in again. The admin session expires after 12 hours; also verify the administrator username/password environment settings if login is rejected.
- **Bid changes do not reach the display screen:** Confirm the admin browser and the display browser can reach the application server (open `/api/auction/stream` in the display browser to check the event stream). If you use Supabase Realtime as a secondary channel, also confirm that both tables are in the `supabase_realtime` publication and that anonymous `SELECT` is allowed when RLS is enabled.
- **Image upload fails:** Verify the bucket exists in the configured project, is public, and that the server is using the server-side secret key rather than the publishable/anonymous key. Confirm that the selected file is a supported image type and smaller than 8 MB.
- **Storage meter shows usage but no remaining capacity:** Set a positive `SUPABASE_PRODUCT_BUCKET_CAPACITY_MB` value in the private environment; it is for display only and does not impose a bucket limit.
- **No images for local paths:** Confirm the image file exists under the app's `public` directory and that the saved path begins with `/`.
