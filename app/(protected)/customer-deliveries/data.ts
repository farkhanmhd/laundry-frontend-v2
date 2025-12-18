export type DeliveryListItem = {
  id: string;
  orderId: string;
  type: "pickup" | "delivery";
  status: "requested" | "assigned" | "in_progress" | "completed" | "cancelled";
  address: string;
  date: string; // utc string
};

export const mockDeliveries: DeliveryListItem[] = [
  {
    id: "dlv-01HGW4J5K2X9A",
    orderId: "o-xK9s2",
    type: "delivery",
    status: "in_progress",
    address: "Jl. Dr. Mansyur No. 128, Padang Bulan, Medan",
    date: new Date("2023-12-18T08:30:00Z").toISOString(),
  },
  {
    id: "dlv-01HGW4J8M3Y5B",
    orderId: "o-mN7d4",
    type: "pickup",
    status: "assigned",
    address: "Komplek Tasbi 2 Blok C No. 45, Medan Selayang",
    date: new Date("2023-12-18T09:15:00Z").toISOString(),
  },
  {
    id: "dlv-01HGW4K2P4Z8C",
    orderId: "o-qL2w1",
    type: "pickup",
    status: "requested",
    address: "Apartemen Podomoro City Deli, Tower Lincoln Lt. 15",
    date: new Date("2023-12-18T10:00:00Z").toISOString(),
  },
  {
    id: "dlv-01HGV3N9Q5R1D",
    orderId: "o-aB5c9",
    type: "delivery",
    status: "completed",
    address: "Jl. Setia Budi No. 88, Tanjung Rejo, Medan",
    date: new Date("2023-12-17T14:20:00Z").toISOString(),
  },
  {
    id: "dlv-01HGV2M8T6S3E",
    orderId: "o-pZ8y3",
    type: "pickup",
    status: "completed",
    address: "Jl. Jamin Ginting KM 9, Medan",
    date: new Date("2023-12-17T09:45:00Z").toISOString(),
  },
  {
    id: "dlv-01HGT9K6W9V7G",
    orderId: "o-hJ1k5",
    type: "pickup",
    status: "completed",
    address: "Jl. Ringroad Gagak Hitam, Komplek OCBC No. 10",
    date: new Date("2023-12-15T11:30:00Z").toISOString(),
  },
];
