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

## GitHub, Vercel, and Supabase setup

This repository is now structured for:

- GitHub source control with a basic CI workflow in [.github/workflows/ci.yml](/Users/marksmith/braemar-butcher/.github/workflows/ci.yml)
- Vercel static deployment with route rewrites in [vercel.json](/Users/marksmith/braemar-butcher/vercel.json)
- Supabase local or hosted projects with config, migration, and seed files in [/supabase](/Users/marksmith/braemar-butcher/supabase)

### GitHub

1. Run `git init -b main`
2. Run `git add .`
3. Run `git commit -m "Initial project setup"`
4. Create a GitHub repository and connect it with `git remote add origin <your-repo-url>`
5. Run `git push -u origin main`

### Vercel

1. Create a new Vercel project and import the GitHub repository
2. Leave the framework preset as `Other`
3. Keep the root directory as the repository root
4. Add any required env vars from [.env.example](/Users/marksmith/braemar-butcher/.env.example)
5. Deploy

Vercel will serve the static site and map `/shop`, `/visit`, `/staff`, and `/dashboard` to the existing HTML files.
The repo also includes a lightweight serverless endpoint at [api/config.js](/Users/marksmith/braemar-butcher/api/config.js) so the browser can load the public Supabase URL and anon key from Vercel environment variables.

### Supabase

1. Create a Supabase project
2. Copy the project URL and keys into `.env.local`
3. Apply [supabase/migrations/202603130001_initial_schema.sql](/Users/marksmith/braemar-butcher/supabase/migrations/202603130001_initial_schema.sql)
4. Load [supabase/seed.sql](/Users/marksmith/braemar-butcher/supabase/seed.sql) for demo data

If you use the Supabase CLI locally, the project is already laid out for `supabase start`, `supabase db reset`, and future migrations.
The storefront fetches live product data through Supabase using the public keys exposed by [api/config.js](/Users/marksmith/braemar-butcher/api/config.js), while the rest of the dashboard remains prototype-only until more backend tables are added.

## Database foundation

The `/database` folder now contains a PostgreSQL starter schema and seed data for the backend:

- [database/schema.sql](/Users/marksmith/braemar-butcher/database/schema.sql): core tables, constraints, indexes, and `updated_at` triggers
- [database/seed.sql](/Users/marksmith/braemar-butcher/database/seed.sql): sample admin, staff, client, product, order, saved list, invoice, and payment records

The schema covers the main roles and customer account flows:

- `app_users`: shared login table for admin, staff, and client accounts
- `staff_profiles`: operational permissions for stock, order, client, and billing work
- `client_profiles` and `client_addresses`: client account details and default billing or delivery destinations
- `customer_orders` and `order_items`: ordering history and fulfilment records
- `saved_lists` and `saved_list_items`: repeat-order lists for quick reordering
- `invoices`, `invoice_items`, and `invoice_payments`: invoice history and payment tracking

This gives the future backend enough structure to support:

- Admin access to staff and client accounts
- Staff handling of orders, fulfilment, invoicing, and client support
- Client login to place orders, view previous orders, reuse saved lists, and review invoices

## What still needs a real backend

- Authentication implementation on top of the new user tables
- API endpoints or an ORM layer wired to the SQL schema
- Persistent inventory, batch, and traceability data connected to the live dashboard
- Barcode or QR generation tied to real trace records
- Label printer integration
- Payments, checkout, and delivery scheduling
- Audit history and compliance reporting
