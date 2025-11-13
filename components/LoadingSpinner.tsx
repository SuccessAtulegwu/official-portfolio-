import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-8 sm:p-12 animate-fadeIn">
      <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4">
        <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-purple-600 animate-spin" />
        <div className="text-center px-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-1 sm:mb-2">
            Processing Video
          </h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Please wait while we fetch your video...
          </p>
        </div>
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  );
}

