import { X, Lightbulb, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const tips = [
  {
    id: "paste-shortcut",
    title: "⌨️ Quick Paste",
    description: "Press Ctrl/Cmd + V to paste URLs instantly without clicking the paste button.",
    category: "shortcuts"
  },
  {
    id: "history-redownload",
    title: "🔄 Redownload Videos",
    description: "Click any video in your history to download it again. Your history saves the last 10 downloads.",
    category: "features"
  },
  {
    id: "favorites",
    title: "⭐ Save Favorites",
    description: "Add your favorite channels to quickly download from them anytime. Click the star icon to manage favorites.",
    category: "features"
  },
  {
    id: "stats-streak",
    title: "🔥 Build Your Streak",
    description: "Download at least one video each day to build your streak! View your stats with Ctrl/Cmd + D.",
    category: "engagement"
  },
  {
    id: "keyboard-nav",
    title: "🚀 Master Keyboard Navigation",
    description: "Press '/' to see all keyboard shortcuts. Power users can do everything without touching the mouse!",
    category: "shortcuts"
  },
  {
    id: "public-videos",
    title: "🔓 Use Public Videos",
    description: "Private videos won't work. Always use public video links for best results.",
    category: "tips"
  },
  {
    id: "copy-share",
    title: "📋 Copy & Share",
    description: "Use the Copy URL button to quickly copy video links, or Share to send via your device's share menu.",
    category: "features"
  },
  {
    id: "mobile-optimized",
    title: "📱 Mobile Friendly",
    description: "This app works perfectly on your phone! All features are touch-optimized for mobile use.",
    category: "tips"
  },
  {
    id: "no-registration",
    title: "🎉 No Registration Needed",
    description: "Everything is saved locally on your device. No accounts, no tracking, completely private.",
    category: "privacy"
  },
  {
    id: "multiple-quality",
    title: "🎬 HD Quality",
    description: "Videos are downloaded in the best available quality, including HD when available.",
    category: "features"
  }
];

interface TipsModalProps {
  onClose: () => void;
}

export default function TipsModal({ onClose }: TipsModalProps) {
  const [seenTips, setSeenTips] = useLocalStorage<string[]>("seenTips", []);
  const [currentTip, setCurrentTip] = useState(0);

  const markAsSeen = () => {
    if (!seenTips.includes(tips[currentTip].id)) {
      setSeenTips([...seenTips, tips[currentTip].id]);
    }
  };

  const nextTip = () => {
    markAsSeen();
    if (currentTip < tips.length - 1) {
      setCurrentTip(currentTip + 1);
    } else {
      onClose();
    }
  };

  const skipAll = () => {
    setSeenTips(tips.map(t => t.id));
    onClose();
  };

  const unseenTips = tips.filter(t => !seenTips.includes(t.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="flex items-center gap-3">
            <Lightbulb className="w-6 h-6" />
            <div>
              <h2 className="text-xl font-bold">
                Did You Know?
              </h2>
              <p className="text-sm opacity-90">
                Tip {currentTip + 1} of {tips.length}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
              {tips[currentTip].title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {tips[currentTip].description}
            </p>
          </div>

          {/* Progress Dots */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {tips.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentTip
                    ? "w-8 bg-purple-600"
                    : index < currentTip
                    ? "w-2 bg-purple-400"
                    : "w-2 bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {currentTip < tips.length - 1 ? (
              <>
                <button
                  onClick={skipAll}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                  Skip All
                </button>
                <button
                  onClick={nextTip}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  Next Tip
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  markAsSeen();
                  onClose();
                }}
                className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors font-medium"
              >
                Got It!
              </button>
            )}
          </div>

          {unseenTips.length > 0 && unseenTips.length < tips.length && (
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
              {unseenTips.length} unseen tip{unseenTips.length > 1 ? 's' : ''} remaining
            </p>
          )}
        </div>
      </div>
    </div>
  );
}







