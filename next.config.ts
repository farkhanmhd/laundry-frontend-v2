import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL(`${process.env.NEXT_PUBLIC_API_URL}/uploads/**`)],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
      allowedOrigins: [process.env.NEXT_PUBLIC_API_URL as string],
    },
    typedEnv: true,
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
export default withNextIntl(nextConfig);
