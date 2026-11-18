'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Mail, MapPin, Camera, Phone, HelpCircle, Globe } from 'lucide-react';
import { contactFaqsDisplay } from '@/lib/faqs';

export default function ContactPage() {
  const whatsappNumber = "+237682385567";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Lil Sema, I'd like to book a session.")}`;

  return (
    <main className="pt-32 pb-24 px-4 bg-slate-50 min-h-screen text-slate-900 flex-1">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div className="space-y-8">
            <div>
              <span className="text-[10px] font-black tracking-[0.25em] text-blue-600 uppercase">Let&apos;s Connect</span>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none text-slate-900 mt-2">
                GET IN <span className="text-blue-600">TOUCH</span>
              </h1>
            </div>
            <p className="text-lg text-slate-600 max-w-md leading-relaxed">
              Have a project in mind? Let&apos;s create something extraordinary together. Reach out via any of the channels below.
            </p>

            <div className="space-y-6 pt-2">
              <div className="flex items-center gap-5 group p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Call / WhatsApp</p>
                  <p className="text-lg font-bold text-slate-900">+237 682 385 567</p>
                </div>
              </div>

              <div className="flex items-center gap-5 group p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Email</p>
                  <p className="text-lg font-bold text-slate-900">contact@lilsema.com</p>
                </div>
              </div>

              <div className="flex items-center gap-5 group p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Location</p>
                  <p className="text-lg font-bold text-slate-900">YAOUNDE, Cameroon</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <a href="#" aria-label="Camera" className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-all shadow-sm">
                <Camera className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Website" className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-all shadow-sm">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-lg flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-black tracking-[0.25em] text-blue-600 uppercase">Direct Booking</span>
              <h2 className="text-3xl font-black mb-4 tracking-tight uppercase text-slate-900 mt-1">BOOK A SESSION</h2>
              <p className="text-slate-600 mb-8 leading-relaxed text-sm">
                The fastest way to reach me and discuss your project. Click the button below to start a chat on WhatsApp directly.
              </p>
            </div>

            <div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs tracking-widest rounded-2xl transition-all shadow-lg shadow-blue-500/25 uppercase"
              >
                <MessageCircle className="w-5 h-5" />
                MESSAGE ON WHATSAPP
              </a>

              <p className="text-center text-[10px] font-bold text-slate-400 mt-6 tracking-widest uppercase italic">
                Available 7 days a week
              </p>
            </div>
          </motion.div>
        </div>

        <section className="pt-12 border-t border-slate-200">
          <div className="flex items-center gap-3 mb-10">
            <HelpCircle className="text-blue-600 w-7 h-7" />
            <h2 className="text-3xl font-black tracking-tight text-slate-900 uppercase">FREQUENTLY ASKED</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contactFaqsDisplay.map((faq, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-lg font-bold text-slate-900">{faq.q}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
