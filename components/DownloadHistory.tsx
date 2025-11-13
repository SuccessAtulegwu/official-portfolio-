import { X, Trash2, ExternalLink, Clock } from "lucide-react";
import Image from "next/image";

interface HistoryItem {
  id: string;
  url: string;
  platform: string;
  title: string;
  thumbnail: string;
  timestamp: number;
}

interface DownloadHistoryProps {
  history: HistoryItem[];
  onClose: () => void;
  onSelectUrl: (url: string) => void;
  onClearHistory: () => void;
}

export default function DownloadHistory({
  history,
  onClose,
  onSelectUrl,
  onClearHistory,
}: DownloadHistoryProps) {
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4">
      <div className="bg-white dark:bg-gray-800 w-full sm:max-w-2xl sm:rounded-2xl shadow-2xl overflow-hidden h-full sm:h-auto sm:max-h-[85vh] flex flex-col animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
              Download History
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors touch-manipulation active:scale-95"
            aria-label="Close history"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
              <Clock className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                No download history yet
              </p>
              <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mt-2">
                Your recent downloads will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="group bg-gray-50 dark:bg-gray-700/50 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex gap-3 sm:gap-4">
                    {/* Thumbnail */}
                    {item.thumbnail && (
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-600">
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    )}

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-white line-clamp-2 mb-1 sm:mb-2">
                        {item.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full text-xs font-medium uppercase">
                          {item.platform}
                        </span>
                        <span>{formatTimestamp(item.timestamp)}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-2 sm:mt-3">
                        <button
                          onClick={() => onSelectUrl(item.url)}
                          className="text-xs sm:text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium flex items-center gap-1 touch-manipulation"
                        >
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Use URL</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
            <button
              onClick={onClearHistory}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg transition-colors text-sm sm:text-base font-medium touch-manipulation active:scale-95"
            >
              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Clear History</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}







