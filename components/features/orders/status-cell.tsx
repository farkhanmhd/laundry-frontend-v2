"use client";

import type { Row } from "@tanstack/react-table";
import { useState } from "react";
import { useTableContext } from "@/components/table/context";

// Define your specific data type here, or import it
interface User {
  id: string;
  name: string;
  status: "active" | "inactive" | "pending";
}

interface StatusCellProps {
  row: Row<User>;
}

export function StatusCell({ row }: StatusCellProps) {
  // 1. Consume the context with the specific generic type
  const { setInternalData } = useTableContext<User>();
  const [isLoading, setIsLoading] = useState(false);

  const currentStatus = row.original.status;

  const handleStatusChange = async (newStatus: User["status"]) => {
    // Prevent spamming
    if (isLoading || newStatus === currentStatus) {
      return;
    }

    setIsLoading(true);

    // 2. OPTIMISTIC UPDATE: Update UI immediately before API finishes
    // We snapshot the previous data implicitly via the state setter pattern
    setInternalData((prevData) =>
      prevData.map((item) => {
        if (item.id === row.original.id) {
          return { ...item, status: newStatus };
        }
        return item;
      })
    );

    try {
      // 3. Perform API Request (Example)
      // await updateStatusInDb(row.original.id, newStatus);

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      console.log("Synced with DB");
    } catch (error) {
      // 4. ROLLBACK on error
      console.error("Update failed", error);

      // Revert the local state to the previous value
      setInternalData((prevData) =>
        prevData.map((item) => {
          if (item.id === row.original.id) {
            return { ...item, status: currentStatus };
          }
          return item;
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <select
        className={`rounded border px-2 py-1 text-sm ${
          isLoading ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={isLoading}
        onChange={(e) => handleStatusChange(e.target.value as User["status"])}
        value={currentStatus}
      >
        <option value="active">Active</option>
        <option value="pending">Pending</option>
        <option value="inactive">Inactive</option>
      </select>
      {isLoading && <span className="text-gray-500 text-xs">Saving...</span>}
    </div>
  );
}
