import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createPageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "Terms of service for Lil Sema's Pro Shots photography and videography services in Cameroon — booking, payments, cancellations, and deliverables.",
  path: "/terms",
  keywords: ["terms of service", "photography terms"],
});

export default function TermsPage() {
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
          Client Agreement
        </span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mt-2 mb-4 uppercase">
          Terms of Service
        </h1>
        <p className="text-slate-500 text-sm font-semibold mb-8">Last updated: June 2026</p>

        <section className="space-y-6 text-slate-600 text-sm md:text-base leading-relaxed">
          <p>
            By booking Lil Sema&apos;s Pro Shots (&quot;the Service&quot;), you agree to these terms. Please review them before confirming your creative session.
          </p>

          <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mt-8">
            Booking &amp; Deposits
          </h2>
          <p>
            Sessions are confirmed upon agreement via WhatsApp or email. A deposit is required to reserve and secure your scheduled date. Deposits are applied toward the final total and are non-refundable unless written cancellation is provided at least 7 days before the session.
          </p>

          <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mt-8">
            Deliverables &amp; Turnaround
          </h2>
          <p>
            Preview selections are typically ready within 48 hours. Fully edited high-resolution photography collections are delivered within 7–10 business days. Videography edits and color grading turnaround vary based on project scope and length.
          </p>

          <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mt-8">
            Usage Rights
          </h2>
          <p>
            Clients receive personal usage rights for delivered imagery and videos. Commercial licensing requires a dedicated agreement. Lil Sema retains copyright and portfolio display rights unless otherwise contracted.
          </p>

          <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mt-8">
            Cancellations &amp; Rescheduling
          </h2>
          <p>
            Rescheduling is accommodated subject to calendar availability. Outdoor shoots impacted by severe weather will be rescheduled without extra penalty fees whenever feasible.
          </p>

          <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mt-8">
            Contact
          </h2>
          <p>
            Have questions regarding our terms? Reach out directly via{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-blue-600 hover:text-blue-700 font-bold underline">
              {siteConfig.email}
            </a>{" "}
            or on WhatsApp at{" "}
            <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-bold underline">
              {siteConfig.phoneDisplay}
            </a>
            .
          </p>
        </section>
      </article>
    </main>
  );
}
