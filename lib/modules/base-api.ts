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

    // 1. Extract only the authentication cookie or token you need.
    // If you use cookies for auth:
    const cookieHeader = headerList.get("cookie") || "";

    // 2. Construct a clean header object
    return {
      fetch: {
        headers: {
          // Only forward the cookie so the backend knows who the user is
          Cookie: cookieHeader,
          // Explicitly set Accept-Language if your backend requires 'id'
          // or just omit it to let the backend use its default.
          // "Accept-Language": "id-ID",
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
    const cookieHeader = headerList.get("cookie") || "";

    return {
      fetch: {
        headers: {
          Cookie: cookieHeader,
          // No Content-Type header - browser will set it with boundary for FormData
        },
      },
    };
  }
}
