import { headers } from "next/headers";
import { elysia } from "@/elysia";
import { CustomerNewOrderPageClient } from "./page-client";

export default async function NewOrderPage() {
  const { data: response } = await elysia.customerorders.items.get({
    headers: await headers(),
  });

  const data = response?.data;
  return <CustomerNewOrderPageClient items={data ?? []} />;
}
