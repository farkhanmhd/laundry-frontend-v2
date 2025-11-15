export const mockDeliveries = [
  {
    id: "dlv-001",
    orderId: "o-12345",
    address: "Jl. Merdeka 123, Jakarta Pusat",
    type: "pickup" as const,
    status: "completed" as const,
    requestedAt: "2025-11-10T09:00:00",
  },
  {
    id: "dlv-002",
    orderId: "o-12346",
    address: "Jl. Sudirman 456, Jakarta Selatan",
    type: "dropoff" as const,
    status: "in_progress" as const,
    requestedAt: "2025-11-11T10:30:00",
  },
  {
    id: "dlv-003",
    orderId: "o-12347",
    address: "Jl. Gatot Subroto 789, Jakarta Utara",
    type: "pickup" as const,
    status: "assigned" as const,
    requestedAt: "2025-11-12T08:15:00",
  },
  {
    id: "dlv-004",
    orderId: "o-12348",
    address: "Jl. Rasuna Said 321, Jakarta Barat",
    type: "dropoff" as const,
    status: "requested" as const,
    requestedAt: "2025-11-13T11:00:00",
  },
];
