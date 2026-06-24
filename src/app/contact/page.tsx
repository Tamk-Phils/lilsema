'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Mail, MapPin, Camera, Phone, HelpCircle, Globe } from 'lucide-react';
import { contactFaqsDisplay } from '@/lib/faqs';

export default function ContactPage() {
  const whatsappNumber = "+237682385567";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Lil Sema, I'd like to book a session.")}`;

  return (
    <main className="pt-32 pb-24 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24">
          <div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter">GET IN <br /> TOUCH</h1>
            <p className="text-xl text-white/50 mb-12 max-w-md leading-relaxed">
              Have a project in mind? Let's create something extraordinary together. Reach out via any of the channels below.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 glass-card flex items-center justify-center group-hover:bg-white transition-colors">
                  <Phone className="w-6 h-6 text-blue-400 group-hover:text-black" />
                </div>
                <div>
                  <p className="text-xs font-black tracking-widest text-blue-400 uppercase">Call / WhatsApp</p>
                  <p className="text-xl font-bold">+237 682 385 567</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 glass-card flex items-center justify-center group-hover:bg-white transition-colors">
                  <Mail className="w-6 h-6 text-blue-400 group-hover:text-black" />
                </div>
                <div>
                  <p className="text-xs font-black tracking-widest text-blue-400 uppercase">Email</p>
                  <p className="text-xl font-bold">contact@lilsema.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 glass-card flex items-center justify-center group-hover:bg-white transition-colors">
                  <MapPin className="w-6 h-6 text-blue-400 group-hover:text-black" />
                </div>
                <div>
                  <p className="text-xs font-black tracking-widest text-blue-400 uppercase">Location</p>
                  <p className="text-xl font-bold">YAOUNDE, Cameroon</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              <a href="#" className="w-12 h-12 glass-card flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Camera className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 glass-card flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-12 border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
            <h2 className="text-3xl font-black mb-8 tracking-tight">BOOK A SESSION</h2>
            <p className="text-white/50 mb-10 leading-relaxed">
              The fastest way to reach me and discuss your project. Click the button below to start a chat on WhatsApp.
            </p>
            
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-6 bg-white text-black font-black rounded-3xl hover:bg-blue-400 hover:text-white transition-all shadow-2xl shadow-white/5"
            >
              <MessageCircle className="w-6 h-6" />
              MESSAGE ON WHATSAPP
            </a>
            
            <p className="text-center text-xs font-bold text-white/20 mt-8 tracking-widest uppercase italic">
              Available 7 days a week
            </p>
          </motion.div>
        </div>

        <section className="mt-32">
          <div className="flex items-center gap-4 mb-12">
            <HelpCircle className="text-blue-400 w-8 h-8" />
            <h2 className="text-4xl font-black tracking-tight">FREQUENTLY ASKED</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contactFaqsDisplay.map((faq, idx) => (
              <div key={idx} className="glass-card p-8 hover:border-white/20 transition-colors">
                <h4 className="text-xl font-bold mb-3">{faq.q}</h4>
                <p className="text-white/50 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
