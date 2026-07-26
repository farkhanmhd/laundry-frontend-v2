import { treaty } from "@elysiajs/eden";
import type { App } from "../server";

// Your frontend project should already have both elysia and @elysiajs/eden installed
export const elysia = treaty<App>(process.env.INTERNAL_API_URL as string);
