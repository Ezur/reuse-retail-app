
# CLAUDE.md — Reuse Retail App Rebuild
**Project:** Construction Junction — Reuse Retail Application Rebuild  
**Prepared for:** O2 (Developer Handoff)  
**Document version:** 1.0  
**Last updated:** July 2026

---

## 1. Project Overview

This document defines the design, technical, and behavioral guidelines for rebuilding
the Reuse Retail application — a proprietary inventory intake and management tool used
exclusively by Construction Junction (CJ) warehouse and retail staff.

The rebuild targets **iPadOS (primary)** and **iOS mobile (secondary)**. The app is
used on CJ-owned tablets on the warehouse floor and dock. It must be fast, accessible,
and operable by staff with varying levels of technical literacy in a loud, physically
demanding environment.

This document covers the **MVP scope only**. AI features, guest access, admin/manager
views, and offline mode are explicitly out of scope for this build.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native (assumed — confirm with project lead before build) |
| UI Component Library | Ionic UI Framework |
| Design Language | Apple Human Interface Guidelines (HIG) |
| Target Platforms | iPadOS (primary), iOS (secondary) |
| Backend (MVP) | Supabase (mock backend — O2 to swap for Salesforce on production) |
| Language | JavaScript (exact framework TBD — React Native is current working assumption) |

> **Note for O2:** The Supabase connection is a mock backend for prototype validation
> only. The production app will connect to CJ's existing Salesforce instance via their
> proprietary Reuse Retail API layer. Do not architect the Supabase schema in a way
> that would make the Salesforce swap difficult. Mirror Salesforce field naming
> conventions wherever possible.

---

## 3. Accessibility Standards

All UI must comply with both of the following:

### 3.1 WCAG 2.1 (Level AA minimum)
- Minimum contrast ratio: **4.5:1** for normal text, **3:1** for large text and UI
  components
- All interactive elements must be keyboard/switch-accessible
- All images and icons must have descriptive `alt` text or `aria-label`
- No information conveyed by color alone — always pair with label, icon, or pattern
- Touch targets minimum **44x44pt** per Apple HIG (larger preferred for dock/gloved
  use)
- Focus indicators must be clearly visible at all times
- Error messages must be descriptive and not rely on color alone

### 3.2 COGA (Cognitive and Learning Disabilities Accessibility Guidelines)
- Use plain, simple language throughout — avoid jargon
- Break multi-step processes into clearly labeled, single-focus steps
- Provide clear, persistent progress indicators for multi-step flows
- Never auto-advance screens without user confirmation
- Avoid time-limited interactions
- Provide undo/back capability at every step
- Use consistent iconography and labeling — do not change button labels between screens
- Error recovery must be forgiving — pre-fill correctable values rather than clearing
  the form
- Avoid cognitive overload: show only the fields relevant to the current step
- Use familiar patterns (e.g., iOS camera UX, mobile check deposit framing guides)
  for photo capture

---

## 4. Design System

### 4.1 UI Framework
Use **Ionic UI components** styled to follow **Apple's Human Interface Guidelines**.
Ionic's component library should be the primary source of UI elements. Custom
components should only be built when Ionic does not provide an appropriate equivalent.

### 4.2 Brand Colors
Apply Construction Junction brand colors as the primary palette. Hex values below —
confirm final values with project lead before development begins, as a full brand style
guide is not yet available.

| Token Name | Hex | Usage |
|---|---|---|
| `--cj-primary` | #085420 | Warehosue Mode, Primary actions, active states |
| `--cj-secondary` | #D65737 | Retail Mode, Secondary actions, accents |
| `--cj-background` | #FFFFFF | App background |
| `--cj-surface` | #F5F3EE | Cards, modals, input backgrounds |
| `--cj-text-primary` | #000000 | Body text |
| `--cj-text-secondary` | #424242 | Labels, captions |
| `--cj-error` | #DC0000 | Error states |
| `--cj-success` | #C7EF4E | Confirmation states | (unsure if this should be the final choice)

> **Action item for Elise:** Provide final hex codes to O2 before UI build begins.
> All color tokens must pass WCAG 4.5:1 contrast ratio against their paired
> background before use.

### 4.3 Typography
Follow Apple HIG type scale. Use system fonts (SF Pro) unless CJ provides a brand
typeface. All body text minimum **16pt**. Labels minimum **14pt**. Do not use type
smaller than 12pt anywhere in the app.

### 4.4 Spacing and Layout
- iPad layout: use a **two-column or master-detail layout** where appropriate
  (e.g., D-number list + item detail side by side)
- Mobile layout: single-column stack
- Minimum padding around interactive zones: **16pt**
- Use Ionic's grid system for responsive layout across iPad and iPhone screen sizes

---

## 5. Label Printing

- Printing is triggered **from within the app** via Bluetooth
- Printer brand: **assumed Zebra** (confirm model with CJ before SDK integration)
- Label content must include:
  - Item name (auto-built from formula — see Section 8.3)
  - CJ Price
  - UPC barcode (auto-generated by Salesforce / mock backend)
  - QR code (links to Salesforce donation record)
  - Intake date (month/year — used for aging discount system)
  - Revenue share abbreviation if applicable (e.g., `BB` for Blessing Board,
    `AW` for Appliance Warehouse)
  - Quantity notation for sets (e.g., `1 of 3`, `2 of 3`)
- Label quantity must be adjustable with **+/- stepper buttons** directly on the
  print confirmation screen — do not require staff to navigate back into the form
  to change print quantity (this was a known pain point in v3.x)
- Saving an item auto-triggers label print by default (staff can disable per session
  in settings — future scope)

> **Action item for O2:** Confirm Zebra printer model with CJ and integrate
> appropriate Bluetooth SDK. Apple tablets pre-cache the printer connection;
> ensure the iOS/iPadOS implementation takes advantage of this to avoid the
> one-label-at-a-time print speed issue experienced with previous Android tablets.

---

## 6. Authentication

- Login is tied to **CJ's existing Salesforce user accounts**
- For the MVP prototype, authentication will be mocked via Supabase
- Login screen must include:
  - Username / email field
  - Password field
  - Submit button
  - "Remember Me" / persistent login toggle
- All roles see the **same permissions and views** in the MVP
- Role-based access control (manager/admin views) is **out of scope** for this build

---

## 7. App Structure and Navigation

### 7.1 Screen Flow Overview

```
Login Screen
    └── Mode Selection Screen
            ├── Warehouse Mode
            │       ├── Recent Donations (D-number list)
            │       ├── Donation Breakdown (per D-number)
            │       ├── Category Selection
            │       ├── Stock vs. Unique Decision
            │       └── Item Detail / Identification (Unique items)
            └── Retail Mode
                    ├── All Items (Inventory list)
                    ├── Item Detail
                    └── Cycle Count
```

### 7.2 Navigation Principles
- Use **bottom tab navigation** for top-level mode switching (Warehouse / Retail)
- Use iOS native **back navigation** (breadcrumb or back button) within flows — never trap
  the user in a dead end
- Warehouse Mode and Retail Mode are distinct contexts — switching between them
  should prompt confirmation if there is unsaved work in progress
- All multi-step flows must show a **step indicator** (e.g., Step 2 of 4)

---

## 8. Screen Specifications

### 8.1 Login Screen
- Fields: Username/email, Password
- Controls: Submit button, Remember Me toggle
- Validation: inline, on submit — do not clear password field on error
- No biometric login in MVP (future scope)

---

### 8.2 Mode Selection Screen
- Two large, clearly labeled buttons: **Warehouse Mode** and **Retail Mode**
- Display logged-in user name and a logout option
- No other content on this screen — keep it simple and fast

---

### 8.3 Warehouse Mode

#### 8.3.1 Recent Donations (D-number List)
- List of active D-numbers, sorted **most recent first**
- Each row shows: D-number, date, donor name (or "Anonymous Drop-Off"), item count
- Search/filter bar at top (filter by D-number, donor name, date)
- Pagination — do not load all records at once
- **"New Donation" action** creates a new anonymous D-number for the day's drop-off
- Revenue-share D-numbers (Blessing Board, Appliance Warehouse) are **pre-created
  by Terry** — staff select them from the list, they do not create them
- Revenue-share D-numbers should be **visually distinguished** in the list
  (e.g., badge or color indicator) so staff can identify them at a glance

#### 8.3.2 Donation Breakdown (per D-number)
- Header: D-number, date, donor info (anonymous or named)
- List of items already intaken under this donation
- **"Add Item"** button → starts item intake flow
- **"Print Label(s)"** button for batch printing existing items
- Revenue share status is shown in the header — read-only, pulled from D-number

#### 8.3.3 Category Selection
- 21 primary categories displayed as a **browsable grid or list**
- Each category shows its abbreviation code and full name
- Search field available at top — staff currently prefer browsing, but search
  must be present and functional
- Breadcrumb navigation showing current path (e.g., Appliances > Microwave)
- After selecting a primary category, drill into subcategory, then third-level
  options where applicable

**Full Category List (Level 1):**

| Code | Category Name |
|---|---|
| APP | Appliances |
| BML | Building Material and Lumber |
| CAB | Cabinets and Built-Ins |
| CLO | Clothing |
| CNT | Countertops and Tabletops |
| DOR | Doors |
| FLR | Flooring and Accessories |
| GDN | Garden and Outdoor |
| GLS | Glass, Mirrors, and Glass Block |
| HDW | Hardware, Tools, Electrical and Misc |
| HVA | Heating, Ventilation, A/C and Rads |
| HOF | Home, Office and Commercial Furnishings |
| CJM | Junction Made |
| KIT | Kitchen Sets and Accessories |
| LIG | Lighting and Ceiling Fans |
| MAS | Masonry and Finished Stone |
| PNT | Paint |
| PLB | Plumbing and Bath |
| SHL | Specialty Hardware and Lighting |
| TIL | Tile and Accessories |
| WIN | Windows, Shutters and Skylight |

**Example Subcategory Structure (APP — Appliances):**
- APP, Cooktop
- APP, Dishwasher
- APP, Freezer
- APP, Microwave
- APP, Other APP
- APP, Range
- APP, Range Exhaust Hood
- APP, Refrigerator
- APP, Small Appliance
- APP, Smalls/Not for Erply
- APP, Wall Oven
- APP, Washers and Dryers

**Example Third-Level (APP, Microwave):**
- Countertop Microwave, Used, Small (ASIS): $15.99
- Countertop Microwave, Used, Med/Larger (ASIS): $15.99

> **Action item for O2:** Full subcategory and third-level data for all 21
> categories must be provided by CJ before category selection can be built.
> Only APP subcategories are confirmed at this time.

#### 8.3.4 Stock vs. Unique Decision Screen
Present two options in this order (unique first, per Terry's v2 feedback):

1. **Create Unique Item** (primary, visually prominent)
2. **Use an Existing Stock Item** (secondary) Include a search bar and list out the third-level options below. 

**If Stock Item is selected:**
- Item name and price fields are **grayed out** (locked to the stock item's
  preset values)
- No photo required — stock photo placeholder is used automatically
- Additional Details and web-prep fields are **hidden**
- If a price change is needed, the item must be converted to a Unique Item instead
- Staff enter quantity using the `_ of _` format (see Section 8.3.5)

**If Unique Item is selected:**
- Full item detail form opens (see Section 8.3.5)

#### 8.3.5 Item Detail / Identification Screen (Unique Items)

**Item Name (auto-built — not a free-text field)**
- Formula: `Brand - Model - Style/Color/Material`
- Delimiter: hyphen ( `-` )
- The name field is **read-only** — it assembles automatically from the fields below
- Character limit: **230 characters** (matches Salesforce/WooCommerce description
  field limit confirmed in staff interviews)
- Show live character count as staff fill in component fields

**Component Fields (feed into item name formula):**

| Field | Required | Notes |
|---|---|---|
| Brand | Yes | Free text or "Unbranded" if unknown |
| Model | Yes | Free text |
| Style | Yes | Free text (e.g., "15-Light", "Panel") |
| Color | No | Free text or dropdown (TBD) |
| Material | No | Free text (e.g., "Mahogany", "Brass") |

**Special Characteristics (multi-select — not condition tier)**
- Salvage
- Refurbished
- Surplus
- Handmade
- Rare
- Fun

> **Note:** A separate Condition Tier field (e.g., Good / Better / Best) has been
> discussed but is **not included in the MVP** pending CJ leadership sign-off on
> terminology and policy. Do not build this field yet.

**Photo Capture**
- At least **one photo is required** before saving
- Camera opens in-app using device camera
- **Horizontal (landscape) orientation is required** — flag vertical photos with
  a clear inline warning and prompt to retake (do not block save, but make the
  warning prominent)
- Show a **photo tips panel** on first use (dismissible, with a "don't show again"
  option) with guided angle prompts: Front, Back, Side, Detail
- UX inspiration: Face ID setup screen, mobile check deposit framing overlay
- Multiple photos allowed — first photo is primary

**Pricing**

| Field | Required | Notes |
|---|---|---|
| CJ Price | Yes | Labeled "CJ Price" — not "Price" |
| Quantity | Yes | Uses `_ of _` format (e.g., `1 of 3`) — staff set both the unit number and total |

- Quantity `_ of _` format: two numeric inputs side by side, labeled clearly
- When total quantity > 1, the label printer will generate one label per unit
  (e.g., 3 labels for a set of 3), each printed with its unit number
  (e.g., `1 of 3`, `2 of 3`, `3 of 3`)
- This replaces hand-written set notation — the app generates it automatically

**Additional Details (optional — for web prep)**

| Field | Notes |
|---|---|
| Dimensions | Width, Height, Depth — separate fields, units selectable |
| Weight | Numeric, units selectable |

**Internal Fields (not customer-facing)**

| Field | Notes |
|---|---|
| Description | Internal reference for web copy — not published directly |
| Notes | Freeform internal notes (e.g., "fix picture", "flag for Terry") |

**Revenue Share Indicator**
- Read-only — pulled automatically from the parent D-number
- Displays as abbreviation on the label (e.g., `BB`, `AW`)
- Not editable by staff

**Mark for Web Toggle**
- Simple yes/no toggle
- Informational only — staff cannot push to web from the app
- Flags intent for Terry/web prep team to action in Salesforce

**Save / Print**
- **Save** button: saves item to Supabase (mock) / Salesforce (production)
- **Print Label(s)** button: triggers Bluetooth label print
- Saving does not auto-print in the prototype — confirm with CJ whether
  auto-print on save should be the default in production

---

### 8.4 Retail Mode

#### 8.4.1 All Items (Inventory List)
- Search bar at top (searches item name/title)
- Filter/sort options:
  - Category
  - Status
  - **Date Modified** (must be included — was removed in a prior version and
    staff rely on it)
- List view: item name, CJ price, status tag
- **Sold-out items do not appear** in Retail Mode — only items with current
  on-hand quantity > 0 are shown
- Bottom navigation bar: New Item | Cycle Count | Scan Barcode | Dashboard

#### 8.4.2 Item Detail (tap to expand)
- Full item info: photo(s), name, price, description, notes, revenue share
  indicator, date intaken
- **Reprice:**
  - If zero units have been sold: price updates in place, same UPC retained
  - If any units have been sold: repricing generates a **new UPC** to preserve
    sales history — inform staff of this with a clear inline explanation before
    confirming
- **Remove:** staff select a reason from:
  - Trash
  - Scrap
  - Shrink *(reserved for theft only — label this clearly)*
  - Trash and Scrap are tracked separately from Shrink for reporting purposes
- **Split:** breaks a quantity/set into separate sellable units

#### 8.4.3 Cycle Count
- Entry via: category selection or barcode scan
- Running count tally displayed prominently
- Increment count via barcode scan or manual tap
- Show dollar value of counted inventory (not just unit count — CJ tracks
  value more than shrink during cycle counts)
- Designed to support **partial counts** (by zone or category) so CJ can
  do more frequent counts without closing the store
- Full annual count (whole-store, store-closed) is the current baseline —
  the app should make smaller, more frequent counts easy enough to encourage
  adoption

---

## 9. Known Pain Points to Address in Rebuild

These are documented issues from staff interviews that the rebuild must resolve:

| Pain Point | Source | Resolution in Rebuild |
|---|---|---|
| App defaults to basic data entry — staff should use complex/structured version | Terry (4/30 interview) | Default to structured field entry (Brand, Model, Style, etc.) — remove the basic free-text name option for unique items |
| Print quantity can't be adjusted with +/- buttons — must re-enter the form | Terry (4/30 interview) | Add stepper (+/-) directly on print confirmation screen |
| Date Modified filter was removed | John (5/21 interview) | Restore Date Modified as a sort/filter option in Retail Mode |
| Stock items in revenue-share donations cause tracking failures | Terry (4/30 interview) | Revenue-share D-numbers visually flagged; stock item selection blocked or warned when parent D-number is a revenue-share agreement |
| Horizontal photo requirement not enforced | Terry (4/30 interview) | Inline warning on vertical photo capture — prompt to retake |
| Inconsistent item naming | Multiple interviews | Auto-build item name from structured fields — remove free-text name for unique items |
| App was not Apple-approved for a period — moved to Android, causing slow print speeds | John (4/30 interview) | Build for iPadOS/iOS from the start; leverage Apple's printer pre-caching |

---

## 10. Out of Scope for MVP

The following are explicitly **not** included in this build:

- Offline mode / local data sync
- Guest or read-only access
- Manager / admin role views or permissions
- AI-assisted features (object detection, price prediction, auto-descriptions)
- Condition Tier field (Good / Better / Best) — pending CJ policy decision
- Biometric login
- Direct web push to WooCommerce from the app
- Erply / POS integration
- Any Salesforce Lightning UI components — prototype uses Supabase mock only

---

## 11. Open Decisions (Do Not Build Until Resolved)

| Item | Status | Owner |
|---|---|---|
| Final brand hex color codes | Pending | Elise to provide to O2 |
| Bluetooth printer brand and model | Pending | CJ to confirm (assumed Zebra) |
| Label dimensions | Pending | CJ to confirm |
| Full subcategory list (all 21 categories, levels 2 and 3) | Pending | CJ to provide |
| Color field: free text vs. dropdown | Pending | Design decision |
| Auto-print on save: yes/no default | Pending | CJ to confirm |
| Condition Tier field terminology and policy | Pending — out of MVP scope | CJ leadership |
| JavaScript framework confirmation (React Native assumed) | Pending | Elise / O2 to confirm |
| Supabase schema / data model | Pending | O2 to define, mirroring Salesforce field names |

---

## 12. Handoff Notes for O2

- This document represents the **MVP prototype scope** as defined by the CMU
  capstone team in collaboration with Construction Junction staff
- The Supabase backend is a **temporary mock** — all field names and data
  structures should be designed to make the eventual Salesforce swap as clean
  as possible
- CJ's Salesforce consultant (Jeff) should be looped in before production
  backend work begins
- The current app is version 3.2 / 3.3 — treat this as a ground-up rebuild,
  not a patch
- Staff using this app range from highly tech-comfortable to low digital
  literacy — every interaction must be designed for the least experienced
  user on the team
- The warehouse environment is loud, physically demanding, and high-interruption
  — design for **quick task recovery** (staff get interrupted constantly and
  need to pick up where they left off)
```
