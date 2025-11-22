import { authClient } from "./auth-client";
import { getHeaders } from "./auth-helpers";

export const getCachedSession = async (nextHeaders: Record<string, string>) => {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: nextHeaders,
    },
  });

  return session;
};

export const getSession = async () => {
  const nextHeaders = await getHeaders();
  const session = await getCachedSession(nextHeaders);
  return session;
};
