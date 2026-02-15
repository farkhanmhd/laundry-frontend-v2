import { getTranslations } from "next-intl/server";
import type { SelectOption } from "@/components/forms/form-select";
import { InventoriesApi } from "@/lib/modules/inventories/data";
import { ServicesApi } from "@/lib/modules/services/data";
import { NewBundlingForm } from "../../../../../components/features/bundlings/new-bundling-form";

type Props = {
  params: Promise<{ locale: string }>;
};

const NewBundlingPage = async ({ params }: Props) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Bundlings" });

  const [services, inventories] = await Promise.all([
    ServicesApi.getServices(),
    InventoriesApi.getInventories(),
  ]);

  const serviceOptions = services?.map((service) => ({
    label: service.name,
    value: service.id,
  })) as SelectOption[];

  const inventoryOptions = inventories?.map((inventory) => ({
    label: inventory.name,
    value: inventory.id,
  })) as SelectOption[];

  return (
    <div className="h-full space-y-4 p-6 lg:mx-auto lg:max-w-3xl">
      <div>
        <h1 className="font-semibold text-2xl">{t("form.createNew")}</h1>
        <p className="text-muted-foreground text-sm">
          {t("form.createDescription")}
        </p>
      </div>
      <NewBundlingForm
        inventories={inventoryOptions}
        services={serviceOptions}
      />
    </div>
  );
};

export default NewBundlingPage;
