import { AddressManager } from "@/components/features/account/address-manager";
import { PasswordForm } from "@/components/features/account/password-form";

interface Props {
  account: React.ReactNode;
}

const AccountLayout = ({ account }: Props) => {
  const MOCK_ADDRESSES = [
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

  return (
    <div className="min-h-[calc(100dvh-128px)] max-w-3xl space-y-6 p-6 md:min-h-[calc(100dvh-64px)] lg:mx-auto">
      {account}
      <PasswordForm />
      <AddressManager initialAddresses={MOCK_ADDRESSES} />
    </div>
  );
};

export default AccountLayout;
