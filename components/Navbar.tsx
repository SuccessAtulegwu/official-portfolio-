"use client";

import { useState } from "react";
import { Download, TrendingUp, Star, History, Menu, X, Keyboard, Lightbulb, FileDown, ChevronDown, Link as LinkIcon, Video, Facebook, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  onStatsClick: () => void;
  onFavoritesClick: () => void;
  onHistoryClick: () => void;
  onKeyboardClick: () => void;
  onTipsClick: () => void;
  onExportClick: () => void;
  historyCount?: number;
  // Social media links (optional)
  facebookUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
}

export default function Navbar({
  onStatsClick,
  onFavoritesClick,
  onHistoryClick,
  onKeyboardClick,
  onTipsClick,
  onExportClick,
  historyCount = 0,
  facebookUrl = "https://facebook.com",
  linkedinUrl = "https://linkedin.com",
  instagramUrl = "https://instagram.com",
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  };

  const socialLinks = [
    { icon: Facebook, url: facebookUrl, label: "Facebook", color: "text-blue-600 hover:text-blue-700" },
    { icon: Linkedin, url: linkedinUrl, label: "LinkedIn", color: "text-blue-700 hover:text-blue-800" },
    { icon: Instagram, url: instagramUrl, label: "Instagram", color: "text-pink-600 hover:text-pink-700" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
              <Download className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm sm:text-base lg:text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Social Tools
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Fast & Free</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              href="/"
              className="px-2 xl:px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
            >
              Home
            </Link>

            <Link
              href="/url-shortener"
              className="px-2 xl:px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
            >
              URL Shortener
            </Link>

            <Link
              href="/video-downloader"
              className="px-2 xl:px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
            >
              Video Downloader
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-2 xl:px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors">
                Services
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <Link
                  href="/video-downloader"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors border-b border-gray-100 dark:border-gray-700"
                >
                  <Video className="w-4 h-4 text-purple-600" />
                  <div>
                    <div className="font-medium">Video Downloader</div>
                    <div className="text-xs text-gray-500">Download from social media</div>
                  </div>
                </Link>
                <Link
                  href="/url-shortener"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors border-b border-gray-100 dark:border-gray-700"
                >
                  <LinkIcon className="w-4 h-4 text-blue-600" />
                  <div>
                    <div className="font-medium">URL Shortener</div>
                    <div className="text-xs text-gray-500">Shorten long URLs</div>
                  </div>
                </Link>
                <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 italic">
                  More tools coming soon...
                </div>
              </div>
            </div>

            <Link
              href="/about"
              className="px-2 xl:px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="px-2 xl:px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Right Section: Quick Actions + Social Icons (Desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {/* Quick Action Buttons */}
            <button
              onClick={onStatsClick}
              className="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all"
              title="Statistics (Ctrl+D)"
            >
              <TrendingUp className="w-5 h-5" />
            </button>

            <button
              onClick={onFavoritesClick}
              className="p-2 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-all"
              title="Favorites (Ctrl+B)"
            >
              <Star className="w-5 h-5" />
            </button>

            <button
              onClick={onHistoryClick}
              className="relative p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all"
              title="History (Ctrl+H)"
            >
              <History className="w-5 h-5" />
              {historyCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {historyCount > 9 ? '9+' : historyCount}
                </span>
              )}
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>

            {/* Social Media Icons */}
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 ${social.color} hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all`}
                aria-label={social.label}
                title={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}

            {/* More Menu */}
            <div className="relative group">
              <button className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all">
                <span className="text-lg font-bold">⋮</span>
              </button>
              <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <button
                  onClick={onKeyboardClick}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Keyboard className="w-4 h-4" />
                  Shortcuts
                </button>
                <button
                  onClick={onTipsClick}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Lightbulb className="w-4 h-4" />
                  Tips & Tricks
                </button>
                <button
                  onClick={onExportClick}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-b-lg"
                >
                  <FileDown className="w-4 h-4" />
                  Backup & Restore
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all touch-manipulation"
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
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 py-4 space-y-2 animate-fadeIn">
            {/* Navigation Links */}
            <Link
              href="/"
              onClick={closeMenus}
              className="block px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors touch-manipulation"
            >
              Home
            </Link>

            <Link
              href="/url-shortener"
              onClick={closeMenus}
              className="block px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors touch-manipulation"
            >
              URL Shortener
            </Link>

            <Link
              href="/video-downloader"
              onClick={closeMenus}
              className="block px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors touch-manipulation"
            >
              Video Downloader
            </Link>

            {/* Services */}
            <div>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors touch-manipulation"
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div className="mt-2 ml-4 space-y-1">
                  <Link
                    href="/video-downloader"
                    onClick={closeMenus}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors touch-manipulation"
                  >
                    <Video className="w-4 h-4" />
                    Video Downloader
                  </Link>
                  <Link
                    href="/url-shortener"
                    onClick={closeMenus}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors touch-manipulation"
                  >
                    <LinkIcon className="w-4 h-4" />
                    URL Shortener
                  </Link>
                  <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-500 italic">
                    More tools coming soon...
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/about"
              onClick={closeMenus}
              className="block px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors touch-manipulation"
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={closeMenus}
              className="block px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors touch-manipulation"
            >
              Contact
            </Link>

            <div className="border-t border-gray-200 dark:border-gray-800 my-2"></div>

            {/* Quick Actions */}
            <button
              onClick={() => {
                onStatsClick();
                closeMenus();
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors touch-manipulation"
            >
              <TrendingUp className="w-4 h-4" />
              Statistics
            </button>

            <button
              onClick={() => {
                onFavoritesClick();
                closeMenus();
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-colors touch-manipulation"
            >
              <Star className="w-4 h-4" />
              Favorites
            </button>

            <button
              onClick={() => {
                onHistoryClick();
                closeMenus();
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors touch-manipulation"
            >
              <div className="flex items-center gap-3">
                <History className="w-4 h-4" />
                History
              </div>
              {historyCount > 0 && (
                <span className="bg-purple-600 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                  {historyCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                onKeyboardClick();
                closeMenus();
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors touch-manipulation"
            >
              <Keyboard className="w-4 h-4" />
              Keyboard Shortcuts
            </button>

            <button
              onClick={() => {
                onTipsClick();
                closeMenus();
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors touch-manipulation"
            >
              <Lightbulb className="w-4 h-4" />
              Tips & Tricks
            </button>

            <button
              onClick={() => {
                onExportClick();
                closeMenus();
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors touch-manipulation"
            >
              <FileDown className="w-4 h-4" />
              Backup & Restore
            </button>

            {/* Social Media Links */}
            <div className="border-t border-gray-200 dark:border-gray-800 my-2 pt-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Connect With Us
              </div>
              <div className="flex flex-wrap gap-2 px-4 py-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenus}
                    className={`flex items-center gap-2 px-3 py-2 ${social.color} bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all touch-manipulation`}
                  >
                    <social.icon className="w-4 h-4" />
                    <span className="text-xs font-medium">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

