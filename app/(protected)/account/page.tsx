import { AccountDataForm } from "@/components/features/account/account-data-form";
import { AddressManager } from "@/components/features/account/address-manager";
import { AccountApi } from "@/lib/modules/account/data";
import { getCurrentUserData } from "@/lib/modules/auth/session";

const AccountPage = async () => {
  const [userData, accountInfo] = await Promise.all([
    await getCurrentUserData(),
    await AccountApi.getAccountInfo(),
  ]);

  const addresses =
    userData?.role === "user" ? await AccountApi.getAddresses() : undefined;

  return (
    <div className="min-h-[calc(100dvh-128px)] max-w-3xl space-y-6 p-6 md:min-h-[calc(100dvh-64px)] lg:mx-auto">
      <AccountDataForm data={accountInfo} />
      {userData?.role === "user" && <AddressManager addresses={addresses} />}
    </div>
  );
};

export default AccountPage;
