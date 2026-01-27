"use client";

import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePOS } from "@/lib/modules/pos/state";

export const PosNewMember = () => {
  const {
    toggleNewMember,
    posData,
    customerNameValidation,
    handleCustomerNameChange,
    phone,
    handlePhoneChange,
    phoneNumberValidation,
  } = usePOS();
  return (
    <div className="fade-in slide-in-from-top-2 relative flex animate-in flex-col items-start justify-between gap-6 rounded-lg border p-4 py-6 duration-300">
      <div>
        <h2 className="font-medium">New Member</h2>
        <p className="text-muted-foreground text-sm">
          Fill customer name and phone number below to add new member
        </p>
      </div>
      <div className="w-full space-y-2.5">
        <Label htmlFor="new-customer-name">Customer Name</Label>
        <Input
          aria-invalid={customerNameValidation}
          autoComplete="off"
          autoFocus
          className="w-full"
          id="new-customer-name"
          onChange={(e) => handleCustomerNameChange(e.target.value)}
          placeholder="New Member Name"
          value={posData.customerName}
        />
        {customerNameValidation && (
          <span className="text-destructive text-sm">
            Please input customer name
          </span>
        )}
      </div>
      <div className="w-full space-y-2.5">
        <Label htmlFor="new-customer-phone">Phone Number</Label>
        <div className="relative space-y-2.5">
          <Input
            aria-invalid={phoneNumberValidation}
            autoComplete="off"
            className="w-full pl-9"
            id="new-customer-phone"
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder="81234567890"
            value={phone}
          />
          <span className="absolute top-2 left-2 text-muted-foreground text-sm">
            +62
          </span>
          {phoneNumberValidation && (
            <span className="text-destructive text-sm">
              Phone number must be at least 7 characters
            </span>
          )}
        </div>
      </div>
      <button
        aria-label="Clear selection"
        className="absolute top-3 right-3 rounded-md p-1.5 text-muted-foreground hover:bg-secondary"
        onClick={toggleNewMember}
        type="button"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
};
