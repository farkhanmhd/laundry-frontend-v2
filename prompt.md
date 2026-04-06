# Data Fetching for Routes Detail Page

- Create new modules at lib/modules/routes/data.ts extends from base-api.ts
- Create new method to fetch with elysia eden with this path `/routes/${id}`
- success result is gonna be like this
```
{
  "status": "success",
  "message": "Route retrieved successfully",
  "data": {
    "id": "rt-5439",
    "userId": "RGjfReUglb2P6dnPeLilI6yOi23wPxYQ",
    "deliveries": [
      {
        "id": "dlv-019d2a0b-792d-7000-a9ea-e69e983646ef",
        "orderId": "o-ezdei",
        "addressId": "addr-019ce2c1-9453-7000-89de-f0a92ec2c02f",
        "index": 1,
        "type": "pickup",
        "status": "in_progress",
        "notes": "Pas disimpang gang Manggis",
        "requestedAt": "2026-03-26 19:08:08.150",
        "completedAt": null,
        "customerName": "Test User",
        "customerPhone": "+627850462",
        "addressLabel": "Rumah",
        "address": "Jalan Beringin Gang Manggis",
        "latitude": "3.5913206",
        "longitude": "98.7475635"
      },
      {
        "id": "dlv-019d2a0c-516a-7000-ad46-155c8ccbd0ba",
        "orderId": "o-zproi",
        "addressId": "addr-019ce2c1-9453-7000-89de-f0a92ec2c02f",
        "index": 2,
        "type": "pickup",
        "status": "in_progress",
        "notes": "Pas disimpang gang Manggis",
        "requestedAt": "2026-03-26 19:09:03.573",
        "completedAt": null,
        "customerName": "Test User",
        "customerPhone": "+627850462",
        "addressLabel": "Rumah",
        "address": "Jalan Beringin Gang Manggis",
        "latitude": "3.5913206",
        "longitude": "98.7475635"
      }
    ]
  }
}
```
- after creating the data fetching, import the new class to the app/(protected)/(superadmin)/routes/[id]/page.tsx
- remove the mock data fetch
