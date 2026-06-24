import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Camera, Award, Users, Video, Layers } from "lucide-react";
import Image from "next/image";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { createPageMetadata } from "@/lib/seo";

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

const featuredWork = [
  {
    src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
    alt: "Professional portrait photography by Lil Sema in Douala, Cameroon",
    label: "Portrait Session",
  },
  {
    src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?q=80&w=1000&auto=format&fit=crop",
    alt: "Cinematic event photography coverage in Cameroon",
    label: "Event Coverage",
  },
  {
    src: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=1000&auto=format&fit=crop",
    alt: "Wedding photography by Lil Sema — Douala, Cameroon",
    label: "Wedding Day",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black selection:bg-blue-500/30">
      <Hero />

      <section className="py-20 px-6 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-12 relative z-10">
          {[
            { label: "PROJECTS COMPLETED", value: "200+", icon: Layers },
            { label: "HAPPY CLIENTS", value: "150+", icon: Users },
            { label: "YEARS EXPERIENCE", value: "5+", icon: Award },
            { label: "PROFESSIONAL SHOTS", value: "10K+", icon: Camera },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <stat.icon className="w-8 h-8 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-4xl font-black tracking-tighter mb-1">{stat.value}</h4>
              <p className="text-[10px] font-bold text-white/30 tracking-[0.3em] uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
      </section>

      <section className="py-32 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-blue-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[3rem]" />
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden glass-card p-2 bg-white/5">
              <Image
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=1000&auto=format&fit=crop"
                alt="Lil Sema — professional photographer at work in Cameroon"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-[2.5rem]"
              />
            </div>
          </div>
          <div className="space-y-10">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">CRAFTING <br /> VISUAL <br /> <span className="text-blue-500">EXCELLENCE.</span></h2>
            <p className="text-xl text-white/50 leading-relaxed font-light">
              Lil Sema blends artistic intuition with technical mastery, using high-end mobile technology to deliver images that rival traditional cinema.
            </p>
            <div className="flex flex-col gap-6">
              <Link
                href="/about"
                className="inline-flex items-center justify-between w-full max-w-xs px-8 py-5 border border-white/5 glass-card hover:bg-white hover:text-black transition-all group font-black tracking-widest text-sm"
              >
                THE STORY <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-white text-black relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase">Our <br /> Expertise.</h2>
            <p className="text-black/60 max-w-sm font-medium">
              We provide a versatile range of visual services tailored to elevate your personal or commercial brand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
              <div key={i} className="flex flex-col space-y-6 group">
                <div className="w-16 h-16 bg-black flex items-center justify-center rounded-2xl group-hover:bg-blue-600 group-hover:rotate-6 transition-all duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-black tracking-tight uppercase underline decoration-blue-500 decoration-4 underline-offset-8 decoration-transparent hover:decoration-blue-500 transition-all duration-500">
                  {service.title}
                </h3>
                <p className="text-black/60 font-medium leading-relaxed">
                  {service.desc}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {service.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-black tracking-widest uppercase px-3 py-1 bg-black/5 rounded-full border border-black/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-20">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">THE <br /> GALLERY</h2>
            <Link href="/gallery" className="text-sm font-black tracking-[0.3em] text-blue-500 hover:text-white transition-colors uppercase border-b-2 border-blue-500 pb-2">
              View All Works
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredWork.map((work, i) => (
              <div key={i} className="group relative aspect-[3/4] rounded-[2.5rem] overflow-hidden glass-card p-1 border border-white/5 bg-white/5">
                <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden">
                  <Image
                    src={work.src}
                    alt={work.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
                    <div>
                      <span className="text-xs font-black tracking-[0.3em] text-blue-500 uppercase">Premium Shot</span>
                      <h4 className="text-2xl font-black text-white mt-2">{work.label}</h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-40 px-6 bg-blue-600 text-white text-center relative overflow-hidden selection:bg-white selection:text-blue-600">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-30 px-6" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter leading-[0.85] uppercase text-white">Ready to <br /> capture the <br /> vision?</h2>
          <Link
            href="/contact"
            className="inline-block px-14 py-7 bg-white text-black font-black text-xl rounded-full hover:scale-105 hover:bg-black hover:text-white transition-all shadow-2xl shadow-black/20"
          >
            START THE CHAT
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
