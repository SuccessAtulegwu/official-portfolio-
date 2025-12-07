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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Site Name */}
          <Link href="/">
            <img
              src="/moredevlogo.png"
              alt="Chisa Atulegwu - Developer"
              className="w-full h-[60px]"
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            {navUrls.map(nav =>(
              <Link
              key={nav.id.toString()}
              href={nav.url}
              className={`relative text-sm font-semibold transition-all duration-300 group ${isActive(nav.url)
                  ? 'text-transparent bg-primary bg-clip-text'
                  : 'text-white hover:text-transparent hover:bg-primary hover:bg-clip-text'
                }`}
            >
              {nav.name}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive(nav.url) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
            </Link>
            ))}
           
          </div>

          {/* Right Side - Schedule Button (Desktop) */}
          <div className="hidden md:flex items-center">
            <Link
              href="/schedule"
              className="relative flex items-center gap-2 px-6 py-2.5 bg-primary text-black rounded-lg hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 shadow-lg overflow-hidden group hover:brightness-110 active:brightness-95"
            >
              <Calendar className="w-4 h-4 relative z-10 text-black" />
              <span className="text-sm font-semibold relative z-10 text-black">Schedule Meeting</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-gray-800 rounded-lg transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
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
                  ? 'bg-purple-900/30 text-purple-400 border border-purple-500/30'
                  : 'text-white hover:bg-gray-800'
                }`}
            >
              Home
            </Link>

            <Link
              href="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${isActive('/gallery')
                  ? 'bg-purple-900/30 text-purple-400 border border-purple-500/30'
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
                  ? 'bg-purple-900/30 text-purple-400 border border-purple-500/30'
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
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all shadow-md ${isActive('/schedule')
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

