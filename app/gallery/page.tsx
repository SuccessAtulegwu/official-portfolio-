"use client";

import { useState } from "react";
import MainNavbar from "@/components/MainNavbar";
import { 
  FolderOpen, 
  Globe, 
  Smartphone, 
  Monitor, 
  Palette, 
  Server, 
  Code, 
  Image as ImageIcon,
  Briefcase,
  ShoppingCart,
  GraduationCap,
  Heart,
  Search,
  Grid3X3,
  List,
  ArrowRight,
  ExternalLink,
  Calendar
} from "lucide-react";
import Link from "next/link";

interface GalleryCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  itemCount: number;
  previewImages?: string[];
}

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  tags: string[];
  date: string;
  link?: string;
}

export default function GalleryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Gallery Categories (Folders)
  const categories: GalleryCategory[] = [
    {
      id: "web-development",
      name: "Web Development",
      description: "Full-stack web applications, landing pages, and responsive websites",
      icon: <Globe className="w-6 h-6" />,
      gradient: "from-blue-600 to-cyan-600",
      itemCount: 12,
    },
    {
      id: "mobile-apps",
      name: "Mobile Applications",
      description: "iOS and Android mobile apps with native performance",
      icon: <Smartphone className="w-6 h-6" />,
      gradient: "from-purple-600 to-pink-600",
      itemCount: 8,
    },
    {
      id: "desktop-apps",
      name: "Desktop Applications",
      description: "Cross-platform desktop software and Windows services",
      icon: <Monitor className="w-6 h-6" />,
      gradient: "from-indigo-600 to-blue-600",
      itemCount: 6,
    },
    {
      id: "ui-ux-design",
      name: "UI/UX Design",
      description: "Modern interfaces, design systems, and user experiences",
      icon: <Palette className="w-6 h-6" />,
      gradient: "from-pink-600 to-rose-600",
      itemCount: 15,
    },
    {
      id: "backend-systems",
      name: "Backend Systems",
      description: "APIs, microservices, and server-side architecture",
      icon: <Server className="w-6 h-6" />,
      gradient: "from-green-600 to-emerald-600",
      itemCount: 10,
    },
    {
      id: "open-source",
      name: "Open Source",
      description: "Public repositories and community contributions",
      icon: <Code className="w-6 h-6" />,
      gradient: "from-orange-600 to-yellow-600",
      itemCount: 7,
    },
    {
      id: "graphics-media",
      name: "Graphics & Media",
      description: "Branding, logos, illustrations, and visual assets",
      icon: <ImageIcon className="w-6 h-6" />,
      gradient: "from-violet-600 to-purple-600",
      itemCount: 20,
    },
    {
      id: "client-projects",
      name: "Client Projects",
      description: "Professional work delivered for businesses and startups",
      icon: <Briefcase className="w-6 h-6" />,
      gradient: "from-cyan-600 to-teal-600",
      itemCount: 18,
    },
    {
      id: "ecommerce",
      name: "E-Commerce",
      description: "Online stores, payment integrations, and shopping platforms",
      icon: <ShoppingCart className="w-6 h-6" />,
      gradient: "from-red-600 to-orange-600",
      itemCount: 5,
    },
    {
      id: "education",
      name: "Education & Learning",
      description: "Learning platforms, course management, and educational tools",
      icon: <GraduationCap className="w-6 h-6" />,
      gradient: "from-blue-600 to-indigo-600",
      itemCount: 4,
    },
    {
      id: "healthcare",
      name: "Healthcare",
      description: "Medical applications, health tracking, and wellness solutions",
      icon: <Heart className="w-6 h-6" />,
      gradient: "from-red-600 to-pink-600",
      itemCount: 3,
    },
    {
      id: "personal-projects",
      name: "Personal Projects",
      description: "Experimental work, side projects, and learning exercises",
      icon: <Code className="w-6 h-6" />,
      gradient: "from-slate-600 to-gray-600",
      itemCount: 14,
    },
  ];

  // Sample gallery items (you can expand this with real data)
  const galleryItems: GalleryItem[] = [
    // Add your actual projects here
  ];

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/10"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <MainNavbar />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          {/* Header */}
          <div className="text-center mb-12 animate-fadeIn">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-900/30 to-pink-900/30 px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-purple-500/20">
              <FolderOpen className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">
                Portfolio Gallery
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                My Work Gallery
              </span>
            </h1>

            <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Browse through my visual portfolio organized by categories. Click on any category to view a collection of images showcasing my work in web development, mobile apps, design, and more.
            </p>
            <p className="text-gray-400 text-sm mt-4 max-w-2xl mx-auto">
              💡 To add your images: Create folders in <code className="bg-gray-800 px-2 py-1 rounded">/public/gallery/[category-name]/</code> and add your images as <code className="bg-gray-800 px-2 py-1 rounded">1.jpg, 2.jpg, 3.jpg</code>, etc.
            </p>
          </div>

          {/* Search and View Controls */}
          <div className="max-w-7xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-gray-800/60 backdrop-blur-sm rounded-xl p-1 border border-gray-700">
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

          {/* Stats */}
          <div className="max-w-7xl mx-auto mb-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {categories.length}
                </div>
                <div className="text-sm text-gray-400">Categories</div>
              </div>
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {categories.reduce((sum, cat) => sum + cat.itemCount, 0)}
                </div>
                <div className="text-sm text-gray-400">Total Images</div>
              </div>
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                  50+
                </div>
                <div className="text-sm text-gray-400">Technologies</div>
              </div>
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                  5+
                </div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Categories Grid/List */}
          <div className="max-w-7xl mx-auto">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCategories.map((category, index) => (
                  <Link
                    key={category.id}
                    href={`/gallery/${category.id}`}
                    className="group relative bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: "fadeIn 0.5s ease-out forwards",
                    }}
                  >
                    {/* Gradient Background on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>

                    <div className="relative z-10">
                      {/* Icon */}
                      <div className={`w-14 h-14 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {category.icon}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                        {category.name}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {category.description}
                      </p>

                      {/* Item Count */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {category.itemCount} {category.itemCount === 1 ? "item" : "items"}
                        </span>
                        <ArrowRight className="w-4 h-4 text-purple-400 transform group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCategories.map((category, index) => (
                  <Link
                    key={category.id}
                    href={`/gallery/${category.id}`}
                    className="group flex items-center gap-6 bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: "fadeIn 0.5s ease-out forwards",
                    }}
                  >
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      {category.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                        {category.name}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {category.description}
                      </p>
                    </div>

                    {/* Item Count & Arrow */}
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-right">
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          {category.itemCount}
                        </div>
                        <div className="text-xs text-gray-500">items</div>
                      </div>
                      <ArrowRight className="w-6 h-6 text-purple-400 transform group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Empty State */}
          {filteredCategories.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-800/60 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No categories found</h3>
              <p className="text-gray-400">Try adjusting your search query</p>
            </div>
          )}

          {/* CTA Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Want to work together?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:scale-105 transition-transform font-medium shadow-lg"
                >
                  <span>Get In Touch</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/schedule"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-800/60 text-white rounded-xl hover:bg-gray-700 transition-all font-medium border border-gray-700"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Schedule a Meeting</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative mt-20 border-t border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div className="md:col-span-1">
                <Link href="/" className="inline-block mb-4">
                  <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                    {"<moredev/>"}
                  </span>
                </Link>
                <p className="text-gray-400 text-sm">
                  Building innovative digital solutions with passion and precision.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/gallery" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                      Gallery
                    </Link>
                  </li>
                  <li>
                    <Link href="/community" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                      Community
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                      About
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-white font-semibold mb-4">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/gallery/web-development" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                      Web Development
                    </Link>
                  </li>
                  <li>
                    <Link href="/gallery/mobile-apps" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                      Mobile Apps
                    </Link>
                  </li>
                  <li>
                    <Link href="/gallery/ui-ux-design" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                      UI/UX Design
                    </Link>
                  </li>
                  <li>
                    <Link href="/gallery/open-source" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                      Open Source
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-white font-semibold mb-4">Get In Touch</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/#contact" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                      Contact Me
                    </Link>
                  </li>
                  <li>
                    <Link href="/schedule" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                      Schedule Meeting
                    </Link>
                  </li>
                  <li>
                    <Link href="/technews" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                      Tech News
                    </Link>
                  </li>
                  <li>
                    <Link href="/donation" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                      Support
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-gray-800">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} moredev. All rights reserved.
                </p>
                <div className="flex items-center gap-6">
                  <Link href="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}

