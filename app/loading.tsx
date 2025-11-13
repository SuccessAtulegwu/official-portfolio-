export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        {/* Animated gradient spinner */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 animate-spin"></div>
          <div className="absolute inset-2 rounded-full bg-black"></div>
        </div>
        
        {/* Loading text with gradient */}
        <p className="text-xl font-semibold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}






