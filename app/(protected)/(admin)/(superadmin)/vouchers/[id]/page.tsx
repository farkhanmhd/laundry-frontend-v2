import { getTranslations } from "next-intl/server";
import { UpdateVoucher } from "@/components/features/vouchers/update-voucher";
import { type Voucher, VouchersApi } from "@/lib/modules/vouchers/data";

type Props = {
  params: Promise<{ id: string }>;
};

const VoucherDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const t = await getTranslations("Vouchers");
  const voucher = (await VouchersApi.getVoucherById(id)) as Voucher;
  return (
    <div className="h-full space-y-4 p-6 lg:mx-auto lg:max-w-3xl">
      <div>
        <h1 className="font-semibold text-2xl">{t("form.updateVoucher")}</h1>
        <p className="text-muted-foreground text-sm">
          {t("form.updateDescription")}
        </p>
      </div>
      <UpdateVoucher voucher={voucher} />
    </div>
  );
};

export default VoucherDetailPage;
