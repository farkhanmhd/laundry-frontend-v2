"use client";

import { Check } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQueryParams } from "@/hooks/use-query-params";
import type { SelectOption } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  queryKey: string;
  options: SelectOption[];
  icon?: React.ReactNode;
  placeholder?: string;
}

export const QueryFacetedFilter = ({
  title,
  options,
  queryKey,
  icon,
  placeholder,
}: Props) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { toggleQuery, removeQuery, getSelectedValues } =
    useQueryParams(params);
  const pathname = usePathname();
  const { replace } = useRouter();
  const selectedValues = new Set(getSelectedValues(queryKey));

  const handleSelect = (value: string) => {
    toggleQuery(queryKey, value);
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="rounded-none border-l" variant="ghost">
          {icon && (
            <span className="mr-2 flex h-4 w-4 items-center">{icon}</span>
          )}
          <span>{title}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    className="cursor-pointer"
                    key={option.value}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-[4px] border border-primary",
                        isSelected
                          ? "bg-primary text-muted-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    {option.icon && (
                      <span className="mr-2 flex h-4 w-4 items-center">
                        {option.icon}
                      </span>
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={() => removeQuery(queryKey)}>
                    Clear Filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
