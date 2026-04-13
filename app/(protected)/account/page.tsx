import { AccountDataForm } from "@/components/features/account/account-data-form";
import { AddressManager } from "@/components/features/account/address-manager";
import { PasswordForm } from "@/components/features/account/password-form";
import { getSession } from "@/lib/modules/auth/session";
import { AccountApi } from "@/lib/modules/account/data";

const AccountPage = async () => {
  const role = (await getSession())?.user.role;
  const accountInfo = await AccountApi.getAccountInfo();
  const addresses =
    role === "user" ? await AccountApi.getAddresses() : undefined;

  return (
    <div className="min-h-[calc(100dvh-128px)] max-w-3xl space-y-6 p-6 md:min-h-[calc(100dvh-64px)] lg:mx-auto">
      <AccountDataForm data={accountInfo} />
      <PasswordForm />
      {role === "user" && <AddressManager addresses={addresses} />}
    </div>
  );
};

export default AccountPage;
