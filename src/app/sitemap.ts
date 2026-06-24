import type { MetadataRoute } from "next";
import { absoluteUrl, publicRoutes, siteConfig } from "@/lib/seo";
import { getGalleryImages } from "@/lib/gallery";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const galleryImages = await getGalleryImages();
  const galleryLastModified =
    galleryImages[0]?.created_at != null
      ? new Date(galleryImages[0].created_at)
      : new Date();

  return publicRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified:
      route.path === "/gallery" ? galleryLastModified : new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

export const revalidate = 3600;
