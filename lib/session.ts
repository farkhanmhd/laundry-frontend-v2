import { authClient } from "./auth-client";
import { getHeaders } from "./auth-helpers";
// import { unstable_cacheTag as cacheTag, unstable_cacheLife as cacheLife } from "next/cache";

export const getCachedSession = async (
  nextHeaders: Record<string, string> | null
) => {
  // "use cache";
  // cacheTag("session");
  // cacheLife('hours');

  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: nextHeaders ?? {},
    },
  });

  return session;
};

export const getComponentSession = async () => {
  const nextHeaders = await getHeaders();
  const session = await getCachedSession(nextHeaders);
  return session;
};
