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
    id: "dlv-7",
    orderId: "ord-7719",
    routeId: null,
    customerName: "Andi Siregar",
    customerPhone: "+62 812-9988-7766",
    address: "Jl. Dr. Mansyur No. 88, Padang Bulan",
    status: "requested",
    requestedAt: "2025-12-16T08:45:00Z",
  },
  {
    id: "dlv-8",
    orderId: "ord-8823",
    routeId: null,
    customerName: "Siti Aminah",
    customerPhone: "+62 853-1122-3344",
    address: "Komplek Cemara Asri, Jl. Berry No. 5",
    status: "requested",
    requestedAt: "2025-12-16T09:10:00Z",
  },
  {
    id: "dlv-9",
    orderId: "ord-9945",
    routeId: "rt-106",
    customerName: "Gym Fit Nation",
    customerPhone: "+62 811-5544-3322",
    address: "Podomoro City Deli, Lt. 3",
    status: "requested",
    requestedAt: "2025-12-16T09:30:00Z",
  },
  {
    id: "dlv-10",
    orderId: "ord-1022",

    routeId: "rt-102",
    customerName: "Joko Anwar",
    customerPhone: "+62 813-7766-5544",
    address: "Jl. Setiabudi No. 150 (Sebelah Bank)",
    status: "completed",
    requestedAt: "2025-12-14T14:20:00Z",
  },
  {
    id: "dlv-12",
    orderId: "ord-1245",
    routeId: null,
    customerName: "Restoran Sederhana",
    customerPhone: "+62 61-7788-9900",
    address: "Jl. Ringroad Gagak Hitam No. 20",
    status: "requested",
    requestedAt: "2025-12-16T10:15:00Z",
  },
  {
    id: "dlv-13",
    orderId: "ord-1377",
    routeId: "rt-105",
    customerName: "Michael Tan",
    customerPhone: "+62 819-0099-8877",
    address: "Cambridge Condominium, Tower B",
    status: "assigned",
    requestedAt: "2025-12-15T09:45:00Z",
  },
  {
    id: "dlv-14",
    orderId: "ord-1456",
    routeId: null,
    customerName: "Putri Indah",
    customerPhone: "+62 859-2233-4455",
    address: "Jl. Karya Wisata, Medan Johor",
    status: "requested",
    requestedAt: "2025-12-16T11:00:00Z",
  },
  {
    id: "dlv-15",
    orderId: "ord-1590",
    routeId: null,
    customerName: "Kevin Wijaya",
    customerPhone: "+62 812-6677-8899",
    address: "Citra Garden, Blok C No. 8",
    status: "requested",
    requestedAt: "2025-12-16T11:30:00Z",
  },
];
