import { MinusIcon, Plus, Trash } from "lucide-react";
import type { FieldArrayWithId } from "react-hook-form";
import type { SelectOption } from "@/components/forms/form-select";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import type { BundlingItem } from "@/lib/modules/bundlings/schema";

const itemTypeOptions: SelectOption[] = [
  {
    label: "Select Item Type",
    value: "select item type",
  },
  {
    label: "Inventory",
    value: "inventory",
  },
  {
    label: "Services",
    value: "service",
  },
];

type BundlingFormValues = {
  items: BundlingItem[];
};

type Props = {
  services: SelectOption[];
  inventories: SelectOption[];
  onDeleteClick: () => void;
  removable: boolean;
  field: FieldArrayWithId<BundlingFormValues, "items", "_id">;
  index: number;
  update: (index: number, item: BundlingItem) => void;
  disabled: boolean;
};

export function BundlingItemForm({
  services,
  inventories,
  onDeleteClick,
  removable,
  field,
  index,
  update,
  disabled,
}: Props) {
  const itemType = field.itemType || "select item type";
  const currentId =
    itemType === "inventory" ? field.inventoryId : field.serviceId;
  const selectedItem = currentId || "select an item";

  const currentList = itemType === "inventory" ? inventories : services;

  const selectedItemOptions: SelectOption[] = [
    { label: "Select an item", value: "select an item" },
    ...currentList,
  ];

  const selectedItemLabel =
    [...services, ...inventories].find((item) => item.value === selectedItem)
      ?.label || "Select an Item";

  const handleItemTypeChange = (value: string) => {
    update(index, {
      ...field,
      itemType: value as "inventory" | "service",
      inventoryId: null,
      serviceId: null,
    });
  };

  const handleItemSelectionChange = (value: string) => {
    if (itemType === "inventory") {
      update(index, { ...field, inventoryId: value, serviceId: null });
    } else {
      update(index, { ...field, serviceId: value, inventoryId: null });
    }
  };

  const handleIncrement = () => {
    update(index, { ...field, quantity: field.quantity + 1 });
  };

  const handleDecrement = () => {
    update(index, { ...field, quantity: Math.max(0, field.quantity - 1) });
  };

  return (
    <ButtonGroup className="w-full">
      <ButtonGroup className="w-full">
        <Select
          disabled={disabled}
          onValueChange={handleItemTypeChange}
          value={itemType}
        >
          <SelectTrigger className="capitalize">{itemType}</SelectTrigger>
          <SelectContent>
            {itemTypeOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          disabled={disabled}
          onValueChange={handleItemSelectionChange}
          value={selectedItem}
        >
          <SelectTrigger className="capitalize">
            {selectedItemLabel}
          </SelectTrigger>
          <SelectContent>
            {selectedItemOptions.map((opt) => (
              <SelectItem key={opt.label} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          className="text-right"
          disabled={disabled}
          pattern="[0-9]*"
          placeholder="Quantity"
          readOnly
          value={field.quantity === 0 ? "" : field.quantity}
        />
        <Button
          disabled={field.quantity <= 0 || disabled}
          onClick={handleDecrement}
          type="button"
          variant="outline"
        >
          <MinusIcon />
        </Button>
        <Button
          disabled={disabled}
          onClick={handleIncrement}
          type="button"
          variant="outline"
        >
          <Plus />
        </Button>
      </ButtonGroup>
      {removable && (
        <ButtonGroup>
          <Button
            disabled={disabled}
            onClick={onDeleteClick}
            type="button"
            variant="outline"
          >
            <Trash />
          </Button>
        </ButtonGroup>
      )}
    </ButtonGroup>
  );
}
