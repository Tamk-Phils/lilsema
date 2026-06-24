import type { MetadataRoute } from "next";
import { absoluteUrl, publicRoutes } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Build static routes — these always work
  const staticEntries: MetadataRoute.Sitemap = publicRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Attempt to add dynamic gallery timestamp, but never let it break the sitemap
  try {
    const { getGalleryImages } = await import("@/lib/gallery");
    const galleryImages = await getGalleryImages();
    if (galleryImages.length > 0 && galleryImages[0].created_at) {
      const galleryEntry = staticEntries.find((e) => e.url.endsWith("/gallery"));
      if (galleryEntry) {
        galleryEntry.lastModified = new Date(galleryImages[0].created_at);
      }
    }
  } catch {
    // Supabase unreachable — sitemap still works with static dates
  }

  return staticEntries;
}

export const revalidate = 3600;
