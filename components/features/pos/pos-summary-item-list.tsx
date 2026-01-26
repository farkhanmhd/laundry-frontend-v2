"use client";

import { usePOS } from "@/lib/modules/pos/state";
import { cardShadowStyle } from "@/lib/utils";
import { PosEmptySummaryItem } from "./pos-empty-summary-item";
import { PosSummaryAddMoreItem } from "./pos-summary-add-more-item";
import { PosSummaryItem } from "./pos-summary-item";

export const PosSummaryItemList = () => {
  const { orderItems } = usePOS();
  return (
    <div className="rounded-xl bg-card" style={cardShadowStyle}>
      <ul className="flex flex-col divide-y divide-solid divide-accent p-4">
        {orderItems.length > 0 ? (
          orderItems.map((item) => (
            <li className="py-4 first:pt-0" key={item.id}>
              <PosSummaryItem item={item} />
            </li>
          ))
        ) : (
          /* Empty State */
          <li>
            <PosEmptySummaryItem />
          </li>
        )}
      </ul>
      {orderItems.length > 0 && <PosSummaryAddMoreItem />}
    </div>
  );
};
