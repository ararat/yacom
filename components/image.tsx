import Image from 'next/image';
import React, { FC } from "react";


// Define your component props
type ImageProperties = {
  src: string;
  width: string;
  height: string;
  quality: number;
}

type ImgProps = {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  quality?: string | number;
  className?: string;
  loading?: 'lazy' | 'eager';
  layout?: string;
  priority?: boolean;
}
const cloudflareImageLoader = ({ src, width, height, quality }: ImageProperties) => {
  if (!quality) {
    quality = 75
  }
  // src should already be handled by the component, so we can trust it exists
  return `https://image-resize.yuvalararat.workers.dev?width=${width}&height=${height}&quality=${quality}&image=${process.env.site_address}${src}`
}

export default function Img(props: ImgProps) {
  const { alt, loading, className = '', priority, ...restProps } = props;
  
  // Don't use lazy loading if priority is set
  const effectiveLoading = priority ? 'eager' : (loading || 'lazy');
  
  // Handle missing src by using fallback image
  const finalSrc = (!props.src || props.src.length === 0) ? '/img/blog/blog-thumbnail.jpeg' : props.src;
  
  const imageProps = {
    ...restProps,
    src: finalSrc,
    alt: alt || 'Image',
    loading: effectiveLoading,
    priority,
    className: `transition-opacity duration-300 ${className}`
  };

  if (process.env.NODE_ENV === 'development') {
    return <Image unoptimized={true} {...imageProps} />;
  } else {
    return <Image {...imageProps} loader={cloudflareImageLoader} />;
  }
}