import type { MetadataRoute } from "next";
import { dictionaries } from "@/lib/dictionaries";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Reeff — Office chores, sorted.",
    short_name: "Reeff",
    description: dictionaries.en.meta.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0B1220",
    theme_color: "#0B1220",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
