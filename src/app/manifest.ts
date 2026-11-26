import type { MetadataRoute } from "next";
import { PROFILE, SITE_NAME } from "@/data/portfolio";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} | ${PROFILE.domain}`,
    short_name: PROFILE.domain,
    description: PROFILE.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1967d2",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
