import { headers } from "next/headers";
import { elysia } from "@/elysia";

export const getProducts = async () => {
  const { data } = await elysia.products.get({ headers: await headers() });

  return data;
};
