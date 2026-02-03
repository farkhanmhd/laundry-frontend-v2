import { UpdateVoucher } from "@/components/features/vouchers/update-voucher";
import { getVoucherById, type Voucher } from "@/lib/modules/vouchers/data";

type Props = {
  params: Promise<{ id: string }>;
};

const VoucherDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const voucher = (await getVoucherById(id)) as Voucher;
  return (
    <div className="h-full space-y-4 p-6 lg:mx-auto lg:max-w-3xl">
      <div>
        <h1 className="font-semibold text-2xl">Voucher</h1>
        <p className="text-muted-foreground text-sm">
          Enter details below to modify voucher.
        </p>
      </div>
      <UpdateVoucher voucher={voucher} />
    </div>
  );
};

export default VoucherDetailPage;
