# Data Fetching for @admin /dashboard

- update the layout.tsx at /app/(protected)/dashboard/@admin to have parallel routes for operationalMetrics, pickupRequests, deliveryRequests  
- then update /lib/modules/admin-dashboard/data.ts to have this 3 data fetching 
```
/admin-dashboard/operational-metrics)
/admin-dashboard/recent-pickups​
/admin-dashboard/recent-deliveries
```
- the purpose of the data fetching above is to for each new slots at /app/(protected)/dashboard/@admin to replace the mock data.
- for each new slot create next.js loading.tsx made with shadcn skeleton
- for each new slot create next.js error.tsx for error mechanism
