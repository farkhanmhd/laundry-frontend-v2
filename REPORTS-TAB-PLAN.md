# Reports Tab Consolidation Plan

## Goal

Replace 4 separate report routes (`/inventories/adjustments`, `/inventories/monthly`, `/inventories/restocks`, `/inventories/usage`) with a single parallel route slot `@reports` that renders a tab-based UI. All navigation links updated to point to a single `/inventories/reports?tab=X` URL.

## Files to Create

| File | Purpose |
|---|---|
| `app/(protected)/(admin)/inventories/(table)/@reports/page.tsx` | Server component: superadmin guard, renders client tab wrapper with 4 tab contents as server components |
| `app/(protected)/(admin)/inventories/(table)/@reports/loading.tsx` | `<TableSkeleton />` loading state |
| `app/(protected)/(admin)/inventories/(table)/@reports/default.tsx` | Returns `null` (prevents 404 for unmatched routes) |
| `components/features/inventory-reports/reports-tabs.tsx` | Client component: `Tabs` + `TabsList` + 4 `TabsTrigger`s, manages active tab via URL `?tab=` search param |
| `components/features/inventory-reports/adjustments-content.tsx` | Extracted from `adjustments/page.tsx` — async server component, fetches data, renders header + table |
| `components/features/inventory-reports/monthly-content.tsx` | Extracted from `monthly/page.tsx` |
| `components/features/inventory-reports/restocks-content.tsx` | Extracted from `restocks/page.tsx` |
| `components/features/inventory-reports/usage-content.tsx` | Extracted from `usage/page.tsx` |

## Files to Modify

| File | Change |
|---|---|
| `app/(protected)/(admin)/inventories/(table)/layout.tsx` | Add `reports: React.ReactNode` prop, render `{reports}` inside `<section>` |
| `components/features/inventories/inventory-table-client.tsx` | Change 3 `<Link>` href values from `/inventories/{type}` to `/inventories/reports?tab={type}` |

## Files to Delete

| Directory | Routes Removed |
|---|---|
| `app/(protected)/(admin)/inventories/(reports)/adjustments/` | `layout.tsx`, `loading.tsx`, `page.tsx` |
| `app/(protected)/(admin)/inventories/(reports)/monthly/` | `layout.tsx`, `loading.tsx`, `page.tsx` |
| `app/(protected)/(admin)/inventories/(reports)/restocks/` | `layout.tsx`, `loading.tsx`, `page.tsx` |
| `app/(protected)/(admin)/inventories/(reports)/usage/` | `layout.tsx`, `loading.tsx`, `page.tsx` |

## Final Architecture

```
app/(protected)/(admin)/inventories/
├── (reports)/              ← keeps [id]/, new/, layout.tsx (superadmin guard)
│   └── [id]/               ← untouched
├── (table)/
│   ├── @cards/             ← untouched
│   ├── @data/              ← untouched
│   ├── @header/            ← untouched
│   ├── @reports/
│   │   ├── default.tsx     ← null
│   │   ├── loading.tsx
│   │   └── page.tsx
│   └── layout.tsx          ← add `reports` prop
└── loading.tsx
```

## How It Works

1. `@reports/page.tsx` checks `getCurrentUserData()`, redirects non-superadmins to `/dashboard`
2. For superadmins, renders `<ReportsTabs>` client component
3. `<ReportsTabs>` reads `?tab` from URL search params (default: `"adjustments"`), renders `<Tabs>` with 4 triggers
4. Each `<TabsContent>` renders the corresponding server component (e.g., `<AdjustmentsContent>`)
5. Tab change calls `router.replace` to update `?tab=X` in URL
6. `TableProvider` + column setup moves from each report's `layout.tsx` into each content component

## Key Detail: Column Providers

Each report currently has its own layout wrapping with a different `TableProvider` + column hook:

| Report | Column Hook |
|---|---|
| Adjustments | `useAdjustmentHistoryColumns()` |
| Monthly | `useAdjustmentHistoryColumns()` (same) |
| Restocks | `useRestockHistoryColumns()` |
| Usage | `useInventoryUsageHistoryColumns()` |

Since all 4 will live under one route, each `<TabsContent>` must wrap its own `<TableProvider>` with the appropriate columns. **Recommendation**: make each tab content component self-contained — wrap its table section with the correct `TableProvider` + columns.
