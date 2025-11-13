"use client";

import MainNavbar from "@/components/MainNavbar";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Instagram, Twitter, Youtube, Mail, X, ExternalLink, Download, Loader2, Facebook, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";

export default function HomePage() {
  // Lightweight TypeScript code typing effect
  const CodeTyping: React.FC<{ code?: string; codes?: string[]; speed?: number }> = ({ code, codes, speed = 22 }) => {
    const [index, setIndex] = useState(0);
    const [snippetIndex, setSnippetIndex] = useState(0);
    const [caretVisible, setCaretVisible] = useState(true);

    useEffect(() => {
      const active = codes && codes.length > 0 ? codes[snippetIndex] : (code || "");
      const timer = setInterval(() => {
        setIndex((i) => (i < active.length ? i + 1 : i));
      }, speed);
      return () => clearInterval(timer);
    }, [code, codes, snippetIndex, speed]);

    useEffect(() => {
      const blink = setInterval(() => setCaretVisible((v) => !v), 500);
      return () => clearInterval(blink);
    }, []);

    // Rotate snippets when complete; fallback to 10s replay for single code
    useEffect(() => {
      const active = codes && codes.length > 0 ? codes[snippetIndex] : (code || "");
      if (index >= active.length) {
        if (codes && codes.length > 0) {
          const t = setTimeout(() => {
            setSnippetIndex((s) => (s + 1) % codes.length);
            setIndex(0);
          }, 1500);
          return () => clearTimeout(t);
        } else {
          const t = setTimeout(() => setIndex(0), 10000);
          return () => clearTimeout(t);
        }
      }
    }, [index, code, codes, snippetIndex]);

    const active = codes && codes.length > 0 ? codes[snippetIndex] : (code || "");
    const displayed = active.slice(0, index);

    return (
      <div className="relative">
        <div className="whitespace-pre font-mono text-[12px] sm:text-sm leading-relaxed text-white/40 w-full">
          {displayed}
          <span className={`inline-block align-baseline ml-0.5 h-4 w-[2px] bg-amber-400 ${caretVisible ? "opacity-90" : "opacity-10"}`}></span>
        </div>
      </div>
    );
  };

  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  // Animate skills bars when they enter viewport
  useEffect(() => {
    const bars = Array.from(document.querySelectorAll<HTMLDivElement>('.skill-bar'));
    const titles = Array.from(document.querySelectorAll<HTMLElement>('.skills-title'));
    // Ensure initial state
    bars.forEach((bar) => {
      bar.style.width = '0%';
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLDivElement;
            const percent = el.dataset.percent;
            if (percent) {
              // Use rAF to avoid layout thrash during intersection callback
              requestAnimationFrame(() => {
                el.style.width = `${percent}%`;
              });
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );
    bars.forEach((bar) => observer.observe(bar));
    
    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add('skills-title-animate');
            el.classList.remove('opacity-0');
            titleObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );
    titles.forEach((t) => titleObserver.observe(t));

    return () => {
      observer.disconnect();
      titleObserver.disconnect();
    };
  }, []);
  const [isDownloading, setIsDownloading] = useState(false);

  // Handle CV downloads
  const handleDownloadCV = async () => {
    setIsDownloading(true);

    try {
      // Add a small delay to show the loading state
      await new Promise(resolve => setTimeout(resolve, 800));

      // Create a link element and trigger download
      const link = document.createElement('a');
      link.href = '/cv.pdf'; // Path to your CV file in the public folder
      link.download = 'Success_Atulegwu_CV.pdf'; // Custom filename for download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  // Social link mapping and opener
  const socialLinks = {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/",
    x: process.env.NEXT_PUBLIC_X_URL || "https://x.com/",
  };

  const openSocial = (platform: keyof typeof socialLinks) => {
    const url = socialLinks[platform];
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Handle keyboard shortcuts and body scroll lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (fullscreenImage) {
          setFullscreenImage(null);
        } else if (selectedProject !== null) {
          setSelectedProject(null);
        }
      }
    };

    if (selectedProject !== null || fullscreenImage) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject, fullscreenImage]);

  // Scroll animations using Intersection Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all scroll-animate elements
    const animateElements = document.querySelectorAll('[class*="scroll-animate"]');
    animateElements.forEach(el => observer.observe(el));

    return () => {
      animateElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const services = [
    {
      icon: "💻",
      title: "Frontend Development",
      description: "Modern, responsive web interfaces using React, Angular, Next.js, and Native web languages with pixel-perfect designs.",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      icon: "⚙️",
      title: "Backend Development",
      description: "Scalable server-side solutions with .Net, Node.js, NestJS, Express, and RESTful API development.",
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      icon: "📱",
      title: "Mobile App Development",
      description: "Cross-platform mobile apps with React Native, Expo, Ionic and native performance optimization.",
      gradient: "from-green-600 to-emerald-600"
    },
    {
      icon: "🖥️",
      title: "Desktop App Development",
      description: "Native desktop applications for Windows, macOS, and Linux using Electron, .NET, and WPF.",
      gradient: "from-indigo-600 to-blue-600"
    },
    {
      icon: "🔧",
      title: "Windows Services Development",
      description: "Background Windows services, system utilities, and enterprise-level Windows applications.",
      gradient: "from-cyan-600 to-teal-600"
    },
    {
      icon: "🚀",
      title: "Full-Stack Development",
      description: "End-to-end application development from database design to user interface implementation.",
      gradient: "from-orange-600 to-red-600"
    },
    {
      icon: "🔌",
      title: "API Development & Integration",
      description: "Custom RESTful APIs, GraphQL, third-party API integration, and microservices architecture.",
      gradient: "from-pink-600 to-rose-600"
    },
    {
      icon: "💡",
      title: "Project Consultation",
      description: "Expert technical guidance, architecture planning, and strategic technology recommendations.",
      gradient: "from-yellow-600 to-orange-600"
    },
    {
      icon: "📊",
      title: "Software Project Analysis",
      description: "Comprehensive project assessment, requirements analysis, and technical feasibility studies.",
      gradient: "from-teal-600 to-cyan-600"
    },
    {
      icon: "💰",
      title: "Project Costing & Estimation",
      description: "Accurate project budgeting, timeline estimation, and resource allocation planning.",
      gradient: "from-emerald-600 to-green-600"
    },
    {
      icon: "🌐",
      title: "Web Hosting Solutions",
      description: "Reliable hosting setup, server configuration, SSL certificates, and performance optimization.",
      gradient: "from-sky-600 to-blue-600"
    },
    {
      icon: "🔗",
      title: "Domain Registration & Management",
      description: "Domain name registration, DNS configuration, email setup, and domain transfers.",
      gradient: "from-violet-600 to-purple-600"
    },
    {
      icon: "📧",
      title: "Professional Email Service Setup",
      description: "Custom business email setup, G Suite/Microsoft 365 integration, and email security.",
      gradient: "from-amber-600 to-orange-600"
    },
    {
      icon: "🔍",
      title: "Code Review & Optimization",
      description: "Code quality assessment, performance optimization, and best practices implementation.",
      gradient: "from-lime-600 to-green-600"
    },
    {
      icon: "🛠️",
      title: "Website Maintenance & Support",
      description: "Ongoing website updates, bug fixes, security patches, and technical support.",
      gradient: "from-slate-600 to-gray-600"
    }
  ];

  const techStack = [
    {
      name: "C#",
      slug: "csharp",
      color: "ffffff",
      bgColor: "bg-purple-600",
      iconUrl: "/csharp.png" // Uncomment to use local icon
    },
    {
      name: "Angular",
      slug: "angular",
      color: "DD0031",
      // iconUrl: "/icons/angular.png"
    },
    {
      name: "TypeScript",
      slug: "typescript",
      color: "3178C6",
      // iconUrl: "/icons/typescript.png"
    },
    {
      name: "React Native",
      slug: "react",
      color: "61DAFB",
      // iconUrl: "/icons/react.png"
    },
    {
      name: "Expo",
      slug: "expo",
      color: "ffffff",
      bgColor: "bg-gray-900",
      // iconUrl: "/icons/expo.png"
    },
    {
      name: "Node.js",
      slug: "nodedotjs",
      color: "339933",
      // iconUrl: "/icons/nodejs.png"
    },
    {
      name: "NestJS",
      slug: "nestjs",
      color: "E0234E",
      // iconUrl: "/icons/nestjs.png"
    },
    {
      name: "Next.js",
      slug: "nextdotjs",
      color: "ffffff",
      bgColor: "bg-gray-900",
      // iconUrl: "/icons/nextjs.png"
    },
    {
      name: "Visual Studio",
      slug: "visualstudio",
      color: "5C2D91",
      iconUrl: "/vsstudio.png" // Example: using existing local image
    },
    {
      name: "VS Code",
      slug: "visualstudiocode",
      color: "007ACC",
      iconUrl: "/vs.png"
    },
    {
      name: ".NET",
      slug: "dotnet",
      color: "512BD4",
      // iconUrl: "/icons/dotnet.png"
    },
    {
      name: "Postman",
      slug: "postman",
      color: "FF6C37",
      // iconUrl: "/icons/postman.png"
    },
    {
      name: "WordPress",
      slug: "wordpress",
      color: "21759B",
      // iconUrl: "/icons/wordpress.png"
    },
    {
      name: "HTML5",
      slug: "html5",
      color: "E34F26",
      // iconUrl: "/icons/html5.png"
    },
    {
      name: "CSS3",
      slug: "css3",
      color: "1572B6",
      iconUrl: "/css.png",
      // iconUrl: "/icons/css3.png"
    },
    {
      name: "JavaScript",
      slug: "javascript",
      color: "000000",
      bgColor: "bg-yellow-400",
      // iconUrl: "/icons/javascript.png"
    },
  ];

  // Professional skills data for progress bars
  const skills = [
    { label: 'HTML 5', percent: 95 },
    { label: 'JavaScript', percent: 75 },
    { label: 'PHP', percent: 85 },
    { label: 'Illustrator', percent: 70 },
    { label: 'Photoshop', percent: 95 },
    { label: 'Sony Vegas', percent: 90 },
  ];

  const projects = [
    {
      title: "Vital Flow",
      tech: "Node.js • Javascript • Html5 • CSS3",
      image: "/projects/vital.png",
      gradient: "from-purple-600/90 to-pink-600/90",
      description: "Full-stack doctor booking web app.",
      longDescription: "A comprehensive healthcare platform connecting patients with doctors. Features include appointment scheduling, video consultations, prescription management, and real-time chat support.",
      screenshots: [
        "/projects/vital.png",
        "/projects/vital-dashboard.png",
        "/projects/vital-booking.png",
        "/projects/vital-profile.png",
        "/projects/vital-chat.png",
        "/projects/vital-prescriptions.png"
      ],
      liveUrl: "https://vitalflow-demo.com",
      githubUrl: "https://github.com/yourusername/vitalflow"
    },
    {
      title: "Together Culture",
      tech: "Node.js • Javascript • Html5 • CSS3",
      image: "/projects/culture.png",
      gradient: "from-blue-600/90 to-cyan-500/90",
      description: "Community empowerment platform",
      longDescription: "A social platform designed to bring communities together, featuring event management, discussion forums, resource sharing, and community-driven initiatives.",
      screenshots: [
        "/projects/culture.png",
        "/projects/culture-events.png",
        "/projects/culture-forum.png",
        "/projects/culture-members.png",
        "/projects/culture-resources.png",
        "/projects/culture-calendar.png"
      ],
      liveUrl: "https://togetherculture-demo.com",
      githubUrl: "https://github.com/yourusername/culture"
    },
    {
      title: "JoME App",
      tech: "React Native • NestJS • Postgres • Expo",
      image: "/projects/jome.png",
      gradient: "from-green-600/90 to-emerald-500/90",
      description: "Skill-based job marketplace app.",
      longDescription: "Mobile-first job marketplace connecting skilled workers with opportunities. Features real-time job matching, in-app messaging, portfolio showcase, and secure payment processing.",
      screenshots: [
        "/projects/jome.png",
        "/projects/jome-jobs.png",
        "/projects/jome-profile.png",
        "/projects/jome-chat.png",
        "/projects/jome-payments.png",
        "/projects/jome-reviews.png"
      ],
      liveUrl: "https://jomeapp-demo.com",
      githubUrl: "https://github.com/yourusername/jome"
    },
    {
      title: "Video Streaming Service",
      tech: "React Native • AWS • WebRTC",
      image: "/projects/video-streaming.jpg",
      gradient: "from-red-600/90 to-rose-500/90",
      description: "Live video streaming platform with chat",
      longDescription: "Real-time video streaming platform with live chat, user subscriptions, video uploads, and analytics dashboard for content creators.",
      screenshots: [
        "/projects/video-streaming.jpg",
        "/projects/video-player.jpg",
        "/projects/video-dashboard.jpg",
        "/projects/video-chat.jpg",
        "/projects/video-analytics.jpg",
        "/projects/video-upload.jpg"
      ],
      liveUrl: "https://videostream-demo.com",
      githubUrl: "https://github.com/yourusername/video-stream"
    },
    {
      title: "Social Media Dashboard",
      tech: "Next.js • GraphQL • Prisma",
      image: "/projects/social-dashboard.jpg",
      gradient: "from-indigo-600/90 to-purple-500/90",
      description: "Analytics dashboard for social platforms",
      longDescription: "Comprehensive analytics dashboard for managing multiple social media accounts. Track engagement, schedule posts, analyze trends, and generate reports.",
      screenshots: [
        "/projects/social-dashboard.jpg",
        "/projects/social-analytics.jpg",
        "/projects/social-scheduler.jpg",
        "/projects/social-reports.jpg",
        "/projects/social-engagement.jpg",
        "/projects/social-trends.jpg"
      ],
      liveUrl: "https://socialdash-demo.com",
      githubUrl: "https://github.com/yourusername/social-dashboard"
    },
    {
      title: "Weather Forecast App",
      tech: "React • Weather API • Maps",
      image: "/projects/weather.jpg",
      gradient: "from-sky-600/90 to-blue-500/90",
      description: "Real-time weather forecasting application",
      longDescription: "Beautiful weather app with hourly and weekly forecasts, interactive maps, weather alerts, and personalized recommendations.",
      screenshots: [
        "/projects/weather.jpg",
        "/projects/weather-hourly.jpg",
        "/projects/weather-weekly.jpg",
        "/projects/weather-map.jpg",
        "/projects/weather-alerts.jpg",
        "/projects/weather-settings.jpg"
      ],
      liveUrl: "https://weather-demo.com",
      githubUrl: "https://github.com/yourusername/weather"
    },
    {
      title: "Fitness Tracker",
      tech: "React Native • Expo • Firebase",
      image: "/projects/fitness.jpg",
      gradient: "from-orange-600/90 to-amber-500/90",
      description: "Health and workout tracking mobile app",
      longDescription: "Comprehensive fitness tracking app with workout plans, nutrition tracking, progress charts, and social features to connect with workout buddies.",
      screenshots: [
        "/projects/fitness.jpg",
        "/projects/fitness-workouts.jpg",
        "/projects/fitness-nutrition.jpg",
        "/projects/fitness-progress.jpg",
        "/projects/fitness-social.jpg",
        "/projects/fitness-goals.jpg"
      ],
      liveUrl: "https://fitness-demo.com",
      githubUrl: "https://github.com/yourusername/fitness"
    },
    {
      title: "Blog CMS",
      tech: "WordPress • PHP • MySQL",
      image: "/projects/blog-cms.jpg",
      gradient: "from-teal-600/90 to-cyan-500/90",
      description: "Custom content management system",
      longDescription: "Powerful CMS for bloggers and content creators. Features rich text editor, media management, SEO optimization, and multi-author support.",
      screenshots: [
        "/projects/blog-cms.jpg",
        "/projects/blog-editor.jpg",
        "/projects/blog-media.jpg",
        "/projects/blog-seo.jpg",
        "/projects/blog-comments.jpg",
        "/projects/blog-analytics.jpg"
      ],
      liveUrl: "https://blogcms-demo.com",
      githubUrl: "https://github.com/yourusername/blog-cms"
    },
    {
      title: "Crypto Wallet",
      tech: "Web3 • Ethereum • React",
      image: "/projects/crypto-wallet.jpg",
      gradient: "from-yellow-600/90 to-orange-500/90",
      description: "Decentralized cryptocurrency wallet",
      longDescription: "Secure Web3 wallet for managing crypto assets. Features include token swaps, NFT gallery, transaction history, and hardware wallet integration.",
      screenshots: [
        "/projects/crypto-wallet.jpg",
        "/projects/crypto-portfolio.jpg",
        "/projects/crypto-swap.jpg",
        "/projects/crypto-nft.jpg",
        "/projects/crypto-history.jpg",
        "/projects/crypto-security.jpg"
      ],
      liveUrl: "https://cryptowallet-demo.com",
      githubUrl: "https://github.com/yourusername/crypto-wallet"
    },
    {
      title: "Music Player",
      tech: "JavaScript • Web Audio API",
      image: "/projects/music-player.jpg",
      gradient: "from-pink-600/90 to-rose-500/90",
      description: "Modern audio streaming player",
      longDescription: "Feature-rich music player with playlist management, lyrics display, equalizer, and social sharing capabilities.",
      screenshots: [
        "/projects/music-player.jpg",
        "/projects/music-playlist.jpg",
        "/projects/music-lyrics.jpg",
        "/projects/music-equalizer.jpg",
        "/projects/music-library.jpg",
        "/projects/music-social.jpg"
      ],
      liveUrl: "https://musicplayer-demo.com",
      githubUrl: "https://github.com/yourusername/music-player"
    },
    {
      title: "Code Editor",
      tech: "Monaco • TypeScript • Electron",
      image: "/projects/code-editor.jpg",
      gradient: "from-slate-600/90 to-gray-500/90",
      description: "Lightweight code editor with syntax highlighting",
      longDescription: "Fast and efficient code editor with intelligent code completion, Git integration, extensions marketplace, and customizable themes.",
      screenshots: [
        "/projects/code-editor.jpg",
        "/projects/code-intellisense.jpg",
        "/projects/code-git.jpg",
        "/projects/code-extensions.jpg",
        "/projects/code-themes.jpg",
        "/projects/code-terminal.jpg"
      ],
      liveUrl: "https://codeeditor-demo.com",
      githubUrl: "https://github.com/yourusername/code-editor"
    },
    {
      title: "Recipe Finder",
      tech: "Next.js • API • Tailwind",
      image: "/projects/recipe-finder.jpg",
      gradient: "from-red-500/90 to-orange-500/90",
      description: "Recipe search and meal planning app",
      longDescription: "Discover and save recipes with advanced search filters, meal planning calendar, shopping list generator, and nutritional information.",
      screenshots: [
        "/projects/recipe-finder.jpg",
        "/projects/recipe-search.jpg",
        "/projects/recipe-detail.jpg",
        "/projects/recipe-planner.jpg",
        "/projects/recipe-shopping.jpg",
        "/projects/recipe-favorites.jpg"
      ],
      liveUrl: "https://recipefinder-demo.com",
      githubUrl: "https://github.com/yourusername/recipe-finder"
    },
  ];

  const experiences = [
    {
      company: "Amadeo Systems",
      logo: "/amadeo.png",
      position: "Software Engineer at Amadeo",
      period: "Jan 2020 - Present",
      description: "As a Software Engineer at Amadeo, I played a pivotal role in developing innovative solutions. Collaborating with a dynamic team of engineers, I contributed to the enhancement of the access control system, optimizing user experiences for millions of users worldwide."
    },
    {
      company: "Bems",
      logo: "/bems.png",
      position: "Lead Software Engineer at Bems",
      period: "Aug 2019 - Dec 2020",
      description: "During my tenure at Bems, I held the role of Software Engineer, where I, as an IT student played a key role in shaping the architecture of mission-critical software projects. Responsible for designing scalable and efficient systems, I provided technical leadership to a cross-functional team."
    },
  ];

    const styles = {
    tag: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: '600',
      background: 'linear-gradient(135deg, #ffffff 0%, #e5e5e5 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textShadow: '0 4px 8px rgba(0,0,0,0.2)',
      paddingBottom: '20px'
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <MainNavbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background - Using page background color (black) */}
        <div className="absolute inset-0 bg-black">
          {/* Subtle geometric patterns for visual interest */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-white rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-white rounded-full blur-xl"></div>
          </div>
        </div>

        {/* Content Container - Left Aligned */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 items-center">
            <div className="max-w-2xl flex flex-col justify-center min-h-[50vh] lg:min-h-0">
              {/* Greeting - Elegant script font */}
              <div className="mb-6">
                <h2 className="text-4xl sm:text-5xl md:text-6xl text-white" style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontWeight: '600',
                  letterSpacing: '0.02em',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                  Hello!
                </h2>
              </div>

              {/* Main heading - Modern sans-serif */}
              <div className="mb-1">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight" style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: '800',
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, #ffffff 0%, #e5e5e5 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  paddingBottom: '20px'
                }}>
                  I'm Chisa Atulegwu
                </h1>
              </div>
              <div className="uppercase">
                <span className="me-2" style={styles.tag}>#Mobile</span>
                <span className="me-2" style={styles.tag}>#Web</span>
                <span className="me-2" style={styles.tag}>#desktop</span>
                <span style={styles.tag}>#developer</span>
              </div>

              {/* Subtitle - Clean modern font */}
              <div className="mb-8" style={{ display: 'none' }}>
                <p className="text-2xl sm:text-3xl md:text-4xl text-white/95" style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: '400',
                  letterSpacing: '0.03em',
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                  Full-Stack Software Engineer
                </p>
              </div>
            </div>

            {/* Right-side visual: TypeScript code typing effect */}
            <div className="block mt-0 lg:mt-0">
              <div className="rounded-2xl bg-transparent">
                <div className="px-4 py-4 max-h-[40vh] sm:max-h-[50vh] lg:max-h-none overflow-y-auto overflow-x-auto">
                  <CodeTyping
                    codes={[
                      `import React from 'react';\nimport { View, Text, StyleSheet } from 'react-native';\n\nexport default function App() {\n  return (\n    <View style={styles.container}>\n      <Text>Hello React Native</Text>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }\n});`,
                      `public record User(string Id, string Name, string Email);\n\npublic async Task<User> GetUserAsync(string id) {\n  var res = await http.GetAsync($"/api/users/{id}");\n  res.EnsureSuccessStatusCode();\n  return await res.Content.ReadFromJsonAsync<User>();\n}`,
                      `<!-- HTML -->\n<section class="hero">\n  <h1>Hello HTML</h1>\n  <button class="btn">Start</button>\n</section>`,
                      `/* CSS */\n.hero {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, #000, #111);\n  color: #fff;\n}\n.btn {\n  padding: .5rem 1rem;\n  border-radius: .5rem;\n  background: #f59e0b;\n}`
                    ]}
                    speed={22}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    



      {/* About Me Section */}
      <section id="about" className="relative pt-4 sm:pt-6 lg:pt-8 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-12 overflow-hidden">
        {/* Custom CSS for scroll animations */}
        <style jsx>{`
          .scroll-animate {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          
          .scroll-animate.animate-in {
            opacity: 1;
            transform: translateY(0);
          }
          
          .scroll-animate-left {
            opacity: 0;
            transform: translateX(-50px);
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          
          .scroll-animate-left.animate-in {
            opacity: 1;
            transform: translateX(0);
          }
          
          .scroll-animate-right {
            opacity: 0;
            transform: translateX(50px);
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          
          .scroll-animate-right.animate-in {
            opacity: 1;
            transform: translateX(0);
          }
          
          .scroll-animate-scale {
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          
          .scroll-animate-scale.animate-in {
            opacity: 1;
            transform: scale(1);
          }
          
          .stagger-1 { transition-delay: 0.1s; }
          .stagger-2 { transition-delay: 0.2s; }
          .stagger-3 { transition-delay: 0.3s; }
          .stagger-4 { transition-delay: 0.4s; }
          .stagger-5 { transition-delay: 0.5s; }
          .stagger-6 { transition-delay: 0.6s; }
        `}</style>



        {/* Background - Matching hero section */}
        <div className="absolute inset-0 bg-black">
          {/* Subtle geometric patterns for visual interest */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-white rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-white rounded-full blur-xl"></div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-2 items-start">

            {/* Profile Image Section */}
            <div className="flex flex-col items-center lg:items-start mb-8 lg:mb-0">
              <div className="scroll-animate-scale stagger-1 relative lg:-ml-6">
                {/* Globe Background behind image */}
                <div className="absolute inset-0 flex items-center justify-center z-0">
                  <div className="w-[30rem] h-[30rem] lg:w-[36rem] lg:h-[36rem] rounded-full border-2 border-white/50 animate-spin opacity-40" style={{ animationDuration: '20s' }}>
                    <div className="absolute inset-4 rounded-full border border-white/40 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                      <div className="absolute inset-4 rounded-full border border-white/30 animate-spin" style={{ animationDuration: '25s' }}>
                        {/* Globe grid lines */}
                        <div className="absolute inset-0 rounded-full">
                          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/35 transform -translate-y-1/2"></div>
                          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/35 transform -translate-x-1/2"></div>
                          <div className="absolute top-1/4 left-0 right-0 h-px bg-white/25 transform -translate-y-1/2"></div>
                          <div className="absolute top-3/4 left-0 right-0 h-px bg-white/25 transform -translate-y-1/2"></div>
                          <div className="absolute top-1/8 left-0 right-0 h-px bg-white/15 transform -translate-y-1/2"></div>
                          <div className="absolute top-7/8 left-0 right-0 h-px bg-white/15 transform -translate-y-1/2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simple Clean Image Frame */}
                <div className="relative group z-10">
                  {/* Simple shadow */}
                  <div className="absolute -inset-2 bg-white/10 rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

                  {/* Profile card container - redesigned to match reference */}
                  <div className="relative w-72 rounded-2xl overflow-hidden bg-black border border-white/20 shadow-2xl min-h-[26rem]">
                    {/* Top: Image */}
                    <div className="relative h-64">
                      <img
                        src="/moredev.png"
                        alt="Chisa Atulegwu - Developer"
                        className="w-full h-full object-cover object-center transition-all duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Middle: Name and Title */}
                    <div className="px-4 py-3 text-center border-t border-white/10">
                      <h3 className="text-white font-bold text-lg tracking-tight">Chisa Success</h3>
                      <p className="text-white/60 text-sm">Full-Stack Software Engineer</p>
                    </div>

                    {/* Bottom: Social Icons Bar */}
                    <div className="px-4 py-3 border-t border-white/10">
                      <div className="flex items-center justify-center gap-1">
                        <a
                          href={socialLinks.facebook}
                          onClick={(e) => { e.preventDefault(); openSocial('facebook'); }}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Facebook"
                          className="w-8 h-8 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center hover:bg-neutral-800 transition-colors"
                        >
                          <Facebook className="w-4 h-4 text-white" />
                        </a>
                        <a
                          href={socialLinks.instagram}
                          onClick={(e) => { e.preventDefault(); openSocial('instagram'); }}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Instagram"
                          className="w-8 h-8 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center hover:bg-neutral-800 transition-colors"
                        >
                          <Instagram className="w-4 h-4 text-white" />
                        </a>
                        <a
                          href={socialLinks.linkedin}
                          onClick={(e) => { e.preventDefault(); openSocial('linkedin'); }}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                          className="w-8 h-8 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center hover:bg-neutral-800 transition-colors"
                        >
                          <Linkedin className="w-4 h-4 text-white" />
                        </a>
                        <a
                          href={socialLinks.x}
                          onClick={(e) => { e.preventDefault(); openSocial('x'); }}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="X"
                          className="w-8 h-8 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center hover:bg-neutral-800 transition-colors"
                        >
                          <X className="w-4 h-4 text-white" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>

            {/* About Me Content */}
            <div className="text-white text-center lg:text-left">
              {/* Section Title */}
              <div className="mb-3">
                <h2 className="scroll-animate text-5xl sm:text-6xl font-bold mb-2 tracking-wider text-white/30" style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: '800',
                  letterSpacing: '-0.02em'
                }}>
                 Behind the Code
                </h2>
              </div>

              {/* Description */}
              <div className="mb-8">
                <p className="scroll-animate-left stagger-1 text-white/90 text-lg leading-relaxed" style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: '400',
                  lineHeight: '1.7',
                  letterSpacing: '0.01em'
                }}>
                 Results-driven Full-Stack Software Engineer with over 4 years of progressive experience in developing and deploying scalable web and mobile applications. Demonstrated expertise in both frontend and backend technologies.
                 {/*  I'm Chisa Success Atulegwu, a results-driven Full-Stack Software Engineer with over 4 years of progressive experience in developing and deploying scalable web and mobile applications. Demonstrated expertise in both frontend and backend technologies, with a solid foundation in building user-focused solutions that deliver measurable business value. Skilled in collaborating with cross-functional teams to deliver high-quality products from concept to launch. Passionate about leveraging modern technologies to solve complex problems and create seamless user experiences. */}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8 items-center sm:items-start justify-center sm:justify-start">
                {/* Download Resume Button */}
                <div className="scroll-animate-left stagger-4 w-full sm:w-auto">
                  <button
                    onClick={() => handleDownloadCV()}
                    disabled={isDownloading}
                    className="group relative w-full sm:w-auto bg-primary text-black font-medium py-3 px-0 md:py-3 md:px-3 transition-all duration-300 ease-in-out hover:brightness-110 active:brightness-95 hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 text-md md:text-md tracking-wide rounded-md overflow-hidden transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {/* Content */}
                    <div className="relative z-10 flex items-center gap-3">
                      {isDownloading ? (
                        <>
                          <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                          <span className="transition-all duration-300">Downloading...</span>
                        </>
                      ) : (
                        <>
                          {/* Modern download icon */}
                          <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="transition-all duration-300 group-hover:tracking-wider">Download Resume</span>
                        </>
                      )}
                    </div>
                    {/* Subtle shine effect */}
                    <div className="absolute inset-0 -top-2 -left-2 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </button>
                </div>

                {/* View Community Service Button - Simple Style */}
                <div className="scroll-animate-right stagger-5 w-full sm:w-auto">
                  <button
                    onClick={() => window.location.href = '/community'}
                    className="group relative w-full sm:w-auto text-white py-3 px-6 md:py-3 md:px-6 flex items-center justify-center gap-3 text-sm md:text-sm rounded-md border border-primary transition-colors duration-200 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    {/* Community service icon */}
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>View Community Service</span>
                  </button>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4 flex flex-col items-center lg:items-start">

                {/* <div className="scroll-animate-right stagger-3 flex flex-col lg:flex-row lg:items-center space-y-1 lg:space-y-0">
                  <span className="font-bold text-base lg:w-40 lg:whitespace-nowrap" style={{ 
                    fontFamily: "'Montserrat', sans-serif",
                    background: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #8b5cf6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>NATIONALITY:</span>
                  <span className="text-white/90 text-base" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: '500' }}>Nigeria</span>
                </div> */}

                {/*  <div className="scroll-animate-right stagger-4 flex flex-col lg:flex-row lg:items-center space-y-1 lg:space-y-0">
                  <span className="font-bold text-base lg:w-40 lg:whitespace-nowrap" style={{ 
                    fontFamily: "'Montserrat', sans-serif",
                    background: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #8b5cf6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>PHONE:</span>
                  <span className="text-white/90 text-base" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: '500' }}>(+234) - 8135262573</span>
                </div> */}

                {/* <div className="scroll-animate-right stagger-5 flex flex-col lg:flex-row lg:items-center space-y-1 lg:space-y-0">
                  <span className="font-bold text-base lg:w-40 lg:whitespace-nowrap" style={{ 
                    fontFamily: "'Montserrat', sans-serif",
                    background: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #8b5cf6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>E-MAIL:</span>
                  <span className="text-white/90 text-base" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: '500' }}>chisaatulegwu@gmail.com</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Skills Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-center mb-8 sm:mb-12">
            <h2
              className="scroll-animate skills-title opacity-0 text-5xl sm:text-6xl font-bold mb-2 tracking-wider text-white/30"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 800,
                letterSpacing: '-0.02em'
              }}
            >
              Professional Skills
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {skills.map((skill) => (
              <div key={skill.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-300">
                  <span className="uppercase tracking-wider">{skill.label}</span>
                  <span className="text-gray-400">{skill.percent}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full relative overflow-hidden">
                  <div
                    className="skill-bar h-1.5 rounded-full transition-[width] duration-700 bg-gradient-to-r from-primary to-black"
                    data-percent={skill.percent}
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* Experience Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-0">
            {/* Left: Experience Cards */}
            <div>
              <h2
                className="scroll-animate skills-title opacity-0 text-5xl sm:text-6xl font-bold mb-5 tracking-wider text-white/30"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800,
                  letterSpacing: '-0.02em'
                }}
              >
                Experience
              </h2>

              <div className="space-y-4 border overflow-hidden rounded-sm border-gray-800 transition-all duration-300 hover:border-gray-700">
                {/* Card 1 */}
                <div className="group relativ backdrop-blur-sm p-6">
                  <div className="absolute top-6 right-6">
                    <span className="inline-flex items-center rounded-full bg-amber-500/10 border border-amber-600 text-amber-400 text-xs px-3 py-1">2023 — Present</span>
                  </div>
                  <h3 className="text-white text-xl font-semibold">UI/UX Designer</h3>
                  <p className="text-gray-400 text-sm">At Wegems</p>
                  <p className="text-gray-300 mt-3 text-sm">
                    Designing intuitive interfaces, improving user flows, conducting usability tests, and collaborating with teams to create engaging digital experiences.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="group relative backdrop-blur-sm p-6">
                  <div className="absolute top-6 right-6">
                    <span className="inline-flex items-center rounded-full bg-amber-500/10 border border-amber-600 text-amber-400 text-xs px-3 py-1">2022 — 2023</span>
                  </div>
                  <h3 className="text-white text-xl font-semibold">Product Designer</h3>
                  <p className="text-gray-400 text-sm">At LuminUI</p>
                  <p className="text-gray-300 mt-3 text-sm">
                    Crafting interactive designs, prototyping innovative features, analyzing user behavior, and ensuring products meet user needs and business goals.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="group relative backdrop-blur-sm p-6">
                  <div className="absolute top-6 right-6">
                    <span className="inline-flex items-center rounded-full bg-amber-500/10 border border-amber-600 text-amber-400 text-xs px-3 py-1">2020 — 2022</span>
                  </div>
                  <h3 className="text-white text-xl font-semibold">Senior UX Designer</h3>
                  <p className="text-gray-400 text-sm">At Urgency</p>
                  <p className="text-gray-300 mt-3 text-sm">
                    Leading UX projects, conducting user research and testing, and optimizing products for usability, engagement, and overall satisfaction.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Contact Panel */}
            <div className="md:mt-28">
              <h2
                className="scroll-animate skills-title opacity-0 text-sm sm:text-3xl font-bold mb-4 tracking-wider text-white/30 md:ms-5"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  letterSpacing: '-0.02em'
                }}
              >
                Contact
              </h2>

              <div className="space-y-3">
                <div className="scroll-animate-left stagger-1 flex items-center justify-between bg-gray-900/30 border border-gray-800  p-4">
                  <span className="text-gray-400">Phone</span>
                  <span className="text-white">+039 9484 94894</span>
                </div>
                <div className="scroll-animate-left stagger-2 flex items-center justify-between bg-gray-900/30 border border-gray-800 p-4">
                  <span className="text-gray-400">Email</span>
                  <span className="text-white">luminiu@gmail.com</span>
                </div>
                <div className="scroll-animate-left stagger-3 flex items-center justify-between bg-gray-900/30 border border-gray-800  p-4">
                  <span className="text-gray-400">Website</span>
                  <span className="text-white">www.luminiu.com</span>
                </div>
                <div className="scroll-animate-left stagger-4 flex items-center justify-between bg-gray-900/30 border border-gray-800  p-4">
                  <span className="text-gray-400">Address</span>
                  <span className="text-white text-right">19 Southern Way, UK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Services Section */}
      <section id="services" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          {/* Header Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Label + CTA */}
            <div className="scroll-animate-left">
              <div className="text-amber-400 text-sm font-medium flex items-center gap-2">
                <span className="text-lg">✦</span>
                <span>My Services</span>
              </div>
              <div className="mt-4">
                <Link href="/contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-black font-semibold hover:bg-amber-400 transition-colors">
                  Start a Project Now
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Heading + Description */}
            <div className="lg:col-span-2">
              <h2 className="scroll-animate skills-title opacity-0 text-5xl sm:text-6xl font-bold mb-5 tracking-wider text-white/30" style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: '-0.02em' }}>
                Experience the Impact of User-Centered Design
              </h2>
              <p className="scroll-animate-left text-white/70 text-base sm:text-lg max-w-2xl">
                Experience the impact of user-centered design. I craft intuitive and engaging digital solutions that put users first and elevate brands.
              </p>
            </div>
          </div>

          {/* Services Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* UI/UX Design */}
            <div className="scroll-animate stagger-1 group relative bg-gray-900/50 border border-gray-800 rounded-2xl p-6 transition-all hover:border-amber-500/50 overflow-hidden">
              {/* Hover gradient overlay */}
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-500 to-black opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-xs text-white/40 mb-1">Designing Seamless Journeys</div>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl sm:text-3xl font-bold">UI/UX Design</h3>
                  <div className="shrink-0">
                    <div className="w-9 h-9 rounded-full bg-gray-800/80 flex items-center justify-center text-white/80 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Web Development */}
            <div className="scroll-animate stagger-2 group relative bg-gray-900/50 border border-gray-800 rounded-2xl p-6 transition-all hover:border-amber-500/50 overflow-hidden">
              {/* Hover gradient overlay */}
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-500 to-black opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-xs text-white/40 mb-1">Building Functional Solutions</div>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl sm:text-3xl font-bold">Web Development</h3>
                  <div className="w-9 h-9 rounded-full bg-gray-800/80 flex items-center justify-center text-white/80 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Branding with image */}
            <div className="scroll-animate stagger-3 group relative bg-gray-900/50 border border-gray-800 rounded-2xl p-6 transition-all hover:border-amber-500/50 overflow-hidden">
              {/* Hover gradient overlay */}
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-500 to-black opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-xs text-white/40 mb-1">Shaping Memorable Identities</div>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl sm:text-3xl font-bold">Branding</h3>
                  <div className="w-9 h-9 rounded-full bg-amber-500 text-black flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3 text-xs text-white/70 flex-wrap">
                  <span className="inline-flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-amber-500"></span>User Research & Analysis</span>
                  <span className="inline-flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-amber-500"></span>Wireframing & Prototyping</span>
                  <span className="inline-flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-amber-500"></span>Usability Testing & Optimization</span>
                </div>
                <div className="absolute right-4 bottom-4 hidden sm:block">
                  <Image src="/vsstudio.png" alt="Branding mockup" width={160} height={110} className="rounded-lg opacity-90" />
                </div>
              </div>
            </div>

            {/* Animation Design */}
            <div className="scroll-animate stagger-4 group relative bg-gray-900/50 border border-gray-800 rounded-2xl p-6 transition-all hover:border-amber-500/50 overflow-hidden">
              {/* Hover gradient overlay */}
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-500 to-black opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-xs text-white/40 mb-1">Bringing Ideas Alive</div>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl sm:text-3xl font-bold">Animation Design</h3>
                  <div className="w-9 h-9 rounded-full bg-gray-800/80 flex items-center justify-center text-white/80 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Product Design */}
            <div className="scroll-animate stagger-5 group relative bg-gray-900/50 border border-gray-800 rounded-2xl p-6 transition-all hover:border-amber-500/50 overflow-hidden">
              {/* Hover gradient overlay */}
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-500 to-black opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-xs text-white/40 mb-1">Creating User-Centered Products</div>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl sm:text-3xl font-bold">Product Design</h3>
                  <div className="w-9 h-9 rounded-full bg-gray-800/80 flex items-center justify-center text-white/80 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm mt-12 sm:mt-16 lg:mt-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <Link href="/" className="inline-block group">
                <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform inline-block">
                  {"<moredev/>"}
                </span>
              </Link>
              <p className="text-sm text-gray-400 leading-relaxed">
                Full-Stack Software Engineer passionate about building innovative web solutions and sharing knowledge with the community.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-amber-400 hover:text-white text-sm transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/#projects" className="text-amber-400 hover:text-white text-sm transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/#experience" className="text-amber-400 hover:text-white text-sm transition-colors">
                    Experience
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="text-amber-400 hover:text-white text-sm transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/community" className="text-amber-400 hover:text-white text-sm transition-colors">
                    Community Tools
                  </Link>
                </li>
                <li>
                  <Link href="/donation" className="text-amber-400 hover:text-white text-sm transition-colors">
                    Support Us
                  </Link>
                </li>
                <li>
                  <Link href="/schedule" className="text-amber-400 hover:text-white text-sm transition-colors">
                    Schedule Meeting
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-amber-400 hover:text-white text-sm transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Connect</h3>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2.5 bg-gray-800/50 hover:bg-amber-600 border border-amber-600 hover:border-transparent rounded-lg transition-all hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2.5 bg-gray-800/50 hover:bg-amber-600 border border-amber-600 hover:border-transparent rounded-lg transition-all hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2.5 bg-gray-800/50 hover:bg-amber-600 border border-amber-600 hover:border-transparent rounded-lg transition-all hover:scale-110"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              </div>
              <div className="pt-2">
                <a
                  href="mailto:chisaatulegwu@gmail.com"
                  className="flex items-center gap-2 text-amber-400 hover:text-white text-sm transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="break-all">chisaatulegwu@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400 text-center sm:text-left">
                © {new Date().getFullYear()} <span className="text-white font-medium">moredev</span>. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm text-amber-400">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      {selectedProject !== null && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 overflow-y-auto modal-backdrop-enter"
          onClick={() => setSelectedProject(null)}
        >
          <div className="min-h-screen px-4 py-8 flex items-center justify-center">
            <div
              className="relative bg-gray-900 rounded-3xl max-w-7xl w-full border border-gray-800 shadow-2xl modal-content-enter"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-gray-800/80 hover:bg-gray-700 rounded-full transition-colors group"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-gray-400 group-hover:text-white" />
              </button>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 lg:p-12">
                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                    {projects[selectedProject].title}
                  </h2>
                  <p className="text-lg text-gray-400 mb-4">
                    {projects[selectedProject].longDescription}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gray-800/50 text-white border border-gray-700">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      {projects[selectedProject].tech}
                    </div>
                    <div className="flex gap-3">
                      {projects[selectedProject].liveUrl && (
                        <a
                          href={projects[selectedProject].liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-black rounded-full text-sm font-medium transition-all hover:scale-105"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                      {projects[selectedProject].githubUrl && (
                        <a
                          href={projects[selectedProject].githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full text-sm font-medium transition-all hover:scale-105 border border-gray-700"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Screenshots Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projects[selectedProject].screenshots.map((screenshot, idx) => (
                    <div
                      key={idx}
                      onClick={() => setFullscreenImage(screenshot)}
                      className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer border border-gray-800 hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                    >
                      <img
                        src={screenshot}
                        alt={`${projects[selectedProject].title} screenshot ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = projects[selectedProject].image;
                        }}
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                            <ExternalLink className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Image Viewer */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-lg z-[60] flex items-center justify-center p-4 modal-backdrop-enter"
          onClick={() => setFullscreenImage(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all hover:scale-110 group"
            aria-label="Close fullscreen"
          >
            <X className="w-8 h-8 text-white" />
          </button>

          {/* Image */}
          <div className="relative max-w-7xl max-h-full fullscreen-enter" onClick={(e) => e.stopPropagation()}>
            <img
              src={fullscreenImage}
              alt="Fullscreen view"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = projects[selectedProject || 0].image;
              }}
            />
          </div>

          {/* Hint Text */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm">
            Click anywhere to close
          </div>
        </div>
      )}
    </main>
  );

}
