import { elysia } from "@/elysia";

export const clientgetCurrentUserData = async () => {
  const { data } = await elysia.account.get({
    fetch: {
      credentials: "include",
    },
  });

  if (!data) {
    return null;
  }

  return data.data.role;
};
