"use server";

import { cookies } from "next/headers";

export async function setUserLocale(locale: string) {
  try {
    const cookieStore = await cookies();
    cookieStore.set("NEXT_LOCALE", locale, {
      httpOnly: false,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return { success: true };
  } catch (error) {
    console.error("❌ Error setting locale:", error);
  }
}
