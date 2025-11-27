"use client";

import MainNavbar from "@/components/MainNavbar";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Instagram, Twitter, Youtube, Mail, X, ExternalLink, Download, Loader2, Facebook, Linkedin, Quote, Plus, Minus, HelpCircle } from "lucide-react";
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
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
      id: 1,
      title: "Frontend Development",
      description: "Modern, responsive web interfaces using React, Angular, Next.js, and Native web languages with pixel-perfect designs.",
    },
    {
      id: 2,
      title: "Backend Development",
      description: "Scalable server-side solutions with .Net, Node.js, NestJS, Express, and RESTful API development.",
    },
    {
      id: 3,
      title: "Mobile App Development",
      description: "Cross-platform mobile apps with React Native, Expo, Ionic and native performance optimization.",
    },
    {
      id: 4,
      title: "Desktop App Development",
      description: "Native desktop applications for Windows, macOS, and Linux using Electron, .NET, and WPF.",
    },
    {
      id: 5,
      title: "Windows Services Development",
      description: "Background Windows services, system utilities, and enterprise-level Windows applications.",
    },
    {
      id: 6,
      title: "Project Consultation",
      description: "Expert technical guidance, architecture planning, and strategic technology recommendations.",
    },
    {
      id: 7,
      title: "Web Hosting Solutions",
      description: "Reliable hosting setup, server configuration, SSL certificates, and performance optimization.",
    },
    {
      id: 8,
      title: "Domain Registration & Management",
      description: "Domain name registration, DNS configuration, email setup, and domain transfers.",
    },
    {
      id: 9,
      title: "Professional Email Service Setup",
      description: "Custom business email setup, G Suite/Microsoft 365 integration, and email security.",
    }
  ];

  const faqs = [
    {
      q: "What services do you offer?",
      a: "I build robust, intuitive software that enhances user experience and drives product success"
    },
    {
      q: "How fast will I receive my work?",
      a: "Small sites typically ship within 1–2 weeks. Larger projects range from 3–6 weeks depending on scope and complexity."
    },
    {
      q: "What's your refund policy?",
      a: "If the delivered work does not match the agreed scope, I offer revisions. Refunds are handled case‑by‑case based on milestones."
    },
    {
      q: "What if I have a single project?",
      a: "Single, one‑off projects are welcome. I can scope, design, and ship an MVP or a complete site."
    },
    {
      q: "Do you offer ongoing support?",
      a: "Yes. I provide maintenance plans covering updates, performance tuning, and security patching."
    },
    {
      q: "Are there any hidden costs?",
      a: "No. All costs are outlined upfront, including optional hosting, domain, and add‑ons."
    }
  ];

  // Professional skills data for progress bars
  const skills = [
    { label: 'HTML 5', percent: 95 },
    { label: 'JavaScript', percent: 85 },
    { label: 'C#', percent: 95 },
    { label: 'TypeScript', percent: 95 },
    { label: 'CSS', percent: 95 },
    { label: 'Java', percent: 75 },
  ];

  const frameworks = [
    { label: 'Angular', percent: 95 },
    { label: 'React Native & Expo', percent: 95 },
    { label: 'Next.js', percent: 65 },
    { label: 'Nest.js', percent: 95 },
    { label: 'Node.js', percent: 95 },
    { label: '.Net', percent: 95 },
  ];
  const tools = [
    { label: 'Visual Studio', percent: 95 },
    { label: 'Vs Code', percent: 95 },
    { label: 'Postman', percent: 95 },
    { label: 'CursorAi', percent: 95 },
    { label: 'TraeAi', percent: 95 },
    { label: 'Wordpress', percent: 100 },
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
              Technical Proficiencies
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

      {/* Framework Skills Section */}
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
              Framework Proficiencies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {frameworks.map((skill) => (
              <div key={skill.label} className="group flex items-center md:justify-center gap-3 p-6 rounded-xl hover:bg-white/10  hover:border-primary/50 transition-all duration-300">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-4 border-white/10 flex items-center justify-center">
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent">
                      {skill.percent}
                    </span>
                  </div>
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" style={{ animationDuration: '3s' }}></div>
                </div>
                <div className="md:flex-none md:text-center">
                  <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-primary transition-colors">{skill.label}</h3>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Mastery Level</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Skills Section */}
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
              Tools Proficiencies
            </h2>
          </div>

          <div className="space-y-1">
            {tools.map((skill, index) => (
              <div
                key={skill.label}
                className="group flex items-center justify-between p-4 hover:bg-white/5 rounded-lg transition-all duration-300 border-l-2 border-transparent hover:border-primary"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-base text-gray-300 group-hover:text-white transition-colors uppercase tracking-wide">
                  {skill.label}
                </span>
                <div className="flex items-center gap-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-8 h-1 rounded-full transition-all duration-500 ${i < Math.ceil(skill.percent / 20)
                          ? 'bg-gradient-to-r from-primary to-amber-500'
                          : 'bg-white/10'
                          }`}
                        style={{ transitionDelay: `${i * 100}ms` }}
                      ></div>
                    ))}
                  </div>
                  <span className="text-sm font-mono text-primary min-w-[3rem] text-right">{skill.percent}%</span>
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
              <h2 className="scroll-animate text-5xl sm:text-6xl font-bold mb-2 tracking-wider text-white/30" style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '800',
                letterSpacing: '-0.02em'
              }}>
                How I Deliver Value
              </h2>
              <p className="scroll-animate-left text-white/70 text-base sm:text-lg max-w-2xl">
                I build robust, intuitive software that enhances user experience and drives product success
              </p>
            </div>
          </div>

          {/* Services Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

            {
              services.map((service) => (
                <div className="scroll-animate stagger-${service.id} border border-gray-800 group-hover:border-transparent group relative rounded-1xl p-6 transition-all overflow-hidden">
                  {/* Hover gradient overlay */}
                  <div aria-hidden className="pointer-events-none absolute inset-0 rounded-1xl bg-gradient-to-r from-yellow-400 via-amber-500 to-black opacity-0 group-hover:opacity-25 transition-opacity duration-300 group-hover:border-transparent"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-2xl sm:text-2xl font-medium">{service.title}</h3>
                      {/* <div className="shrink-0">
                        <div className="w-9 h-9 rounded-full bg-gray-800/80 flex items-center justify-center text-white/80 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div> */}
                    </div>
                    <div className="text-xs text-white/40 ">{service.description}</div>
                  </div>
                </div>
              ))
            }

          </div>
        </div>
      </section>

      {/* Featured work Section */}
      <section id="featured-work" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div>
              <div className="text-amber-400 text-sm font-medium flex items-center gap-2">
                <span className="text-lg">✦</span>
                <span>Featured Work</span>
              </div>
              <div className="mt-4">
                <Link href="/gallery" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-black font-semibold hover:bg-primary/95 transition-colors">
                  Explore all Projects
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-2">
              <h2 className="scroll-animate skills-title opacity-0 text-5xl sm:text-6xl font-bold mb-5 tracking-wider text-white/30" style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: '-0.02em' }}>Showcasing My Work Work for Your Inspiration</h2>
              <p className="scroll-animate-left text-white/70 text-base sm:text-lg max-w-2xl">Discover a showcase of digital creativity — modern mobile and web projects crafted to inspire your next big idea.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <div onClick={() => setSelectedProject(0)} className="group rounded-lg overflow-hidden">
              <div className="relative aspect-[5/4]">
                <Image src="/projects/vital.png" alt="Website Redesign" fill className="object-cover grayscale group-hover:grayscale-0 transition-transform duration-500 group-hover:scale-[1.03]" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setSelectedProject(0)} className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-primary text-black text-xs font-semibold">
                    View Project
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="px-1 mt-2">
                <h3 className="text-sm md:text-base font-semibold text-white group-hover:text-primary transition-colors">Website Redesign</h3>
                <p className="text-xs md:text-sm text-gray-400 mt-1">Revamping layouts into modern, responsive websites that improve usability and engagement.</p>
              </div>
            </div>
            <div onClick={() => setSelectedProject(1)} className="group rounded-lg overflow-hidden">
              <div className="relative aspect-[5/4]">
                <Image src="/projects/culture.png" alt="Branding Identity Design" fill className="object-cover grayscale group-hover:grayscale-0 transition-transform duration-500 group-hover:scale-[1.03]" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setSelectedProject(1)} className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-primary text-black text-xs font-semibold">
                    View Project
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="px-1 mt-2">
                <h3 className="text-sm md:text-base font-semibold text-white group-hover:text-primary transition-colors">Branding Identity Design</h3>
                <p className="text-xs md:text-sm text-gray-400 mt-1">Crafting unique brand identities that reflect values, connect with audiences, and stand out.</p>
              </div>
            </div>
            <div className="group rounded-lg overflow-hidden">
              <div className="relative aspect-[5/4]">
                <Image src="/vsstudio.png" alt="Creative Hub Website" fill className="object-cover grayscale group-hover:grayscale-0 transition-transform duration-500 group-hover:scale-[1.03]" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setSelectedProject(1)} className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-primary text-black text-xs font-semibold">
                    View Project
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="px-1 mt-2">
                <h3 className="text-sm md:text-base font-semibold text-white group-hover:text-primary transition-colors">Creative Hub Website</h3>
                <p className="text-xs md:text-sm text-gray-400 mt-1">Designing an engaging platform that brings ideas, content, and communities together.</p>
              </div>
            </div>
            <div className="group rounded-lg overflow-hidden">
              <div className="relative aspect-[5/4]">
                <Image src="/projects/jome.png" alt="Mobile App MVP Designs" fill className="object-cover grayscale group-hover:grayscale-0 transition-transform duration-500 group-hover:scale-[1.03]" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setSelectedProject(2)} className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-primary text-black text-xs font-semibold">
                    View Project
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="px-1 mt-2">
                <h3 className="text-sm md:text-base font-semibold text-white group-hover:text-primary transition-colors">Mobile App MVP Designs</h3>
                <p className="text-xs md:text-sm text-gray-400 mt-1">Building clean, user-friendly MVPs that validate ideas quickly and deliver impact.</p>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section id="testimonials" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-black overflow-x-hidden">
        <div className="relative container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-12 scroll-animate stagger-1">
            <div className="inline-flex -space-x-3">
              <div className="w-10 h-10 rounded-full ring-2 overflow-hidden flex-shrink-0 shadow-lg shadow-primary/30">
                <Image
                  src="/test.jpeg"
                  alt="Client"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-10 h-10 rounded-full  ring-2 overflow-hidden flex-shrink-0 shadow-lg shadow-primary/30">
                <Image
                  src="/ola.jpg"
                  alt="Client"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-10 h-10 rounded-full  ring-2 overflow-hidden flex-shrink-0 shadow-lg shadow-primary/30">
                <Image
                  src="/test1.jpg"
                  alt="Client"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <p className="mt-3 text-sm sm:text-base text-white/70">Trusted <span className="text-primary font-semibold">18,000+</span> Satisfied Clients</p>
          </div>
          <div className="relative mx-auto max-w-[680px] sm:max-w-[760px]">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-0">
              <span className="block scroll-animate-scale stagger-2 text-transparent text-[5rem] sm:text-[7.5rem] lg:text-[10rem] font-bold tracking-[0.12em] uppercase leading-none select-none whitespace-nowrap mix-blend-soft-light" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.14)' }}>
                Testimonials
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative z-10 justify-items-center">
              <div className="scroll-animate-right stagger-3 rounded-xl bg-black border border-white/10 p-4 sm:p-5 w-full max-w-[300px] sm:max-w-[340px]">
                <p className="text-xs sm:text-sm italic text-primary">“SmileDev captured our vision and turned it into a polished website.”</p>
                <p className="mt-2 text-[11px] sm:text-xs text-white/70">Your work is exceptional and well organized , the best I must say and I would definitely recommend you to anyone out there.</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src="/ola.jpg"
                        alt="Client"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-white font-medium">Ola from UK</p>
                      <p className="text-[11px] sm:text-xs text-white/60">CEO, VitalFlow</p>
                    </div>
                  </div>
                  <Quote className="w-5 h-5 text-white/40" />
                </div>
              </div>
              <div className="scroll-animate-left stagger-4 rounded-xl bg-black border border-white/10 p-4 sm:p-5 w-full max-w-[300px] sm:max-w-[340px]">
                <p className="text-xs sm:text-sm italic text-primary">“The design exceeded our expectations. Clean, modern, and user‑friendly.”</p>
                <p className="mt-2 text-[11px] sm:text-xs text-white/70">The app runs perfectly, and the codebase is clean and easy to navigate. Your support throughout development was outstanding—patient, clear, and very helpful. You're the best developer I’ve worked with. 10/10, highly recommended.</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src="/test1.jpg"
                        alt="Client"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-white font-medium">Daniel Kim</p>
                      <p className="text-[11px] sm:text-xs text-white/60">CEO, Wegems Agency</p>
                    </div>
                  </div>
                  <Quote className="w-5 h-5 text-white/40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section id="faqs" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-black overflow-x-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <div className="scroll-animate-left stagger-1 text-amber-400 text-sm font-medium flex items-center gap-2">
                <span className="text-lg">✦</span>
                <span>Support</span>
              </div>
              <h2 className="scroll-animate skills-title opacity-0 text-5xl sm:text-6xl font-bold mb-5 tracking-wider text-white/30" style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: '-0.02em' }}>FAQS</h2>
              <p className="scroll-animate-left text-white/70 text-base sm:text-lg max-w-2xl">Not sure yet? Have some questions? We listed the ones most frequently asked.</p>
            </div>

            <div className="scroll-animate-right space-y-3">
              {faqs.map((item, idx) => {
                const open = openFaq === idx;
                const delayClass = `stagger-${Math.min(idx + 1, 6)}`;
                return (
                  <div
                    key={idx}
                    onClick={() => setOpenFaq(open ? null : idx)}
                    className={`${delayClass} cursor-pointer rounded-xl p-4 sm:p-5 ${open ? 'border-none bg-gradient-to-r from-primary/15 via-black/70 to-black' : 'border border-white/10 hover:border-white/20'}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className={`text-white ${open ? 'font-medium' : 'font-normal'} text-sm sm:text-base`}>{item.q}</p>
                      {open ? (
                        <div className="flex-none inline-flex items-center justify-center w-7 h-7 rounded-full border border-white/20 text-white/80">
                          <Minus className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="flex-none inline-flex items-center justify-center w-7 h-7 rounded-full border border-white/20 text-white/80">
                          <Plus className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    {open && (
                      <p className="mt-3 text-sm text-white/70">{item.a}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-black overflow-x-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div>
              <div className="scroll-animate-left stagger-1 text-primary text-sm font-medium flex items-center gap-2">
                <span className="text-lg">✦</span>
                <span>Team</span>
              </div>
              <h2 className="scroll-animate skills-title opacity-0 text-5xl sm:text-6xl font-bold mb-5 tracking-wider text-white/30" style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: '-0.02em' }}>Meet My Team</h2>
              <p className="scroll-animate-left stagger-3 text-white/70 text-sm sm:text-base mt-3 max-w-2xl">A small, passionate crew focused on building clean, user‑centered products with craft and care.</p>
            </div>
            <div className="scroll-animate-right stagger-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* <div className="scroll-animate-right stagger-2 group relative rounded-xl bg-black border border-white/10 p-4 sm:p-5 overflow-hidden h-[320px] sm:h-[360px] flex flex-col">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-gradient-to-r from-primary/25 via-black/60 to-black" aria-hidden></div>
                <div className="relative z-10">
                  <div className="relative w-full h-10 rounded-lg overflow-hidden scroll-animate-scale stagger-2">
                    <Image src="/moredev.png" alt="Team member" fill sizes="100vw" className="object-cover" />
                  </div>
                  <div className="mt-3">
                    <p className="text-white font-medium text-sm sm:text-base">Alex Carter</p>
                    <p className="text-white/60 text-xs">Lead Engineer</p>
                  </div>
                </div>

                <div className="scroll-animate-right stagger-4 relative z-10 mt-4 flex items-center gap-2">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="group p-2 bg-transparent border border-white/20 rounded-md transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:-translate-y-[2px]">
                    <Linkedin className="w-4 h-4 text-white" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="group p-2 bg-transparent border border-white/20 rounded-md transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:-translate-y-[2px]">
                    <Twitter className="w-4 h-4 text-white" />
                  </a>
                  <a href="https://alex.dev" target="_blank" rel="noopener noreferrer" aria-label="Website" className="group p-2 bg-transparent border border-white/20 rounded-md transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:-translate-y-[2px]">
                    <ExternalLink className="w-4 h-4 text-white" />
                  </a>
                </div>
              </div> */}
              <div className="scroll-animate-right stagger-2 group relative rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-primary/40 p-6 sm:p-7 overflow-hidden h-[350px] sm:h-[350px] flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                {/* Animated background gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/10 via-amber-500/5 to-transparent" aria-hidden></div>

                {/* Subtle glow effect */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>

                <div className="relative z-10 flex-1 flex flex-col">
                  {/* Profile Image */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-2 ring-white/10 group-hover:ring-primary/50 transition-all duration-300 mb-5">
                    <Image
                      src="/phil.jpg"
                      alt="Team member"
                      fill
                      sizes="(max-width: 640px) 96px, 112px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>

                  {/* Member Info */}
                  <div className="mb-5">
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-1.5 group-hover:text-primary transition-colors duration-300">
                      Alex Carter
                    </h3>
                    <p className="text-white/50 text-xs sm:text-sm uppercase tracking-widest font-medium">
                      Lead Engineer
                    </p>

                    {/* Accent line */}
                    <div className="mt-3 h-0.5 w-12 bg-gradient-to-r from-primary to-amber-500 group-hover:w-20 transition-all duration-300"></div>
                  </div>
                  {/* Social Links */}
                  <div className="scroll-animate-right stagger-4 flex items-center gap-2 pt-5 border-t border-white/5">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="group/link flex-1 flex items-center justify-center p-2.5 bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20"
                    >
                      <Linkedin className="w-4 h-4 text-white/70 group-hover/link:text-primary transition-colors" />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                      className="group/link flex-1 flex items-center justify-center p-2.5 bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20"
                    >
                      <Twitter className="w-4 h-4 text-white/70 group-hover/link:text-primary transition-colors" />
                    </a>
                    <a
                      href="https://alex.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Website"
                      className="group/link flex-1 flex items-center justify-center p-2.5 bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20"
                    >
                      <ExternalLink className="w-4 h-4 text-white/70 group-hover/link:text-primary transition-colors" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="scroll-animate-right stagger-2 group relative rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-primary/40 p-6 sm:p-7 overflow-hidden h-[350px] sm:h-[350px] flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                {/* Animated background gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/10 via-amber-500/5 to-transparent" aria-hidden></div>

                {/* Subtle glow effect */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>

                <div className="relative z-10 flex-1 flex flex-col">
                  {/* Profile Image */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-2 ring-white/10 group-hover:ring-primary/50 transition-all duration-300 mb-5">
                    <Image
                      src="/moredev.png"
                      alt="Team member"
                      fill
                      sizes="(max-width: 640px) 96px, 112px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>

                  {/* Member Info */}
                  <div className="mb-5">
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-1.5 group-hover:text-primary transition-colors duration-300">
                      Alex Carter
                    </h3>
                    <p className="text-white/50 text-xs sm:text-sm uppercase tracking-widest font-medium">
                      Lead Engineer
                    </p>

                    {/* Accent line */}
                    <div className="mt-3 h-0.5 w-12 bg-gradient-to-r from-primary to-amber-500 group-hover:w-20 transition-all duration-300"></div>
                  </div>
                  {/* Social Links */}
                  <div className="scroll-animate-right stagger-4 flex items-center gap-2 pt-5 border-t border-white/5">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="group/link flex-1 flex items-center justify-center p-2.5 bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20"
                    >
                      <Linkedin className="w-4 h-4 text-white/70 group-hover/link:text-primary transition-colors" />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                      className="group/link flex-1 flex items-center justify-center p-2.5 bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20"
                    >
                      <Twitter className="w-4 h-4 text-white/70 group-hover/link:text-primary transition-colors" />
                    </a>
                    <a
                      href="https://alex.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Website"
                      className="group/link flex-1 flex items-center justify-center p-2.5 bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20"
                    >
                      <ExternalLink className="w-4 h-4 text-white/70 group-hover/link:text-primary transition-colors" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-black overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-black" />
          <div className="absolute -left-10 top-0 w-[280px] h-[280px] bg-primary/12 rounded-full blur-[120px] mix-blend-soft-light" />
          <div className="absolute left-1/3 top-0 w-[360px] h-[360px] bg-primary/8 rounded-full blur-[120px] mix-blend-soft-light" />
          <div className="absolute right-0 bottom-0 w-[220px] h-[220px] bg-primary/6 rounded-full blur-[90px] mix-blend-soft-light" />
        </div>
        <div className="relative container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="w-full">
              <div className="scroll-animate-left stagger-1 text-amber-400 text-sm font-medium flex items-center gap-2">
                <span className="text-lg">✦</span>
                <span>Got a project?</span>
              </div>
              <h2 className="scroll-animate skills-title opacity-0 text-5xl sm:text-6xl font-bold mb-5 tracking-wider text-white/30" style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: '-0.02em' }}>
                Surround yourself
                <br className="hidden sm:block" />
                with an expert
              </h2>
            </div>
            <div className="scroll-animate-right stagger-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-black font-semibold whitespace-nowrap transition-all duration-300 ease-out will-change-transform hover:bg-primary/95 hover:-translate-y-[2px] hover:shadow-[0_10px_25px_-10px_rgba(255,252,54,0.45)] hover:ring-1 hover:ring-amber-300/40">
                Start a Project Now
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-800 bg-black mt-12 sm:mt-16 lg:mt-20 overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="absolute left-6 top-0 w-[180px] h-[180px] bg-primary/8 rounded-full blur-[100px] mix-blend-soft-light" />
          <div className="absolute right-10 bottom-0 w-[140px] h-[140px] bg-primary/6 rounded-full blur-[80px] mix-blend-soft-light" />
        </div>
        <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-8 sm:py-12 text-white">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <Link href="/" className="inline-block group">
                <span className="text-2xl sm:text-3xl font-bold text-white group-hover:scale-105 transition-transform inline-block">
                  {"<moredev/>"}
                </span>
              </Link>
              <p className="text-sm text-white leading-relaxed">
                Full-Stack Software Engineer passionate about building innovative web solutions and sharing knowledge with the community.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-white hover:text-white hover:underline decoration-amber-400/40 underline-offset-4 text-sm transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/#projects" className="text-white hover:text-white hover:underline decoration-amber-400/40 underline-offset-4 text-sm transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/#experience" className="text-white hover:text-white hover:underline decoration-amber-400/40 underline-offset-4 text-sm transition-colors">
                    Experience
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="text-white hover:text-white hover:underline decoration-amber-400/40 underline-offset-4 text-sm transition-colors">
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
                  <Link href="/community" className="text-white hover:text-white hover:underline decoration-amber-400/40 underline-offset-4 text-sm transition-colors">
                    Community Tools
                  </Link>
                </li>
                <li>
                  <Link href="/donation" className="text-white hover:text-white hover:underline decoration-amber-400/40 underline-offset-4 text-sm transition-colors">
                    Support Us
                  </Link>
                </li>
                <li>
                  <Link href="/schedule" className="text-white hover:text-white hover:underline decoration-amber-400/40 underline-offset-4 text-sm transition-colors">
                    Schedule Meeting
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-white hover:text-white hover:underline decoration-amber-400/40 underline-offset-4 text-sm transition-colors">
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
                  className="group p-2.5 bg-transparent border border-white/20 rounded-lg transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:-translate-y-[2px] hover:shadow-[0_8px_20px_-8px_rgba(255,255,255,0.25)]"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-white transition-colors" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2.5 bg-transparent border border-white/20 rounded-lg transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:-translate-y-[2px] hover:shadow-[0_8px_20px_-8px_rgba(255,255,255,0.25)]"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4 text-white transition-colors" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2.5 bg-transparent border border-white/20 rounded-lg transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:-translate-y-[2px] hover:shadow-[0_8px_20px_-8px_rgba(255,255,255,0.25)]"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4 text-white transition-colors" />
                </a>
              </div>
              <div className="pt-2">
                <a
                  href="mailto:chisaatulegwu@gmail.com"
                  className="flex items-center gap-2 text-white hover:text-white hover:underline decoration-amber-400/40 underline-offset-4 text-sm transition-colors"
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
              <p className="text-sm text-white text-center sm:text-left">
                © {new Date().getFullYear()} <span className="text-white font-medium">moredev</span>. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm text-white">
                <Link href="/privacy" className="hover:text-white hover:underline decoration-amber-400/40 underline-offset-4 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-white hover:underline decoration-amber-400/40 underline-offset-4 transition-colors">
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
