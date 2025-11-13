import { TrendingUp, Download as DownloadIcon, Target } from "lucide-react";
import { useStats } from "@/hooks/useStats";

export default function QuickStats() {
  const stats = useStats();

  if (stats.totalDownloads === 0) return null;

  return (
    <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
      <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-1">
          <DownloadIcon className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
          <span className="text-xs text-gray-600 dark:text-gray-400">Total</span>
        </div>
        <div className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">
          {stats.totalDownloads}
        </div>
      </div>

      <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-1">
          <Target className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
          <span className="text-xs text-gray-600 dark:text-gray-400">This Week</span>
        </div>
        <div className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">
          {stats.thisWeek}
        </div>
      </div>

      <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm sm:text-base">🔥</span>
          <span className="text-xs text-gray-600 dark:text-gray-400">Streak</span>
        </div>
        <div className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">
          {stats.streak}
        </div>
      </div>
    </div>
  );
}







