import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { UpdateVehicleForm } from "@/components/features/vehicles/update-vehicle-form";
import { VehiclesApi } from "@/lib/modules/vehicles/data";

type Props = {
  params: Promise<{ id: string }>;
};

const VehicleDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const t = await getTranslations("Vehicles");
  const vehicle = await VehiclesApi.getVehicle(id);

  if (!vehicle) {
    notFound();
  }

  return (
    <div className="h-full space-y-4 p-6 lg:mx-auto lg:max-w-3xl">
      <div>
        <h1 className="font-semibold text-2xl">{t("form.updateVehicle")}</h1>
        <p className="text-muted-foreground text-sm">
          {t("form.updateDescription")}
        </p>
      </div>
      <UpdateVehicleForm vehicle={vehicle} />
    </div>
  );
};

export default VehicleDetailPage;
