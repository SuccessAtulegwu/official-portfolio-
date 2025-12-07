"use client";

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3); // 30% volume by default
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Initialize audio on first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log('Audio autoplay prevented:', err);
        });
      }
      // Remove listeners after first interaction
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [isPlaying]);

  // Update audio volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.error('Error playing audio:', err);
        });
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  return (
    <>
      {/* Hidden audio element - Replace the src with your audio file */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="/audio/background-music.mp3" // Add your audio file here
      />

      {/* Floating Music Control Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div
          className="relative"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          {/* Expanded Controls */}
          <div
            className={`absolute bottom-0 right-0 transition-all duration-300 ${
              showControls
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2 pointer-events-none'
            }`}
          >
            <div className="bg-black/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-4 shadow-2xl min-w-[200px] mb-2">
              {/* Header */}
              <div className="flex items-center gap-2 mb-3">
                <Music className="w-4 h-4 text-primary" />
                <span className="text-white text-sm font-semibold">Background Music</span>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-3 mb-3">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-primary transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #fffc36 0%, #fffc36 ${(isMuted ? 0 : volume) * 100}%, #374151 ${(isMuted ? 0 : volume) * 100}%, #374151 100%)`
                  }}
                />
              </div>

              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="w-full px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary rounded-lg transition-all text-sm font-medium"
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
            </div>
          </div>

          {/* Main Floating Button */}
          <button
            onClick={togglePlay}
            className={`group relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-primary via-amber-400 to-primary bg-[length:200%_100%] text-black rounded-full hover:bg-[position:100%_0] transition-all duration-500 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 hover:scale-110 overflow-hidden ${
              isPlaying ? 'animate-pulse' : ''
            }`}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            {/* Icon */}
            <div className="relative z-10">
              {isPlaying ? (
                isMuted ? (
                  <VolumeX className="w-6 h-6" />
                ) : (
                  <Volume2 className="w-6 h-6" />
                )
              ) : (
                <Music className="w-6 h-6" />
              )}
            </div>

            {/* Pulse ring effect */}
            {isPlaying && (
              <div className="absolute inset-0 rounded-full border-2 border-primary opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
            )}

            {/* Playing indicator - animated sound waves */}
            {isPlaying && !isMuted && (
              <div className="absolute -top-1 -right-1 w-3 h-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </div>
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #fffc36;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(255, 252, 54, 0.5);
        }

        .slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #fffc36;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(255, 252, 54, 0.5);
        }
      `}</style>
    </>
  );
}

