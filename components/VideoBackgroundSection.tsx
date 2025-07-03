import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import LazyVideo from './LazyVideo';
import { videoMarkdownComponents } from '../lib/markdownComponents';

interface SectionConfig {
  id: string;
  navTitle: string;
  backgroundColor: string;
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
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-6 w-full pt-16 mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16 2xl:mx-20 bg-amber-600 bg-opacity-50 dark:bg-opacity-70 dark:bg-slate-700 dark:prose-invert rounded-xl max-h-[85vh] overflow-y-auto">
      <div 
        className="prose prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl max-w-none"
        style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
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
      className={`md:snap-start ${section.backgroundColor} w-screen h-screen relative overflow-hidden`}
      id={section.id}
      style={{ touchAction: 'pan-y', overscrollBehavior: 'contain' }}
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