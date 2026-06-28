import { getTranslations } from "next-intl/server";
import { CreateVehicleForm } from "@/components/features/vehicles/create-vehicle-form";

const NewVehiclePage = async () => {
  const t = await getTranslations("Vehicles");

  return (
    <div className="h-full space-y-4 p-6 lg:mx-auto lg:max-w-3xl">
      <div>
        <h1 className="font-semibold text-2xl">{t("form.createNew")}</h1>
        <p className="text-muted-foreground text-sm">
          {t("form.createDescription")}
        </p>
      </div>
      <CreateVehicleForm />
    </div>
  );
};

export default NewVehiclePage;
