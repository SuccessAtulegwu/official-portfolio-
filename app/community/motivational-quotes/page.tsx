"use client";

import { useState, useEffect, useMemo } from "react";
import CommunityNavbar from "@/components/CommunityNavbar";
import { Quote, Copy, Share2, Download } from "lucide-react";

interface QuoteType {
  text: string;
  author: string;
  category: string;
}

const quotes: QuoteType[] = [
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "Success"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "Work"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    category: "Inspiration"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "Dreams"
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
    category: "Work"
  },
  {
    text: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair",
    category: "Fear"
  },
  {
    text: "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau",
    category: "Success"
  },
  {
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt",
    category: "Inspiration"
  },
  {
    text: "Life is what happens while you're busy making other plans.",
    author: "John Lennon",
    category: "Life"
  },
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
    category: "Success"
  },
  {
    text: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu",
    category: "Inspiration"
  },
  {
    text: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    author: "Zig Ziglar",
    category: "Success"
  },
  {
    text: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson",
    category: "Life"
  },
  {
    text: "The harder you work for something, the greater you'll feel when you achieve it.",
    author: "Anonymous",
    category: "Work"
  },
  {
    text: "Don't be afraid to give up the good to go for the great.",
    author: "John D. Rockefeller",
    category: "Success"
  }
];

export default function MotivationalQuotesPage() {
  const [displayedQuotes, setDisplayedQuotes] = useState<QuoteType[]>(quotes.slice(0, 6));
  const [copied, setCopied] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [canShare, setCanShare] = useState<boolean>(false);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(quotes.map(q => q.category)));
    cats.sort((a, b) => a.localeCompare(b));
    return ["All", ...cats];
  }, []);

  const filteredQuotes = selectedCategory === "All"
    ? quotes
    : quotes.filter(quote => quote.category === selectedCategory);

  useEffect(() => {
    setDisplayedQuotes(filteredQuotes.slice(0, 6));
  }, [selectedCategory]);

  // Detect share API support safely on client
  useEffect(() => {
    try {
      setCanShare(typeof navigator !== 'undefined' && typeof (navigator as any).share === 'function');
    } catch {
      setCanShare(false);
    }
  }, []);

  const handleLoadMore = () => {
    const currentLength = displayedQuotes.length;
    const newQuotes = filteredQuotes.slice(currentLength, currentLength + 6);
    setDisplayedQuotes([...displayedQuotes, ...newQuotes]);
  };

  const handleCopy = async (text: string, author: string, index: number) => {
    await navigator.clipboard.writeText(`"${text}" - ${author}`);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleShare = async (text: string, author: string) => {
    try {
      await (navigator as any).share({
        title: 'Motivational Quote',
        text: `"${text}" - ${author}`,
        url: window.location.href
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleDownload = (text: string, author: string) => {
    const element = document.createElement('a');
    const quoteText = `"${text}" - ${author}`;
    const fileUrl = URL.createObjectURL(new Blob([quoteText], { type: 'text/plain' }));
    element.href = fileUrl;
    element.download = 'motivational-quote.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    // Cleanup the object URL to avoid memory leaks
    setTimeout(() => URL.revokeObjectURL(fileUrl), 0);
  };

  const [showStats, setShowStats] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [showExport, setShowExport] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <CommunityNavbar 
        onStatsClick={() => setShowStats(true)}
        onFavoritesClick={() => setShowFavorites(true)}
        onHistoryClick={() => setShowHistory(true)}
        onKeyboardClick={() => setShowKeyboard(true)}
        onTipsClick={() => setShowTips(true)}
        onExportClick={() => setShowExport(true)}
        historyCount={0}
      />

      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">
              Daily Motivational Quotes
            </h1>
            <p className="text-gray-400">
              Find inspiration in our collection of carefully curated quotes
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${selectedCategory === category
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Quotes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {displayedQuotes.map((quote, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 transform hover:scale-[1.02] transition-transform"
              >
                <div className="relative">
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                    <Quote className="w-3 h-3 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-white mb-4 leading-relaxed">
                      "{quote.text}"
                    </p>
                    <p className="text-yellow-500 font-medium mb-6">
                      - {quote.author}
                    </p>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => handleCopy(quote.text, quote.author, index)}
                        className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                        title={copied === index ? "Copied!" : "Copy to Clipboard"}
                      >
                        <Copy className={`w-4 h-4 ${copied === index ? "text-green-500" : "text-gray-400"}`} />
                      </button>
                      {canShare && (
                        <button
                          onClick={() => handleShare(quote.text, quote.author)}
                          className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                          title="Share Quote"
                        >
                          <Share2 className="w-4 h-4 text-gray-400" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDownload(quote.text, quote.author)}
                        className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                        title="Download Quote"
                      >
                        <Download className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {displayedQuotes.length < filteredQuotes.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Load More Quotes
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}