import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "Terms of service for Lil Sema's Pro Shots photography and videography services in Cameroon — booking, payments, cancellations, and deliverables.",
  path: "/terms",
  keywords: ["terms of service", "photography terms"],
});

export default function TermsPage() {
  return (
    <main className="pt-32 pb-24 px-6 bg-black min-h-screen">
      <article className="max-w-3xl mx-auto prose prose-invert prose-headings:font-black prose-headings:tracking-tight">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-8">Terms of Service</h1>
        <p className="text-white/50 text-lg mb-8">Last updated: June 2026</p>

        <section className="space-y-6 text-white/60 leading-relaxed">
          <p>
            By booking Lil Sema&apos;s Pro Shots (&quot;the Service&quot;), you agree to these terms. Please read them before confirming your session.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">Booking & Deposits</h2>
          <p>
            Sessions are confirmed upon agreement via WhatsApp or email. A deposit may be required to secure your date. Deposits are non-refundable unless cancellation is made at least 7 days before the scheduled session.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">Deliverables</h2>
          <p>
            Photography previews are typically delivered within 48 hours. Full galleries are delivered within 7–10 business days unless otherwise agreed. Videography turnaround varies by project scope.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">Usage Rights</h2>
          <p>
            Clients receive personal usage rights for delivered images and videos. Commercial licensing requires a separate agreement. Lil Sema retains copyright and portfolio usage rights unless otherwise negotiated.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">Cancellations & Rescheduling</h2>
          <p>
            Rescheduling is subject to availability. Weather-related outdoor shoot delays will be rescheduled at no additional cost when possible.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">Liability</h2>
          <p>
            Lil Sema is not liable for circumstances beyond our control, including equipment failure due to third-party venues, client delays, or force majeure events.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">Contact</h2>
          <p>
            Questions about these terms? Reach us at{" "}
            <a href="mailto:contact@lilsema.com" className="text-blue-400 hover:text-blue-300">
              contact@lilsema.com
            </a>{" "}
            or WhatsApp +237 682 385 567.
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
