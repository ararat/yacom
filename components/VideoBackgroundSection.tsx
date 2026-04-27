import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import LazyVideo from './LazyVideo';
import { videoMarkdownComponents } from '../lib/markdownComponents';

interface SectionConfig {
  id: string;
  navTitle: string;
  bgColor: string;
  textColor?: string;
  contentFile: string;
  hasImage?: boolean;
  imageConfig?: {
    src: string;
    alt: string;
    width: string;
    height: string;
  };
  backgroundVideo?: string;
  videoPoster?: string;
  enabled: boolean;
  hideFromNav?: boolean;
}

interface ContentData {
  frontMatter: { [key: string]: any };
  content: string;
}

interface VideoBackgroundSectionProps {
  section: SectionConfig;
  content: ContentData;
}

const VideoBackgroundSection: React.FC<VideoBackgroundSectionProps> = ({ 
  section, 
  content 
}) => {
  // Memoized ReactMarkdown component for performance
  const MemoizedVideoMarkdown = useMemo(() => (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]}
      components={videoMarkdownComponents}
    >
      {content.content}
    </ReactMarkdown>
  ), [content.content]);

  const contentElement = (
    <div className="px-6 sm:px-8 md:px-10 py-6 pt-16 w-full max-w-3xl bg-obs-base/75 backdrop-blur-sm rounded-xl border border-obs-border max-h-[85vh] overflow-y-auto">
      <div 
        className="prose prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl max-w-none"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* Video section content */}
        <div className="text-center sm:text-left mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 text-white drop-shadow-lg">
            {content.frontMatter.title}
          </h1>
          {content.frontMatter.subtitle && (
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white font-medium drop-shadow-md">
              {content.frontMatter.subtitle}
            </p>
          )}
        </div>
        
        <div className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl leading-relaxed">
          {MemoizedVideoMarkdown}
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className="snap-start w-screen h-screen relative overflow-hidden"
      id={section.id}
      style={{ backgroundColor: section.bgColor }}
    >
      <LazyVideo
        src={section.backgroundVideo || ''}
        type="video/mp4"
        poster={section.videoPoster || "/img/yuval-ararat.png"}
        preload="metadata"
        className="absolute z-10 w-auto min-w-full min-h-full max-w-none object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center z-20">
        {contentElement}
      </div>
    </div>
  );
};

export default VideoBackgroundSection;