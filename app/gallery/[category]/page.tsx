"use client";

import { useState, useEffect } from "react";
import MainNavbar from "@/components/MainNavbar";
import { ArrowLeft, X, ZoomIn, Download, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface GalleryImage {
  id: string;
  title: string;
  src: string;
  thumbnail: string;
  category: string;
  date?: string;
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categoryId = params.category;
  
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [imageError, setImageError] = useState<Set<string>>(new Set());

  // Category metadata
  const categoryData: Record<string, { name: string; description: string; gradient: string }> = {
    "web-development": {
      name: "Web Development",
      description: "Full-stack web applications, landing pages, and responsive websites",
      gradient: "from-blue-600 to-cyan-600",
    },
    "mobile-apps": {
      name: "Mobile Applications",
      description: "iOS and Android mobile apps with native performance",
      gradient: "from-purple-600 to-pink-600",
    },
    "desktop-apps": {
      name: "Desktop Applications",
      description: "Cross-platform desktop software and Windows services",
      gradient: "from-indigo-600 to-blue-600",
    },
    "ui-ux-design": {
      name: "UI/UX Design",
      description: "Modern interfaces, design systems, and user experiences",
      gradient: "from-pink-600 to-rose-600",
    },
    "backend-systems": {
      name: "Backend Systems",
      description: "APIs, microservices, and server-side architecture",
      gradient: "from-green-600 to-emerald-600",
    },
    "open-source": {
      name: "Open Source",
      description: "Public repositories and community contributions",
      gradient: "from-orange-600 to-yellow-600",
    },
    "graphics-media": {
      name: "Graphics & Media",
      description: "Branding, logos, illustrations, and visual assets",
      gradient: "from-violet-600 to-purple-600",
    },
    "client-projects": {
      name: "Client Projects",
      description: "Professional work delivered for businesses and startups",
      gradient: "from-cyan-600 to-teal-600",
    },
    "ecommerce": {
      name: "E-Commerce",
      description: "Online stores, payment integrations, and shopping platforms",
      gradient: "from-red-600 to-orange-600",
    },
    "education": {
      name: "Education & Learning",
      description: "Learning platforms, course management, and educational tools",
      gradient: "from-blue-600 to-indigo-600",
    },
    "healthcare": {
      name: "Healthcare",
      description: "Medical applications, health tracking, and wellness solutions",
      gradient: "from-red-600 to-pink-600",
    },
    "personal-projects": {
      name: "Personal Projects",
      description: "Experimental work, side projects, and learning exercises",
      gradient: "from-slate-600 to-gray-600",
    },
  };

  const category = categoryData[categoryId] || {
    name: "Category",
    description: "Browse images in this category",
    gradient: "from-purple-600 to-pink-600",
  };

  // Sample gallery images (replace with your actual images)
  const galleryImages: GalleryImage[] = [
    { id: "1", title: "Project Screenshot 1", src: `/gallery/${categoryId}/1.jpg`, thumbnail: `/gallery/${categoryId}/1.jpg`, category: categoryId },
    { id: "2", title: "Project Screenshot 2", src: `/gallery/${categoryId}/2.jpg`, thumbnail: `/gallery/${categoryId}/2.jpg`, category: categoryId },
    { id: "3", title: "Project Screenshot 3", src: `/gallery/${categoryId}/3.jpg`, thumbnail: `/gallery/${categoryId}/3.jpg`, category: categoryId },
    { id: "4", title: "Project Screenshot 4", src: `/gallery/${categoryId}/4.jpg`, thumbnail: `/gallery/${categoryId}/4.jpg`, category: categoryId },
    { id: "5", title: "Project Screenshot 5", src: `/gallery/${categoryId}/5.jpg`, thumbnail: `/gallery/${categoryId}/5.jpg`, category: categoryId },
    { id: "6", title: "Project Screenshot 6", src: `/gallery/${categoryId}/6.jpg`, thumbnail: `/gallery/${categoryId}/6.jpg`, category: categoryId },
    // Add more images here
  ];

  const handleImageError = (imageId: string) => {
    setImageError(prev => new Set([...prev, imageId]));
  };

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    
    if (newIndex < 0) newIndex = galleryImages.length - 1;
    if (newIndex >= galleryImages.length) newIndex = 0;
    
    setSelectedImage(galleryImages[newIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

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
          {/* Back Button */}
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Gallery</span>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              <span className={`bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                {category.name}
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl mb-4">
              {category.description}
            </p>
            <p className="text-gray-400 text-sm">
              {galleryImages.length} {galleryImages.length === 1 ? 'image' : 'images'} • Click on any image to view full size
            </p>
          </div>

          {/* Image Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                onClick={() => openLightbox(image)}
                className="group relative aspect-square bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                {!imageError.has(image.id) ? (
                  <>
                    <img
                      src={image.thumbnail}
                      alt={image.title}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(image.id)}
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                      <ZoomIn className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
                    <div className="text-center">
                      <div className="text-6xl mb-2">🖼️</div>
                      <p className="text-gray-400 text-sm px-4">Image placeholder</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-700 transition-all z-10 border border-gray-700"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-700 transition-all z-10 border border-gray-700"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-700 transition-all z-10 border border-gray-700 rotate-180"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>

              {/* Image Container */}
              <div
                className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </div>

              {/* Image Info */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-800/80 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-700 flex flex-col items-center gap-1">
                <p className="text-white text-sm font-medium">{selectedImage.title}</p>
                <p className="text-gray-400 text-xs">Press ← → to navigate, ESC to close</p>
              </div>
            </div>
          )}

          {/* Coming Soon Message */}
          <div className="mt-12 bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 text-center">
            <h3 className="text-xl font-bold text-white mb-2">More Images Coming Soon</h3>
            <p className="text-gray-300">
              Check back regularly for updates on new work and projects
            </p>
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
    </main>
  );
}

