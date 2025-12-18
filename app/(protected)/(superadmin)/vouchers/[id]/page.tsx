import { VoucherDataForm } from "@/components/features/vouchers/voucher-data-form";
import { getVoucherById, type Voucher } from "@/lib/modules/vouchers/data";

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  const voucher = (await getVoucherById(id)) as Voucher;
  return (
    <VoucherDataForm
      code={voucher.code}
      discountAmount={voucher.discountAmount}
      expiresAt={new Date(voucher.expiresAt as string)}
      id={id}
      name={voucher.name}
      pointsCost={voucher.pointsCost}
    />
  );
};

export default page;
