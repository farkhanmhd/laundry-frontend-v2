"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import type { Driver } from "@/lib/modules/drivers/data";
import { getDrivers } from "@/lib/modules/drivers/search";
import type { VehicleSchema } from "@/lib/modules/vehicles/schema";
import { DriverSearchItem } from "./driver-search-item";
import { DriverSearchSkeleton } from "./driver-search-skeleton";
import { SelectedDriver } from "./selected-driver";

interface Props {
  form: UseFormReturn<VehicleSchema>;
  initialDriverName?: string | null;
}

export const DriverSearch = ({ form, initialDriverName }: Props) => {
  const t = useTranslations("Vehicles");
  const [search, setSearch] = useState("");
  const [selectedName, setSelectedName] = useState<string | null>(
    initialDriverName ?? null
  );
  const [debouncedSearch] = useDebounce(search, 300);

  const hasSelection = selectedName !== null;

  const { data: result, isFetching } = useQuery({
    queryKey: ["drivers", debouncedSearch],
    queryFn: () => getDrivers({ search: debouncedSearch, rows: 5 }),
    enabled: debouncedSearch.length > 0,
    staleTime: 10,
    placeholderData: keepPreviousData,
  });

  const drivers = result?.drivers;

  const handleSelect = (driver: Driver) => {
    form.setValue("ownerId", driver.id);
    setSelectedName(driver.name);
    setSearch("");
  };

  const handleClear = () => {
    form.setValue("ownerId", null);
    setSelectedName(null);
  };

  const getSuggestions = () => {
    if (isFetching) {
      return <DriverSearchSkeleton />;
    }
    if (drivers && drivers.length > 0) {
      return (
        <ul>
          {drivers.map((driver) => (
            <li key={driver.id}>
              <DriverSearchItem
                disabled={isFetching}
                driver={driver}
                onClick={() => handleSelect(driver)}
              />
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  const showSuggestions =
    !hasSelection && search.length > 0 && drivers && drivers.length > 0;

  return (
    <div className="space-y-3">
      {hasSelection ? (
        <SelectedDriver name={selectedName || ""} onClick={handleClear} />
      ) : (
        <Popover open={showSuggestions}>
          <PopoverAnchor asChild>
            <Input
              autoComplete="off"
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("form.driverPlaceholder")}
              value={search}
            />
          </PopoverAnchor>
          <PopoverContent
            align="start"
            className="w-(--radix-popover-trigger-width) p-0"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            {getSuggestions()}
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
