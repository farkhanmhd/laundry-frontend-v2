import { headers } from "next/headers";

/**
 * Base API class that provides common configuration for all API classes.
 * Contains the getConfig method that handles authentication headers and other common fetch options.
 */
export abstract class BaseApi {
  /**
   * Helper to get common fetch headers (Authorization, etc.)
   * This method is inherited by all child API classes.
   */
  protected static async getConfig() {
    const headerList = await headers();

    const cookieHeader = (headerList.get("cookie") || "")
      .split(";")
      .map((c) => c.trim())
      .filter((c) => !c.startsWith("NEXT_LOCALE="))
      .join("; ");

    return {
      fetch: {
        headers: {
          Cookie: cookieHeader,
        },
      },
    };
  }

  /**
   * Helper for FormData requests (no Content-Type header)
   * Used for file uploads and form submissions
   */
  protected static async getFormDataConfig() {
    const headerList = await headers();

    const cookieHeader = (headerList.get("cookie") || "")
      .split(";")
      .map((c) => c.trim())
      .filter((c) => !c.startsWith("NEXT_LOCALE="))
      .join("; ");

    return {
      fetch: {
        headers: {
          Cookie: cookieHeader,
        },
      },
    };
  }
}
