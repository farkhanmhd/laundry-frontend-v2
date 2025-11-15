export const mockCustomerOrders = [
  {
    id: "o-12345",
    orderDate: "2025-11-10T09:00:00",
    total: 125_000,
    status: "completed" as const,
    itemCount: 3,
  },
  {
    id: "o-12346",
    orderDate: "2025-11-11T10:30:00",
    total: 85_000,
    status: "ready" as const,
    itemCount: 2,
  },
  {
    id: "o-12347",
    orderDate: "2025-11-12T08:15:00",
    total: 150_000,
    status: "processing" as const,
    itemCount: 4,
  },
  {
    id: "o-12348",
    orderDate: "2025-11-13T11:00:00",
    total: 95_000,
    status: "pending" as const,
    itemCount: 2,
  },
];
