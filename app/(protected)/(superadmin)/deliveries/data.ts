export type Delivery = {
  id: string;
  orderId: string;
  routeId: string | null; // null

  // Separated customer fields
  customerName: string;
  customerPhone: string;

  address: string;
  status: "requested" | "assigned" | "completed" | "cancelled";
  requestedAt: string; // ISO 8601 UTC
};

export const mockDeliveries: Delivery[] = [
  {
    id: "dlv-1",
    orderId: "ord-7782",

    routeId: null,
    customerName: "Alice Johnson",
    customerPhone: "+62 812-3456-7890",
    address: "Jl. Merpati No. 45, Medan",
    status: "requested",
    requestedAt: "2025-12-15T08:30:00Z",
  },

  {
    id: "dlv-3",
    orderId: "ord-3321",

    routeId: null,
    customerName: "Coffee Shop Kenangan",
    customerPhone: "+62 811-2233-4455",
    address: "Jl. Pattimura No. 10 (Staff Entrance)",
    status: "requested",
    requestedAt: "2025-12-15T10:00:00Z",
  },

  {
    id: "dlv-5",
    orderId: "ord-5543",

    routeId: null,
    customerName: "Rina Wati",
    customerPhone: "+62 877-1122-3344",
    address: "Komplek Asia Mega Mas, Block DD",
    status: "requested",
    requestedAt: "2025-12-15T11:20:00Z",
  },
  {
    id: "dlv-2",
    orderId: "ord-9921",

    routeId: "rt-105",
    customerName: "Budi Santoso",
    customerPhone: "+62 852-9876-5432",
    address: "Apartemen Grand City, Tower A, Unit 12",
    status: "assigned",
    requestedAt: "2025-12-15T09:15:00Z",
  },
  {
    id: "dlv-4",
    orderId: "ord-1102",

    routeId: "rt-105",
    customerName: "Sarah Lee",
    customerPhone: "+62 813-5566-7788",
    address: "Jl. Sudirman No. 5",
    status: "assigned",
    requestedAt: "2025-12-14T16:45:00Z",
  },
];
