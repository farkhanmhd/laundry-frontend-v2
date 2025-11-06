"use client";

import { use } from "react";
import { Product } from "../products/data";

export const Products = ({ productsPromise }: { productsPromise: Promise<Product[] | undefined> }) => {
  const products = use(productsPromise);

  return (
    <pre>
      <code>{JSON.stringify(products, null, 2)}</code>
    </pre>
  );
};
