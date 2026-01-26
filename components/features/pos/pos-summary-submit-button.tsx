"use client";

import { Button } from "@/components/ui/button";
import { usePOS } from "@/lib/modules/pos/state";

export const PosSummarySubmitButton = () => {
  const { totalItems, isPending, submitPosOrder } = usePOS();
  return (
    <Button
      className="w-full"
      disabled={totalItems === 0 || isPending}
      onClick={submitPosOrder}
    >
      Process Payment
    </Button>
  );
};
