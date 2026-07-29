# API: Update Customer Order Items

## Endpoint

```
PATCH /customerorders/:id/items
```

## Request

```json
{
  "data": [
    {
      "itemId": "od-abc12",
      "itemType": "service",
      "quantity": 3
    },
    {
      "itemId": "s-abc123",
      "itemType": "service",
      "quantity": 2
    }
  ]
}
```

### itemId rules

- If `itemId` starts with `od-`, it refers to an **existing order item record** — update its quantity.
- If `itemId` does NOT start with `od-`, it refers to a **catalog/entity ID** (e.g. `s-xxx`, `p-xxx`, `bnd-xxx`) — add it as a new order item.

The array represents the **complete** set of editable items for this order. Any existing editable items not in this array will be removed.

### itemType

Only `"service"`, `"inventory"`, and `"bundling"` are accepted. `"voucher"` and `"points"` are preserved server-side and must not be sent.

## Success Response

**Status:** `200`

```json
{
  "status": 200,
  "message": "Order items updated successfully",
  "messageKey": "order.items.updated",
  "data": {
    "total": 75000
  }
}
```

## Error Responses

| Status | Condition |
|--------|-----------|
| `404` | Order not found or not owned by customer |
| `404` | Item reference not found (invalid itemId) |
| `400` | Pickup has not been requested |
| `400` | Cannot update items after payment has been processed |
| `400` | No items to update |
| `400` | At least one service or bundling item is required |
| `400` | Duplicate items detected |

Error shape:

```json
{
  "status": "error",
  "message": "Pickup has not been requested",
  "messageKey": "common.unexpectedError",
  "data": null
}
```

## Summary for frontend dev

- Already have mock mutation with TanStack Query — wire up the `PATCH /customerorders/:id/items` endpoint.
- Send `{ data: [{ itemId, itemType, quantity }] }` where `itemType` is one of `"service"`, `"inventory"`, `"bundling"`.
- Pass the order `id` from the URL param or route context.
- Invalidate order detail/items queries on success so the UI picks up the new totals.
