import React, { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
  src: string;
  type: string;
  className?: string;
  poster?: string;
  preload?: 'none' | 'metadata' | 'auto';
  eager?: boolean; // Load immediately without waiting for intersection
}

const LazyVideo: React.FC<LazyVideoProps> = ({ 
  src, 
  type, 
  className, 
  poster,
  preload = 'none',
  eager = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // If eager, start as intersecting so video loads immediately on mount
  const [isIntersecting, setIntersecting] = useState(eager);
  const [isMounted, setIsMounted] = useState(false);

  // Track client mount to avoid SSR/hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (eager) return; // Skip observer for eager-loaded videos

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin: "50px" }
    );

    const videoEl = videoRef.current;
    if (videoEl) observer.observe(videoEl);
    return () => { if (videoEl) observer.unobserve(videoEl); };
  }, [eager]);

  useEffect(() => {
    if (!isMounted || !isIntersecting || !videoRef.current) return;
    const video = videoRef.current;
    if (!video.src || video.src !== src) {
      video.src = src;
      video.load();
    }
    video.play().catch(() => {});
  }, [isMounted, isIntersecting, src]);

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      preload={eager ? 'auto' : preload}
      poster={poster}
      className={className}
      aria-label="Background video"
    >
      {/* Only render source tag client-side to avoid hydration mismatch */}
      {isMounted && isIntersecting && <source src={src} type={type} />}
    </video>
  );
};

export default LazyVideo;
