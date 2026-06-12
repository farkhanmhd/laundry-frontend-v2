# Inventory Monthly Report — Frontend Implementation Prompt

## Overview

Implement a dialog that exports an inventory monthly stock report as PDF. The report aggregates each inventory's stock performance month-by-month: initial stock, total restocks, total usage, total adjustments, and final stock.

**Example:** `from=01-2026&to=06-2026` → one row per inventory per month (Jan–Jun 2026).

---

## Backend API

| Detail | Value |
|---|---|
| **Endpoint** | `GET /api/report/inventory/monthly` (Elysia) |
| **Query params** | `from` (`MM-yyyy`, e.g. `01-2026`), `to` (`MM-yyyy`, e.g. `06-2026`) |
| **Auth** | Requires super admin (cookie-based, auto-handled by browser on `<a download href>`) |
| **Response** | `application/pdf` (binary download) |
| **Full example** | `/api/report/inventory/monthly?from=01-2026&to=06-2026` |

> The `from` month value is interpreted as start of month (e.g. `01-2026` → `2026-01-01 00:00:00`).  
> The `to` month value is interpreted as end of month (e.g. `06-2026` → `2026-06-30 23:59:59`).

---

## Dialog Design

Use a **shadcn `Dialog`** (`@/components/ui/dialog`) with:

### Header
- **Title** (translated): "Monthly Stock Report" / "Laporan Stok Bulanan"
- **Description** (translated): "View inventory stock performance per month within a date range." / "Lihat performa stok inventori per bulan dalam rentang waktu tertentu."

### Body — Month & Year Inputs

Two identical input groups stacked vertically:

1. **From Month** / **Bulan Dari**
2. **To Month** / **Bulan Sampai**

Each is a row of two selects side by side:

| Select | Values | Display |
|---|---|---|
| **Month** (dropdown) | 1–12 | Month names (January–December / Januari–Desember) |
| **Year** (dropdown) | e.g. 2020–2030, or dynamically generate from current year ±5 | Numeric |

The two selects must produce a combined value like `01-2026` when submitted.

> **UX note:** The "to" month must be on or after the "from" month. Consider disabling earlier months/years in the "to" selects after "from" is chosen (or just rely on backend validation).

### Footer
| Button | Variant | Action |
|---|---|---|
| **Cancel** / **Batal** | `outline` | Close the dialog (`setOpen(false)`) |
| **Download** / **Unduh** | `default` | Trigger PDF download via `<a download href>` + show success toast + close dialog |

---

## Download Pattern

Follow the existing pattern in `@/components/features/report/export-button.tsx`:

```tsx
<a
  download
  href={`${process.env.NEXT_PUBLIC_API_URL}/report/inventory/monthly?from=${fromValue}&to=${toValue}`}
>
  Download
</a>
```

Use `toast.success()` with the existing key `Notifications.report.download.started` after clicking.

---

## Translation Keys to Add

### `en.json`

```json
"Inventories": {
  // … existing keys …
  "monthlyReport": {
    "title": "Monthly Stock Report",
    "description": "View inventory stock performance per month within a date range.",
    "fromMonth": "From Month",
    "toMonth": "To Month",
    "monthLabel": "Month",
    "yearLabel": "Year",
    "download": "Download"
  }
}
```

### `id.json`

```json
"Inventories": {
  // … existing keys …
  "monthlyReport": {
    "title": "Laporan Stok Bulanan",
    "description": "Lihat performa stok inventori per bulan dalam rentang waktu tertentu.",
    "fromMonth": "Bulan Dari",
    "toMonth": "Bulan Sampai",
    "monthLabel": "Bulan",
    "yearLabel": "Tahun",
    "download": "Unduh"
  }
}
```

---

## Component Location

Create a new file:

```
components/features/inventories/inventory-monthly-export-dialog.tsx
```

### Component API

```tsx
export function InventoryMonthlyExportDialog() {
  // …
}
```

No props needed — the component is self-contained.

---

## Where to Place the Trigger Button

Find the inventory report actions section (likely in one of these pages or a header component):

```
app/(protected)/(admin)/inventories/(reports)/
```

Add a `<InventoryMonthlyExportDialog />` next to the existing Export buttons (Usage, Restock, Adjustment reports). Look for patterns like `<ExportButton>` or `<InventoryUsageExportButton>` in the reports pages.

If you cannot find a suitable existing location, add a `<Button>` labeled "Monthly Report" / "Laporan Bulanan" inside a wrapping layout or header shared by all inventory report pages.

---

## Month Names (for the month select options)

### English
```
January, February, March, April, May, June, July, August, September, October, November, December
```

### Indonesian
```
Januari, Februari, Maret, April, Mei, Juni, Juli, Agustus, September, Oktober, November, Desember
```

---

## Year Range for Select

Generate from current year backward 5 years and forward 1 year:

```tsx
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 7 }, (_, i) => currentYear - 5 + i);
// Example in 2026: [2021, 2022, 2023, 2024, 2025, 2026, 2027]
```

---

## Validation

- Both "from" and "to" must be selected before enabling the Download button
- "from" value must not be after "to" (validate in JS before opening the download link)
- Display an error toast if validation fails instead of submitting

---

## Implementation Steps (Suggested)

1. Add translation keys to `messages/en.json` and `messages/id.json`
2. Create `components/features/inventories/inventory-monthly-export-dialog.tsx`:
   - Controlled `open` state
   - From/to month and year state (e.g., `{ month: number, year: number }`)
   - Download handler that validates range, constructs URL, triggers download
   - Toast on success
3. Add `Monthly` select option in month select labeled with translation key
4. Add `Year` select option in year select
5. Wire the combined `MM-yyyy` format from the two selects
6. Place `<InventoryMonthlyExportDialog />` in the inventory reports page
7. Test by selecting a range and verifying the PDF downloads
