import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Lil Sema — Professional Photographer & Videographer in Cameroon",
  description:
    "Meet Lil Sema — visionary photographer and videographer based in Yaounde, Cameroon. 5+ years experience, 200+ clients. Specializing in cinematic phone photography, weddings, and events.",
  path: "/about",
  keywords: [
    "about Lil Sema",
    "Cameroon photographer biography",
    "Yaounde videographer",
    "professional phone photographer",
  ],
  ogImageAlt: "About Lil Sema — Behind the Lens in Cameroon",
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      {children}
    </>
  );
}
