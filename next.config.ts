import type { NextConfig } from "next";

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [];
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

if (supabaseUrl) {
  try {
    const url = new URL(supabaseUrl);
    remotePatterns.push({
      protocol: url.protocol.slice(0, -1) as "http" | "https",
      hostname: url.hostname,
      ...(url.port ? { port: url.port } : {}),
      pathname: "/storage/v1/object/public/**",
    });
  } catch {
    // Keep local images working if the Supabase URL is missing or invalid.
  }
}

const nextConfig: NextConfig = {
  images: { remotePatterns },
};

export default nextConfig;
