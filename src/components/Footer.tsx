'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { Mail, Phone, MapPin, Camera, MessageCircle, Sparkles } from 'lucide-react';
import { siteConfig } from '@/lib/seo';

export default function Footer() {
  const pathname = usePathname();

  // Don't render the public footer on admin pages
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="bg-white border-t border-slate-200/80 pt-16 pb-10 px-6 text-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
        <div className="col-span-1 md:col-span-1 space-y-4">
          <Logo className="w-9 h-9" textClassName="text-xl" />
          <p className="text-slate-500 text-xs leading-relaxed">
            Capturing the essence of moments through high-end phone photography and cinematic videography. Based in Yaounde, Cameroon.
          </p>
          <div className="flex gap-3 pt-2">
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <Link
              href="/gallery"
              aria-label="Portfolio Gallery"
              className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
            >
              <Camera className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              aria-label="Book Session"
              className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-slate-900 font-bold mb-4 text-xs tracking-widest uppercase">Quick Links</h4>
          <ul className="space-y-3">
            <li><Link href="/" className="text-slate-500 hover:text-blue-600 text-xs transition-colors uppercase tracking-wider font-semibold">Home</Link></li>
            <li><Link href="/gallery" className="text-slate-500 hover:text-blue-600 text-xs transition-colors uppercase tracking-wider font-semibold">Gallery</Link></li>
            <li><Link href="/about" className="text-slate-500 hover:text-blue-600 text-xs transition-colors uppercase tracking-wider font-semibold">About</Link></li>
            <li><Link href="/contact" className="text-slate-500 hover:text-blue-600 text-xs transition-colors uppercase tracking-wider font-semibold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-slate-900 font-bold mb-4 text-xs tracking-widest uppercase">Services</h4>
          <ul className="space-y-3">
            <li className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Portrait Photography</li>
            <li className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Event Coverage</li>
            <li className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Cinematic Videography</li>
            <li className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Commercial Shoots</li>
          </ul>
        </div>

        <div>
          <h4 className="text-slate-900 font-bold mb-4 text-xs tracking-widest uppercase">Contact</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-slate-900 text-xs font-bold">Email</p>
                <a href={`mailto:${siteConfig.email}`} className="text-slate-500 hover:text-blue-600 text-xs transition-colors">
                  {siteConfig.email}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-slate-900 text-xs font-bold">Phone / WhatsApp</p>
                <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 text-xs transition-colors">
                  {siteConfig.phoneDisplay}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-slate-900 text-xs font-bold">Location</p>
                <p className="text-slate-500 text-xs">Yaounde, Cameroon</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200/80 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">
          &copy; 2026 LIL SEMA&apos;S PRO SHOTS • ALL RIGHTS RESERVED
        </p>
        <div className="flex gap-6">
          <Link href="/privacy" className="text-slate-400 hover:text-slate-700 text-[10px] font-bold tracking-wider transition-colors uppercase">Privacy Policy</Link>
          <Link href="/terms" className="text-slate-400 hover:text-slate-700 text-[10px] font-bold tracking-wider transition-colors uppercase">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
