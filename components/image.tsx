import Image from 'next/image';
import React, { FC } from "react";

// Define your component props
type imageProperties = {
  src: string;
  width: string;
  height: string;
  quality: number;
}
const cloudflareImageLoader = ({ src , width, height, quality }: imageProperties) => {
  if (!quality) {
    quality = 75
  }
  return `https://image-resize.yuvalararat.workers.dev?width=${width}&height=${height}&quality=${quality}&image=${process.env.site_address}${src}`
}

export default function Img(props:any) {
  if (process.env.NODE_ENV === 'development') {
    return <Image unoptimized={true} {...props} />
  } else {
    return <Image {...props} loader={cloudflareImageLoader} />
  }
}