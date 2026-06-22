# Implementation Plan — Weight Range & Customer App Enhancements

## Overview

Two parallel workstreams: **Customer App** (pickup flow enhancements) and **Admin App** (weight range CRUD + new fields on service/inventory/bundling forms).

The backend API already supports all required endpoints. This plan covers **frontend-only** work.

---

## Files to Create

### New Route & Module

| File | Purpose |
|------|---------|
| `lib/modules/weight-ranges/data.ts` | `WeightRangesApi` class — `getAll()`, `create()`, `update()`, `toggleActive()` |
| `lib/modules/weight-ranges/schema.ts` | Zod schemas: `addWeightRangeSchema`, `updateWeightRangeSchema`, `WeightRange` type |
| `lib/modules/weight-ranges/actions.ts` | next-safe-action server actions wrapping `WeightRangesApi` |
| `app/(protected)/(admin)/weight-ranges/page.tsx` | Weight range list table page (admin+) |
| `app/(protected)/(admin)/weight-ranges/new/page.tsx` | Create weight range form (superadmin) |
| `app/(protected)/(admin)/weight-ranges/[id]/page.tsx` | Edit weight range / toggle active form (superadmin) |
| `components/features/weight-ranges/columns.tsx` | TanStack table column definitions |
| `components/features/weight-ranges/weight-range-form.tsx` | Shared create/edit form component |
| `components/features/weight-ranges/delete-weight-range-dialog.tsx` | Delete confirmation dialog |
| `lib/modules/prices/data.ts` | `PricesApi` class — fetch all catalog items with `isCustomerOrderable`, `maxWeight` |

---

## Customer App Work Items

### 1. Katalog Sumber Data — `GET /prices`

**Problem:** `GET /pos` does not return `isCustomerOrderable` or `maxWeight`. Backend will expose `GET /prices`.

- Create `lib/modules/prices/data.ts`:
  - `PricesApi.getPrices()` → calls `elysia.prices.get()`
  - Type `PriceItemData` extends `PosItemData` with `isCustomerOrderable: boolean | null` and `maxWeight: string | null`
- Update `app/(protected)/(user)/customer-orders/new/page.tsx`:
  - Replace `PosApi.getPosItems()` with `PricesApi.getPrices()`
  - Filter to `item.isCustomerOrderable === true`

### 2. Weight Range Selector — Input Wajib

- Add to `CustomerOrderState` in `components/features/customer-orders/state.tsx`:
  - `selectedWeightRange: WeightRange | null`  (pick from the list)
  - `weight: number | null | undefined`  (optional custom weight. cannot be  more than selectedWeightRange)
- In `state.tsx`:
  - Fetch weight ranges via `useQuery`: `["weight-ranges"]`
  - Expose `weightRanges`, `selectedWeightRange`, `setSelectedWeightRange`, `weight`, `setWeight`
  - Add validation: `canRequestPickup` requires `selectedWeightRange !== null`
  - Add `pickupDisabledReason` entry: `"noWeightRange"`
- Modify `submitPickupRequest()`:
  - Include `weightRangeId: selectedWeightRange.id`
  - Include `weight` (nullable) in payload
- Create a new component `components/features/customer-orders/weight-range-picker.tsx`:
  - `RadioGroup` for weight range selection
  - Conditional `Input` (type="number") for custom weight
  - Client-side validation: if custom weight entered, must be within `[minWeight, maxWeight]`
  - Submit button disabled until weight range is selected

### 3. Katalog Filter — `isCustomerOrderable === true`

- In `NewOrderPage` (`customer-orders/new/page.tsx`):
  - After fetching from `PricesApi`, filter: `item.isCustomerOrderable === true`
  - If customer orderable is null, treat as `false`? Or `true`? Plan says "true" → only show `=== true`

### 4. Item Quantity Behaviour — Kapasitas-bound vs Non-kapasitas-bound

- Kapasitas-bound (`item.maxWeight` is not null):
  - Prefilled quantity = `Math.ceil(selectedWeightRange.maxWeight / Number(item.maxWeight))`
  - Minimum quantity = prefilled value (cannot go lower, can go higher)
- Non kapasitas-bound (`item.maxWeight` is null):
  - No auto-fill, user must set manually
- Implement in `OrderItemCard` or create `CustomerOrderItemCard` variant:
  - Show a quantity `Input` (`type="number"`)
  - Use `min` attribute for kapasitas-bound items
  - Update `handleAddToCart` to accept a `quantity` parameter instead of always +1
  - Or modify `OrderItemCard` to handle the custom add flow

### 5. Payload Modification — `requestPickupSchema`

- Update `lib/modules/customer-orders/schema.ts`:
  - Add `weightRangeId: z.number()` (wajib)
  - Add `weight: z.optional(z.nullable(z.number()))`
  - Change `items` schema: `quantity` becomes `z.optional(z.nullable(z.number()))`
- Update `submitPickupRequest()` in `state.tsx` to include new fields

### 6. Submit Button Disabled

- Already handles via `canRequestPickup` + `pickupDisabledReason`
- Add `selectedWeightRange === null` check (add `"noWeightRange"` reason)

---

## Admin App Work Items

### 7. Weight Range CRUD Page

**Route:** `app/(protected)/(admin)/weight-ranges/`

- **List page** (`page.tsx`):
  - DataTable with columns: label, minWeight, maxWeight, isActive (badge), createdAt
  - Fetch all ranges from `WeightRangesApi.getAll()` (termasuk nonaktif)
  - Superadmin gets "Add New" button + edit/delete actions
  - Admin+ can view list

- **Create form** (`new/page.tsx`):
  - Fields: label (text), minWeight (number), maxWeight (number)
  - Client-side overlap validation: fetch existing ranges, check if new range overlaps with any existing
  - Submit → `POST /weight-ranges`

- **Edit form** (`[id]/page.tsx`):
  - Pre-filled: label, minWeight, maxWeight
  - Toggle switch for `isActive`
  - Submit → `PATCH /weight-ranges/:id`

- **Overlap Validation (UI):**
  - Before submit, fetch all existing weight ranges
  - On form input, check if `[newMin, newMax]` overlaps any existing `[min, max]`
  - Show inline validation error if overlap detected
  - Allow submit only if no overlap (or warn but still allow)

### 8. Service/Inventory/Bundling Forms — Tambah Field `maxWeight` & `isCustomerOrderable`

#### Services

- **Schema** `lib/modules/services/schema.ts`:
  - Add `maxWeight: z.optional(z.nullable(z.number().positive()))` to `addServiceSchema` and `updateServiceSchema`
  - Add `isCustomerOrderable: z.optional(z.nullable(z.boolean()))` to both schemas

- **API** `lib/modules/services/data.ts`:
  - `addService()` / `updateServiceData()` already use generic elysia types → should pass through new fields automatically

- **Actions** `lib/modules/services/actions.ts`:
  - No change needed (passes through parsed input)

- **Create form** `app/.../services/(management)/new/page.tsx`:
  - Add `FormInput` for `maxWeight` (number, optional)
  - Add toggle/switch for `isCustomerOrderable` (checkbox/Switch)
  - Label: "Max Weight (kg)", "Tampilkan untuk Customer"

- **Edit form** `components/features/services/service-data-form.tsx`:
  - Add same fields

#### Inventories

- **Schema** `lib/modules/inventories/schema.ts`: (create if doesn't exist)
  - Add `maxWeight: z.optional(z.nullable(z.number().positive()))`
  - Add `isCustomerOrderable: z.optional(z.nullable(z.boolean()))`

- **Form pages:**
  - `new/page.tsx` / `[id]/page.tsx` for inventories → add fields
  - Check `app/(protected)/(admin)/inventories/` for existing form structure

#### Bundlings

- **Schema** `lib/modules/bundlings/schema.ts`:
  - Add `maxWeight` and `isCustomerOrderable` to `addBundlingSchema` and `updateBundlingSchema`

- **Form components:**
  - `new-bundling-form.tsx` → add fields
  - `bundling-data-form.tsx` → add fields

---

## Execution Order

Both streams are independent and can be worked on **in parallel** by different developers.

### Stream A — Customer App (Pickup Form)
1. Create `lib/modules/prices/data.ts` — new API module
2. Create `lib/modules/weight-ranges/data.ts` — API module
3. Create weight range picker component
4. Modify `customer-orders/state.tsx` — new state fields + validation
5. Modify `requestPickupSchema` — add `weightRangeId` / `weight`
6. Modify `NewOrderPage` — use `PricesApi` + `isCustomerOrderable` filter
7. Implement quantity auto-fill in `OrderItemCard` or new card variant
8. Modify `submitPickupRequest` payload

### Stream B — Admin App (CRUD + Form Fields)
1. Create weight-ranges module (`data.ts`, `schema.ts`, `actions.ts`)
2. Create weight-range list page + table columns
3. Create weight-range create/edit forms
4. Modify service schema + create/edit forms
5. Modify inventory schema + create/edit forms
6. Modify bundling schema + create/edit forms
