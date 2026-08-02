import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // firebase-admin pulls in jwks-rsa, which `require()`s the ESM-only `jose`.
  // Bundling it breaks the build; loading it natively at runtime does not.
  serverExternalPackages: ["firebase-admin"],
};

export default nextConfig;
