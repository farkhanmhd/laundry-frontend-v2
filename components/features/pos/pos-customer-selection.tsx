"use client";

import { Check, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cardShadowStyle } from "@/lib/utils";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

// Mock customer database
const MOCK_CUSTOMERS: Customer[] = [
  { id: "1", name: "John Smith", phone: "555-0101", email: "john@example.com" },
  {
    id: "2",
    name: "Sarah Johnson",
    phone: "555-0102",
    email: "sarah@example.com",
  },
  { id: "3", name: "Mike Davis", phone: "555-0103", email: "mike@example.com" },
  {
    id: "4",
    name: "Emma Wilson",
    phone: "555-0104",
    email: "emma@example.com",
  },
  {
    id: "5",
    name: "James Brown",
    phone: "555-0105",
    email: "james@example.com",
  },
];

export function PosCustomerSelection() {
  const [customerType, setCustomerType] = useState("guest");
  const [searchInput, setSearchInput] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedFromSearch, setSelectedFromSearch] = useState<Customer | null>(
    null
  );
  const [manualConfirmation, setManualConfirmation] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(true);

  const handleMembershipChange = (value: string) => {
    setCustomerType(value);
    setSearchInput("");
    setCustomerName("");
    setSelectedFromSearch(null);
    setManualConfirmation(false);
    setShowSearchInput(value === "member");
  };

  const filteredCustomers = useMemo(() => {
    if (!searchInput.trim()) {
      return [];
    }
    const query = searchInput.toLowerCase();
    return MOCK_CUSTOMERS.filter(
      (customer) =>
        customer.name.toLowerCase().includes(query) ||
        customer.phone.includes(query)
    );
  }, [searchInput]);

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedFromSearch(customer);
    setSearchInput("");
    setShowSuggestions(false);
    setManualConfirmation(false);
    setShowSearchInput(false);
  };

  const handleConfirmManual = () => {
    if (searchInput.trim()) {
      setManualConfirmation(true);
    }
    setShowSearchInput(false);
  };

  const handleClearSelection = () => {
    setSelectedFromSearch(null);
    setSearchInput("");
    setManualConfirmation(false);
    setShowSearchInput(true);
  };

  return (
    <Card className="w-full" style={cardShadowStyle}>
      <CardHeader className="border-border border-b [.border-b]:pb-3.5">
        <div className="flex items-center justify-between">
          <CardTitle className="font-semibold text-card-foreground text-lg">
            Customer Information
          </CardTitle>
          <RadioGroup
            className="grid grid-cols-2 gap-2"
            onValueChange={handleMembershipChange}
            value={customerType}
          >
            <Label className="cursor-pointer" htmlFor="guest">
              <RadioGroupItem
                className="peer sr-only"
                id="guest"
                value="guest"
              />
              <div className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 px-4 py-2 transition-all hover:border-primary/50 hover:bg-primary/5 peer-aria-checked:border-primary peer-aria-checked:bg-primary/5">
                <span>Guest</span>
              </div>
            </Label>

            <Label className="cursor-pointer" htmlFor="member">
              <RadioGroupItem
                className="peer sr-only"
                id="member"
                value="member"
              />
              <div className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 px-4 py-2 transition-all hover:border-primary/50 hover:bg-primary/5 peer-aria-checked:border-primary peer-aria-checked:bg-primary/5">
                <span>Member</span>
              </div>
            </Label>
          </RadioGroup>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {customerType === "member" ? (
          // Member Mode: Search for customer
          <div className="space-y-3">
            {showSearchInput && (
              <>
                <div>
                  <Label
                    className="mb-2 block font-medium text-card-foreground"
                    htmlFor="customer-search"
                  >
                    Search Member
                  </Label>
                  <p className="mb-3 text-muted-foreground text-sm">
                    Find a customer by phone number
                  </p>
                </div>

                <div className="relative">
                  <Input
                    autoComplete="off"
                    id="customer-search"
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                      setShowSuggestions(true);
                      setManualConfirmation(false);
                    }}
                    onFocus={() => searchInput && setShowSuggestions(true)}
                    placeholder="e.g 628123456789"
                    value={searchInput}
                  />

                  {/* Suggestions Dropdown */}
                  {showSuggestions && filteredCustomers.length > 0 && (
                    <div className="absolute top-full right-0 left-0 z-10 mt-2 max-h-48 overflow-y-auto rounded-lg border border-border bg-card shadow-lg">
                      {filteredCustomers.map((customer) => (
                        <button
                          className="group flex w-full items-center justify-between border-border border-b px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-secondary"
                          key={customer.id}
                          onClick={() => handleSelectCustomer(customer)}
                          type="button"
                        >
                          <div className="flex min-w-0 flex-1 items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground text-xs">
                              {customer.name.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate font-medium text-card-foreground text-sm">
                                {customer.name}
                              </p>
                              <p className="truncate text-muted-foreground text-xs">
                                {customer.phone}
                              </p>
                            </div>
                          </div>
                          <Check className="ml-2 h-4 w-4 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* No Results Message */}
            {!manualConfirmation &&
              showSuggestions &&
              searchInput &&
              filteredCustomers.length === 0 && (
                <>
                  <Alert>
                    <AlertTitle>No member found</AlertTitle>
                    <AlertDescription>
                      Confirm to add '{searchInput}' as a new member
                    </AlertDescription>
                  </Alert>
                  <Button
                    className="w-full border-primary bg-transparent text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
                    onClick={handleConfirmManual}
                    variant="outline"
                  >
                    Add as New Member
                  </Button>
                </>
              )}

            {/* Selected Customer Display */}
            {selectedFromSearch && (
              <div className="fade-in slide-in-from-top-2 flex animate-in items-start justify-between gap-3 rounded-lg border border-primary/20 bg-linear-to-r from-primary/5 to-primary/10 p-4 duration-300">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground text-sm">
                    {selectedFromSearch.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-card-foreground text-sm">
                      {selectedFromSearch.name}
                    </p>
                    <p className="mt-0.5 text-muted-foreground text-xs">
                      {selectedFromSearch.phone}
                    </p>
                  </div>
                </div>
                <button
                  aria-label="Clear selection"
                  className="ml-2 shrink-0 rounded p-1 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-card-foreground"
                  onClick={handleClearSelection}
                  type="button"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

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
          // Non-Member Mode: Simple name input
          <div className="space-y-3">
            <div>
              <Label
                className="mb-2 block font-semibold text-card-foreground"
                htmlFor="customer-name"
              >
                Customer Name
              </Label>
              <p className="mb-3 text-muted-foreground text-sm">
                Enter the customer's name
              </p>
            </div>

            <Input
              id="customer-name"
              onChange={(e) => {
                setCustomerName(e.target.value);
              }}
              placeholder="Enter customer name"
              value={customerName}
            />

            {customerName && (
              <div className="fade-in slide-in-from-top-2 flex animate-in items-start justify-between gap-3 rounded-lg border border-primary bg-linear-to-r from-accent/5 to-accent/10 p-4 duration-300">
                <div className="b flex min-w-0 flex-1 items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-semibold text-accent-foreground text-sm">
                    {customerName.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-card-foreground text-sm">
                      {customerName}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Guest customer
                    </p>
                  </div>
                </div>
                <button
                  aria-label="Clear input"
                  className="ml-2 shrink-0 rounded p-1 text-muted-foreground transition-colors hover:bg-accent/10 hover:text-card-foreground"
                  onClick={() => {
                    setCustomerName("");
                  }}
                  type="button"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
