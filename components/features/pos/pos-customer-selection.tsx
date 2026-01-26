"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type PosCustomer, usePOS } from "@/lib/modules/pos/state";
import { cardShadowStyle } from "@/lib/utils";
import { PosCustomerGuest } from "./pos-customer-guest";
// import { PosEmptySearch } from "./pos-empty-search";
// import { PosSelectedCustomer } from "./pos-selected-customer";
import { PosCustomerSearch } from "./pos-customer-search";
import { PosCustomerTypeSelection } from "./pos-customer-type-selection";

export function PosCustomerSelection() {
  // const [searchInput, setSearchInput] = useState("");
  // const [debouncedSearch] = useDebounce(searchInput, 300);
  // const [showSuggestions] = useState(false);
  const [selectedFromSearch, setSelectedFromSearch] =
    useState<PosCustomer | null>(null);
  const [manualConfirmation, setManualConfirmation] = useState(false);
  const { customerType } = usePOS();

  // const handleConfirmManual = () => {
  //   if (searchInput.trim()) {
  //     setManualConfirmation(true);
  //   }
  //   setShowSearchInput(false);
  // };

  const handleClearSelection = () => {
    setSelectedFromSearch(null);
    // setSearchInput("");
    setManualConfirmation(false);
  };

  return (
    <Card className="w-full" style={cardShadowStyle}>
      <PosCustomerTypeSelection />
      <CardContent className="space-y-4">
        {customerType === "member" ? (
          // Member Mode: Search for customer
          <div className="space-y-3">
            <PosCustomerSearch />

            {/* Manual Confirmation Display */}
            {manualConfirmation && !selectedFromSearch && (
              <div className="fade-in slide-in-from-top-2 relative flex animate-in flex-col items-start justify-between gap-4 rounded-lg border p-4 py-6 duration-300">
                <div className="w-full space-y-2.5">
                  <Label htmlFor="new-customer-name">Customer Name</Label>
                  <Input
                    className="w-full"
                    id="new-customer-name"
                    placeholder="New Member Name"
                  />
                </div>
                <div className="w-full space-y-2.5">
                  <Label htmlFor="new-customer-phone">Phone Number</Label>
                  <Input
                    className="w-full"
                    id="new-customer-phone"
                    placeholder="6281238947"
                  />
                </div>
                <button
                  aria-label="Clear selection"
                  className="absolute top-3 right-3 rounded-md p-1.5 text-muted-foreground hover:bg-secondary"
                  onClick={handleClearSelection}
                  type="button"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <PosCustomerGuest />
        )}
      </CardContent>
    </Card>
  );
}
