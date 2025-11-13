export default function CommunityLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      {/* Navbar skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="w-12 h-8 bg-gray-700 rounded animate-pulse"></div>
          <div className="hidden lg:flex gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-20 h-6 bg-gray-700 rounded animate-pulse"></div>
            ))}
          </div>
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-8 h-8 bg-gray-700 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Header skeleton */}
          <div className="text-center mb-8 space-y-4">
            <div className="h-12 bg-gray-700/30 rounded-lg w-3/4 mx-auto animate-pulse"></div>
            <div className="h-6 bg-gray-700/30 rounded-lg w-1/2 mx-auto animate-pulse"></div>
          </div>

          {/* Input skeleton */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 animate-pulse">
            <div className="h-14 bg-gray-700/30 rounded-lg mb-4"></div>
            <div className="h-12 bg-gradient-to-r from-purple-600/50 to-pink-600/50 rounded-lg"></div>
          </div>

          {/* Cards skeleton */}
          <div className="grid md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 animate-pulse">
                <div className="h-32 bg-gray-700/30 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-700/30 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-700/30 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pulsing effect overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 pointer-events-none animate-pulse"></div>
    </div>
  );
}






