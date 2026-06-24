import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Camera, Users, Video } from "lucide-react";
import Image from "next/image";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { createPageMetadata } from "@/lib/seo";
import { getLatestGalleryImages } from "@/lib/gallery";

const Home3DBackground = dynamic(() => import("@/components/Home3DBackground"), {
  loading: () => null,
});

const Stats3D = dynamic(() => import("@/components/Stats3D"));

const LatestGallery = dynamic(() => import("@/components/LatestGallery"));

export const metadata: Metadata = createPageMetadata({
  title: "Lil Sema's Pro Shots | Photographer & Videographer in Douala, Cameroon",
  description:
    "Premium photography and cinematic videography by Lil Sema in Douala, Cameroon. Weddings, portraits, events, music videos, and commercial shoots with professional mobile technology.",
  path: "/",
  keywords: [
    "best photographer Douala",
    "Cameroon wedding photographer",
    "cinematic photography Cameroon",
  ],
});

export const revalidate = 3600;

export default async function Home() {
  const galleryImages = await getLatestGalleryImages(6);

  return (
    <main className="relative min-h-screen bg-black selection:bg-blue-500/30">
      <Home3DBackground />
      <Hero />
      <Stats3D />

      <section className="relative border-y border-white/5 bg-white/[0.01] px-6 py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 md:grid-cols-2">
          <div className="group relative">
            <div className="absolute -inset-4 rounded-[3rem] bg-blue-500/20 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] glass-card bg-white/5 p-2 [transform-style:preserve-3d] transition-transform duration-700 group-hover:[transform:rotateY(-4deg)_rotateX(2deg)]">
              <Image
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=1000&auto=format&fit=crop"
                alt="Lil Sema — professional photographer at work in Cameroon"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-[2.5rem] object-cover"
              />
            </div>
          </div>
          <div className="space-y-10">
            <h2 className="text-5xl font-black leading-[0.9] tracking-tighter md:text-7xl">
              CRAFTING <br /> VISUAL <br /> <span className="text-blue-500">EXCELLENCE.</span>
            </h2>
            <p className="text-xl font-light leading-relaxed text-white/50">
              Lil Sema blends artistic intuition with technical mastery, using high-end mobile technology to deliver images that rival traditional cinema.
            </p>
            <Link
              href="/about"
              className="group inline-flex w-full max-w-xs items-center justify-between border border-white/5 glass-card px-8 py-5 text-sm font-black tracking-widest transition-all hover:bg-white hover:text-black"
            >
              THE STORY <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-white px-6 py-32 text-black">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 flex flex-col items-end justify-between gap-8 md:flex-row">
            <h2 className="text-5xl font-black leading-none tracking-tighter uppercase md:text-7xl">
              Our <br /> Expertise.
            </h2>
            <p className="max-w-sm font-medium text-black/60">
              We provide a versatile range of visual services tailored to elevate your personal or commercial brand.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              {
                title: "PORTRAITS",
                desc: "Capturing the raw essence of personality through high-detail portraiture.",
                icon: Users,
                tags: ["Personal", "Corporate", "Branding"],
              },
              {
                title: "CINEMATIC",
                desc: "Dynamic video production from commercials to cinematic shorts.",
                icon: Video,
                tags: ["Ads", "Music", "Documentary"],
              },
              {
                title: "EVENTS",
                desc: "Comprehensive coverage of moments that matter, from weddings to galas.",
                icon: Camera,
                tags: ["Weddings", "Parties", "Concerts"],
              },
            ].map((service, i) => (
              <div
                key={service.title}
                className="group flex flex-col space-y-6 transition-transform duration-500 [transform-style:preserve-3d] hover:[transform:rotateY(-3deg)_translateZ(12px)]"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black transition-all duration-300 group-hover:rotate-6 group-hover:bg-blue-600">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-black tracking-tight uppercase underline decoration-4 decoration-blue-500 underline-offset-8 decoration-transparent transition-all duration-500 hover:decoration-blue-500">
                  {service.title}
                </h3>
                <p className="font-medium leading-relaxed text-black/60">{service.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-[10px] font-black tracking-widest uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LatestGallery images={galleryImages} />

      <section className="relative overflow-hidden bg-blue-600 px-6 py-40 text-center text-white selection:bg-white selection:text-blue-600">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-30" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <h2 className="mb-12 text-5xl font-black leading-[0.85] tracking-tighter uppercase md:text-8xl">
            Ready to <br /> capture the <br /> vision?
          </h2>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-white px-14 py-7 text-xl font-black text-black shadow-2xl shadow-black/20 transition-all hover:scale-105 hover:bg-black hover:text-white"
          >
            START THE CHAT
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
