export const mockCustomerOrders = [
  // 1. Newest Item (Dec 15) - Status forced to "pending"
  {
    id: "o-a1b2c",
    createdAt: "2025-12-15T14:30:00",
    total: 45_000,
    status: "pending",
  },
  {
    id: "o-x9d2a",
    createdAt: "2025-12-12T09:15:00",
    total: 150_000,
    status: "processing",
  },
  {
    id: "o-j8l4x",
    createdAt: "2025-12-10T18:45:00",
    total: 85_000,
    status: "ready",
  },
  {
    id: "o-m5p9q",
    createdAt: "2025-12-05T11:20:00",
    total: 25_000,
    status: "completed",
  },
  {
    id: "o-r3t7y",
    createdAt: "2025-11-28T16:00:00",
    total: 210_000,
    status: "completed",
  },
  {
    id: "o-k2n6v",
    createdAt: "2025-11-20T10:10:00",
    total: 60_000,
    status: "completed",
  },
  {
    id: "o-w8s4z",
    createdAt: "2025-11-15T13:45:00",
    total: 115_000,
    status: "completed",
  },
  // The items you manually added (November) are now here
  {
    id: "o-12348",
    createdAt: "2025-11-13T11:00:00",
    total: 95_000,
    status: "completed", // Kept original status
  },
  {
    id: "o-12347",
    createdAt: "2025-11-12T08:15:00",
    total: 150_000,
    status: "completed", // Kept original status
  },
  {
    id: "o-12346",
    createdAt: "2025-11-11T10:30:00",
    total: 85_000,
    status: "completed", // Kept original status
  },
];
