import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { UpdateAssetForm } from "@/components/features/assets/update-asset-form";
import { AssetsApi } from "@/lib/modules/assets/data";

type Props = {
  params: Promise<{ id: string }>;
};

const AssetDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const t = await getTranslations("Assets");
  const data = await AssetsApi.getAssets();

  if (!data) {
    notFound();
  }

  const asset = data.assets.find((a) => a.id === id);

  if (!asset) {
    notFound();
  }

  return (
    <div className="h-full space-y-4 p-6 lg:mx-auto lg:max-w-3xl">
      <div>
        <h1 className="font-semibold text-2xl">{t("form.updateAsset")}</h1>
        <p className="text-muted-foreground text-sm">
          {t("form.updateDescription")}
        </p>
      </div>
      <UpdateAssetForm asset={asset} />
    </div>
  );
};

export default AssetDetailPage;
