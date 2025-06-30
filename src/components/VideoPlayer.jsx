import React, { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeMute,
  FaVolumeUp,
  FaExpand,
  FaEllipsisV,
  FaDownload,
} from "react-icons/fa";

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const VideoPlayer = ({ src, name }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  // Scroll-based autoplay
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const video = videoRef.current;
        if (entry.isIntersecting && video) {
          video.play().catch(() => {});
          setIsPlaying(true);
        }
      },
      { threshold: 0.6 }
    );

    const currentVideo = videoRef.current;
    if (currentVideo) observer.observe(currentVideo);

    return () => {
      if (currentVideo) observer.unobserve(currentVideo);
    };
  }, []);

  // Video + fullscreen listeners
  useEffect(() => {
    const currentVideo = videoRef.current;
    if (!currentVideo) return;

    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };

    const updateTime = () => setCurrentTime(currentVideo.currentTime);
    const setVideoDuration = () => setDuration(currentVideo.duration);
    const updatePlayState = () => setIsPlaying(!currentVideo.paused);

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    currentVideo.addEventListener("timeupdate", updateTime);
    currentVideo.addEventListener("loadedmetadata", setVideoDuration);
    currentVideo.addEventListener("play", updatePlayState);
    currentVideo.addEventListener("pause", updatePlayState);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      currentVideo.removeEventListener("timeupdate", updateTime);
      currentVideo.removeEventListener("loadedmetadata", setVideoDuration);
      currentVideo.removeEventListener("play", updatePlayState);
      currentVideo.removeEventListener("pause", updatePlayState);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);

      if (isMobile && video.requestFullscreen) {
        video.parentElement.requestFullscreen().catch(() => {});
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen().catch(() => {});
    }
  };

  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-black group"
      data-scroll-lock
    >
      <video
        ref={videoRef}
        className={`w-full ${
          isFullscreen ? "h-screen object-contain" : "h-64 object-cover"
        }`}
        muted
        playsInline
        preload="none"
        loading="lazy"
        controlsList="nodownload"
        onClick={togglePlay}
        style={{
          willChange: "transform, opacity",
          contain: "strict",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Controls */}
      <div className="absolute bottom-10 left-0 w-full px-3 py-1 hidden group-hover:flex justify-between items-center text-xs">
        <div className="flex items-center space-x-3">
          <button onClick={togglePlay} aria-label="Play/Pause">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <span>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
        <div className="relative flex items-center space-x-3">
          <button onClick={toggleMute} aria-label="Mute/Unmute">
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <button onClick={toggleFullscreen} aria-label="Fullscreen">
            <FaExpand />
          </button>
          <button
            onClick={() => setShowSettings((prev) => !prev)}
            aria-label="Settings"
          >
            <FaEllipsisV />
          </button>

          {showSettings && (
            <div className="absolute right-0 bottom-full mb-2 bg-black text-white text-sm border rounded shadow-lg z-10 w-48">
              <div
                className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex justify-between"
                onClick={() => setShowSettings("speed")}
              >
                <span>Playback speed</span>
                <span>›</span>
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex"
                onClick={() => window.open(src, "_blank")}
              >
                <FaDownload className="mr-2" /> Download
              </div>
            </div>
          )}

          {showSettings === "speed" && (
            <div className="absolute right-48 bottom-full mb-2 bg-black text-white border z-20 w-32 text-sm rounded shadow-lg">
              {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                <div
                  key={rate}
                  className="px-4 py-1 hover:bg-gray-800 cursor-pointer text-center"
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.playbackRate = rate;
                      setShowSettings(false);
                    }
                  }}
                >
                  {rate === 1 ? "Normal" : rate + "x"}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Seekbar */}
      {isFullscreen && (
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={(e) => {
            if (videoRef.current)
              videoRef.current.currentTime = parseFloat(e.target.value);
          }}
          className="w-full absolute bottom-8"
        />
      )}

      {/* Video label */}
      <div className="absolute bottom-2 left-2 px-3 py-1 text-xs rounded-md bg-black bg-opacity-50">
        {name}
      </div>
    </div>
  );
};

export default VideoPlayer;
