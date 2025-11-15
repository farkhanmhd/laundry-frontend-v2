"use client";

import { use } from "react";
import type { Inventory } from "../inventories/data";

export const Products = ({
  productsPromise,
}: {
  productsPromise: Promise<Inventory[] | undefined>;
}) => {
  const products = use(productsPromise);

  return (
    <pre>
      <code>{JSON.stringify(products, null, 2)}</code>
    </pre>
  );
};
