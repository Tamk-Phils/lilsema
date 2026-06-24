import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Photography Gallery — Weddings, Portraits & Events | Lil Sema",
  description:
    "Browse Lil Sema's portfolio of professional photography and cinematic videography in Cameroon. Weddings, portraits, concerts, commercial work, and event coverage from Yaounde.",
  path: "/gallery",
  keywords: [
    "photography portfolio Cameroon",
    "wedding photos Yaounde",
    "portrait gallery Cameroon",
    "event photography portfolio",
    "cinematic videography samples",
  ],
  ogImageAlt: "Lil Sema Photography Gallery — Portfolio in Cameroon",
});

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
