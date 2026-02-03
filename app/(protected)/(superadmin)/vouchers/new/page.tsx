import { CreateVoucher } from "@/components/features/vouchers/create-voucher";

const NewProductPage = () => {
  return (
    <div className="h-full space-y-4 p-6 lg:mx-auto lg:max-w-3xl">
      <div>
        <h1 className="font-semibold text-2xl">Create New Voucher</h1>
        <p className="text-muted-foreground text-sm">
          Enter details below to add new voucher.
        </p>
      </div>
      <CreateVoucher />
    </div>
  );
};

export default NewProductPage;
