"use client";

import { useState, useEffect, useRef } from "react";
import { Download, Facebook, Instagram, AlertCircle, CheckCircle, Loader2, History, Sparkles, Clipboard, TrendingUp, Star, Keyboard, FileDown, Lightbulb, ArrowLeft } from "lucide-react";
import VideoCard from "@/components/VideoCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import DownloadHistory from "@/components/DownloadHistory";
import QualitySelector from "@/components/QualitySelector";
import StatsDashboard from "@/components/StatsDashboard";
import FavoritesPanel from "@/components/FavoritesPanel";
import KeyboardShortcutsHelp from "@/components/KeyboardShortcutsHelp";
import TipsModal from "@/components/TipsModal";
import ExportImport from "@/components/ExportImport";
import QuickStats from "@/components/QuickStats";
import CommunityNavbar from "@/components/CommunityNavbar";
import { useKeyboard } from "@/hooks/useKeyboard";
import { useNotification } from "@/hooks/useNotification";
import { extractURL, isValidPlatformURL } from "@/lib/urlUtils";
import Link from "next/link";

interface VideoData {
  success: boolean;
  platform?: string;
  title?: string;
  thumbnail?: string;
  duration?: string;
  author?: string;
  downloadUrl?: string;
  qualities?: { quality: string; url: string }[];
  error?: string;
}

interface HistoryItem {
  id: string;
  url: string;
  platform: string;
  title: string;
  thumbnail: string;
  timestamp: number;
}

export default function DownloadPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [error, setError] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedQuality, setSelectedQuality] = useState("best");
  const [copied, setCopied] = useState(false);
  const [pasting, setPasting] = useState(false);
  
  // New features state
  const [showStats, setShowStats] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [showExportImport, setShowExportImport] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const { showNotification, requestPermission, isSupported: notificationsSupported } = useNotification();

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("downloadHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    // Show tips on first visit
    const hasSeenTips = localStorage.getItem("hasSeenWelcome");
    if (!hasSeenTips) {
      setTimeout(() => setShowTips(true), 1000);
      localStorage.setItem("hasSeenWelcome", "true");
    }

    // Request notification permission after first download
    const downloadCount = savedHistory ? JSON.parse(savedHistory).length : 0;
    if (downloadCount === 1 && notificationsSupported) {
      requestPermission();
    }
  }, []);

  // Keyboard shortcuts
  useKeyboard([
    {
      key: 'v',
      ctrl: true,
      callback: () => {
        if (!showHistory && !showStats && !showFavorites) {
          handlePaste();
        }
      },
      description: 'Paste URL'
    },
    {
      key: 'Enter',
      ctrl: true,
      callback: () => {
        if (url && !loading) {
          document.getElementById('submit-button')?.click();
        }
      },
      description: 'Submit form'
    },
    {
      key: 'h',
      ctrl: true,
      callback: () => setShowHistory(true),
      description: 'Open history'
    },
    {
      key: 'd',
      ctrl: true,
      callback: () => setShowStats(true),
      description: 'View statistics'
    },
    {
      key: 'b',
      ctrl: true,
      callback: () => setShowFavorites(true),
      description: 'Open favorites'
    },
    {
      key: '/',
      callback: () => setShowKeyboardHelp(true),
      description: 'Show shortcuts'
    },
    {
      key: 'Escape',
      callback: () => {
        setShowHistory(false);
        setShowStats(false);
        setShowFavorites(false);
        setShowKeyboardHelp(false);
        setShowTips(false);
        setShowExportImport(false);
      },
      description: 'Close modals'
    },
  ]);

  // Paste from clipboard with smart URL detection
  const handlePaste = async () => {
    try {
      setPasting(true);
      const text = await navigator.clipboard.readText();
      if (text.trim()) {
        // Smart URL extraction
        const cleanUrl = extractURL(text);
        setUrl(cleanUrl);
        
        // Validate platform
        if (cleanUrl && !isValidPlatformURL(cleanUrl)) {
          setError("Please enter a valid Facebook or Instagram URL");
        } else {
          setError("");
        }
      }
    } catch (err) {
      console.error("Failed to paste:", err);
      setError("Failed to paste from clipboard. Please paste manually or check browser permissions.");
    } finally {
      setPasting(false);
    }
  };

  // Save to history
  const addToHistory = (data: VideoData) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      url: url,
      platform: data.platform || "unknown",
      title: data.title || "Untitled Video",
      thumbnail: data.thumbnail || "",
      timestamp: Date.now(),
    };

    const updatedHistory = [newItem, ...history].slice(0, 10); // Keep last 10
    setHistory(updatedHistory);
    localStorage.setItem("downloadHistory", JSON.stringify(updatedHistory));
  };

  // Copy URL to clipboard
  const copyToClipboard = () => {
    if (videoData?.downloadUrl) {
      navigator.clipboard.writeText(videoData.downloadUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Share functionality
  const handleShare = async () => {
    if (videoData?.downloadUrl && navigator.share) {
      try {
        await navigator.share({
          title: videoData.title || "Video",
          text: "Check out this video!",
          url: videoData.downloadUrl,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    }
  };

  const detectPlatform = (url: string): string | null => {
    if (url.includes("facebook.com") || url.includes("fb.watch") || url.includes("fb.com")) {
      return "facebook";
    }
    if (url.includes("instagram.com")) {
      return "instagram";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setVideoData(null);

    if (!url.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    const platform = detectPlatform(url);
    if (!platform) {
      setError("Please enter a valid Facebook or Instagram URL");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/download/${platform}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (data.success) {
        setVideoData(data);
        addToHistory(data);
        
        // Show notification
        if (notificationsSupported) {
          showNotification("Video Ready! 🎉", {
            body: `Your ${data.platform} video is ready to download`,
            icon: "/icon-192.png",
          });
        }
      } else {
        setError(data.error || "Failed to fetch video. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (videoData?.downloadUrl) {
      window.open(videoData.downloadUrl, "_blank");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      {/* Community Navbar */}
      <CommunityNavbar
        onStatsClick={() => setShowStats(true)}
        onFavoritesClick={() => setShowFavorites(true)}
        onHistoryClick={() => setShowHistory(true)}
        onKeyboardClick={() => setShowKeyboardHelp(true)}
        onTipsClick={() => setShowTips(true)}
        onExportClick={() => setShowExportImport(true)}
        historyCount={history.length}
      />

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 pt-20 sm:pt-24 pb-6 sm:pb-8 lg:pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/community"
            className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Services</span>
          </Link>

          {/* History Panel */}
          {showHistory && (
            <DownloadHistory 
              history={history} 
              onClose={() => setShowHistory(false)}
              onSelectUrl={(urlValue: string) => {
                setUrl(urlValue);
                setShowHistory(false);
              }}
              onClearHistory={() => {
                setHistory([]);
                localStorage.removeItem("downloadHistory");
              }}
            />
          )}

          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12 animate-fadeIn">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Fast & Free
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4 px-2">
              <span className="block sm:inline">Facebook & Instagram</span>{" "}
              <span className="block sm:inline bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Video Downloader
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 px-4 max-w-4xl mx-auto leading-relaxed">
              Download FB Videos, Instagram Reels & IGTV Free - <span className="font-semibold text-purple-600 dark:text-purple-400">No Watermark</span>, <span className="font-semibold text-pink-600 dark:text-pink-400">HD Quality</span>
            </p>
            
            {/* Platform Icons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 px-4">
              <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-3 sm:px-4 py-2 rounded-full shadow-sm">
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Facebook</span>
              </div>
              <div className="flex items-center gap-2 bg-pink-100 dark:bg-pink-900/30 px-3 sm:px-4 py-2 rounded-full shadow-sm">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600 dark:text-pink-400" />
                <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Instagram</span>
              </div>
            </div>

            {/* Quick Stats - shows user's download statistics */}
            <QuickStats />
          </div>

          {/* Search Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 animate-fadeIn">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Paste Video URL
                </label>
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://www.facebook.com/... or https://www.instagram.com/..."
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-20 sm:pr-24 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all touch-manipulation"
                    disabled={loading}
                  />
                  
                  {/* Action buttons container */}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {/* Paste button */}
                    {!url && !loading && (
                      <button
                        type="button"
                        onClick={handlePaste}
                        disabled={pasting}
                        className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 rounded-md transition-all touch-manipulation active:scale-95 disabled:opacity-50"
                        aria-label="Paste from clipboard"
                        title="Paste from clipboard"
                      >
                        <Clipboard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm font-medium">Paste</span>
                      </button>
                    )}
                    
                    {/* Clear button */}
                    {url && !loading && (
                      <button
                        type="button"
                        onClick={() => setUrl("")}
                        className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all touch-manipulation active:scale-95"
                        aria-label="Clear URL"
                        title="Clear URL"
                      >
                        <span className="text-lg">✕</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <button
                id="submit-button"
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 text-sm sm:text-base touch-manipulation shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Get Video</span>
                  </>
                )}
              </button>
            </form>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg animate-fadeIn">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-red-700 dark:text-red-300 text-sm whitespace-pre-line">{error}</p>
                    <a 
                      href="/TROUBLESHOOTING.md" 
                      target="_blank"
                      className="text-xs text-red-600 dark:text-red-400 hover:underline mt-2 inline-block"
                    >
                      View troubleshooting guide →
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {videoData?.success && (
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3 animate-fadeIn">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-green-700 dark:text-green-300 text-sm">Video found! Click download to save it.</p>
              </div>
            )}
          </div>

          {/* Loading State */}
          {loading && <LoadingSpinner />}

          {/* Video Card */}
          {videoData?.success && !loading && (
            <>
              {videoData.qualities && videoData.qualities.length > 1 && (
                <QualitySelector
                  qualities={videoData.qualities}
                  selectedQuality={selectedQuality}
                  onSelectQuality={setSelectedQuality}
                />
              )}
              <VideoCard 
                videoData={videoData} 
                onDownload={handleDownload}
                onCopy={copyToClipboard}
                onShare={handleShare}
                copied={copied}
              />
            </>
          )}

          {/* Disclaimer */}
          <div className="mt-8 sm:mt-12 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 sm:p-6">
            <h3 className="font-semibold text-sm sm:text-base text-yellow-800 dark:text-yellow-300 mb-2 sm:mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Important Legal Notice</span>
            </h3>
            <ul className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-400 space-y-1 sm:space-y-1.5 list-disc list-inside pl-1">
              <li>Only download videos you own or have permission to use</li>
              <li>Respect copyright laws and content creators&apos; rights</li>
              <li>This tool is for personal, educational use only</li>
              <li>We are not responsible for any misuse of downloaded content</li>
              <li>Downloading may violate platform Terms of Service</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md mt-8 sm:mt-12 py-4 sm:py-6">
        <div className="container mx-auto px-3 sm:px-4 text-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
          <p>© 2025 Social Video Downloader. Use responsibly and legally.</p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
            Made with ❤️ for educational purposes
          </p>
          <button
            onClick={() => setShowKeyboardHelp(true)}
            className="mt-2 text-xs text-purple-600 dark:text-purple-400 hover:underline"
          >
            Press <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">/</kbd> for keyboard shortcuts
          </button>
        </div>
      </footer>

      {/* Modals */}
      {showStats && <StatsDashboard onClose={() => setShowStats(false)} />}
      {showFavorites && (
        <FavoritesPanel
          onClose={() => setShowFavorites(false)}
          onSelectUrl={(urlValue: string) => {
            setUrl(urlValue);
            setShowFavorites(false);
            inputRef.current?.focus();
          }}
        />
      )}
      {showKeyboardHelp && <KeyboardShortcutsHelp onClose={() => setShowKeyboardHelp(false)} />}
      {showTips && <TipsModal onClose={() => setShowTips(false)} />}
      {showExportImport && <ExportImport onClose={() => setShowExportImport(false)} />}
    </main>
  );
}

