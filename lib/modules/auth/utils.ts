import { elysiaClient } from "@/elysia/client";

export const clientgetCurrentUserData = async () => {
  const { data } = await elysiaClient.account.get({
    fetch: {
      credentials: "include",
    },
  });

  if (!data) {
    return null;
  }

  return data.data;
};
