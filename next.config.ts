import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Phone must use the Mac's Wi-Fi IP (not localhost). Update if your IP changes.
  allowedDevOrigins: ["192.168.1.106", "172.30.199.130"],
};

export default withNextIntl(nextConfig);
