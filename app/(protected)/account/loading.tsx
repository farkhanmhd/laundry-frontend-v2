import { AccountDataFormSkeleton } from "@/components/features/account/account-data-form-skeleton";
import { AddressManagerSkeleton } from "@/components/features/account/address-manager-skeleton";

const AccountLoadingPage = () => {
  return (
    <div className="min-h-[calc(100dvh-128px)] max-w-3xl space-y-6 p-6 md:min-h-[calc(100dvh-64px)] lg:mx-auto">
      <AccountDataFormSkeleton />
      <AccountDataFormSkeleton />
      <AddressManagerSkeleton />
    </div>
  );
};

export default AccountLoadingPage;
