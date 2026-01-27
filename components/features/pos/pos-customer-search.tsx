"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { usePOS } from "@/lib/modules/pos/state";
import { PosCustomerSearchItem } from "./pos-customer-search-item";
import { PosEmptySearch } from "./pos-empty-search";
import { PosSelectedCustomer } from "./pos-selected-customer";

export const PosCustomerSearch = () => {
  const {
    handlePhoneChange,
    phone,
    members,
    posData,
    handleSelectMember,
    clearSelectedCustomer,
    debouncedSearch,
    toggleNewMember,
  } = usePOS();
  const showSuggestions =
    !posData.member && phone.length > 0 && members && members.length > 0;

  const showEmptyResult =
    members && members.length === 0 && debouncedSearch.length > 0;

  return (
    <div className="space-y-3">
      {posData.member ? (
        <PosSelectedCustomer
          customer={posData.member}
          onClick={clearSelectedCustomer}
        />
      ) : (
        <div>
          <div className="mb-3 space-y-2">
            <Label
              className="block font-medium text-card-foreground"
              htmlFor="customer-search"
            >
              Search Member
            </Label>
            <p className="text-muted-foreground text-sm">
              Find a customer by phone number
            </p>
          </div>

          <Popover open={showSuggestions}>
            <PopoverAnchor asChild>
              <div className="relative">
                <Input
                  autoComplete="off"
                  className="pl-9"
                  id="customer-search"
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="81234567890"
                  value={phone}
                />
                <span className="absolute top-2 left-2 text-muted-foreground text-sm">
                  +62
                </span>
              </div>
            </PopoverAnchor>
            <PopoverContent
              align="start"
              className="w-(--radix-popover-trigger-width) p-0"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              {/*{(isLoadingMembers || isFetchingMembers) && (
                <PosCustomerSearchSkeleton />
              )}*/}
              {members && members.length > 0 && (
                <ul>
                  {members.map((customer) => (
                    <li key={customer.id}>
                      <PosCustomerSearchItem
                        customer={customer}
                        onClick={() => handleSelectMember(customer)}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </PopoverContent>
          </Popover>
        </div>
      )}
      {showEmptyResult && (
        <PosEmptySearch onClick={toggleNewMember} searchInput={phone} />
      )}
    </div>
  );
};
