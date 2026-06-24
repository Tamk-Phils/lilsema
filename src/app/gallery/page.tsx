import Link from "next/link";
import Gallery from "@/components/Gallery";
import JsonLd from "@/components/JsonLd";
import { getGalleryImages } from "@/lib/gallery";
import { breadcrumbJsonLd, imageGalleryJsonLd } from "@/lib/seo";

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <main className="min-h-screen bg-black pt-20">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Gallery", path: "/gallery" },
          ]),
          imageGalleryJsonLd(images),
        ]}
      />

      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px] rounded-full z-0 pointer-events-none" />

      <div className="relative z-10">
        <Gallery initialImages={images} />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-black tracking-tighter uppercase">Ready to shoot?</h2>
            <p className="text-white/40 text-sm font-medium uppercase tracking-widest">Let&apos;s bring your vision to absolute reality.</p>
          </div>
          <Link
            href="/contact"
            className="px-10 py-5 bg-white text-black font-black text-xs tracking-[0.2em] rounded-full uppercase shadow-2xl shadow-white/5 hover:scale-105 transition-transform"
          >
            Contact Now
          </Link>
        </div>
      </div>
    </main>
  );
}
