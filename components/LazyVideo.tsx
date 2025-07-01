import React, { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
  src: string;
  type: string;
  className?: string;
  poster?: string;
  preload?: 'none' | 'metadata' | 'auto';
}

const LazyVideo: React.FC<LazyVideoProps> = ({ 
  src, 
  type, 
  className, 
  poster,
  preload = 'none'
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isIntersecting, setIntersecting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: "50px",
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isIntersecting && videoRef.current && !isLoaded) {
      // Load video source when intersecting
      const video = videoRef.current;
      if (!video.src || video.src !== src) {
        video.src = src;
        video.load();
        setIsLoaded(true);
      }
    }
  }, [isIntersecting, src, isLoaded]);

  useEffect(() => {
    if (isIntersecting && videoRef.current && isLoaded) {
      videoRef.current.play().catch(() => {
        // Auto-play prevented, handle gracefully
      });
    }
  }, [isIntersecting, isLoaded]);

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      preload={preload}
      poster={poster}
      className={className}
      aria-label="Background video"
      loading="lazy"
    >
      {isIntersecting && <source src={src} type={type} />}
      <div className="absolute inset-0 bg-amber-600 flex items-center justify-center text-white">
        Your browser does not support video backgrounds.
      </div>
    </video>
  );
};

export default LazyVideo;
