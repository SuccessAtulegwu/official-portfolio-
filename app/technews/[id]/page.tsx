"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, ExternalLink, Bookmark, Facebook, Twitter, Linkedin, Code2, Heart, Mail, ArrowRight, Link2, Check } from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content?: string;
  source: string;
  category: string;
  publishedAt: string;
  url: string;
  imageUrl: string;
  author?: string;
}

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchArticleDetails = () => {
      setIsLoading(true);

      // Get article from localStorage or fetch from API
      const storedArticles = localStorage.getItem('techNewsArticles');
      if (storedArticles) {
        const articles: NewsArticle[] = JSON.parse(storedArticles);
        const foundArticle = articles.find(a => a.id === params.id);
        
        if (foundArticle) {
          setArticle(foundArticle);
          
          // Get related articles from same category
          const related = articles
            .filter(a => a.category === foundArticle.category && a.id !== foundArticle.id)
            .slice(0, 3);
          setRelatedArticles(related);
        } else {
          // Article not found, redirect back
          router.push('/technews');
        }
      } else {
        router.push('/technews');
      }
      
      setIsLoading(false);
    };

    if (params.id) {
      fetchArticleDetails();
    }
  }, [params.id, router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  const shareArticle = (platform: string) => {
    const url = window.location.href;
    const title = article?.title || "";
    
    const shareUrls: { [key: string]: string } = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Article Not Found</h1>
          <Link href="/technews" className="text-purple-600 hover:text-purple-700">
            ← Back to News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto max-w-4xl px-6 py-6">
          <Link
            href="/technews"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group mb-6"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Tech News</span>
          </Link>

          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-full">
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>5 min read</span>
            </div>
            {article.author && (
              <div className="flex items-center gap-2">
                <span>By <strong>{article.author}</strong></span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="font-medium text-purple-600 dark:text-purple-400">{article.source}</span>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Share:</span>
            <button
              onClick={() => shareArticle('facebook')}
              className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-colors"
              title="Share on Facebook"
            >
              <Facebook className="w-5 h-5" />
            </button>
            <button
              onClick={() => shareArticle('twitter')}
              className="p-2 rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/20 text-sky-600 dark:text-sky-400 transition-colors"
              title="Share on Twitter"
            >
              <Twitter className="w-5 h-5" />
            </button>
            <button
              onClick={() => shareArticle('linkedin')}
              className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-700 dark:text-blue-400 transition-colors"
              title="Share on LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </button>
            <button
              onClick={copyLink}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                copied 
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              title={copied ? "Link copied!" : "Copy link"}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Link2 className="w-5 h-5" />
                  <span className="text-sm font-medium">Copy Link</span>
                </>
              )}
            </button>
            <button
              className="p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-600 dark:text-purple-400 transition-colors ml-auto"
              title="Bookmark"
            >
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl mb-8">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&q=80";
            }}
          />
        </div>

        {/* Article Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6 font-medium">
              {article.description}
            </p>
            
            {article.content && article.content !== "[Removed]" ? (
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                {article.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                  <p>
                    This article provides comprehensive coverage of the latest developments in technology. 
                    The details explore various aspects of the story, providing insights from industry experts 
                    and analyzing the potential impact on the tech landscape.
                  </p>
                  <p>
                    Key stakeholders in the industry have been closely monitoring these developments, 
                    with many expressing optimism about the future implications. The technology sector 
                    continues to evolve rapidly, with innovation driving progress across multiple domains.
                  </p>
                  <p>
                    For the complete article with all details and expert analysis, please visit the 
                    original source article linked below.
                  </p>
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Want to read the full article? Visit the original source for complete coverage:
                  </p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:scale-105 transition-all shadow-lg font-medium"
                  >
                    Read Full Article on {article.source}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Author & Community Services Card */}
        <div className="mt-12 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20 rounded-3xl p-8 md:p-12 border border-purple-200 dark:border-purple-800 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Profile */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                <img
                  src="/moredev.png"
                  alt="Developer"
                  className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border-4 border-white dark:border-gray-800 shadow-2xl"
                  onError={(e) => {
                    e.currentTarget.src = "https://ui-avatars.com/api/?name=More+Dev&size=200&background=9333ea&color=fff&bold=true";
                  }}
                />
              </div>
              
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-full mb-3">
                  <Code2 className="w-4 h-4" />
                  <span>Full Stack Developer</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  MoreDev
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                  Building innovative web solutions & free community tools
                </p>
                
                {/* Quick Stats */}
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">18+</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Free Tools</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">5+</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Years Exp</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">100%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Free</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Community Services Info */}
            <div className="space-y-4">
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Heart className="w-6 h-6 text-pink-600" />
                Community Services
              </h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We're passionate about empowering developers and creators with free, powerful tools. 
                From video downloaders to image processors, our mission is to make technology accessible 
                to everyone. No registration, no fees, just pure utility.
              </p>
              
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  ✨ What we offer:
                </p>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                    Professional web development services
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-pink-600 rounded-full"></span>
                    18+ free online tools & utilities
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                    Technical consultation & support
                  </li>
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/community"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:scale-105 transition-all shadow-lg font-semibold group"
                >
                  Explore Free Tools
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/schedule"
                  className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 border-2 border-purple-600 dark:border-purple-400 rounded-xl hover:scale-105 transition-all font-semibold"
                >
                  Schedule Meeting
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:scale-105 transition-all font-semibold"
                >
                  <Mail className="w-4 h-4" />
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  href={`/technews/${related.id}`}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:scale-105 group"
                >
                  <div className="relative h-48">
                    <img
                      src={related.imageUrl}
                      alt={related.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80";
                      }}
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
                      {related.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(related.publishedAt)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

