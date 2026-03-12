import { AddressManager } from "@/components/features/account/address-manager";
import { AccountApi } from "@/lib/modules/account/data";

const AccountAddress = async () => {
  const addresses = await AccountApi.getAddresses();
  return <AddressManager addresses={addresses} />;
};

export default AccountAddress;
