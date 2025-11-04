import { headers } from "next/headers";
import { authClient } from "./auth-client";

export const getHeaders = async () => {
  const headersObject: Record<string, string> = {};
  const nextHeaders = await headers();

  for (const [key, value] of nextHeaders) {
    headersObject[key] = value;
  }

  return headersObject;
};

export const getSession = async () => {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  return session;
};
