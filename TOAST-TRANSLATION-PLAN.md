# Toast Translation Plan

## Goal
Translate all toast messages into English & Indonesian using the existing `next-intl` setup (`messages/en.json`, `messages/id.json`).

---

## Current Situation

| Type | Count | Examples |
|---|---|---|
| **Already translated** (`t("key")`) | ~24 | `t("toastSuccess")`, `t("minimumSpendNotMet")` |
| **Hardcoded English** | ~25 | `"Something went wrong"`, `"1 Item added to cart"` |
| **API response messages** | ~35 | `toast.success(result.data.message)` — from backend |
| **Template literals** | ~7 | `` `Voucher ${voucher.description} applied!` `` |

---

## Phase 1: Backend — Add `messageKey` + `messageParams` to API responses

You do this on the backend project. Every response that sends a `message` also sends:

```json
{
  "status": "success",
  "message": "Order created successfully",
  "messageKey": "order.created",
  "messageParams": { "orderId": "123" },
  "data": { ... }
}
```

- `message` kept for backward compatibility
- `messageKey` = a dot-path the frontend uses to look up translations
- `messageParams` = variables for ICU interpolation (e.g., `{orderId}`, `{name}`, `{role}`)

---

## Phase 2: Frontend — Add translation keys to message files

### 2a. New `"Notifications"` namespace in both `en.json` / `id.json`

Covers all backend `messageKey` values.

> **⚠️ Important:** `next-intl` does not allow dots in JSON keys — use nested objects instead.
> - Backend sends: `messageKey: "order.created"`
> - JSON file: `"order": { "created": "..." }`
> - Frontend lookup: `t("Notifications.order.created")` resolves correctly via nesting.

```json
"Notifications": {
  "order": { "created": "Order {orderId} created successfully" },
  "member": {
    "added": "Member added successfully",
    "connected": "Member connected",
    "created": "Member created"
  },
  "inventory": {
    "updated": "Inventory updated",
    "deleted": "Inventory deleted",
    "stock": { "adjusted": "Stock adjusted" },
    "restocked": "Restock recorded"
  },
  "service": {
    "created": "Service created",
    "updated": "Service updated",
    "deleted": "Service deleted"
  },
  "bundling": {
    "created": "Bundling created",
    "updated": "Bundling updated",
    "deleted": "Bundling deleted",
    "items": { "updated": "Bundling items updated" }
  },
  "voucher": {
    "created": "Voucher created",
    "updated": "Voucher updated",
    "deleted": "Voucher deleted"
  },
  "user": {
    "created": "User created",
    "role": { "updated": "{name}'s role changed to {role}" }
  },
  "address": {
    "added": "Address added",
    "updated": "Address updated",
    "deleted": "Address deleted"
  },
  "password": { "updated": "Password updated" },
  "profile": { "updated": "Profile updated" },
  "route": { "completed": "Route completed successfully" },
  "delivery": {
    "status": { "updated": "Delivery status updated" },
    "route": { "created": "Delivery route created" },
    "requested": "Delivery request submitted"
  },
  "pickup": {
    "route": { "created": "Pickup route created" },
    "cancelled": "Pickup request cancelled"
  },
  "order": { "submitted": "Order submitted" },
  "payment": { "created": "QRIS payment created" }
}
```

Then add Indonesian equivalents in `id.json`.

### 2b. New `"Toast"` namespace for generic frontend-only messages

```json
"Toast": {
  "itemAddedToCart": "1 Item added to cart",
  "viewCart": "View Cart",
  "somethingWentWrong": "Something went wrong",
  "failedToCreateOrder": "Failed to create new order",
  "registrationFailed": "Registration failed",
  "accountCreated": "Account created!",
  "welcomeAboard": "Welcome aboard. Please sign in.",
  "serverError": "Server Error",
  "failedToConnectMember": "Failed to connect member",
  "failedToCreateMember": "Failed to create member",
  "failedToCheckPhone": "Failed to check phone number",
  "unexpectedError": "An unexpected error occurred",
  "failedToDeleteAddress": "Failed to delete address"
}
```

### 2c. Feature-scoped toast keys (add to existing namespaces)

| File | Key | Namespace |
|---|---|---|
| `account/address-manager.tsx` | `addressRemoved` | `AccountSettings.addresses` |
| `customer-orders/state.tsx` | `voucherApplied` | `CustomerOrders.voucher` |
| `pos/state.ts` | `voucherApplied` | `POS.voucher` |
| `customer-orders/customer-order-detail-context.tsx` | `deliveryRequested` | `CustomerOrders.orderDetail` |
| `customer-orders/customer-order-detail-context.tsx` | `pickupCancelled` | `CustomerOrders.orderDetail` |
| `routes/progress-card.tsx` | `routeCompleted` | `Routes` |
| `routes/update-delivery-dialog.tsx` | `deliveryStatusUpdated` | `Routes` |

---

## Phase 3: Frontend helper

Create `lib/toast-helper.ts`:

```ts
import { toast } from "sonner"

export function toastResponse(
  t: (key: string, params?: Record<string, any>) => string,
  response: { messageKey?: string; messageParams?: Record<string, any>; message?: string },
  options?: { description?: string }
) {
  if (response?.messageKey) {
    return t(`Notifications.${response.messageKey}`, response.messageParams)
  }
  return response?.message ?? ""
}
```

Usage:
```ts
const t = useTranslations("Notifications")
toast.success(toastResponse(t, result.data))
```

For the `?? "Something went wrong"` fallback pattern:
```ts
const tToast = useTranslations("Toast")
toast.error(result?.data?.message ?? tToast("somethingWentWrong"))
```

---

## Phase 4: Update ~43 frontend files

### Category A — API response messages

Replace `toast.success(data.message)` / `toast.success(result.data.message)` with `toast.success(toastResponse(t, data))`.

Files:
- `bundlings/bundling-data-form.tsx`
- `bundlings/bundling-item-tab.tsx`
- `bundlings/new-bundling-form.tsx`
- `bundlings/delete-bundling-dialog.tsx`
- `inventories/inventory-data-form.tsx`
- `inventories/inventory-restock-form.tsx`
- `inventories/stock-adjustment-form.tsx`
- `inventories/delete-inventory-dialog.tsx`
- `services/service-data-form.tsx`
- `services/delete-service-dialog.tsx`
- `members/add-member-dialog.tsx`
- `vouchers/create-voucher.tsx`
- `vouchers/update-voucher.tsx`
- `vouchers/delete-voucher-dialog.tsx`
- `account/admin-data-form.tsx`
- `account/password-form.tsx`
- `account/add-address-form-context.tsx`
- `account/update-address-context.tsx`
- `customer-orders/state.tsx`
- `customer-orders/customer-payment-dialog.tsx`
- `pos/state.ts`
- `deliveries/deliver-selected-delivery.tsx` (has `||` fallback)
- `deliveries/pickup-selected-delivery.tsx` (has `||` fallback)
- `app/inventories/(reports)/new/page.tsx`
- `app/services/(management)/new/page.tsx`

### Category B — Hardcoded strings

| File | Current | After |
|---|---|---|
| `account/address-manager.tsx` | `"Address deleted successfully"` | `tAddresses("addressRemoved")` |
| `account/address-manager.tsx` | `"Failed to delete address"` | `tToast("failedToDeleteAddress")` |
| `auth/register-context.tsx` | `"Registration failed"` + `"Server Error"` | `tToast("registrationFailed")` + `tToast("serverError")` |
| `auth/register-context.tsx` | `"Account created!"` + `"Welcome aboard..."` | `tToast("accountCreated")` + `tToast("welcomeAboard")` |
| `customer-orders/state.tsx` | `"Something went wrong"` | `tToast("somethingWentWrong")` |
| `customer-orders/state.tsx` | `` `Something went wrong. ${response.error?.value.message}` `` | `response.error?.value.message ?? tToast("somethingWentWrong")` |
| `onboarding/page.tsx` | `"Failed to connect member"` | `tToast("failedToConnectMember")` |
| `onboarding/page.tsx` | `"Failed to create member"` | `tToast("failedToCreateMember")` |
| `onboarding/page.tsx` | `` `An unexpected error occurred. ${...}` `` | `tToast("unexpectedError")` |
| `onboarding/page.tsx` | `` `Failed to check phone number. ${...}` `` | `tToast("failedToCheckPhone")` |

### Category C — Template literals

| File | Current | After |
|---|---|---|
| `pos/state.ts` | `` `Voucher ${voucher.description} applied!` `` | `tPOS("voucher.voucherApplied", { description: voucher.description })` |
| `customer-orders/state.tsx` | `` `Voucher ${voucher.description} applied!` `` | `tCO("voucher.voucherApplied", { description: voucher.description })` |
| `pos/state.ts` | `"1 Item added to cart"` + `"View Cart"` | `tToast("itemAddedToCart")` + `tToast("viewCart")` |
| `customer-orders/state.tsx` | `"1 Item added to cart"` + `"View Cart"` | same |

### Category D — Already translated files (add second `useTranslations`)

Files already using `t()` for toasts:
- `components/features/account/account-data-form.tsx`
- `components/features/account/address-map.tsx`
- `components/features/account/update-address-map.tsx`
- `components/features/orders/update-status-dialog.tsx`
- `components/features/users/create-user-dialog.tsx`
- `components/features/users/user-role-dialog.tsx`
- `components/features/report/export-button.tsx`
- `components/features/pos/pos-voucher-input.tsx`
- `components/features/customer-orders/customer-order-voucher-input.tsx`
- `components/features/bundlings/bundling-image-form.tsx`
- `components/features/inventories/inventory-image-form.tsx`
- `components/features/services/service-image-form.tsx`
- `app/onboarding/page.tsx`

These need:
- A second `useTranslations("Notifications")` if they use API response messages
- Or a second `useTranslations("Toast")` if they have generic strings
- Or updates to use the new `toastResponse` helper

---

## Phase 5: Indonesian translations (`id.json`)

Mirror every key from `en.json` in `id.json`. Examples:

```json
"Notifications": {
  "order.created": "Pesanan {orderId} berhasil dibuat",
  "member.added": "Member berhasil ditambahkan",
  "user.role.updated": "Peran {name} diubah menjadi {role}",
  "inventory.deleted": "Inventaris berhasil dihapus",
  "route.completed": "Rute berhasil diselesaikan",
  "payment.created": "Pembayaran QRIS berhasil dibuat"
},
"Toast": {
  "itemAddedToCart": "1 Item ditambahkan ke keranjang",
  "viewCart": "Lihat Keranjang",
  "somethingWentWrong": "Terjadi kesalahan",
  "failedToCreateOrder": "Gagal membuat pesanan baru",
  "accountCreated": "Akun berhasil dibuat!",
  "welcomeAboard": "Selamat datang. Silakan masuk.",
  "failedToDeleteAddress": "Gagal menghapus alamat"
}
```

---

## Phase 6: Verify

- Run `npm run lint`
- Run `npm run typecheck`
- Spot-check a few pages in both locales

---

## Migration Order

1. Create `lib/toast-helper.ts`
2. Add `"Notifications"` + `"Toast"` + feature-scoped keys to `en.json` and `id.json`
3. Update Category C (template literals) — smallest, safest batch
4. Update Category B (hardcoded strings)
5. Update Category A (API messages) — largest batch, uses the helper
6. Update Category D (already-translated files) — add second `useTranslations`
7. Lint + typecheck
