"use client";

import { useState } from "react";
import Link from "next/link";
import CommunityNavbar from "@/components/CommunityNavbar";
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Link as LinkIcon, 
  Image as ImageIcon,
  Music,
  FileText,
  Scissors,
  Zap,
  Download,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Video,
  FileImage,
  Type,
  Palette,
  Code,
  Globe,
  Hash,
  Wand2,
  ScanLine,
  Quote,
  Box,
  FileCode,
  Grid3X3,
  List,
  UserSquare
} from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  gradient: string;
  badge?: string;
  comingSoon?: boolean;
}

export default function CommunityServicesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const services: Service[] = [
    {
      title: "Facebook Video Downloader",
      description: "Download Facebook videos in HD quality without watermark",
      icon: <Facebook className="w-8 h-8" />,
      href: "/community/download",
      gradient: "from-blue-600 to-blue-400",
      badge: "Popular"
    },
    {
      title: "Instagram Video Downloader",
      description: "Download Instagram Reels, IGTV & videos easily",
      icon: <Instagram className="w-8 h-8" />,
      href: "/community/download",
      gradient: "from-pink-600 to-purple-600",
      badge: "Popular"
    },
    {
      title: "YouTube Video Downloader",
      description: "Download YouTube videos in multiple quality options",
      icon: <Youtube className="w-8 h-8" />,
      href: "/community/youtube-downloader",
      gradient: "from-red-600 to-red-400",
      comingSoon: true
    },
    {
      title: "URL Shortener",
      description: "Create short, branded links with analytics tracking",
      icon: <LinkIcon className="w-8 h-8" />,
      href: "/community/url-shortener",
      gradient: "from-green-600 to-emerald-600",
      comingSoon: true
    },
    {
      title: "Image Enhancement",
      description: "AI-powered image upscaling and enhancement tool",
      icon: <ImageIcon className="w-8 h-8" />,
      href: "/community/image-enhancer",
      gradient: "from-purple-600 to-indigo-600",
      comingSoon: true
    },
    {
      title: "Audio Converter",
      description: "Convert audio files between different formats",
      icon: <Music className="w-8 h-8" />,
      href: "/community/audio-converter",
      gradient: "from-orange-600 to-yellow-600",
      comingSoon: true
    },
    {
      title: "PDF Tools",
      description: "Merge, split, compress and edit PDF documents",
      icon: <FileText className="w-8 h-8" />,
      href: "/community/pdf-tools",
      gradient: "from-cyan-600 to-blue-600",
      comingSoon: true
    },
    {
      title: "Video Trimmer",
      description: "Cut and trim videos online without quality loss",
      icon: <Scissors className="w-8 h-8" />,
      href: "/community/video-trimmer",
      gradient: "from-teal-600 to-green-600",
      comingSoon: true
    },
    {
      title: "QR Code Generator",
      description: "Create QR codes for URLs, SMS, WhatsApp, contacts, events & payments",
      icon: <ScanLine className="w-8 h-8" />,
      href: "/community/qr-generator",
      gradient: "from-indigo-600 to-purple-600",
      badge: "New"
    },
    {
      title: "Video to GIF Converter",
      description: "Convert videos to animated GIFs easily",
      icon: <Video className="w-8 h-8" />,
      href: "/community/video-to-gif",
      gradient: "from-rose-600 to-pink-600",
      comingSoon: true
    },
    {
      title: "Background Remover",
      description: "Remove background from images with AI precision",
      icon: <Wand2 className="w-8 h-8" />,
      href: "/community/bg-remover",
      gradient: "from-violet-600 to-purple-600",
      comingSoon: true
    },
    {
      title: "Image Compressor",
      description: "Reduce image file size without losing quality",
      icon: <FileImage className="w-8 h-8" />,
      href: "/community/image-compress",
      gradient: "from-amber-600 to-orange-600",
      comingSoon: true
    },
    {
      title: "Text to Speech",
      description: "Convert text to natural sounding audio",
      icon: <Type className="w-8 h-8" />,
      href: "/community/text-to-speech",
      gradient: "from-blue-600 to-indigo-600",
      comingSoon: true
    },
    {
      title: "Color Palette Generator",
      description: "Generate beautiful color schemes for your projects",
      icon: <Palette className="w-8 h-8" />,
      href: "/community/color-palette",
      gradient: "from-fuchsia-600 to-pink-600",
      badge: "New"
    },
    {
      title: "Code Formatter",
      description: "Format and beautify your code instantly",
      icon: <Code className="w-8 h-8" />,
      href: "/community/code-formatter",
      gradient: "from-slate-600 to-gray-600",
      badge: "New"
    },
    {
      title: "IP Lookup Tool",
      description: "Get detailed information about any IP address",
      icon: <Globe className="w-8 h-8" />,
      href: "/community/ip-lookup",
      gradient: "from-sky-600 to-blue-600",
      comingSoon: true
    },
    {
      title: "Hash Generator",
      description: "Generate MD5, SHA256, and other hash values",
      icon: <Hash className="w-8 h-8" />,
      href: "/community/hash-generator",
      gradient: "from-emerald-600 to-teal-600",
      badge: "New"
    },
    {
      title: "CSS Box Shadow Generator",
      description: "Create beautiful CSS box shadows with live preview",
      icon: <Box className="w-8 h-8" />,
      href: "/community/box-shadow",
      gradient: "from-blue-600 to-cyan-600",
      badge: "New"
    },
    {
      title: "HTML Template Generator",
      description: "Ready-to-use HTML starter and advanced templates",
      icon: <FileCode className="w-8 h-8" />,
      href: "/community/html-template",
      gradient: "from-violet-600 to-purple-600",
      badge: "New"
    },
    {
      title: "Resume & CV Builder",
      description: "Create professional resumes and CVs with pre-designed templates",
      icon: <UserSquare className="w-8 h-8" />,
      href: "/community/resume-builder",
      gradient: "from-teal-600 to-cyan-600",
      badge: "New"
    },
    {
      title: "Motivational Quotes",
      description: "Get inspired with daily motivational quotes",
      icon: <Quote className="w-8 h-8" />,
      href: "/community/motivational-quotes",
      gradient: "from-yellow-600 to-amber-600",
      badge: "New"
    }
  ];

  const stats = [
    { label: "Total Downloads", value: "10M+", icon: <Download className="w-5 h-5" /> },
    { label: "Active Users", value: "500K+", icon: <TrendingUp className="w-5 h-5" /> },
    { label: "Tools Available", value: "22+", icon: <Sparkles className="w-5 h-5" /> }
  ];

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Community Navbar */}
        <CommunityNavbar 
          onStatsClick={() => {}}
          onFavoritesClick={() => {}}
          onHistoryClick={() => {}}
          onKeyboardClick={() => {}}
          onTipsClick={() => {}}
          onExportClick={() => {}}
          historyCount={0}
        />

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              Free Online Tools
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-12">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Community Services
            </span>
          </h1>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-800/60 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-gray-700/50">
                <div className="text-purple-600 dark:text-purple-400">
                  {stat.icon}
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-300">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View Toggle */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex justify-end">
            <div className="inline-flex items-center gap-2 bg-gray-800/60 backdrop-blur-sm rounded-xl p-1 border border-gray-700">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
                <span className="text-sm font-medium">Grid</span>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <List className="w-4 h-4" />
                <span className="text-sm font-medium">List</span>
              </button>
            </div>
          </div>
        </div>

        {/* Services Grid/List */}
        <div className="max-w-7xl mx-auto">
          {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.comingSoon ? "#" : service.href}
                className={`group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 ${
                  service.comingSoon 
                    ? 'opacity-75 cursor-not-allowed' 
                    : 'hover:scale-105 cursor-pointer'
                }`}
                onClick={(e) => service.comingSoon && e.preventDefault()}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>

                  {/* Badge */}
                  {service.badge && (
                    <span className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {service.badge}
                    </span>
                  )}

                  {service.comingSoon && (
                    <span className="absolute top-4 right-4 bg-gray-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Coming Soon
                    </span>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Arrow Icon */}
                  {!service.comingSoon && (
                    <div className="flex items-center text-purple-600 dark:text-purple-400 font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
                      <span>Try it now</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  )}

                  {service.comingSoon && (
                    <div className="flex items-center text-gray-400 font-medium text-sm">
                      <span>Available soon</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
          ) : (
          <div className="space-y-4">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.comingSoon ? "#" : service.href}
                className={`group relative flex flex-col sm:flex-row gap-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 ${
                  service.comingSoon 
                    ? 'opacity-75 cursor-not-allowed' 
                    : 'hover:scale-[1.02] cursor-pointer'
                }`}
                onClick={(e) => service.comingSoon && e.preventDefault()}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>

                {/* Icon */}
                <div className={`w-20 h-20 flex-shrink-0 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>

                {/* Content */}
                <div className="relative z-10 flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                      {service.title}
                    </h3>
                    
                    {/* Badge */}
                    {service.badge && (
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {service.badge}
                      </span>
                    )}

                    {service.comingSoon && (
                      <span className="bg-gray-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Arrow Icon */}
                  {!service.comingSoon && (
                    <div className="flex items-center text-purple-600 dark:text-purple-400 font-medium group-hover:translate-x-2 transition-transform duration-300">
                      <span>Try it now</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  )}

                  {service.comingSoon && (
                    <div className="flex items-center text-gray-400 font-medium">
                      <span>Available soon</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 p-1 rounded-2xl">
            <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl px-8 py-6">
              <h3 className="text-2xl font-bold text-white mb-3">
                Need a Custom Tool?
              </h3>
              <p className="text-gray-300 mb-4">
                We're always adding new tools. Let us know what you need!
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-6 py-3 rounded-xl hover:scale-105 transition-transform duration-300"
              >
                <span>Request a Tool</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md mt-16 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4">
            {/* Footer Links */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link 
                href="/privacy" 
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-500">•</span>
              <Link
                href="/terms"
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                Terms of Service
              </Link>
              <span className="text-gray-500">•</span>
              <Link
                href="/contact"
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                Contact Us
              </Link>
            </div>
            
            {/* Copyright */}
            <div className="text-center text-gray-400 text-sm">
              <p>© 2025 Community Services. Free online tools for everyone.</p>
              <p className="mt-1 text-xs text-gray-500">
                Made with ❤️ for the community
              </p>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </main>
  );
}
