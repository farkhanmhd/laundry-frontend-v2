# Backend Toast Message Key Template

Use this prompt for every backend module you work on. Replace `MODULE_NAME` and the examples with your actual module.

---

## Instruction

For every API endpoint in the `MODULE_NAME` module (e.g., `Members`, `Orders`, `Inventories`, `Services`, `Bundlings`, `Vouchers`, `Users`, `Auth`, `Deliveries`, `Routes`, `Account`, `Addresses`), add two new fields to every JSON response that currently sends a `message`:

| Field | Type | Required | Description |
|---|---|---|---|
| `messageKey` | `string` | Yes | A dot-path the frontend uses to look up a translation. Format: `module.action` (e.g., `member.added`, `order.created`, `inventory.deleted`). |
| `messageParams` | `object` | Optional | Variables for dynamic content in the translated message. Keys must match the `{placeholders}` in the frontend translation. |

### Success response Examples:

```json
{
  "status": "success",
  "message": "Member added successfully",
  "messageKey": "member.added",
  "messageParams": { "name": "John" },
  "data": { "id": 1, "name": "John" }
}
```

### Error response Examples:

```json
{
  "status": "error",
  "message": "Phone number already taken",
  "messageKey": "member.phoneTaken",
  "messageParams": { "phone": "08123456789" },
  "data": null
}
```

### When `messageParams` is not needed

```json
{
  "status": "success",
  "message": "Service deleted",
  "messageKey": "service.deleted",
  "data": null
}
```

---

## Never return raw system errors

Every endpoint **MUST** catch exceptions and return a custom, human-readable error. Raw system errors expose internals and are unreadable on the frontend.

### ❌ Bad — raw system error leaks to frontend

```json
{
  "status": "error",
  "message": "Cannot read properties of null (reading 'id')",
  "data": null
}
```
or worse, a full stack trace leaked via a 500 response.

### ✅ Good — custom error with `messageKey`

```json
{
  "status": "error",
  "message": "Member not found",
  "messageKey": "member.notFound",
  "messageParams": { "memberId": "42" },
  "data": null
}
```

### ✅ Good — unexpected error caught by global handler

```json
{
  "status": "error",
  "message": "An unexpected error occurred. Please try again.",
  "messageKey": "common.unexpectedError",
  "data": null
}
```

---

## Global error handler

Implement a global exception filter / error handler (one per framework) as the safety net. This catches any unhandled exception and returns a clean response instead of a 500 with a stack trace.

```typescript
// Example: global error handler middleware
app.onError(({ error }) => {
  console.error("Unhandled error:", error) // still log for debugging

  return Response.json(
    {
      status: "error",
      message: "An unexpected error occurred. Please try again.",
      messageKey: "common.unexpectedError",
      data: null,
    },
    { status: 500 }
  )
})
```

The global handler is the last resort. The goal is to catch errors **at the endpoint level** with specific `messageKey` values first.

---

## Error hierarchy (in order of preference)

| Priority | Type | Example |
|---|---|---|
| 1 (best) | Domain-specific error | `member.notFound`, `order.paymentFailed`, `inventory.insufficientStock` |
| 2 | Validation error | `validation.phoneTaken`, `validation.invalidEmail` |
| 3 | Authorization error | `auth.unauthorized`, `auth.sessionExpired` |
| 4 (worst) | Raw system error | `TypeError`, `ReferenceError`, SQL constraint violation text |

Never let Priority 4 reach the frontend. Always catch and convert.

---

## Common error keys

| Key | When to use |
|---|---|
| `common.notFound` | Resource not found by ID |
| `common.unexpectedError` | Catch-all for unhandled/internal errors |
| `common.forbidden` | No permission for this action |
| `auth.unauthorized` | Not authenticated |
| `auth.sessionExpired` | Token/invalid or expired |
| `validation.required` | Missing required field |
| `validation.alreadyExists` | Duplicate unique field (email, username, phone) |
| `module.notFound` | Module-specific not found (e.g., `member.notFound`) |

---

## Checklist for each endpoint

1. Handle the happy path — add `messageKey` + `messageParams`
2. Handle every known failure case — each with its own `messageKey`
3. Wrap the endpoint logic in a try/catch that returns a custom `common.unexpectedError` fallback
4. Verify the global error handler catches anything that slips through
5. Confirm nowhere in the module can a raw `TypeError`, `ReferenceError`, or database constraint message leak to the response

---

## Module naming conventions

Use `snake_case` for message keys. Format: `{module}.{action}`

| Module | Example keys |
|---|---|
| Common | `common.unexpectedError`, `common.notFound`, `common.forbidden` |
| Members | `member.added`, `member.phoneTaken`, `member.notFound`, `member.connected`, `member.created` |
| Orders | `order.created`, `order.notFound`, `order.statusUpdated`, `order.paymentFailed` |
| Inventories | `inventory.created`, `inventory.updated`, `inventory.deleted`, `inventory.stock.adjusted`, `inventory.restocked` |
| Services | `service.created`, `service.updated`, `service.deleted` |
| Bundlings | `bundling.created`, `bundling.updated`, `bundling.deleted`, `bundling.items.updated` |
| Vouchers | `voucher.created`, `voucher.updated`, `voucher.deleted` |
| Users | `user.created`, `user.role.updated` |
| Auth | `auth.loginFailed`, `auth.registrationFailed`, `auth.sessionExpired`, `auth.unauthorized` |
| Account | `profile.updated`, `password.updated` |
| Addresses | `address.added`, `address.updated`, `address.deleted` |
| Deliveries | `delivery.requested`, `delivery.status.updated`, `delivery.route.created` |
| Pickups | `pickup.route.created`, `pickup.cancelled` |
| Routes | `route.completed` |
| Payments | `payment.created`, `payment.verified`, `payment.failed` |

---

## Frontend translation mapping

The frontend stores translations in `messages/en.json` and `messages/id.json` under a `"Notifications"` namespace. The frontend helper resolves your `messageKey` via `t("Notifications.{messageKey}")`.

### ⚠️ Important: No dots in JSON keys

`next-intl` uses the dot character (`.`) as its nesting separator — it **cannot** be used inside JSON keys. Flat keys like `"member.added"` are **invalid** and will crash the app.

The JSON files use **nested objects** instead of flat dot-notation keys:

```json
// ❌ INVALID — will crash
{ "Notifications": { "member.added": "Member added" } }

// ✅ CORRECT — nested objects
{ "Notifications": { "member": { "added": "Member added" } } }
```

### How it works

```
Backend sends:       messageKey: "member.added"
Frontend looks up:   t("Notifications.member.added")
                     next-intl resolves:  Notifications → member → added
JSON structure:      "Notifications": { "member": { "added": "Member {name} added successfully" } }
```

Your `messageKey` value uses dots (e.g., `member.added`), but the frontend's JSON file **always** represents this as nested objects (e.g., `"member": { "added": "..." }`). When you add a new `messageKey`, you must add the corresponding nested object path to both `en.json` and `id.json` on the frontend.

### Mapping example

```
messageKey:    "inventory.stock.adjusted"
t() call:      t("Notifications.inventory.stock.adjusted")
en.json:       "inventory": { "stock": { "adjusted": "Stock quantity adjusted successfully" } }
```
