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
    id: "dlv-01HGW5",
    orderId: "o-qL2w1",
    type: "pickup",
    status: "requested",
    address: "Apartemen Podomoro City Deli, Tower Lincoln Lt. 15",
    date: new Date("2023-12-18T10:00:00Z").toISOString(),
  },
  {
    id: "dlv-01HGW4",
    orderId: "o-mN7d4",
    type: "pickup",
    status: "assigned",
    address: "Komplek Tasbi 2 Blok C No. 45, Medan Selayang",
    date: new Date("2023-12-18T09:15:00Z").toISOString(),
  },

  {
    id: "dlv-01HGW",
    orderId: "o-xK9s2",
    type: "delivery",
    status: "in_progress",
    address: "Jl. Dr. Mansyur No. 128, Padang Bulan, Medan",
    date: new Date("2023-12-18T08:30:00Z").toISOString(),
  },
  {
    id: "dlv-01HGV3",
    orderId: "o-aB5c9",
    type: "delivery",
    status: "completed",
    address: "Jl. Setia Budi No. 88, Tanjung Rejo, Medan",
    date: new Date("2023-12-17T14:20:00Z").toISOString(),
  },
];
