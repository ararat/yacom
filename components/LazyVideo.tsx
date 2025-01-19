import React, { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
  src: string;
  type: string;
  className?: string;
}

const LazyVideo: React.FC<LazyVideoProps> = ({ src, type, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isIntersecting, setIntersecting] = useState(false);

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
    if (isIntersecting && videoRef.current) {
      videoRef.current.play();
    }
  }, [isIntersecting]);

  return (
    <video
      ref={videoRef}
      autoPlay={isIntersecting}
      loop
      muted
      playsInline
      className={className}
    >
      <source src={src} type={type} />
      Your browser does not support the video tag.
    </video>
  );
};

export default LazyVideo;
