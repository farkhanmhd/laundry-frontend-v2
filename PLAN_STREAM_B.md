# Stream B — Admin App: Weight Range CRUD & Form Field Additions

## Overview

Build a full CRUD page for weight ranges (admin+) and add `maxWeight` (number, nullable) + `isCustomerOrderable` (boolean, nullable) fields to all service/inventory/bundling create & edit forms.

Backend API already supports:
- `GET /weight-ranges` — list all (including nonaktif)
- `POST /weight-ranges` — create with label, minWeight, maxWeight; returns 409 on overlap
- `PATCH /weight-ranges/:id` — update label, minWeight, maxWeight, isActive
- Services, inventories, bundlings already have `maxWeight` and `isCustomerOrderable` on their GET/POST/PATCH endpoints

---

## Work Items (6 total, parallelizable within group)

### 1. Create `lib/modules/weight-ranges/`

Create three files following the established module pattern:

#### `lib/modules/weight-ranges/data.ts`

```ts
abstract class WeightRangesApi extends BaseApi {
  static async getAll() → GET /weight-ranges
  static async getById(id: number) → GET /weight-ranges/:id
  static async create(body: { label: string; minWeight: number; maxWeight: number })
  static async update(id: number, body: { label?: string; minWeight?: number; maxWeight?: number; isActive?: boolean })
}
```

Type `WeightRange`: `{ id: number; label: string; minWeight: string; maxWeight: string; isActive: boolean | null; createdAt: string }`

#### `lib/modules/weight-ranges/schema.ts`

```ts
export const addWeightRangeSchema = z.object({
  label: z.string().min(1),
  minWeight: z.number().positive(),
  maxWeight: z.number().positive(),
});

export const updateWeightRangeSchema = z.object({
  id: z.number(),
  label: z.optional(z.string().min(1)),
  minWeight: z.optional(z.number().positive()),
  maxWeight: z.optional(z.number().positive()),
  isActive: z.optional(z.boolean()),
});
```

#### `lib/modules/weight-ranges/actions.ts`

Two server actions:
- `addWeightRangeAction` — wraps `addWeightRangeSchema` → `WeightRangesApi.create()`
- `updateWeightRangeAction` — wraps `updateWeightRangeSchema` → `WeightRangesApi.update()`

### 2. Create Weight Range List Page

**Route:** `app/(protected)/(admin)/weight-ranges/page.tsx`

- Server component that renders a client `WeightRangesTable`
- Fetch data server-side: `WeightRangesApi.getAll()`
- Pass to client component

**Client table:** `components/features/weight-ranges/weight-ranges-table.tsx`

- Uses `@tanstack/react-table` data table (follow pattern in `components/table/`)
- Columns: label, minWeight, maxWeight, isActive (Badge: "Active"/"Inactive"), createdAt
- Actions column: Edit button (links to `[id]`), delete/toggle active
- Superadmin sees "Add New" button linking to `/admin/weight-ranges/new`
- Admin+ can view list (read-only)

**Columns:** `components/features/weight-ranges/columns.tsx`

### 3. Create Weight Range Create/Edit Forms

**Create form:** `app/(protected)/(admin)/weight-ranges/new/page.tsx`
**Edit form:** `app/(protected)/(admin)/weight-ranges/[id]/page.tsx`

**Shared form component:** `components/features/weight-ranges/weight-range-form.tsx`

- react-hook-form with zod validation
- Fields: label (text), minWeight (number), maxWeight (number)
- For edit: also include `isActive` toggle (Switch component)
- Submit calls appropriate server action

**Overlap Validation (Client-side):**
- On mount, fetch all existing weight ranges
- On form input change (minWeight or maxWeight), check if `[newMin, newMax]` overlaps any existing `[min, max]` (excluding current id if editing)
- Overlap logic: `newMin <= existingMax && newMax >= existingMin`
- Show inline validation error if overlap detected
- Block form submission while overlap exists (submit button disabled)
- Also show server-side 409 error toast if backend rejects

### 4. Modify Service Schema & Forms

**Schema** `lib/modules/services/schema.ts`:

- `addServiceSchema`: add `maxWeight: z.optional(z.nullable(z.number().positive()))` and `isCustomerOrderable: z.optional(z.nullable(z.boolean()))`
- `updateServiceSchema`: same additions

**Create form** `app/.../services/(management)/new/page.tsx`:

- Add `FormInput` for `maxWeight` (type number, placeholder "10", label "Max Weight (kg)")
- Add `Switch` or `Checkbox` for `isCustomerOrderable` (label "Tampilkan untuk Customer")
- Import `Switch` from `@/components/ui/switch` or `Checkbox` from `@/components/ui/checkbox`

**Edit form** `components/features/services/service-data-form.tsx`:

- Same two fields added
- Pre-fill from existing service data
- Disable when not in editing mode

### 5. Modify Inventory Schema & Forms

**Schema** `lib/modules/inventories/schema.ts` (create if it doesn't exist):

```ts
export const addInventorySchema = z.object({
  // existing fields...
  maxWeight: z.optional(z.nullable(z.number().positive())),
  isCustomerOrderable: z.optional(z.nullable(z.boolean())),
});

export const updateInventorySchema = z.object({
  // existing fields...
  maxWeight: z.optional(z.nullable(z.number().positive())),
  isCustomerOrderable: z.optional(z.nullable(z.boolean())),
});
```

**Forms:** Check existing inventory pages at `app/(protected)/(admin)/inventories/`:
- `(table)/@cards/page.tsx` — list page (no changes)
- `new/page.tsx` under `(reports)` — may be a different form; verify if there's a dedicated create form
- If no explicit create/edit form exists, create a new one with the same pattern as services

**Inventory data form:** `components/features/inventories/inventory-data-form.tsx` (create if doesn't exist, following `service-data-form.tsx` pattern)

### 6. Modify Bundling Schema & Forms

**Schema** `lib/modules/bundlings/schema.ts`:

- `addBundlingSchema`: add `maxWeight: z.optional(z.nullable(z.number().positive()))` and `isCustomerOrderable: z.optional(z.nullable(z.boolean()))`
- `updateBundlingSchema`: same additions
- `updateBundlingBodySchema` (omit id): same additions

**Create form** `components/features/bundlings/new-bundling-form.tsx`:

- Add `FormInput` for `maxWeight` (number, optional)
- Add `Switch` for `isCustomerOrderable`

**Edit form** `components/features/bundlings/bundling-data-form.tsx`:

- Same two fields added
- Pre-fill from existing bundling data

---

## Sequence (can parallelize within group)

1. → `lib/modules/weight-ranges/data.ts` + `schema.ts` + `actions.ts`
2. → `components/features/weight-ranges/columns.tsx` + `weight-ranges-table.tsx` + `weight-range-form.tsx`
3. → `app/.../weight-ranges/page.tsx` + `new/page.tsx` + `[id]/page.tsx`
4. → Modify `lib/modules/services/schema.ts` + forms (new + edit)
5. → Modify `lib/modules/inventories/schema.ts` + forms (new + edit)
6. → Modify `lib/modules/bundlings/schema.ts` + forms (new + edit)

Items 4-6 are fully independent of each other.
