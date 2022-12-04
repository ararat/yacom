import Image from 'next/image';
import React, { FC } from "react";


// Define your component props
type imageProperties = {
  src: string;
  width: string;
  height: string;
  quality: number;
}
const cloudflareImageLoader = ({ src, width, height, quality }: imageProperties) => {
  if (!quality) {
    quality = 75
  }
  if (!src || src.length == 0) {
    // If src is missing, set default 
    return `https://image-resize.yuvalararat.workers.dev?width=${width}&height=${height}&quality=${quality}&image=${process.env.site_address}$/img/blog/blog-thumbnail.jpeg`
  }
  return `https://image-resize.yuvalararat.workers.dev?width=${width}&height=${height}&quality=${quality}&image=${process.env.site_address}${src}`
}

export default function Img(props: any) {
  if (!props.src || props.src.length == 0) {
    // If src is missing, set default
    var newItem = { ...props };
    newItem.src = '/img/blog/blog-thumbnail.jpeg'
  }
  if (process.env.NODE_ENV === 'development') {
    if (!newItem) {
      return <Image unoptimized={true} {...props} />
    } else {
      return <Image unoptimized={true} {...newItem} />
    }
  } else {
    return <Image {...props} loader={cloudflareImageLoader} />
  }
}