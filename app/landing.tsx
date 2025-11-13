"use client";

import MainNavbar from "@/components/MainNavbar";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Instagram, Twitter, Youtube, Mail, X, ExternalLink, Download, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
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

  // Animate skills bars when they enter viewport
  useEffect(() => {
    const bars = Array.from(document.querySelectorAll<HTMLDivElement>('.skill-bar'));
    const titles = Array.from(document.querySelectorAll<HTMLElement>('.skills-title'));
    // Ensure initial width is 0
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
          <div className="max-w-2xl">
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
            <div className="uppercase gap-2">
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
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {/* Left: Experience Cards */}
            <div>
              <h2
                className="scroll-animate skills-title opacity-0 text-5xl sm:text-6xl font-bold mb-4 tracking-wider text-white/30"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800,
                  letterSpacing: '-0.02em'
                }}
              >
                Experience
              </h2>

              <div className="space-y-4">
                {/* Card 1 */}
                <div className="scroll-animate stagger-1 group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl sm:rounded-2xl p-6 transition-all duration-300 hover:border-gray-700">
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
                <div className="scroll-animate stagger-2 group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl sm:rounded-2xl p-6 transition-all duration-300 hover:border-gray-700">
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
                <div className="scroll-animate stagger-3 group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl sm:rounded-2xl p-6 transition-all duration-300 hover:border-gray-700">
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
            <div>
              <h2
                className="scroll-animate skills-title opacity-0 text-5xl sm:text-6xl font-bold mb-4 tracking-wider text-white/30"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800,
                  letterSpacing: '-0.02em'
                }}
              >
                Contact
              </h2>

              <div className="space-y-3">
                <div className="scroll-animate-left stagger-1 flex items-center justify-between bg-gray-900/30 border border-gray-800 rounded-xl p-4">
                  <span className="text-gray-400">Phone</span>
                  <span className="text-white">+039 9484 94894</span>
                </div>
                <div className="scroll-animate-left stagger-2 flex items-center justify-between bg-gray-900/30 border border-gray-800 rounded-xl p-4">
                  <span className="text-gray-400">Email</span>
                  <span className="text-white">luminiu@gmail.com</span>
                </div>
                <div className="scroll-animate-left stagger-3 flex items-center justify-between bg-gray-900/30 border border-gray-800 rounded-xl p-4">
                  <span className="text-gray-400">Website</span>
                  <span className="text-white">www.luminiu.com</span>
                </div>
                <div className="scroll-animate-left stagger-4 flex items-center justify-between bg-gray-900/30 border border-gray-800 rounded-xl p-4">
                  <span className="text-gray-400">Address</span>
                  <span className="text-white text-right">19 Southern Way, UK</span>
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

                  {/* Main image container - matching section background */}
                  <div className="relative w-72 h-80 rounded-2xl overflow-hidden bg-black border-white/20 shadow-2xl">
                    <img
                      src="/moredev.png"
                      alt="Oliver Queen - Web Developer"
                      className="w-full h-full object-cover object-center transition-all duration-300 group-hover:scale-105"
                    />

                    {/* Simple overlay on hover */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                  About Me
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
                  Results-driven Full-Stack Software Engineer with over 4 years of progressive experience in designing, developing, and deploying scalable web and mobile applications. Demonstrated expertise in both frontend and backend technologies, with a solid foundation in building user-focused solutions that deliver measurable business value. Skilled in collaborating with cross-functional teams to deliver high-quality products from concept to launch. Passionate about leveraging modern technologies to solve complex problems and create seamless user experiences.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8 items-center sm:items-start justify-center sm:justify-start">
                {/* Download Resume Button */}
                <div className="scroll-animate-left stagger-4 w-full sm:w-auto">
                  <button
                    onClick={() => handleDownloadCV()}
                    disabled={isDownloading}
                    className="group relative w-full sm:w-auto bg-primary text-white font-bold py-3 px-6 md:py-3 md:px-6 transition-all duration-300 ease-in-out hover:brightness-110 active:brightness-95 hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 text-sm md:text-sm tracking-wide rounded-full overflow-hidden transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
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
                    className="group relative w-full sm:w-auto border border-amber-600 text-amber-400 py-3 px-6 md:py-3 md:px-6 flex items-center justify-center gap-3 text-sm md:text-sm rounded-full transition-all duration-300 hover:scale-105 hover:bg-amber-600 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-amber-500/25 overflow-hidden"
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -top-2 -left-2 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Community service icon */}
                    <svg className="w-4 h-4 md:w-5 md:h-5 relative z-10 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">View Community Service</span>
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

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-gray-900/50 to-black">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-center mb-10 sm:mb-16">
            <div className="relative inline-block">
              <h2 className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 font-medium pb-2">
                PROFESSIONAL SERVICES
              </h2>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl sm:rounded-2xl p-6 hover:border-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gray-800/50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-700/50 transition-colors">
                    <span className="text-2xl">{service.icon}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="relative inline-block">
              <h3 className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 font-medium pb-2">
                TECHNOLOGY EXPERTISE
              </h3>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-center gap-3 sm:gap-4 flex-wrap max-w-5xl mx-auto">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className={`group relative w-14 h-14 sm:w-16 sm:h-16 ${tech.bgColor || 'bg-gray-800/50'} rounded-lg sm:rounded-xl flex items-center justify-center hover:opacity-90 transition-all hover:scale-110 cursor-pointer border border-gray-700/50 hover:border-gray-600`}
                title={tech.name}
              >
                <img
                  src={tech.iconUrl || `https://cdn.simpleicons.org/${tech.slug}/${tech.color}`}
                  alt={tech.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // Fallback to CDN if local image fails
                    if (tech.iconUrl && target.src !== `https://cdn.simpleicons.org/${tech.slug}/${tech.color}`) {
                      target.src = `https://cdn.simpleicons.org/${tech.slug}/${tech.color}`;
                    }
                  }}
                />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-gray-900/90 px-2 py-1 rounded z-10">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="pt-8 sm:pt-10 pb-12 sm:pb-16 lg:pb-20 overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 mb-8 sm:mb-12">
          <div className="flex justify-center">
            <div className="relative inline-block">
              <h2 className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 font-medium">
                PORTFOLIO SHOWCASE
              </h2>
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-full opacity-30 blur-md animate-spin-slow"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
        </div>

        {/* Auto-scrolling carousel */}
        <div className="relative">
          <div className="flex gap-6 animate-scroll hover:pause-animation">
            {/* First set of projects */}
            {projects.map((project, index) => (
              <div
                key={`first-${index}`}
                onClick={() => setSelectedProject(index)}
                className="project-card animate-float group relative flex-shrink-0 w-80 sm:w-96 h-80 rounded-2xl overflow-hidden cursor-pointer border-gradient-animated"
                style={{
                  '--color-start': project.gradient.includes('purple') ? '#9333ea' :
                    project.gradient.includes('blue') ? '#3b82f6' :
                      project.gradient.includes('green') ? '#10b981' :
                        project.gradient.includes('red') ? '#ef4444' :
                          project.gradient.includes('orange') ? '#f97316' :
                            project.gradient.includes('pink') ? '#ec4899' :
                              project.gradient.includes('indigo') ? '#6366f1' :
                                project.gradient.includes('sky') ? '#0ea5e9' :
                                  project.gradient.includes('teal') ? '#14b8a6' :
                                    project.gradient.includes('yellow') ? '#eab308' :
                                      project.gradient.includes('slate') ? '#64748b' : '#a855f7',
                  '--color-middle': project.gradient.includes('pink') ? '#ec4899' :
                    project.gradient.includes('cyan') ? '#06b6d4' :
                      project.gradient.includes('emerald') ? '#10b981' :
                        project.gradient.includes('rose') ? '#f43f5e' :
                          project.gradient.includes('amber') ? '#f59e0b' : '#ec4899',
                  '--color-end': project.gradient.includes('purple') ? '#6366f1' :
                    project.gradient.includes('cyan') ? '#0891b2' :
                      project.gradient.includes('emerald') ? '#059669' :
                        project.gradient.includes('rose') ? '#e11d48' :
                          project.gradient.includes('orange') ? '#ea580c' :
                            project.gradient.includes('pink') ? '#db2777' :
                              project.gradient.includes('blue') ? '#2563eb' :
                                project.gradient.includes('sky') ? '#0284c7' :
                                  project.gradient.includes('teal') ? '#0d9488' :
                                    project.gradient.includes('yellow') ? '#ca8a04' :
                                      project.gradient.includes('gray') ? '#475569' : '#7c3aed',
                  animationDelay: `${index * 0.1}s`
                } as React.CSSProperties}
              >
                {/* Background Image with Ken Burns Effect */}
                <div
                  className="project-image absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundColor: '#1a1a1a'
                  }}
                ></div>

                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-transparent via-white to-transparent transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>

                {/* Bottom Gradient Overlay - Gray like Services */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-900/95 via-gray-800/90 to-gray-700/80 opacity-95 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Content - At Very Bottom */}
                <div className="relative h-full flex flex-col justify-end z-10 px-4 sm:px-5 pb-4 sm:pb-5">
                  <div className="transform group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-base sm:text-lg font-bold text-white drop-shadow-lg leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-white/95 leading-relaxed drop-shadow-md line-clamp-2 ">
                      {project.description}
                    </p>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/30 group-hover:bg-white/30 group-hover:border-white/50 transition-all duration-300 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      {project.tech}
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setSelectedProject(index); }} className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-black font-semibold rounded-full text-xs transition-all hover:scale-105">
                      Read More
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Duplicate set for seamless loop */}
            {projects.map((project, index) => (
              <div
                key={`second-${index}`}
                onClick={() => setSelectedProject(index)}
                className="project-card animate-float group relative flex-shrink-0 w-80 sm:w-96 h-80 rounded-2xl overflow-hidden cursor-pointer border-gradient-animated"
                style={{
                  '--color-start': project.gradient.includes('purple') ? '#9333ea' :
                    project.gradient.includes('blue') ? '#3b82f6' :
                      project.gradient.includes('green') ? '#10b981' :
                        project.gradient.includes('red') ? '#ef4444' :
                          project.gradient.includes('orange') ? '#f97316' :
                            project.gradient.includes('pink') ? '#ec4899' :
                              project.gradient.includes('indigo') ? '#6366f1' :
                                project.gradient.includes('sky') ? '#0ea5e9' :
                                  project.gradient.includes('teal') ? '#14b8a6' :
                                    project.gradient.includes('yellow') ? '#eab308' :
                                      project.gradient.includes('slate') ? '#64748b' : '#a855f7',
                  '--color-middle': project.gradient.includes('pink') ? '#ec4899' :
                    project.gradient.includes('cyan') ? '#06b6d4' :
                      project.gradient.includes('emerald') ? '#10b981' :
                        project.gradient.includes('rose') ? '#f43f5e' :
                          project.gradient.includes('amber') ? '#f59e0b' : '#ec4899',
                  '--color-end': project.gradient.includes('purple') ? '#6366f1' :
                    project.gradient.includes('cyan') ? '#0891b2' :
                      project.gradient.includes('emerald') ? '#059669' :
                        project.gradient.includes('rose') ? '#e11d48' :
                          project.gradient.includes('orange') ? '#ea580c' :
                            project.gradient.includes('pink') ? '#db2777' :
                              project.gradient.includes('blue') ? '#2563eb' :
                                project.gradient.includes('sky') ? '#0284c7' :
                                  project.gradient.includes('teal') ? '#0d9488' :
                                    project.gradient.includes('yellow') ? '#ca8a04' :
                                      project.gradient.includes('gray') ? '#475569' : '#7c3aed',
                  animationDelay: `${index * 0.1}s`
                } as React.CSSProperties}
              >
                {/* Background Image with Ken Burns Effect */}
                <div
                  className="project-image absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundColor: '#1a1a1a'
                  }}
                ></div>

                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-transparent via-white to-transparent transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>

                {/* Bottom Gradient Overlay - Gray like Services */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-900/95 via-gray-800/90 to-gray-700/80 opacity-95 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Content - At Very Bottom */}
                <div className="relative h-full flex flex-col justify-end z-10 px-4 sm:px-5 pb-4 sm:pb-5">
                  <div className="transform group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-base sm:text-lg font-bold text-white drop-shadow-lg leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-white/95 leading-relaxed drop-shadow-md line-clamp-2 mt-1.5">
                      {project.description}
                    </p>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/30 group-hover:bg-white/30 group-hover:border-white/50 transition-all duration-300 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      {project.tech}
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setSelectedProject(index); }} className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-black font-semibold rounded-full text-xs transition-all hover:scale-105">
                      Read More
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-center mb-10 sm:mb-16">
            <div className="relative inline-block">
              <h2 className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 font-medium pb-2">
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="scroll-animate flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 bg-gray-900/50 rounded-xl sm:rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors"
                style={{ transitionDelay: `${Math.min(index, 5) * 0.1}s` }}
              >
                {/* Company Logo */}
                <div className="flex-shrink-0 mx-auto sm:mx-0">
                  <div className="w-16 h-16 sm:w-16 sm:h-16 bg-gray-800 rounded-lg flex items-center justify-center text-2xl sm:text-3xl">
                    <img src={exp.logo} alt={exp.company} className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-1 sm:gap-2">
                    <h3 className="text-lg sm:text-xl font-bold">{exp.position}</h3>
                    <span className="text-gray-400 text-xs sm:text-sm">{exp.period}</span>
                  </div>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-center mb-10 sm:mb-16">
            <div className="relative inline-block">
              <h2 className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 font-medium pb-2">
                CLIENT TESTIMONIALS
              </h2>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-pulse"></div>
            </div>
          </div>

          {/* Mobile: Horizontal Scroll, Desktop: Grid */}
          <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            <div className="flex gap-4 w-max">
              {/* Testimonial 1 */}
              <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 animate-fadeIn w-[85vw] md:w-auto flex-shrink-0 snap-center">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>

                <div className="relative z-10">
                  {/* Quote Icon */}
                  <div className="text-4xl text-orange-500 mb-4 opacity-50">"</div>

                  {/* Testimonial Text */}
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                    Outstanding work! The project was delivered on time and exceeded all expectations. Highly professional and skilled developer.
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                      <img src="/testimonials/client1.jpg" alt="Sarah Johnson" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.textContent = 'SJ'; }} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Sarah Johnson</h4>
                      <p className="text-gray-400 text-sm">CEO, TechStart Inc.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 animate-fadeIn w-[85vw] md:w-auto flex-shrink-0 snap-center" style={{ animationDelay: '0.1s' }}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="text-4xl text-purple-500 mb-4 opacity-50">"</div>

                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                    Incredible attention to detail and excellent communication throughout the project. The final product was exactly what we needed!
                  </p>

                  <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                      <img src="/testimonials/client2.jpg" alt="Michael Chen" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.textContent = 'MC'; }} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Michael Chen</h4>
                      <p className="text-gray-400 text-sm">CTO, Digital Solutions</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-pink-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 animate-fadeIn w-[85vw] md:w-auto flex-shrink-0 snap-center" style={{ animationDelay: '0.2s' }}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="text-4xl text-pink-500 mb-4 opacity-50">"</div>

                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                    A true professional! Not only delivered a high-quality product but also provided valuable insights that improved our workflow.
                  </p>

                  <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                      <img src="/testimonials/client3.jpg" alt="Emily Rodriguez" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.textContent = 'ER'; }} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Emily Rodriguez</h4>
                      <p className="text-gray-400 text-sm">Founder, Creative Agency</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Testimonial 4 */}
              <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 animate-fadeIn w-[85vw] md:w-auto flex-shrink-0 snap-center" style={{ animationDelay: '0.3s' }}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="text-4xl text-blue-500 mb-4 opacity-50">"</div>

                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                    Best developer I've worked with! Fast turnaround, clean code, and excellent problem-solving skills. Highly recommended!
                  </p>

                  <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                      <img src="/testimonials/client4.jpg" alt="David Kim" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.textContent = 'DK'; }} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">David Kim</h4>
                      <p className="text-gray-400 text-sm">Product Manager, InnoTech</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 5 */}
              <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 animate-fadeIn w-[85vw] md:w-auto flex-shrink-0 snap-center" style={{ animationDelay: '0.4s' }}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="text-4xl text-green-500 mb-4 opacity-50">"</div>

                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                    Exceptional technical expertise combined with great communication. Made the entire development process smooth and enjoyable!
                  </p>

                  <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                      <img src="/testimonials/client5.jpg" alt="Jessica Taylor" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.textContent = 'JT'; }} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Jessica Taylor</h4>
                      <p className="text-gray-400 text-sm">VP Engineering, StartupHub</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden md:block">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
              {/* Desktop Testimonial 1 */}
              <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 animate-fadeIn">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="text-4xl text-orange-500 mb-4 opacity-50">"</div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                    Outstanding work! The project was delivered on time and exceeded all expectations. Highly professional and skilled developer.
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                      <img src="/testimonials/client1.jpg" alt="Sarah Johnson" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.textContent = 'SJ'; }} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Sarah Johnson</h4>
                      <p className="text-gray-400 text-sm">CEO, TechStart Inc.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Testimonial 2 */}
              <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="text-4xl text-purple-500 mb-4 opacity-50">"</div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                    Incredible attention to detail and excellent communication throughout the project. The final product was exactly what we needed!
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                      <img src="/testimonials/client2.jpg" alt="Michael Chen" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.textContent = 'MC'; }} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Michael Chen</h4>
                      <p className="text-gray-400 text-sm">CTO, Digital Solutions</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Testimonial 3 */}
              <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-pink-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="text-4xl text-pink-500 mb-4 opacity-50">"</div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                    A true professional! Not only delivered a high-quality product but also provided valuable insights that improved our workflow.
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                      <img src="/testimonials/client3.jpg" alt="Emily Rodriguez" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.textContent = 'ER'; }} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Emily Rodriguez</h4>
                      <p className="text-gray-400 text-sm">Founder, Creative Agency</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {/* Desktop Testimonial 4 */}
              <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="text-4xl text-blue-500 mb-4 opacity-50">"</div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                    Amazing work, @Smilemore! The app runs perfectly, with clean code and great support throughout development. Highly recommended!
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                      <img src="/testimonials/client4.jpg" alt="Precious" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.textContent = 'PA'; }} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Precious Azubuine</h4>
                      <p className="text-gray-400 text-sm">Product Manager, Together Culture</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Testimonial 5 */}
              <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="text-4xl text-green-500 mb-4 opacity-50">"</div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                    Your work is exceptional and well organized , the best I must say and I would definitely recommend you to anyone out there🤗
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                      <img src="/testimonials/client5.jpg" alt="Taiwo Oladamola" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.textContent = 'TOI'; }} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Taiwo Oladamola Ifeoluwa</h4>
                      <p className="text-gray-400 text-sm">UK Based Student</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator (Mobile Only) */}
          <div className="md:hidden flex justify-center gap-2 mt-6">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <div className="w-2 h-2 rounded-full bg-gray-600"></div>
            <div className="w-2 h-2 rounded-full bg-gray-600"></div>
            <div className="w-2 h-2 rounded-full bg-gray-600"></div>
            <div className="w-2 h-2 rounded-full bg-gray-600"></div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12">
        <div className="container mx-auto max-w-4xl">
          {/* Section Title */}
          <div className="flex justify-center mb-10 sm:mb-16">
            <div className="relative inline-block">
              <h2 className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 font-medium pb-2">
                LET'S WORK TOGETHER
              </h2>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-pulse"></div>
            </div>
          </div>

          {/* Professional Introduction */}
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Bring Your Ideas to Life?
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
              I'm passionate about creating exceptional digital experiences. Whether you need a complete web application,
              mobile app development, or technical consultation, I'm here to help transform your vision into reality.
              Let's discuss your project and explore how we can work together.
            </p>
          </div>

          {/* Contact Form */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>

            <form className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div className="group">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Project Inquiry"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Message Field */}
              <div className="group">
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span className="break-all">abmcodehub@gmail.com</span>
                </div>

                <button
                  type="submit"
                  className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-medium rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Send Message
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </div>

              {/* Social Links */}
              <div className="pt-6 border-t border-gray-800">
                <p className="text-sm text-gray-400 mb-4 text-center sm:text-left">Or connect with me on social media:</p>
                <div className="flex justify-center sm:justify-start gap-4">
                  <a
                    href="https://wa.me/1234567890?text=Hi,%20I%20found%20your%20website%20and%20would%20like%20to%20connect!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 bg-gray-800/50 hover:bg-amber-600 border border-amber-600 hover:border-transparent rounded-lg transition-all hover:scale-110"
                    aria-label="WhatsApp"
                    title="Chat on WhatsApp"
                  >
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 bg-gray-800/50 hover:bg-amber-600 border border-amber-600 hover:border-transparent rounded-lg transition-all hover:scale-110"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 bg-gray-800/50 hover:bg-amber-600 border border-amber-600 hover:border-transparent rounded-lg transition-all hover:scale-110"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 bg-gray-800/50 hover:bg-amber-600 border border-amber-600 hover:border-transparent rounded-lg transition-all hover:scale-110"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>
            </form>
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
