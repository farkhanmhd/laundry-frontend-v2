"use client";

import { AccountDataForm } from "@/components/features/account/account-data-form";
import AddressManager from "@/components/features/account/address-manager";

// --- MOCK DATA ---
const MOCK_USER_DATA = {
  username: "budisantoso99",
  name: "Budi Santoso",
  phone: 1_234_567_890,
};

export const MOCK_ADDRESSES = [
  {
    id: "addr_01",
    label: "Home",
    street: "Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan",
    lat: -6.225_014,
    lng: 106.809_756,
  },
  {
    id: "addr_02",
    label: "Office (Work)",
    street: "Menara BCA, Jl. M.H. Thamrin No. 1, Jakarta Pusat",
    lat: -6.197_254,
    lng: 106.823_467,
  },
  {
    id: "addr_03",
    label: "Warehouse Medan",
    street: "Jl. Putri Hijau No. 10, Medan, Sumatera Utara",
    lat: 3.595_196,
    lng: 98.672_226,
  },
];

const AccountPage = () => (
  <div className="max-w-3xl space-y-6 p-6 lg:mx-auto">
    <AccountDataForm account={MOCK_USER_DATA} />
    <AddressManager initialAddresses={MOCK_ADDRESSES} />
  </div>
);

export default AccountPage;
