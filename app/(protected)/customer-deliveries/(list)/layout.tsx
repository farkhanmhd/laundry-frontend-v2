import { getTranslations } from "next-intl/server";

interface Props {
  children: React.ReactNode;
}

const CustomerDeliveriesPage = async ({ children }: Props) => {
  const t = await getTranslations("CustomerDeliveries");

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-8 flex flex-col gap-1.5">
        <h1 className="font-bold text-2xl tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>
      <div className="grid gap-4">{children}</div>
    </div>
  );
};

export default CustomerDeliveriesPage;
