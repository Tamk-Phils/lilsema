'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const navLinks = [
  { name: 'HOME', path: '/' },
  { name: 'GALLERY', path: '/gallery' },
  { name: 'ABOUT', path: '/about' },
  { name: 'CONTACT', path: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Don't render the navbar on admin pages
  if (pathname?.startsWith('/admin')) return null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when pathname changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-500 border-b ${
          isScrolled || isMenuOpen
            ? 'bg-[#050505]/95 backdrop-blur-xl border-white/10 py-3' 
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="group" onClick={() => setIsMenuOpen(false)}>
            <Logo className="w-8 h-8" textClassName="text-sm md:text-lg" />
          </Link>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`text-[10px] font-black tracking-[0.3em] transition-all relative group ${pathname === link.path ? 'text-blue-400' : 'text-white/50 hover:text-white'}`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full ${pathname === link.path ? 'w-full' : ''}`} />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/contact"
              className="hidden sm:block px-6 py-2 bg-white text-black text-[10px] font-black tracking-widest rounded-full hover:bg-blue-500 hover:text-white transition-all transform active:scale-95"
            >
              BOOK NOW
            </Link>

            {/* Hamburger Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white hover:text-blue-500 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-black/98 backdrop-blur-2xl md:hidden flex flex-col pt-32 px-10"
          >
            {/* Background Accent */}
            <div className="absolute top-1/4 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -z-10" />
            
            <nav className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    href={link.path}
                    className={`text-4xl font-black tracking-tighter uppercase flex items-center justify-between group ${pathname === link.path ? 'text-blue-500' : 'text-white'}`}
                  >
                    {link.name}
                    <ArrowRight className={`w-6 h-6 transition-transform group-hover:translate-x-2 ${pathname === link.path ? 'opacity-100' : 'opacity-0'}`} />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto mb-20">
              <Link 
                href="/contact"
                className="w-full py-6 bg-white text-black text-center font-black tracking-[0.2em] rounded-2xl block hover:bg-blue-600 hover:text-white transition-all text-sm uppercase"
              >
                BOOK YOUR SESSION
              </Link>
              <p className="mt-8 text-center text-white/20 text-[10px] font-black tracking-widest uppercase">
                &copy; 2026 Lil Sema's Pro Shots
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
