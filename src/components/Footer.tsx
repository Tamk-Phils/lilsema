import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { Mail, Phone, MapPin, Camera, Globe, Sparkles, Layers } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-1">
          <Logo className="w-10 h-10 mb-6" textClassName="text-2xl" />
          <p className="text-white/40 text-sm leading-relaxed mb-8">
            Capturing the essence of moments through high-end phone photography and cinematic videography. Based in Cameroon, serving the vision.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="w-10 h-10 glass-card flex items-center justify-center hover:bg-white hover:text-black transition-all">
              <Camera className="w-5 h-5" />
            </Link>
            <Link href="#" className="w-10 h-10 glass-card flex items-center justify-center hover:bg-white hover:text-black transition-all">
              <Globe className="w-5 h-5" />
            </Link>
            <Link href="#" className="w-10 h-10 glass-card flex items-center justify-center hover:bg-white hover:text-black transition-all">
              <Sparkles className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Quick Links</h4>
          <ul className="space-y-4">
            <li><Link href="/" className="text-white/40 hover:text-white text-sm transition-colors uppercase tracking-widest font-bold">Home</Link></li>
            <li><Link href="/gallery" className="text-white/40 hover:text-white text-sm transition-colors uppercase tracking-widest font-bold">Gallery</Link></li>
            <li><Link href="/about" className="text-white/40 hover:text-white text-sm transition-colors uppercase tracking-widest font-bold">About</Link></li>
            <li><Link href="/contact" className="text-white/40 hover:text-white text-sm transition-colors uppercase tracking-widest font-bold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Services</h4>
          <ul className="space-y-4">
            <li className="text-white/40 text-sm uppercase tracking-widest font-bold">Portrait Photography</li>
            <li className="text-white/40 text-sm uppercase tracking-widest font-bold">Event Coverage</li>
            <li className="text-white/40 text-sm uppercase tracking-widest font-bold">Cinematic Videography</li>
            <li className="text-white/40 text-sm uppercase tracking-widest font-bold">Commercial Shoots</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Contact</h4>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-blue-500 mt-1" />
              <div>
                <p className="text-white text-sm font-bold">Email</p>
                <p className="text-white/40 text-sm">contact@lilsema.com</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-blue-500 mt-1" />
              <div>
                <p className="text-white text-sm font-bold">Phone</p>
                <p className="text-white/40 text-sm">+237 682 385 567</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-blue-500 mt-1" />
              <div>
                <p className="text-white text-sm font-bold">Location</p>
                <p className="text-white/40 text-sm">Douala, Cameroon</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-white/20 text-[10px] font-bold tracking-[0.3em] uppercase">
          © 2026 LIL SEMA'S PRO SHOTS • ALL RIGHTS RESERVED
        </p>
        <div className="flex gap-8">
          <Link href="/privacy" className="text-white/20 hover:text-white text-[10px] font-bold tracking-[0.2em] transition-colors uppercase">Privacy Policy</Link>
          <Link href="/terms" className="text-white/20 hover:text-white text-[10px] font-bold tracking-[0.2em] transition-colors uppercase">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
