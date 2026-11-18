'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMenuOpen(false);
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Don't render the public navbar on admin pages
  if (pathname?.startsWith('/admin')) return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled || isMenuOpen
            ? 'bg-white/95 backdrop-blur-md border-slate-200/80 shadow-sm py-3'
            : 'bg-white/80 backdrop-blur-sm border-slate-200/50 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 group" onClick={() => setIsMenuOpen(false)}>
            <Logo className="w-8 h-8 md:w-9 md:h-9" textClassName="text-sm md:text-lg" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-xs font-bold tracking-[0.2em] uppercase relative transition-colors py-1 ${
                    isActive ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black tracking-widest rounded-full px-6 py-2.5 shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-95 uppercase"
            >
              BOOK NOW
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-800 hover:text-blue-600 transition-colors"
              aria-label={isMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl md:hidden transition-all duration-300 flex flex-col pt-28 px-8 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <nav className="flex flex-col gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`text-2xl font-black tracking-tight uppercase flex items-center justify-between py-2 border-b border-slate-100 ${
                  isActive ? 'text-blue-600' : 'text-slate-800 hover:text-blue-600'
                }`}
              >
                {link.name}
                <ArrowRight className={`w-5 h-5 ${isActive ? 'opacity-100 text-blue-600' : 'opacity-30'}`} />
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto mb-12">
          <Link
            href="/contact"
            className="w-full py-4 bg-blue-600 text-white text-center font-black tracking-widest rounded-2xl block hover:bg-blue-700 transition-all text-xs uppercase shadow-lg shadow-blue-500/20"
          >
            BOOK YOUR SESSION
          </Link>
          <p className="mt-6 text-center text-slate-400 text-[10px] font-bold tracking-widest uppercase">
            &copy; 2026 Lil Sema&apos;s Pro Shots
          </p>
        </div>
      </div>
    </>
  );
}
