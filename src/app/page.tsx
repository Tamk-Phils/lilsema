import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Camera, Users, Video } from "lucide-react";
import Image from "next/image";
import Hero from "@/components/Hero";
import { createPageMetadata } from "@/lib/seo";
import { getLatestGalleryImages } from "@/lib/gallery";

const Home3DBackground = dynamic(() => import("@/components/Home3DBackground"), {
  loading: () => null,
});

const Stats3D = dynamic(() => import("@/components/Stats3D"));
const LatestGallery = dynamic(() => import("@/components/LatestGallery"));

export const metadata: Metadata = createPageMetadata({
  title: "Lil Sema's Pro Shots | Photographer & Videographer in Yaounde, Cameroon",
  description:
    "Premium photography and cinematic videography by Lil Sema in Yaounde, Cameroon. Weddings, portraits, events, music videos, and commercial shoots with professional mobile technology.",
  path: "/",
  keywords: [
    "best photographer Yaounde",
    "Cameroon wedding photographer",
    "cinematic photography Cameroon",
  ],
});

export const revalidate = 60; // fallback: re-fetch from Supabase every 60s

export default async function Home() {
  const galleryImages = await getLatestGalleryImages(6);

  return (
    <main className="relative flex-1 bg-slate-50 text-slate-900 selection:bg-blue-500/20">
      <Home3DBackground />
      <Hero />
      <Stats3D />

      {/* Crafting Visual Excellence Section */}
      <section className="relative border-y border-slate-200/80 bg-white px-6 py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 md:grid-cols-2">
          <div className="group relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-white p-2 shadow-2xl shadow-slate-200/80 border border-slate-200/80">
              <Image
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=1000&auto=format&fit=crop"
                alt="Lil Sema — professional photographer at work in Cameroon"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-[2.1rem] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="inline-block rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 text-[10px] font-black tracking-widest text-blue-600 uppercase">
              Artistic & Technical Mastery
            </div>
            <h2 className="text-4xl font-black leading-[0.95] tracking-tighter md:text-6xl text-slate-900">
              CRAFTING <br /> VISUAL <br /> <span className="text-blue-600">EXCELLENCE.</span>
            </h2>
            <p className="text-lg font-normal leading-relaxed text-slate-600">
              Lil Sema blends artistic intuition with technical mastery, using high-end technology to deliver images and videos that rival traditional cinema.
            </p>
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 rounded-full bg-slate-900 text-white px-8 py-4 text-xs font-black tracking-widest transition-all hover:bg-blue-600 shadow-md uppercase"
            >
              OUR STORY <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Our Expertise Section */}
      <section className="relative z-10 bg-slate-50 px-6 py-28 text-slate-900">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-[10px] font-black tracking-[0.25em] text-blue-600 uppercase">What We Do</span>
              <h2 className="text-4xl font-black leading-none tracking-tighter uppercase md:text-6xl text-slate-900 mt-2">
                Our <span className="text-blue-600">Expertise</span>
              </h2>
            </div>
            <p className="max-w-sm font-medium text-slate-600 text-sm">
              We provide a versatile range of visual services tailored to elevate your personal or commercial brand.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
            ].map((service) => (
              <div
                key={service.title}
                className="group flex flex-col justify-between space-y-6 rounded-3xl bg-white border border-slate-200/80 p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    <service.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight uppercase text-slate-900">
                    {service.title}
                  </h3>
                  <p className="font-normal text-sm leading-relaxed text-slate-600">{service.desc}</p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[10px] font-bold tracking-widest text-slate-700 uppercase"
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

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-28 text-center text-white">
        <div className="relative z-10 mx-auto max-w-3xl space-y-8">
          <h2 className="text-4xl font-black leading-tight tracking-tighter uppercase md:text-6xl">
            Ready to capture <br /> your vision?
          </h2>
          <p className="text-blue-100 font-medium text-base max-w-lg mx-auto">
            Let&apos;s create timeless portraits and cinematic moments together in Yaounde and across Cameroon.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-block rounded-full bg-white px-10 py-5 text-sm font-black tracking-widest text-blue-700 shadow-xl transition-all hover:scale-105 hover:bg-slate-900 hover:text-white uppercase"
            >
              BOOK A SESSION NOW
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
