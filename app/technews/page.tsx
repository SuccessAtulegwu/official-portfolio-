"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ExternalLink, Newspaper, Sparkles, Cpu, Globe, Zap, TrendingUp, Loader2, AlertCircle } from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  source: string;
  category: string;
  publishedAt: string;
  url: string;
  imageUrl: string;
}

type Category = "All" | "AI/ML" | "Web Dev" | "Mobile" | "Cybersecurity" | "Cloud" | "Blockchain";

export default function TechNewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingDemo, setIsUsingDemo] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cacheAge, setCacheAge] = useState<number | null>(null);
  const articlesPerPage = 9;

  const categories: { name: Category; icon: React.ReactNode; color: string }[] = [
    { name: "All", icon: <Globe className="w-4 h-4" />, color: "purple" },
    { name: "AI/ML", icon: <Sparkles className="w-4 h-4" />, color: "blue" },
    { name: "Web Dev", icon: <Cpu className="w-4 h-4" />, color: "green" },
    { name: "Mobile", icon: <Zap className="w-4 h-4" />, color: "yellow" },
    { name: "Cybersecurity", icon: <Globe className="w-4 h-4" />, color: "red" },
    { name: "Cloud", icon: <TrendingUp className="w-4 h-4" />, color: "indigo" },
    { name: "Blockchain", icon: <Newspaper className="w-4 h-4" />, color: "orange" },
  ];

  // Demo news articles for fallback
  const getDemoArticles = (): NewsArticle[] => [
    {
      id: "1",
      title: "OpenAI Announces GPT-5: The Next Generation of AI Language Models",
      description: "OpenAI reveals groundbreaking advancements in artificial intelligence with the launch of GPT-5, promising unprecedented natural language understanding and generation capabilities.",
      source: "TechCrunch",
      category: "AI/ML",
      publishedAt: "2025-10-22",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    },
    {
      id: "2",
      title: "React 19 Released: Major Performance Improvements and New Features",
      description: "The React team has officially launched React 19, introducing significant performance enhancements, new concurrent features, and improved developer experience.",
      source: "Dev.to",
      category: "Web Dev",
      publishedAt: "2025-10-22",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    },
    {
      id: "3",
      title: "Apple Unveils Revolutionary M4 Chip with 30% Performance Boost",
      description: "Apple's latest M4 chip promises to revolutionize mobile computing with unprecedented performance gains and improved energy efficiency for MacBooks and iPads.",
      source: "The Verge",
      category: "Mobile",
      publishedAt: "2025-10-21",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    },
    {
      id: "4",
      title: "Major Cybersecurity Breach Affects Fortune 500 Companies",
      description: "Security researchers discover a critical vulnerability affecting major cloud providers, prompting emergency patches and heightened security measures across the industry.",
      source: "Wired",
      category: "Cybersecurity",
      publishedAt: "2025-10-21",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    },
    {
      id: "5",
      title: "AWS Launches Next-Gen Cloud Infrastructure Services",
      description: "Amazon Web Services introduces revolutionary cloud computing capabilities with improved scalability, reduced latency, and enhanced AI integration for enterprise customers.",
      source: "InfoWorld",
      category: "Cloud",
      publishedAt: "2025-10-20",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    },
    {
      id: "6",
      title: "Ethereum 3.0 Upgrade Promises 100x Transaction Speed",
      description: "The Ethereum Foundation announces a major protocol upgrade that will dramatically increase transaction throughput while reducing gas fees and improving network sustainability.",
      source: "CoinDesk",
      category: "Blockchain",
      publishedAt: "2025-10-20",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    },
    {
      id: "7",
      title: "Google's Gemini AI Surpasses Human-Level Performance in Coding Tests",
      description: "Google's latest AI model demonstrates remarkable coding abilities, outperforming senior developers in complex programming challenges and automated code review.",
      source: "VentureBeat",
      category: "AI/ML",
      publishedAt: "2025-10-19",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    },
    {
      id: "8",
      title: "Next.js 15 Brings Revolutionary Server-Side Rendering Capabilities",
      description: "Vercel announces Next.js 15 with groundbreaking features including improved RSC (React Server Components), enhanced image optimization, and better development experience.",
      source: "JavaScript Weekly",
      category: "Web Dev",
      publishedAt: "2025-10-19",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    },
    {
      id: "9",
      title: "Flutter 4.0: Google's Cross-Platform Framework Gets Major Update",
      description: "Google releases Flutter 4.0 with enhanced performance, new Material Design 3 components, and improved support for desktop and web applications.",
      source: "Android Authority",
      category: "Mobile",
      publishedAt: "2025-10-18",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    },
    {
      id: "10",
      title: "Microsoft Copilot: AI Assistant Integrated Across Entire Product Suite",
      description: "Microsoft announces deep integration of AI-powered Copilot across all Office applications, revolutionizing productivity and workflow automation.",
      source: "ZDNet",
      category: "AI/ML",
      publishedAt: "2025-10-17",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    },
    {
      id: "11",
      title: "TypeScript 5.5 Released with Enhanced Type System",
      description: "The TypeScript team unveils version 5.5 with major improvements to the type system, better performance, and new developer tools.",
      source: "TypeScript Blog",
      category: "Web Dev",
      publishedAt: "2025-10-17",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&q=80",
    },
    {
      id: "12",
      title: "iOS 18 Introduces Revolutionary Privacy Features",
      description: "Apple's iOS 18 brings unprecedented privacy controls, including advanced app tracking prevention and enhanced data protection mechanisms.",
      source: "MacRumors",
      category: "Mobile",
      publishedAt: "2025-10-16",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
    },
    {
      id: "13",
      title: "Zero-Day Exploit Discovered in Popular Open Source Library",
      description: "Cybersecurity researchers identify a critical zero-day vulnerability in a widely-used JavaScript library, affecting millions of websites worldwide.",
      source: "SecurityWeek",
      category: "Cybersecurity",
      publishedAt: "2025-10-16",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    },
    {
      id: "14",
      title: "Google Cloud Announces Major Price Cuts for AI Services",
      description: "Google Cloud Platform reduces prices for AI and machine learning services by up to 40%, making advanced AI more accessible to businesses.",
      source: "Cloud Tech",
      category: "Cloud",
      publishedAt: "2025-10-15",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
    },
    {
      id: "15",
      title: "Bitcoin Reaches New All-Time High Following ETF Approval",
      description: "Bitcoin surges to record highs as major financial institutions launch cryptocurrency ETFs, signaling mainstream adoption of digital assets.",
      source: "Bloomberg Crypto",
      category: "Blockchain",
      publishedAt: "2025-10-15",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
    },
    {
      id: "16",
      title: "Meta Unveils Llama 4: Open Source AI Model Rivals Closed Systems",
      description: "Meta's latest Llama 4 model challenges proprietary AI systems with impressive performance while remaining completely open source.",
      source: "AI News",
      category: "AI/ML",
      publishedAt: "2025-10-14",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=800&q=80",
    },
    {
      id: "17",
      title: "Svelte 5 Released: Rethinking Reactivity in Web Development",
      description: "Svelte 5 introduces a revolutionary approach to reactivity with Runes, offering better performance and a more intuitive developer experience.",
      source: "Frontend Masters",
      category: "Web Dev",
      publishedAt: "2025-10-14",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80",
    },
    {
      id: "18",
      title: "Samsung Galaxy S25 Leaked: Revolutionary Camera Technology",
      description: "Early leaks reveal Samsung's Galaxy S25 will feature groundbreaking camera technology with AI-powered computational photography.",
      source: "GSMArena",
      category: "Mobile",
      publishedAt: "2025-10-13",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80",
    },
    {
      id: "19",
      title: "Ransomware Attack Hits Major Healthcare Provider",
      description: "A sophisticated ransomware campaign targets healthcare systems, highlighting urgent need for improved cybersecurity in critical infrastructure.",
      source: "Health IT Security",
      category: "Cybersecurity",
      publishedAt: "2025-10-13",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80",
    },
    {
      id: "20",
      title: "Azure Introduces Quantum Computing as a Service",
      description: "Microsoft Azure launches quantum computing capabilities, making quantum resources accessible to developers and researchers worldwide.",
      source: "Microsoft Azure Blog",
      category: "Cloud",
      publishedAt: "2025-10-12",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    },
    {
      id: "21",
      title: "Solana Network Upgrade Enables Faster Transactions",
      description: "Solana blockchain implements major network upgrade, achieving transaction speeds that rival traditional payment processors.",
      source: "Decrypt",
      category: "Blockchain",
      publishedAt: "2025-10-12",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&q=80",
    },
    {
      id: "22",
      title: "DeepMind's AlphaCode 2 Achieves Professional Programming Level",
      description: "Google DeepMind's AlphaCode 2 reaches professional-level coding ability, solving complex programming problems with human-like reasoning.",
      source: "Nature",
      category: "AI/ML",
      publishedAt: "2025-10-11",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1655635643532-fa9ba2648cbe?w=800&q=80",
    },
    {
      id: "23",
      title: "Vite 5.0: The Fastest Build Tool Gets Even Faster",
      description: "Vite 5.0 launches with revolutionary build optimizations, reducing development build times by up to 70% for large applications.",
      source: "Vite Blog",
      category: "Web Dev",
      publishedAt: "2025-10-11",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800&q=80",
    },
    {
      id: "24",
      title: "WhatsApp Introduces End-to-End Encrypted Cloud Backups",
      description: "WhatsApp rolls out end-to-end encrypted cloud backups, ensuring user messages remain private even in cloud storage.",
      source: "TechRadar",
      category: "Mobile",
      publishedAt: "2025-10-10",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1611746869696-d09bce200020?w=800&q=80",
    },
    {
      id: "25",
      title: "New Supply Chain Attack Vector Threatens Enterprise Systems",
      description: "Security researchers uncover sophisticated supply chain attack method affecting enterprise software dependencies and build systems.",
      source: "Dark Reading",
      category: "Cybersecurity",
      publishedAt: "2025-10-10",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    },
    {
      id: "26",
      title: "Oracle Cloud Expands Global Infrastructure with 20 New Regions",
      description: "Oracle Cloud Infrastructure announces massive expansion with 20 new cloud regions, strengthening its global presence and capabilities.",
      source: "Oracle News",
      category: "Cloud",
      publishedAt: "2025-10-09",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
    },
    {
      id: "27",
      title: "NFT Market Sees Renaissance with Utility-First Projects",
      description: "The NFT market experiences renewed growth as projects shift focus from speculation to real-world utility and practical applications.",
      source: "CoinTelegraph",
      category: "Blockchain",
      publishedAt: "2025-10-09",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1645731504831-b001d6c5c79e?w=800&q=80",
    },
  ];

  // Fetch news from API
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);

      const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

      // Check cache first
      const cachedData = localStorage.getItem('techNewsCache');
      const cacheTimestamp = localStorage.getItem('techNewsCacheTimestamp');
      
      if (cachedData && cacheTimestamp) {
        const cacheAge = Date.now() - parseInt(cacheTimestamp);
        const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
        
        // Use cached data if less than 1 hour old
        if (cacheAge < oneHour) {
          console.log("📰 Using cached articles (age: " + Math.round(cacheAge / 1000 / 60) + " minutes)");
          const cached = JSON.parse(cachedData);
          setNewsArticles(cached.articles);
          setIsUsingDemo(cached.isDemo);
          setCacheAge(cacheAge);
          localStorage.setItem('techNewsArticles', JSON.stringify(cached.articles));
          setIsLoading(false);
          return;
        }
      }

      // Clear cache age if fetching fresh data
      setCacheAge(null);

      // If no API key, use demo data
      if (!apiKey || apiKey === 'your_api_key_here') {
        console.log("📰 Using demo articles (no API key found)");
        const demoArticles = getDemoArticles();
        setNewsArticles(demoArticles);
        // Store demo articles with cache
        localStorage.setItem('techNewsArticles', JSON.stringify(demoArticles));
        localStorage.setItem('techNewsCache', JSON.stringify({ articles: demoArticles, isDemo: true }));
        localStorage.setItem('techNewsCacheTimestamp', Date.now().toString());
        setIsUsingDemo(true);
        setIsLoading(false);
        return;
      }

      try {
        // Fetch from NewsAPI (max 100 articles per request)
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=technology OR programming OR AI OR software OR "machine learning" OR cybersecurity OR cloud OR blockchain&language=en&sortBy=publishedAt&pageSize=100&apiKey=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
          // Map API response to our format
          const formattedArticles: NewsArticle[] = data.articles.map((article: any, index: number) => {
            // Categorize based on title/description keywords
            let category = "Web Dev";
            const text = (article.title + " " + article.description).toLowerCase();
            
            if (text.includes("ai") || text.includes("artificial intelligence") || text.includes("machine learning") || text.includes("gpt")) {
              category = "AI/ML";
            } else if (text.includes("mobile") || text.includes("ios") || text.includes("android") || text.includes("app")) {
              category = "Mobile";
            } else if (text.includes("security") || text.includes("hack") || text.includes("breach") || text.includes("vulnerability")) {
              category = "Cybersecurity";
            } else if (text.includes("cloud") || text.includes("aws") || text.includes("azure") || text.includes("google cloud")) {
              category = "Cloud";
            } else if (text.includes("blockchain") || text.includes("crypto") || text.includes("bitcoin") || text.includes("ethereum")) {
              category = "Blockchain";
            }

            return {
              id: `api-${index}`,
              title: article.title || "No title",
              description: article.description || "No description available.",
              source: article.source?.name || "Unknown Source",
              category,
              publishedAt: article.publishedAt?.split('T')[0] || new Date().toISOString().split('T')[0],
              url: article.url || "#",
              imageUrl: article.urlToImage || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80",
            };
          });

          setNewsArticles(formattedArticles);
          setIsUsingDemo(false);
          // Store articles in localStorage for detail page and cache
          localStorage.setItem('techNewsArticles', JSON.stringify(formattedArticles));
          localStorage.setItem('techNewsCache', JSON.stringify({ articles: formattedArticles, isDemo: false }));
          localStorage.setItem('techNewsCacheTimestamp', Date.now().toString());
          console.log(`📰 Fetched ${formattedArticles.length} articles from NewsAPI`);
        } else {
          throw new Error("No articles found");
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch news");
        // Fallback to demo articles
        const demoArticles = getDemoArticles();
        setNewsArticles(demoArticles);
        localStorage.setItem('techNewsArticles', JSON.stringify(demoArticles));
        localStorage.setItem('techNewsCache', JSON.stringify({ articles: demoArticles, isDemo: true }));
        localStorage.setItem('techNewsCacheTimestamp', Date.now().toString());
        setIsUsingDemo(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Manual refresh function
  const handleRefresh = () => {
    // Clear cache
    localStorage.removeItem('techNewsCache');
    localStorage.removeItem('techNewsCacheTimestamp');
    // Reload page to fetch fresh data
    window.location.reload();
  };

  const filteredArticles = selectedCategory === "All" 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory);

  // Pagination logic
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = filteredArticles.slice(startIndex, endIndex);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Scroll to top when page changes (better UX on mobile)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category?.color || "gray";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // Get visible page numbers for pagination
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5; // Max visible page buttons on desktop
    const maxVisibleMobile = 3; // Max visible on mobile
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    // Show pages around current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
      {/* Hero Section */}
      <div className="relative text-white py-20 px-6 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&q=80')",
          }}
        ></div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/95 via-blue-900/90 to-indigo-900/95"></div>
        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Newspaper className="w-12 h-12" />
            <h1 className="text-5xl md:text-6xl font-bold">Tech News</h1>
          </div>
          <p className="text-xl text-white/90 max-w-3xl">
            Stay updated with the latest technology news from around the world. Covering AI, Web Development, Mobile, Cybersecurity, Cloud Computing, and Blockchain.
          </p>

          {/* Live Indicator & Cache Status */}
          <div className="flex flex-wrap items-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isUsingDemo ? 'bg-yellow-400' : 'bg-green-400 animate-pulse'}`}></div>
              <span className="text-sm font-medium">
                {isLoading 
                  ? "Loading..." 
                  : isUsingDemo 
                    ? "Demo Mode • Sample Articles" 
                    : "Live Updates • Real-time News"}
              </span>
            </div>
            {cacheAge && !isLoading && (
              <div className="flex items-center gap-2 text-sm text-white/80">
                <Clock className="w-4 h-4" />
                <span>Cached {Math.round(cacheAge / 1000 / 60)} min ago</span>
                <button
                  onClick={handleRefresh}
                  className="ml-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-xs font-medium"
                >
                  Refresh
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-6 py-12">
        {/* Category Filters */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                  selectedCategory === category.name
                    ? `bg-${category.color}-600 text-white shadow-lg scale-105`
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md hover:scale-105"
                }`}
                style={
                  selectedCategory === category.name
                    ? {
                        background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                        backgroundImage: `linear-gradient(135deg, rgb(${
                          category.color === "purple"
                            ? "147, 51, 234"
                            : category.color === "blue"
                            ? "37, 99, 235"
                            : category.color === "green"
                            ? "22, 163, 74"
                            : category.color === "yellow"
                            ? "234, 179, 8"
                            : category.color === "red"
                            ? "220, 38, 38"
                            : category.color === "indigo"
                            ? "99, 102, 241"
                            : "249, 115, 22"
                        }) 0%, rgb(${
                          category.color === "purple"
                            ? "192, 132, 252"
                            : category.color === "blue"
                            ? "96, 165, 250"
                            : category.color === "green"
                            ? "134, 239, 172"
                            : category.color === "yellow"
                            ? "253, 224, 71"
                            : category.color === "red"
                            ? "252, 165, 165"
                            : category.color === "indigo"
                            ? "165, 180, 252"
                            : "254, 215, 170"
                        }) 100%)`,
                      }
                    : undefined
                }
              >
                {category.icon}
                <span>{category.name}</span>
                {category.name === "All" && (
                  <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    {newsArticles.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {selectedCategory === "All" ? "Latest News" : `${selectedCategory} News`}
            <span className="ml-3 text-lg font-normal text-gray-600 dark:text-gray-400">
              ({filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"})
            </span>
          </h2>

          {/* Loading State */}
          {isLoading ? (
            <div className="text-center py-20">
              <Loader2 className="w-16 h-16 text-purple-600 mx-auto mb-4 animate-spin" />
              <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                Loading latest tech news...
              </p>
            </div>
          ) : error && !isUsingDemo ? (
            /* Error State */
            <div className="text-center py-20">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 dark:text-red-400 text-lg font-medium mb-2">
                Failed to load news
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {error}
              </p>
            </div>
          ) : filteredArticles.length === 0 ? (
            /* No Articles in Category */
            <div className="text-center py-20">
              <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No articles found in this category.
              </p>
            </div>
          ) : (
            /* Articles Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:scale-105"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80";
                      }}
                    />
                    {/* Category Badge */}
                    <div
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg"
                      style={{
                        background: `rgb(${
                          getCategoryColor(article.category) === "purple"
                            ? "147, 51, 234"
                            : getCategoryColor(article.category) === "blue"
                            ? "37, 99, 235"
                            : getCategoryColor(article.category) === "green"
                            ? "22, 163, 74"
                            : getCategoryColor(article.category) === "yellow"
                            ? "234, 179, 8"
                            : getCategoryColor(article.category) === "red"
                            ? "220, 38, 38"
                            : getCategoryColor(article.category) === "indigo"
                            ? "99, 102, 241"
                            : "249, 115, 22"
                        })`,
                      }}
                    >
                      {article.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(article.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        3 min read
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {article.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {article.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        {article.source}
                      </span>
                      <Link
                        href={`/technews/${article.id}`}
                        className="flex items-center gap-1 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                      >
                        Read more
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2 px-4">
            {/* Mobile: Page info */}
            <div className="sm:hidden text-sm text-gray-600 dark:text-gray-400 mb-2">
              Page {currentPage} of {totalPages}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 sm:px-6 py-3 sm:py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium touch-manipulation min-w-[80px] sm:min-w-0"
              >
                Previous
              </button>
              
              {/* Page Numbers */}
              <div className="flex items-center gap-1 sm:gap-2">
                {getVisiblePages().map((page, index) => (
                  page === '...' ? (
                    <span
                      key={`ellipsis-${index}`}
                      className="w-8 sm:w-10 h-10 sm:h-10 flex items-center justify-center text-gray-500 dark:text-gray-400"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page as number)}
                      className={`w-10 h-10 sm:w-10 sm:h-10 rounded-lg font-medium transition-all text-sm sm:text-base touch-manipulation ${
                        currentPage === page
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                      }`}
                    >
                      {page}
                    </button>
                  )
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 sm:px-6 py-3 sm:py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium touch-manipulation min-w-[80px] sm:min-w-0"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

