import type { SelectOption } from "@/components/forms/form-select";
import { getInventories } from "@/lib/modules/inventories/data";
import { getServices } from "@/lib/modules/services/data";
import { NewBundlingForm } from "../../../../../components/features/bundlings/new-bundling-form";

const NewBundlingPage = async () => {
  const [services, inventories] = await Promise.all([
    getServices(),
    getInventories(),
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
        <h1 className="font-semibold text-2xl">Create New Bundlings</h1>
        <p className="text-muted-foreground text-sm">
          Enter details below to add new bundlings.
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
