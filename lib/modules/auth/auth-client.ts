import { adminClient, usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { accessControl, admin, driver, superadmin, user } from "./permissions";

export const authClient = createAuthClient({
  basePath: "/api",
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  plugins: [
    usernameClient(),
    adminClient({
      ac: accessControl,
      roles: {
        user,
        admin,
        driver,
        superadmin,
      },
    }),
  ],
});
