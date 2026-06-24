import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { contactFaqs } from "@/lib/faqs";
import { breadcrumbJsonLd, createPageMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact & Book a Session — Lil Sema Photography Yaounde",
  description:
    "Book Lil Sema for photography and videography in Cameroon. WhatsApp +237 682 385 567, email contact@lilsema.com. Based in Yaounde — available for weddings, portraits, events, and travel.",
  path: "/contact",
  keywords: [
    "book photographer Cameroon",
    "hire videographer Yaounde",
    "wedding photographer contact",
    "photography booking Cameroon",
  ],
  ogImageAlt: "Contact Lil Sema — Book Your Photography Session",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          faqJsonLd(contactFaqs),
        ]}
      />
      {children}
    </>
  );
}
