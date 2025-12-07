"use client";

import { useState } from "react";
import { Menu, X, Calendar, Newspaper, FolderOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

 export const navUrls = [
  {id:1, url:'/', name:'Home'},
  {id:2, url:'/gallery', name:'Gallery'},
  {id:3, url:'/community', name:'Community'},
  /* {id:4, url:'/#projects', name:'Projects'},
  {id:5, url:'/#experience', name:'Experience'}, */
  {id:6, url:'/about', name:'About'},
  {id:7, url:'/contact', name:'Contact'},
  {id:8, url:'/technews', name:'Tech News'}
]
export default function MainNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };



  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Desktop Navbar - Floating Glassmorphic Design */}
        <div className="hidden md:flex items-center justify-between h-16 bg-black/60 backdrop-blur-xl border border-gray-800/50 rounded-2xl px-6 shadow-2xl shadow-black/50 relative overflow-hidden">
          {/* Background gradient glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50"></div>
          
          {/* Top border accent */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 relative z-10 group">
            <img
              src="/moredevlogo.png"
              alt="Chisa Atulegwu - Developer"
              className="h-[45px] w-auto object-contain transition-all duration-300 group-hover:brightness-110 group-hover:scale-105"
            />
          </Link>

          {/* Center Navigation Pills */}
          <div className="flex items-center gap-2 relative z-10">
            {navUrls.map(nav => (
              <Link
                key={nav.id.toString()}
                href={nav.url}
                className={`relative px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 group ${
                  isActive(nav.url)
                    ? 'bg-gradient-to-r from-primary to-amber-500 text-black shadow-lg shadow-primary/30'
                    : 'text-white hover:bg-white/5 hover:text-primary'
                }`}
              >
                {/* Active state glow */}
                {isActive(nav.url) && (
                  <div className="absolute inset-0 rounded-xl bg-primary blur-md opacity-40 -z-10"></div>
                )}
                
                <span className="relative z-10">{nav.name}</span>
                
                {/* Hover underline */}
                {!isActive(nav.url) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-primary to-amber-500 group-hover:w-3/4 transition-all duration-300"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Right Side - Premium CTA Button */}
          <div className="flex items-center gap-3 relative z-10">
            <Link
              href="/schedule"
              className="relative flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary via-amber-400 to-primary bg-[length:200%_100%] text-black rounded-xl hover:bg-[position:100%_0] transition-all duration-500 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 hover:scale-105 font-bold text-sm overflow-hidden group"
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <Calendar className="w-4 h-4 relative z-10 text-black" />
              <span className="relative z-10">Schedule Meeting</span>
              
              {/* Pulse ring effect */}
              <div className="absolute inset-0 rounded-xl border-2 border-primary opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
            </Link>
          </div>
        </div>

        {/* Mobile Navbar - Compact Top Bar */}
        <div className="md:hidden flex items-center justify-between h-16 bg-black/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl px-4 shadow-xl">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img
              src="/moredevlogo.png"
              alt="Chisa Atulegwu - Developer"
              className="h-[40px] w-auto object-contain"
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-white hover:bg-white/10 rounded-xl transition-all border border-gray-800/50 hover:border-primary/30"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 py-4 space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${isActive('/')
                  ? 'text-primary border border-purple-500/30'
                  : 'text-white hover:bg-gray-800'
                }`}
            >
              Home
            </Link>

            <Link
              href="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${isActive('/gallery')
                  ? 'text-primary border border-purple-500/30'
                  : 'text-white hover:bg-gray-800'
                }`}
            >
              <FolderOpen className="w-4 h-4" />
              Gallery
            </Link>

            <Link
              href="/community"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${isActive('/community')
                  ? ' text-primary border border-purple-500/30'
                  : 'text-white hover:bg-gray-800'
                }`}
            >
              Community
            </Link>

            <Link
              href="/#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              Projects
            </Link>

            <Link
              href="/#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              Experience
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${isActive('/about')
                  ? 'bg-purple-900/30 text-purple-400 border border-purple-500/30'
                  : 'text-white hover:bg-gray-800'
                }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              Contact
            </Link>

            <Link
              href="/technews"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${isActive('/technews')
                  ? 'bg-purple-900/30 text-purple-400 border border-purple-500/30'
                  : 'text-white hover:bg-gray-800'
                }`}
            >
              <Newspaper className="w-4 h-4" />
              Tech News
            </Link>

            <div className="border-t border-gray-800 my-2"></div>

            <Link
              href="/schedule"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm transition-all shadow-md ${isActive('/schedule')
                  ? 'bg-primary text-black scale-105'
                  : 'bg-primary text-black hover:brightness-110 active:brightness-95'
                }`}
            >
              <Calendar className="w-4 h-4 text-black" />
              <span className="text-sm font-medium">Schedule Meeting</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

