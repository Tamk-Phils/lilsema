'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Mail, MapPin } from 'lucide-react';

export default function Booking() {
  const whatsappNumber = "+237682385567";
  const message = encodeURIComponent("Hello Lil Sema, I'd like to book a photography session!");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <section id="booking" className="py-24 px-4 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to Capture <br /> Your Vision?</h2>
            <p className="text-lg text-white/50 mb-8 max-w-md">
              Whether it's a portrait, an event, or a commercial shoot, we're here to make it professional.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 glass-card flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-white/50">Cameroon</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 glass-card flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-white/50">contact@lilsema.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 border-white/5"
          >
            <h3 className="text-2xl font-bold mb-6">Quick Booking</h3>
            <p className="text-white/50 mb-8">
              Click the button below to message me directly on WhatsApp and secure your date.
            </p>
            
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 w-full py-5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl transition-colors shadow-lg shadow-green-500/20"
            >
              <MessageCircle className="w-6 h-6" />
              Book via WhatsApp
            </motion.a>
            
            <p className="text-center text-xs text-white/20 mt-6">
              Average response time: 2 hours
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
