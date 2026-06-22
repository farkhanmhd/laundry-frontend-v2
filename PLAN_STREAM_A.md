# Stream A — Customer App: Pickup Form Enhancements

## Overview

Modify the customer pickup flow to support weight range selection, custom weight input, customer-orderable catalog filtering, and capacity-bound item quantity auto-fill.

Backend already supports:
- `GET /prices` — returns items with `isCustomerOrderable` and `maxWeight` fields
- `POST /customerorders/request-pickup` — accepts `weightRangeId` (required number), `weight` (optional nullable number), and items with optional nullable quantity
- `GET /weight-ranges` — returns active weight ranges

---

## Work Items (8 total, sequential order)

### 1. Create `lib/modules/prices/data.ts`

New API module to fetch catalog items specifically for the customer-facing UI.

- Create `PricesApi` class extending `BaseApi`
- Method `getPrices()` → calls `elysia.prices.get()`
- Define `PriceItemData` type: extends `PosItemData` with `isCustomerOrderable: boolean | null` and `maxWeight: string | null`
- Follow same pattern as `lib/modules/pos/data.ts`

### 2. Create `lib/modules/weight-ranges/data.ts`

New API module for weight ranges in the customer flow.

- Create `WeightRangesApi` class (only needs `getAll()` for customer use)
- Method `getAll()` → calls `elysia.weightRanges.get()`
- Define `WeightRange` type: `{ id: number, label: string, minWeight: string, maxWeight: string, isActive: boolean | null, createdAt: string }`
- Note: For Customer App, only pass `{ query: { isActive: true } }` filter, or just filter client-side after fetching

### 3. Create `components/features/customer-orders/weight-range-picker.tsx`

A new component for weight range selection.

**Props:**
- `weightRanges: WeightRange[]`
- `selectedWeightRange: WeightRange | null`
- `onWeightRangeChange: (range: WeightRange | null) => void`
- `weight: number | null | undefined`
- `onWeightChange: (weight: number | null | undefined) => void`

**Behavior:**
- Render a `RadioGroup` of available weight ranges (label, e.g. "<1 kg", "1-3 kg", "3-5 kg")
- When a range is selected, conditionally show a number `Input` for custom weight (label: "Custom Weight (opsional)")
- Client-side validation: if custom weight is filled, must be >= `minWeight` and <= `maxWeight` of selected range
- Show validation error inline if out of range
- Use shadcn/ui `RadioGroup` + `RadioGroupItem` + `Label` components

### 4. Modify `components/features/customer-orders/state.tsx`

**Add to `CustomerOrderState` interface:**
```ts
weightRangeId: number | null;
weight: number | null | undefined;
```

**Add state (Jotai):**
- `weightRangeId` — persisted to localStorage via `customerOrderAtom`
- `weight` — persisted to localStorage

**Add queries:**
- `useQuery({ queryKey: ["weight-ranges"], queryFn: () => WeightRangesApi.getAll() })`

**Add exposed values & setters:**
- `weightRanges` — from query
- `selectedWeightRange` — derived from `weightRangeId` matching one of `weightRanges`
- `setWeightRange` — updates `weightRangeId`
- `setWeight` — updates `weight`

**Modify `canRequestPickup`:**
- Add check: `weightRangeId === null` → returns false
- Add reason entry: `"noWeightRange"`

**Modify `pickupDisabledReason`:**
- Return `"noWeightRange"` when `weightRangeId === null`

### 5. Modify `lib/modules/customer-orders/schema.ts`

**Update `requestPickupSchema`:**
```ts
export const requestPickupSchema = z.object({
  items: z.array(orderItemSchema),  // quantity is nullable optional via orderItemSchema
  addressId: z.string(),
  points: z.optional(z.nullable(z.number())),
  requestTime: z.string(),
  weightRangeId: z.number(),
  weight: z.optional(z.nullable(z.number())),
});
```

**Update `orderItemSchema` in `lib/modules/pos/schema.ts`:**
- Change `quantity: positiveIntNoLeadingZero` → `quantity: z.optional(z.nullable(z.number().positive()))`

### 6. Modify `app/(protected)/(user)/customer-orders/new/page.tsx`

**Changes:**
- Import `PricesApi` instead of `PosApi`
- Replace `PosApi.getPosItems()` → `PricesApi.getPrices()`
- Filter results: `item.isCustomerOrderable === true`
- Render `WeightRangePicker` component at the top of the page (above the item grid)
- Pass weight range data + state setters from `useCustomerOrder()`

Also make this page a client component (`"use client"`) since `WeightRangePicker` is interactive. Or keep it server component and compose a client wrapper.

### 7. Implement Quantity Behaviour in Item Card

**Modify `components/features/orders/order-item-card.tsx`** (or create `customer-order-item-card.tsx`):

- Add a quantity input field to each item card (replace the simple cart button)
- For **kapasitas-bound items** (`item.maxWeight !== null`):
  - Compute `defaultQty = Math.ceil(selectedWeightRange.maxWeight / Number(item.maxWeight))`
  - Set quantity input `min={defaultQty}`, `defaultValue={defaultQty}`
  - User can increase but not decrease below defaultQty
  - On add to cart, use the typed quantity
- For **non kapasitas-bound items** (`item.maxWeight === null`):
  - No auto-fill
  - Quantity input starts empty or at 1, user sets manually
  - `min={1}`, no default

**Modify `handleAddToCart` in `state.tsx`** to accept optional quantity parameter:
```ts
const handleAddToCart = (item: PosItemData, quantity?: number) => {
  const qty = quantity ?? 1;
  // ... use qty instead of 1
};
```

### 8. Modify `submitPickupRequest` in `state.tsx`

**Update payload builder:**
```ts
const data: RequestPickupSchema = {
  items: customerCart.items.map(item => ({
    ...item,
    quantity: item.quantity || null,  // nullable for kapasitas-bound
  })),
  addressId: selectedAddress,
  requestTime: customerCart.requestTime,
  weightRangeId: customerCart.weightRangeId!,
  weight: customerCart.weight ?? null,
};
```

---

## Sequence

1. → `lib/modules/prices/data.ts`
2. → `lib/modules/weight-ranges/data.ts`
3. → `components/features/customer-orders/weight-range-picker.tsx`
4. → `components/features/customer-orders/state.tsx`
5. → `lib/modules/customer-orders/schema.ts` + `lib/modules/pos/schema.ts`
6. → `app/.../customer-orders/new/page.tsx`
7. → `components/features/orders/order-item-card.tsx`
8. → Final payload wiring in `state.tsx`
