"use server";

import { authClient } from "@/lib/auth/auth-client";
import { actionClient } from "@/lib/safe-action";
import { loginSchema } from "./schema";

export const signInAction = actionClient
  .inputSchema(loginSchema)
  .action(async ({ parsedInput }) => {
    try {
      const { error } = await authClient.signIn.username(parsedInput);

      if (error) {
        return {
          status: "error",
          message: "Wrong username or password",
        };
      }

      return {
        status: "success",
        message: "Login Success",
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          status: "error",
          message: error.message,
          // data: null,
        };
      }
    }
  });

// export const signOutAction = actionClient.action(async () => {
//   await auth.api.signOut({
//     headers: await headers(),
//   });
// });
