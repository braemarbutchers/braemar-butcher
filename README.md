# Davidson's Family Butcher Front-End Prototype

This workspace contains a dependency-free front-end prototype for:

- A customer-facing webshop
- A public home page and visit/contact page
- A separate staff login and operations dashboard
- A backend-ready relational database design for users, orders, repeat lists, and invoices
- Stock management for production and fulfilment
- Meat traceability by batch
- Label generation with print preview

## Run locally

Open [index.html](/Users/marksmith/braemar-butcher/index.html) in a browser, or serve the folder with a simple static server.

If you want a local server that behaves more like deployment:

1. Run `npm install`
2. Run `npm start`

## Page structure

- [index.html](/Users/marksmith/braemar-butcher/index.html): public home page
- [shop.html](/Users/marksmith/braemar-butcher/shop.html): customer webshop
- [visit.html](/Users/marksmith/braemar-butcher/visit.html): opening hours and contact details
- [staff-login.html](/Users/marksmith/braemar-butcher/staff-login.html): staff portal entry
- [dashboard.html](/Users/marksmith/braemar-butcher/dashboard.html): stock, traceability, and label tools

## Current scope

The app uses in-browser sample data and demonstrates the intended workflows:

- Browse featured products on the home page
- Add webshop products to a basket
- Reduce inventory when orders or production usage are recorded
- Inspect batch origin and chain-of-custody events
- Update and print a product label preview

## Vercel and Supabase setup

This repository is now structured for:

- Vercel static deployment with route rewrites in [vercel.json](/Users/marksmith/braemar-butcher/vercel.json)
- A lightweight runtime config endpoint in [api/config.js](/Users/marksmith/braemar-butcher/api/config.js)
- Supabase local or hosted projects with config, migration, and seed files in [supabase](/Users/marksmith/braemar-butcher/supabase)

### Vercel

1. Create a new Vercel project and import this repository
2. Leave the framework preset as `Other`
3. Keep the root directory as the repository root
4. Set `SUPABASE_URL` and either `SUPABASE_ANON_KEY` or `SUPABASE_PUBLISHABLE_KEY`
5. Deploy

Vercel will serve the static site and map `/shop`, `/visit`, `/staff`, and `/dashboard` to the existing HTML files.
The [api/config.js](/Users/marksmith/braemar-butcher/api/config.js) endpoint exposes the public Supabase URL and browser key from Vercel environment variables.

### Supabase

1. Create a Supabase project or run `supabase start` locally
2. Apply [supabase/migrations/202603130001_initial_schema.sql](/Users/marksmith/braemar-butcher/supabase/migrations/202603130001_initial_schema.sql)
3. Load [supabase/seed.sql](/Users/marksmith/braemar-butcher/supabase/seed.sql) for demo data

The migration uses `auth.users` for sign-in and creates app-level profile tables plus row-level security in `public`.
The seed creates sample auth users for `admin@braemarbutcher.co.uk`, `counter@braemarbutcher.co.uk`, `production@braemarbutcher.co.uk`, `alice.macleod@example.com`, and `thefifearms@example.com`.

## Supabase foundation

The backend is now structured for Supabase:

- [supabase/migrations/202603130001_initial_schema.sql](/Users/marksmith/braemar-butcher/supabase/migrations/202603130001_initial_schema.sql): schema, triggers, helper functions, and row-level security policies
- [supabase/seed.sql](/Users/marksmith/braemar-butcher/supabase/seed.sql): seeded auth users, profiles, products, orders, saved lists, invoices, and payments
- [supabase/config.toml](/Users/marksmith/braemar-butcher/supabase/config.toml): local Supabase CLI configuration

The Supabase model uses:

- `auth.users` as the source of truth for sign-in accounts
- `public.profiles` for app roles: admin, staff, and client
- `public.staff_profiles` for operational permissions
- `public.client_profiles` and `public.client_addresses` for client account data
- `public.customer_orders` and `public.order_items` for order history
- `public.saved_lists` and `public.saved_list_items` for fast repeat ordering
- `public.invoices`, `public.invoice_items`, and `public.invoice_payments` for billing history

Role-aware row-level security is included so:

- admins can manage the full dataset
- staff access is permission-based for inventory, orders, clients, and billing
- clients can only view and manage their own account, addresses, orders, saved lists, and invoices

## Local setup

With the Supabase CLI installed, use:

1. `supabase start`
2. `supabase db reset`

The seed creates sample accounts with the password `ChangeMe123!`. Change those before any non-local use.

## What still needs a real backend

- Frontend auth and data fetching wired to Supabase from the app
- API routes or server actions for privileged admin or staff workflows on Vercel
- Persistent inventory, batch, and traceability data connected to the live dashboard
- Barcode or QR generation tied to real trace records
- Label printer integration
- Payments, checkout, and delivery scheduling
- Audit history and compliance reporting
