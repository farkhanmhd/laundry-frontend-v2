import { getTranslations } from "next-intl/server";
import { InventoriesApi } from "@/lib/modules/inventories/data";
import { InventoryMovementExportDialog } from "./inventory-movement-export-dialog";
import { MovementTableClient } from "./movement-table-client";

interface Props {
  id: string;
  name: string;
  page?: number;
  rows?: number;
}

const InventoryMovementTab = async ({ id, name, page, rows }: Props) => {
  const t = await getTranslations("Inventories");
  const movementData = await InventoriesApi.getInventoryMovement(id, {
    page,
    rows,
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div>
          <h2 className="font-semibold text-lg">{`${t("logs.movementTitle")} - ${name}`}</h2>
          <p className="text-muted-foreground text-sm">
            {t("logs.movementDescription")}
          </p>
        </div>
        <InventoryMovementExportDialog id={id} />
      </div>
      <MovementTableClient
        data={movementData?.movementHistory ?? []}
        total={movementData?.total}
      />
    </div>
  );
};

export default InventoryMovementTab;
