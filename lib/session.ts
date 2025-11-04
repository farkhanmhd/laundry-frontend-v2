import { cacheLife, cacheTag } from "next/cache";
import { authClient } from "./auth-client";
import { getHeaders } from "./auth-helpers";

export const getCachedSession = async (
  nextHeaders: Record<string, string> | null
) => {
  "use cache";
  cacheTag("session");
  cacheLife("hours");

  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: nextHeaders ?? {},
    },
  });

  return session;
};

export const getSession = async () => {
  const nextHeaders = await getHeaders();
  const session = await getCachedSession(nextHeaders);
  return session;
};
