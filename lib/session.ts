import { headers } from "next/headers";
import { authClient } from "./auth-client";
// import { getHeaders } from "./auth-helpers";

export const getCachedSession = async () => {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  return session;
};

// export const getComponentSession = async () => {
//   const nextHeaders = await getHeaders();
//   const session = await getCachedSession(nextHeaders);
//   return session;
// };
