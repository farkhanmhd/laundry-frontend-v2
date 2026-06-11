import { getTranslations } from "next-intl/server";
import { CreateAssetForm } from "@/components/features/assets/create-asset-form";

const NewAssetPage = async () => {
  const t = await getTranslations("Assets");

  return (
    <div className="h-full space-y-4 p-6 lg:mx-auto lg:max-w-3xl">
      <div>
        <h1 className="font-semibold text-2xl">{t("form.createNew")}</h1>
        <p className="text-muted-foreground text-sm">
          {t("form.createDescription")}
        </p>
      </div>
      <CreateAssetForm />
    </div>
  );
};

export default NewAssetPage;
