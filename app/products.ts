import { cacheLife, cacheTag } from "next/cache";
import { elysia } from "@/elysia";
import { getHeaders } from "@/lib/auth-helpers";

const getCachedProducts = async (
  requestHeaders: Record<string, string> | null
) => {
  "use cache";
  cacheTag("products");
  cacheLife("hours");

  const { data } = await elysia.products.get({ headers: requestHeaders ?? {} });

  return data;
};

export const getProducts = async () => {
  const nextHeaders = await getHeaders();
  const data = await getCachedProducts(nextHeaders);

  return data;
};
