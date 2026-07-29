# Reuse Retail

A tablet-first inventory app for [Construction Junction](https://cjreuse.org), Pittsburgh's nonprofit building-material reuse retailer. Staff use it on the warehouse floor to check in donations, catalog and price items, and keep store inventory accurate — replacing an aging legacy system with a cleaner, more guided workflow designed for a wide range of tech comfort levels.

## What it does

The app has two modes, chosen after login:

### Item Intake (green)

The donation side of the house.

- **Donors** — a sortable, filterable table of donation records (drop-offs and pickups), with recent-donor shortcuts, QR-code lookup, and one-tap creation of anonymous dock donations ("Create New Day").
- **Donated Items** — every item in a donation, with name, category, UPC, quantity, price, and photos.
- **Inventory Form** — a guided wizard for cataloging an item: category → subcategory → reuse/stock item, then brand, model, condition, dimensions, and photos (taken with the camera or picked from the camera roll). "Print & Save" persists the item and prints its label.

### Manage Inventory (orange)

The retail side.

- **All Items** — the full store inventory with search (name, category, or UPC), filters, and column sorting.
- **Edit Item** — reprice, update details, add photos, or remove items. The header shows exactly which item you're editing, and the Back button becomes a confirm-guarded Cancel whenever there are unsaved changes.
- **Cycle Count** — staff pick their name and count stock area by area, with a barcode-driven "find the item → check the details → enter your count" flow built for speed and large touch targets.

## Design principles

- **Tablet-first** — layouts, type sizes, and spacing tuned for iPads mounted at intake stations; responsive down to phone widths.
- **Accessible by default** — 44px+ touch targets, persistent field labels, WCAG-checked text contrast, and plain-language helper text throughout.
- **Guided but familiar** — screens keep the structure of the legacy system staff already know, with subtle section grouping and clear primary actions instead of wholesale redesigns.
- **Consistent everywhere** — shared modals, sort/filter behavior, table layouts, and brand tokens (`#085420` green for intake, `#D65737` orange for retail) across every screen.

## Tech stack

| Layer | Choice |
|---|---|
| UI | React 18 + Vite 5, plain JavaScript/JSX, inline styles |
| Routing | React Router v7 (`HashRouter`) |
| Backend | [Supabase](https://supabase.com) — Postgres (`donors`, `items`), Storage (`item-photos` bucket) |
| Native shell | Capacitor (iPad deployment as `com.constructionjunction.reuseretail`) |

Items get a sequential 12-digit UPC assigned by a Postgres sequence at insert, and item photos upload to Supabase Storage on save with their URLs stored on the item row. Screens fall back to built-in mock data when a record isn't Supabase-backed, so the full UI is explorable without a database.

## Getting started

```bash
npm install
npm run dev
```

Create a `.env` file with your Supabase project credentials:

```
VITE_SUPABASE_URL=https://<project>.supabase.co
VITE_SUPABASE_ANON_KEY=<publishable key>
```

Then open `http://localhost:5173`. Any email and a 4+ character password gets past the prototype login.

Other scripts: `npm run build` (production build to `dist/`), `npm run preview` (serve the build), `npm run lint`.

## Project structure

```
src/
  App.jsx                 # Routes (login → mode select → intake/retail flows)
  components/             # Shared UI: modals (Sort/Filter), NewItemFlow wizard,
                          #   BackButton, UserMenu, Toast
  screens/                # One file per screen
  hooks/useLayout.js      # Responsive breakpoints, header height, spacing
  lib/supabase.js         # Supabase client, photo upload helper, mock sign-in
  assets/                 # Logos and SVG buttons
```
