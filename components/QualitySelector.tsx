import { Sparkles } from "lucide-react";

interface QualitySelectorProps {
  qualities: { quality: string; url: string }[];
  selectedQuality: string;
  onSelectQuality: (quality: string) => void;
}

export default function QualitySelector({
  qualities,
  selectedQuality,
  onSelectQuality,
}: QualitySelectorProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6 animate-fadeIn">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
        <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white">
          Select Quality
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {qualities.map((item) => (
          <button
            key={item.quality}
            onClick={() => onSelectQuality(item.quality)}
            className={`
              px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all touch-manipulation active:scale-95
              ${
                selectedQuality === item.quality
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }
            `}
          >
            {item.quality.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}







