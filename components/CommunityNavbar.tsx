"use client";

import { useState } from "react";
import { TrendingUp, Star, History, Menu, X, Keyboard, Lightbulb, FileDown, Heart, Newspaper } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  onStatsClick: () => void;
  onFavoritesClick: () => void;
  onHistoryClick: () => void;
  onKeyboardClick: () => void;
  onTipsClick: () => void;
  onExportClick: () => void;
  historyCount?: number;
}

export default function Navbar({
  onStatsClick,
  onFavoritesClick,
  onHistoryClick,
  onKeyboardClick,
  onTipsClick,
  onExportClick,
  historyCount = 0,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const closeMenus = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Site Name */}
          <Link href="/">
           <img
              src="/moredevlogo.png"
              alt="Chisa Atulegwu - Developer"
              className="h-[40px] sm:h-[50px] md:h-[60px] w-auto object-contain pt-1 pb-1"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              href="/"
              className={`px-2 xl:px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive('/') && pathname === '/'
                  ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`px-2 xl:px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive('/about')
                  ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`px-2 xl:px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive('/contact')
                  ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                }`}
            >
              Contact
            </Link>

            <Link
              href="/privacy"
              className={`px-2 xl:px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive('/privacy')
                  ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                }`}
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className={`px-2 xl:px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive('/terms')
                  ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                }`}
            >
              Terms
            </Link>

            <Link
              href="/technews"
              className={`px-2 xl:px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive('/technews')
                  ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                }`}
            >
              Tech News
            </Link>

            <Link
              href="/donation"
              className={`flex items-center gap-1 px-3 xl:px-4 py-2 text-sm font-medium text-white rounded-lg transition-all shadow-md ${isActive('/donation')
                  ? 'bg-gradient-to-r from-orange-600 via-pink-600 to-purple-700 scale-105'
                  : 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:scale-105'
                }`}
            >
              <Heart className="w-4 h-4" />
              Donate
            </Link>
          </div>

          {/* Right Section: Quick Actions (Desktop) */}
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
              className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors touch-manipulation ${isActive('/') && pathname === '/'
                  ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              onClick={closeMenus}
              className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors touch-manipulation ${isActive('/about')
                  ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={closeMenus}
              className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors touch-manipulation ${isActive('/contact')
                  ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                }`}
            >
              Contact
            </Link>

            <Link
              href="/privacy"
              onClick={closeMenus}
              className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors touch-manipulation ${isActive('/privacy')
                  ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                }`}
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              onClick={closeMenus}
              className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors touch-manipulation ${isActive('/terms')
                  ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                }`}
            >
              Terms of Service
            </Link>

            <Link
              href="/technews"
              onClick={closeMenus}
              className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors touch-manipulation ${isActive('/technews')
                  ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                }`}
            >
              Tech News
            </Link>

            <Link
              href="/donation"
              onClick={closeMenus}
              className={`flex items-center justify-center gap-2 mx-4 px-4 py-2.5 text-white rounded-lg transition-all shadow-md touch-manipulation ${isActive('/donation')
                  ? 'bg-gradient-to-r from-orange-600 via-pink-600 to-purple-700 scale-105'
                  : 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:opacity-90'
                }`}
            >
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">Donate</span>
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
          </div>
        )}
      </div>
    </nav>
  );
}

