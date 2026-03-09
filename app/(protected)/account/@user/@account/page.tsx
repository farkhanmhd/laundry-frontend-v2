import { AccountDataForm } from "@/components/features/account/account-data-form";
import { AccountApi } from "@/lib/modules/account/data";

const AccountData = async () => {
  const accountInfo = await AccountApi.getAccountInfo();
  return <AccountDataForm data={accountInfo} />;
};

export default AccountData;
