import { TrendingUp, Calendar, Award, Target, Facebook, Instagram, X } from "lucide-react";
import { useStats } from "@/hooks/useStats";

interface StatsDashboardProps {
  onClose: () => void;
}

export default function StatsDashboard({ onClose }: StatsDashboardProps) {
  const stats = useStats();

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 w-full sm:max-w-4xl sm:rounded-2xl shadow-2xl overflow-hidden h-full sm:h-auto sm:max-h-[90vh] flex flex-col animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
              Your Statistics
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors touch-manipulation active:scale-95"
            aria-label="Close statistics"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Main Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {/* Total Downloads */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                {stats.totalDownloads}
              </div>
              <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">
                Total Downloads
              </div>
            </div>

            {/* This Week */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {stats.thisWeek}
              </div>
              <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">
                This Week
              </div>
            </div>

            {/* This Month */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/30 rounded-xl p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl font-bold text-pink-600 dark:text-pink-400 mb-1">
                {stats.thisMonth}
              </div>
              <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">
                This Month
              </div>
            </div>

            {/* Streak */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-1 flex items-center gap-1">
                {stats.streak}
                {stats.streak > 0 && <span>🔥</span>}
              </div>
              <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">
                Day Streak
              </div>
            </div>
          </div>

          {/* Platform Distribution */}
          <div className="bg-white dark:bg-gray-700/50 rounded-xl p-4 sm:p-6 mb-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              Platform Usage
            </h3>
            
            <div className="space-y-4">
              {/* Facebook */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">Facebook</span>
                  </div>
                  <span className="text-sm sm:text-base font-bold text-gray-800 dark:text-white">
                    {stats.byPlatform.facebook}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 sm:h-3">
                  <div
                    className="bg-blue-600 h-2 sm:h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${stats.totalDownloads > 0 ? (stats.byPlatform.facebook / stats.totalDownloads) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>

              {/* Instagram */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />
                    <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">Instagram</span>
                  </div>
                  <span className="text-sm sm:text-base font-bold text-gray-800 dark:text-white">
                    {stats.byPlatform.instagram}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 sm:h-3">
                  <div
                    className="bg-pink-600 h-2 sm:h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${stats.totalDownloads > 0 ? (stats.byPlatform.instagram / stats.totalDownloads) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Average Per Day */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-800/30 rounded-xl p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                <h4 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white">Average Per Day</h4>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">
                {stats.averagePerDay}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                downloads per day
              </p>
            </div>

            {/* Most Active Day */}
            <div className="bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-900/30 dark:to-amber-800/30 rounded-xl p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 dark:text-yellow-400" />
                <h4 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white">Most Active Day</h4>
              </div>
              <div className="text-sm sm:text-base font-bold text-yellow-600 dark:text-yellow-400">
                {stats.mostActiveDay}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                your busiest day
              </p>
            </div>
          </div>

          {/* Motivational Message */}
          {stats.totalDownloads > 0 && (
            <div className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 sm:p-6 text-white">
              <div className="text-center">
                {stats.totalDownloads >= 100 && (
                  <>
                    <div className="text-3xl sm:text-4xl mb-2">🏆</div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1">Power User!</h3>
                    <p className="text-sm opacity-90">You've downloaded {stats.totalDownloads} videos! Amazing!</p>
                  </>
                )}
                {stats.totalDownloads >= 50 && stats.totalDownloads < 100 && (
                  <>
                    <div className="text-3xl sm:text-4xl mb-2">⭐</div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1">Great Progress!</h3>
                    <p className="text-sm opacity-90">{stats.totalDownloads} downloads and counting!</p>
                  </>
                )}
                {stats.totalDownloads >= 10 && stats.totalDownloads < 50 && (
                  <>
                    <div className="text-3xl sm:text-4xl mb-2">🎯</div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1">Keep Going!</h3>
                    <p className="text-sm opacity-90">You're building a great collection!</p>
                  </>
                )}
                {stats.totalDownloads < 10 && (
                  <>
                    <div className="text-3xl sm:text-4xl mb-2">🚀</div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1">Just Getting Started!</h3>
                    <p className="text-sm opacity-90">Keep downloading and track your progress!</p>
                  </>
                )}
              </div>
            </div>
          )}

          {stats.totalDownloads === 0 && (
            <div className="mt-6 text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                No Downloads Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Start downloading videos to see your statistics!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

