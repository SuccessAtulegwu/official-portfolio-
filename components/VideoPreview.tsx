import { X, Play } from "lucide-react";
import { useEffect, useRef } from "react";

interface VideoPreviewProps {
  videoUrl: string;
  title: string;
  onClose: () => void;
}

export default function VideoPreview({ videoUrl, title, onClose }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-2 sm:p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl bg-black rounded-lg sm:rounded-xl overflow-hidden shadow-2xl animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-2.5 rounded-full transition-all touch-manipulation active:scale-95"
          aria-label="Close preview"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Video Player */}
        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            autoPlay
            className="w-full h-full"
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Title */}
        {title && (
          <div className="bg-gray-900 px-4 py-3 sm:px-6 sm:py-4">
            <h3 className="text-white text-sm sm:text-base font-medium line-clamp-2">
              {title}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}







