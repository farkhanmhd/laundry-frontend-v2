"use server";

import { actionClient } from "@/lib/safe-action";
import { updateUserRole } from "./data";
import { updateRoleSchema } from "./schema";

const errorResponse = {
  status: "error",
  message: "Failed to update user role",
};

export const updateUserRoleAction = actionClient
  .inputSchema(updateRoleSchema)
  .action(async ({ parsedInput }) => {
    const { data, error } = await updateUserRole(parsedInput);

    if (error) {
      console.log(error);
      return errorResponse;
    }

    if (!data) {
      return errorResponse;
    }

    return {
      status: "success",
      message: "User role updated",
    };
  });
