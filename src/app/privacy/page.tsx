import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createPageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for Lil Sema's Pro Shots — how we collect, use, and protect your personal information when you book photography and videography services.",
  path: "/privacy",
  keywords: ["privacy policy", "data protection"],
});

export default function PrivacyPage() {
  return (
    <main className="pt-32 pb-24 px-6 bg-slate-50 min-h-screen text-slate-900 flex-1">
      <article className="max-w-3xl mx-auto bg-white rounded-[2.5rem] border border-slate-200/80 p-8 md:p-14 shadow-sm">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-slate-500 hover:text-blue-600 uppercase transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <span className="text-[10px] font-black tracking-[0.25em] text-blue-600 uppercase">
          Legal &amp; Data
        </span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mt-2 mb-4 uppercase">
          Privacy Policy
        </h1>
        <p className="text-slate-500 text-sm font-semibold mb-8">Last updated: June 2026</p>

        <section className="space-y-6 text-slate-600 text-sm md:text-base leading-relaxed">
          <p>
            Lil Sema&apos;s Pro Shots (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy. This policy explains how we handle information when you visit our website or book our photography and videography services in Yaounde and throughout Cameroon.
          </p>

          <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mt-8">
            Information We Collect
          </h2>
          <p>
            When you contact us via WhatsApp, phone, email, or our website, we may collect your name, phone number, email address, event details, date preferences, and any inspirational images or creative briefs you share for booking purposes.
          </p>

          <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mt-8">
            How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li>To respond to booking inquiries, scheduling, and consultations</li>
            <li>To deliver photography and videography deliverables</li>
            <li>To process payments and communicate timeline updates</li>
            <li>With your consent, to showcase work in our portfolio</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mt-8">
            Image Rights
          </h2>
          <p>
            Unless otherwise agreed in writing, Lil Sema retains the right to use delivered images for portfolio, marketing, and promotional purposes. Clients may request privacy restrictions prior to the session.
          </p>

          <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mt-8">
            Data Security
          </h2>
          <p>
            We take reasonable measures to protect your personal information. Gallery images and assets are stored securely via encrypted cloud providers (Supabase).
          </p>

          <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mt-8">
            Contact
          </h2>
          <p>
            For privacy-related questions or data removal requests, contact us at{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-blue-600 hover:text-blue-700 font-bold underline">
              {siteConfig.email}
            </a>
            .
          </p>
        </section>
      </article>
    </main>
  );
}
