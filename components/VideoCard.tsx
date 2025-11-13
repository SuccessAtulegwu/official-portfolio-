import { Download, Clock, User, Copy, Share2, CheckCircle, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface VideoCardProps {
  videoData: {
    platform?: string;
    title?: string;
    thumbnail?: string;
    duration?: string;
    author?: string;
    downloadUrl?: string;
  };
  onDownload: () => void;
  onCopy?: () => void;
  onShare?: () => void;
  copied?: boolean;
}

export default function VideoCard({ videoData, onDownload, onCopy, onShare, copied }: VideoCardProps) {
  const [showPreview, setShowPreview] = useState(false);
  const canShare = typeof navigator !== 'undefined' && navigator.share;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden animate-fadeIn">
      {/* Thumbnail */}
      {videoData.thumbnail && (
        <div className="relative w-full aspect-video bg-gray-200 dark:bg-gray-700 group">
          <Image
            src={videoData.thumbnail}
            alt={videoData.title || "Video thumbnail"}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          
          {/* Play Icon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white/90 dark:bg-gray-900/90 rounded-full p-4 sm:p-6 transform group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 sm:w-12 sm:h-12 text-purple-600" fill="currentColor" />
            </div>
          </div>
          
          {videoData.duration && (
            <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-black/80 text-white px-2 sm:px-3 py-1 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              {videoData.duration}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Title */}
        {videoData.title && (
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-3 line-clamp-2">
            {videoData.title}
          </h3>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
          {videoData.author && (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="truncate max-w-[150px] sm:max-w-none">{videoData.author}</span>
            </div>
          )}
          {videoData.platform && (
            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 sm:px-3 py-1 rounded-full text-xs font-medium uppercase">
              {videoData.platform}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 sm:space-y-3">
          {/* Main Download Button */}
          <button
            onClick={onDownload}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 active:scale-[0.98] text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base touch-manipulation"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Download Video</span>
          </button>

          {/* Secondary Actions */}
          <div className="grid grid-cols-2 gap-2">
            {/* Copy Button */}
            {onCopy && (
              <button
                onClick={onCopy}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-all text-xs sm:text-sm font-medium touch-manipulation active:scale-95"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
                    <span className="hidden sm:inline">Copied!</span>
                    <span className="sm:hidden">✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>
            )}

            {/* Share Button */}
            {onShare && canShare && (
              <button
                onClick={onShare}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-all text-xs sm:text-sm font-medium touch-manipulation active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Share</span>
              </button>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <p className="mt-3 sm:mt-4 text-xs text-gray-500 dark:text-gray-400 text-center leading-relaxed">
          Clicking download will open the video in a new tab. Right-click to save.
        </p>
      </div>
    </div>
  );
}

