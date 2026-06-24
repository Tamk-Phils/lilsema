import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for Lil Sema's Pro Shots — how we collect, use, and protect your personal information when you book photography and videography services.",
  path: "/privacy",
  keywords: ["privacy policy", "data protection"],
});

export default function PrivacyPage() {
  return (
    <main className="pt-32 pb-24 px-6 bg-black min-h-screen">
      <article className="max-w-3xl mx-auto prose prose-invert prose-headings:font-black prose-headings:tracking-tight">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-8">Privacy Policy</h1>
        <p className="text-white/50 text-lg mb-8">Last updated: June 2026</p>

        <section className="space-y-6 text-white/60 leading-relaxed">
          <p>
            Lil Sema&apos;s Pro Shots (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy. This policy explains how we handle information when you visit lilsema.com or book our photography and videography services.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">Information We Collect</h2>
          <p>
            When you contact us via WhatsApp, email, or our website, we may collect your name, phone number, email address, event details, and any images or messages you share for booking purposes.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To respond to booking inquiries and provide our services</li>
            <li>To deliver photography and videography deliverables</li>
            <li>To improve our website and client experience</li>
            <li>With your consent, to showcase work in our portfolio</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10">Image Rights</h2>
          <p>
            Unless otherwise agreed in writing, Lil Sema retains the right to use delivered images for portfolio, marketing, and social media purposes. Clients may request restrictions before the shoot.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">Data Security</h2>
          <p>
            We take reasonable measures to protect your personal information. Gallery images are stored securely via our cloud provider (Supabase).
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">Contact</h2>
          <p>
            For privacy-related questions, contact us at{" "}
            <a href="mailto:contact@lilsema.com" className="text-blue-400 hover:text-blue-300">
              contact@lilsema.com
            </a>
            .
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-white/10">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm font-bold tracking-widest uppercase">
            ← Back to Home
          </Link>
        </div>
      </article>
    </main>
  );
}
