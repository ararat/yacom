import Image from 'next/image';
import React, { FC } from "react";


import { ImageLoaderProps } from 'next/image';

type ImgProps = {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  quality?: string | number;
  className?: string;
  loading?: 'lazy' | 'eager';
  layout?: string; // Legacy support
  sizes?: string;
  style?: React.CSSProperties;
  priority?: boolean;
}

const cloudflareImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  if (!quality) {
    quality = 75
  }
  // src should already be handled by the component, so we can trust it exists
  return `https://image-resize.yuvalararat.workers.dev?width=${width}&quality=${quality}&image=${process.env.site_address}${src}`
}

export default function Img(props: ImgProps) {
  const { alt, loading, className = '', priority, layout, sizes, style, ...restProps } = props;
  
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
    className: `transition-opacity duration-300 ${className}`,
    width: typeof restProps.width === 'string' ? parseInt(restProps.width) : restProps.width,
    height: typeof restProps.height === 'string' ? parseInt(restProps.height) : restProps.height,
    quality: typeof restProps.quality === 'string' ? parseInt(restProps.quality) : restProps.quality,
    ...(sizes && { sizes }),
    ...(style && { style }),
    // Handle legacy layout prop by converting to modern style if needed
    ...(layout === 'responsive' && !style && {
      style: { width: '100%', height: 'auto' }
    })
  };

  if (process.env.NODE_ENV === 'development') {
    return <Image unoptimized={true} {...imageProps} />;
  } else {
    return <Image {...imageProps} loader={cloudflareImageLoader} />;
  }
}