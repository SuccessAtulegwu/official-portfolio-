import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import "./nprogress.css";
import StructuredData from "@/components/StructuredData";
import ProgressBar from "@/components/ProgressBar";
import Chatbot from "@/components/Chatbot";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import BackgroundMusic from "@/components/BackgroundMusic";
import { Toaster } from 'react-hot-toast';

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
  metadataBase: new URL('https://www.more-dev.com'), // Your actual domain
  title: {
    default: "Chisa Atulegwu | Full-Stack Software Engineer | Portfolio & Community Tools",
    template: "%s | Chisa Atulegwu - MoreDev"
  },
  description: "Chisa Atulegwu - Results-driven Full-Stack Software Engineer with 4+ years of experience in developing scalable web and mobile applications. Expert in Angular, React Native, Next.js, Node.js, NestJS, and .NET. Portfolio showcasing innovative projects and free online community tools.",
  keywords: [
    // Personal branding
    "Chisa Atulegwu",
    "MoreDev",
    "Chisa Success Atulegwu",
    
    // Portfolio keywords
    "full stack developer",
    "full-stack software engineer",
    "web developer portfolio",
    "software engineer Nigeria",
    "react developer",
    "angular developer",
    "nextjs developer",
    "nodejs developer",
    "frontend developer",
    "backend developer",
    "full stack engineer",
    
    // Technical skills
    "Angular developer",
    "React Native developer",
    "Expo developer",
    "NestJS developer",
    "Node.js developer",
    ".NET developer",
    "TypeScript developer",
    "JavaScript developer",
    "C# developer",
    "Java developer",
    "mobile app development",
    "desktop app development",
    "Windows services",
    "responsive web design",
    "API development",
    "database design",
    
    // Portfolio projects
    "web application development",
    "mobile application development",
    "custom web solutions",
    "professional portfolio",
    "software development projects",
    "web design portfolio",
    
    // Community tools keywords
    "free online tools",
    "community services",
    "online utilities",
    "web tools",
    "free utilities",
    
    // Services
    "developer for hire",
    "web development services",
    "mobile development services",
    "consultation services",
    "project collaboration",
    "freelance developer",
    "web hosting solutions",
    "domain registration",
  ],
  authors: [
    { name: "Chisa Atulegwu" },
    { name: "MoreDev", url: "https://www.more-dev.com" }
  ],
  creator: "Chisa Atulegwu - Full-Stack Software Engineer",
  publisher: "MoreDev - Developer Portfolio & Community Services",
  
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
    type: "profile",
    locale: "en_US",
    url: "https://www.more-dev.com",
    siteName: "Chisa Atulegwu - MoreDev Portfolio",
    title: "Chisa Atulegwu | Full-Stack Software Engineer & Developer Portfolio",
    description: "Results-driven Full-Stack Software Engineer with 4+ years of experience. Expert in Angular, React Native, Node.js, NestJS, and .NET. Showcasing innovative web and mobile projects, plus free community tools.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chisa Atulegwu - Full-Stack Software Engineer Portfolio",
      },
      {
        url: "/moredevlogowhite.png",
        width: 800,
        height: 600,
        alt: "MoreDev - Chisa Atulegwu Portfolio",
      },
    ],
    // Profile-specific fields
    firstName: "Chisa",
    lastName: "Atulegwu",
    username: "chisaatulegwu",
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@chisaatulegwu", // Update with your actual Twitter handle
    creator: "@chisaatulegwu", // Update with your actual Twitter handle
    title: "Chisa Atulegwu | Full-Stack Software Engineer Portfolio",
    description: "4+ years experience building scalable web & mobile apps. Expert in Angular, React Native, Node.js, NestJS, .NET. Check out my projects & free tools!",
    images: ["/twitter-image.png"],
  },
  
  // Additional metadata
  category: "Technology",
  classification: "Professional Developer Portfolio & Software Engineering Services",
  
  // Icons
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
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
    canonical: "https://www.more-dev.com",
  },
  
  // Verification (add your verification codes)
  verification: {
    google: "pUuukKulfv3wzTvRIz1hVilhExVkys_4jSU8b4p6V5o",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Caveat:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800&family=Dancing+Script:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <StructuredData />
      </head>
      <body>
        {/* Google Analytics */}
        {GA_MEASUREMENT_ID && <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />}
        
        <Suspense fallback={null}>
          <ProgressBar />
        </Suspense>
        {children}
       {/*  <Chatbot /> */}
        <BackgroundMusic />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#141414',
              color: '#fff',
              border: '1px solid #2a2a2a',
            },
            success: {
              iconTheme: {
                primary: '#fbbf24',
                secondary: '#0a0a0a',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}

