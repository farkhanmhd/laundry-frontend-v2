import { headers } from "next/headers";
import { elysia } from "@/elysia";
import { authClient } from "./auth-client";

export const getSession = async () => {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  return session;
};

export const getCurrentUserData = async () => {
  const { data } = await elysia.account.get({
    fetch: {
      headers: await headers(),
    },
  });

  if (!data) {
    return null;
  }

  return data.data;
};
