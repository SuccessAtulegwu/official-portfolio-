import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import "./nprogress.css";
import StructuredData from "@/components/StructuredData";
import ProgressBar from "@/components/ProgressBar";
import Chatbot from "@/components/Chatbot";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#9333ea" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2937" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://fbdownloader.com'), // Replace with your actual domain
  title: {
    default: "Full Stack Developer Portfolio & Free Online Tools | Community Services",
    template: "%s | Developer Portfolio"
  },
  description: "Professional full stack developer portfolio showcasing web applications and software projects. Access free online tools including Facebook & Instagram video downloader, image enhancement, PDF tools, and more. Expert in React, Next.js, Node.js, and modern web technologies.",
  keywords: [
    // Portfolio keywords
    "full stack developer",
    "web developer portfolio",
    "software engineer",
    "react developer",
    "nextjs developer",
    "nodejs developer",
    "frontend developer",
    "backend developer",
    "full stack engineer",
    
    // Portfolio projects
    "web application development",
    "custom web solutions",
    "professional portfolio",
    "software development projects",
    "web design portfolio",
    
    // Community tools keywords
    "free online tools",
    "facebook video downloader",
    "instagram video downloader",
    "community services",
    "online utilities",
    "web tools",
    "free utilities",
    
    // Technical skills
    "typescript developer",
    "javascript developer",
    "responsive web design",
    "modern web development",
    "api development",
    "database design",
    
    // Service keywords
    "developer for hire",
    "web development services",
    "consultation services",
    "project collaboration",
    "freelance developer",
  ],
  authors: [
    { name: "Full Stack Developer" },
    { name: "Community Services Platform", url: "https://fbdownloader.com" }
  ],
  creator: "Professional Full Stack Developer",
  publisher: "Developer Portfolio & Community Services",
  
  // Robots and indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Open Graph (Facebook, LinkedIn)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fbdownloader.com",
    siteName: "Developer Portfolio & Community Services",
    title: "Full Stack Developer Portfolio & Free Online Tools",
    description: "Professional full stack developer portfolio featuring modern web applications and software projects. Access free online tools: video downloader, image enhancement, PDF tools, and more community services.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Full Stack Developer Portfolio & Community Services",
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@developerportfolio",
    creator: "@developerportfolio",
    title: "Full Stack Developer Portfolio & Free Online Tools",
    description: "Professional developer portfolio showcasing web applications. Free online tools including video downloader, image enhancement, PDF tools, and more.",
    images: ["/twitter-image.png"],
  },
  
  // Additional metadata
  category: "Technology",
  classification: "Developer Portfolio & Online Tools Platform",
  
  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
  },
  
  manifest: "/manifest.json",
  
  // Additional tags
  alternates: {
    canonical: "https://fbdownloader.com",
  },
  
  // Verification (add your verification codes)
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Caveat:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800&family=Dancing+Script:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <StructuredData />
      </head>
      <body>
        <Suspense fallback={null}>
          <ProgressBar />
        </Suspense>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}

