import Link from "next/link";
import Gallery from "@/components/Gallery";
import JsonLd from "@/components/JsonLd";
import { getGalleryImages } from "@/lib/gallery";
import { breadcrumbJsonLd, imageGalleryJsonLd } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export const revalidate = 60; // fallback: re-fetch every 60s; on-demand revalidation from /api/admin/gallery is the primary trigger

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <main className="flex-1 bg-slate-50 text-slate-900">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Gallery", path: "/gallery" },
          ]),
          imageGalleryJsonLd(images),
        ]}
      />

      <Gallery initialImages={images} />

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-[2.5rem] p-10 md:p-14 shadow-xl flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-black tracking-[0.25em] text-blue-200 uppercase">
              Book Your Date
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase">
              Ready to create something iconic?
            </h2>
            <p className="text-blue-100 text-sm font-medium max-w-lg">
              Let&apos;s bring your vision to life. From weddings and galas to personal branding in Yaounde and beyond.
            </p>
          </div>
          <Link
            href="/contact"
            className="group shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-700 font-black text-xs tracking-widest rounded-full uppercase shadow-lg hover:bg-slate-900 hover:text-white transition-all hover:scale-105 active:scale-95"
          >
            CONTACT NOW <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  );
}
