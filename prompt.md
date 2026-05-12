
# Receipt & Order Detail API Specification

## Endpoints

### 1. Lookup Receipt
- **URL:** `GET /receipt/lookup`
- **Query Parameters:**
  - `orderId` (string, required): The ID of the order to look up.
- **Response:**
  ```json
  {
    "status": "success",
    "data": {
      "orderId": "string",
      "exists": "boolean",
      "customerName": "string | null",
      "createdAt": "string | null",
      "status": "string | null"
    }
  }
  ```

### 2. Get Order Info
- **URL:** `GET /receipt/:id/info`
- **Response:**
  ```json
  {
    "status": "success",
    "data": {
      "status": "string",
      "createdAt": "string"
    }
  }
  ```

### 3. Get Order Customer
- **URL:** `GET /receipt/:id/customer`
- **Response:**
  ```json
  {
    "status": "success",
    "data": {
      "name": "string",
      "phone": "string",
      "memberId": "string | null"
    }
  }
  ```

### 4. Get Order Deliveries
- **URL:** `GET /receipt/:id/deliveries`
- **Response:**
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": "string",
        "address": "string",
        "courier": "string",
        "trackingNumber": "string | null",
        "status": "string"
      }
    ]
  }
  ```

### 5. Get Order Payment
- **URL:** `GET /receipt/:id/payment`
- **Response:**
  ```json
  {
    "status": "success",
    "data": {
      "paymentType": "string",
      "amountPaid": "number",
      "change": "number",
      "transactionStatus": "string"
    }
  }
  ```

### 6. Get Order Items
- **URL:** `GET /receipt/:id/items`
- **Response:**
  ```json
  {
    "status": "success",
    "data": {
      "items": [
        {
          "id": "string",
          "name": "string",
          "qty": "number",
          "price": "number",
          "subtotal": "number"
        }
      ],
      "voucher": {
        "id": "string",
        "code": "string",
        "description": "string",
        "discountAmount": "number"
      } | null,
      "points": {
        "id": "string",
        "points": "number"
      } | null
    }
  }
  ```

---

# Frontend Implementation Prompt

Implement data fetching for the receipt search and order detail pages using TanStack Query, connecting to the now-available Backend API.

### Requirements:
1.  **API Client:** Update or implement the `ReceiptApi` class in `lib/modules/receipt/data.ts` to fetch data from the actual backend endpoints defined above.
2.  **TanStack Query:**
    - Implement `useReceiptLookup` hook for the search functionality in `components/features/receipt/receipt-search.tsx`.
    - Implement hooks for each section in the order detail page (`useOrderInfo`, `useOrderCustomer`, `useOrderDeliveries`, `useOrderPayment`, and `useOrderItems`) in `components/features/receipt/order-sections.tsx`.
3.  **Real Data Integration:** Ensure the application uses live data from the backend. The endpoints are public and do not require authentication.
4.  **Error Handling:** Ensure proper error states are handled in the components using the existing `SectionErrorBoundary`. Display appropriate messages if an order is not found or if the API is unreachable.
5.  **Parallel Fetching:** The order detail sections in `app/receipt/[id]/page.tsx` should fetch their data in parallel to optimize loading performance.
