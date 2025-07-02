import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from './image';
import LazyVideo from './LazyVideo';
import {
  NAVIGATION_HEIGHT,
  CONTENT_MARGINS,
  AVAILABLE_HEIGHT_RATIO,
  OVERLAY_HEIGHT_RATIO,
  EXPANDED_MAX_HEIGHT,
  SCROLL_RESTORATION_DELAY
} from '../lib/constants';

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
  enabled: boolean;
  hideFromNav?: boolean;
}

interface ContentData {
  frontMatter: { [key: string]: any };
  content: string;
}

interface MarkdownContentComponentProps {
  section: SectionConfig;
  content: ContentData;
}

const MarkdownContentComponent: React.FC<MarkdownContentComponentProps> = ({ 
  section, 
  content 
}) => {
  // Guard against undefined content
  if (!content) {
    console.warn(`No content found for section: ${section.id}`);
    return null;
  }
  
  const hasVideo = content.frontMatter?.backgroundVideo;
  const [isExpanded, setIsExpanded] = useState(false);
  const [availableHeight, setAvailableHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollableContentRef = useRef<HTMLDivElement>(null);
  
  // Memoized calculation of available space
  const getAvailableHeight = useCallback(() => {
    const viewportHeight = window.innerHeight;
    const availableHeight = viewportHeight - NAVIGATION_HEIGHT - CONTENT_MARGINS;
    return availableHeight * AVAILABLE_HEIGHT_RATIO;
  }, []);
  
  useEffect(() => {
    const updateHeights = () => {
      const available = getAvailableHeight();
      setAvailableHeight(available);
      
      if (contentRef.current) {
        const fullHeight = contentRef.current.scrollHeight;
        setContentHeight(fullHeight);
      }
    };
    
    updateHeights();
    window.addEventListener('resize', updateHeights);
    return () => window.removeEventListener('resize', updateHeights);
  }, [content]);
  
  // Custom markdown components for consistent styling
  const markdownComponents = useMemo(() => ({
    h1: ({children}: {children: React.ReactNode}) => (
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center sm:text-left">
        {children}
      </h1>
    ),
    h2: ({children}: {children: React.ReactNode}) => (
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
        {children}
      </h2>
    ),
    h3: ({children}: {children: React.ReactNode}) => (
      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3">
        {children}
      </h3>
    ),
    p: ({children}: {children: React.ReactNode}) => (
      <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl leading-relaxed mb-4">
        {children}
      </p>
    ),
    a: ({children, href}: {children: React.ReactNode, href?: string}) => (
      <a href={href} className="text-blue-600 hover:text-blue-800 underline transition-colors">
        {children}
      </a>
    ),
    strong: ({children}: {children: React.ReactNode}) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({children}: {children: React.ReactNode}) => (
      <em className="italic">{children}</em>
    ),
    ul: ({children}: {children: React.ReactNode}) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    ol: ({children}: {children: React.ReactNode}) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
    li: ({children}: {children: React.ReactNode}) => (
      <li className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl leading-relaxed">{children}</li>
    ),
  }), []);

  // Video-specific markdown components with white text and shadows
  const videoMarkdownComponents = useMemo(() => ({
    ...markdownComponents,
    h1: ({children}: {children: React.ReactNode}) => (
      <h1 className="text-white drop-shadow-lg font-bold mb-2">{children}</h1>
    ),
    h2: ({children}: {children: React.ReactNode}) => (
      <h2 className="text-white drop-shadow-md font-bold mb-2">{children}</h2>
    ),
    h3: ({children}: {children: React.ReactNode}) => (
      <h3 className="text-white drop-shadow-md font-bold mb-2">{children}</h3>
    ),
    p: ({children}: {children: React.ReactNode}) => (
      <p className="text-white drop-shadow-sm leading-relaxed mb-4">{children}</p>
    ),
    a: ({children, href}: {children: React.ReactNode, href?: string}) => (
      <a href={href} className="text-blue-200 hover:text-blue-100 underline transition-colors">
        {children}
      </a>
    ),
    strong: ({children}: {children: React.ReactNode}) => (
      <strong className="font-semibold text-white drop-shadow-sm">{children}</strong>
    ),
    em: ({children}: {children: React.ReactNode}) => (
      <em className="italic text-white drop-shadow-sm">{children}</em>
    ),
    li: ({children}: {children: React.ReactNode}) => (
      <li className="text-white drop-shadow-sm leading-relaxed">{children}</li>
    ),
  }), [markdownComponents]);

  // Memoized ReactMarkdown components for performance
  const MemoizedStandardMarkdown = useMemo(() => (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]}
      components={markdownComponents}
    >
      {content.content}
    </ReactMarkdown>
  ), [content.content, markdownComponents]);

  const MemoizedVideoMarkdown = useMemo(() => (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]}
      components={videoMarkdownComponents}
    >
      {content.content}
    </ReactMarkdown>
  ), [content.content, videoMarkdownComponents]);

  const needsReadMore = contentHeight > availableHeight;
  const shouldShowReadMore = needsReadMore && !hasVideo;
  
  const handleContinueReading = useCallback(() => {
    setIsExpanded(true);
  }, []);
  
  const handleShowLess = useCallback(() => {
    // Restore the collapsed state and scroll content to top
    setIsExpanded(false);
    
    // Scroll the content div to top to show the beginning with Continue Reading button
    requestAnimationFrame(() => {
      if (scrollableContentRef.current) {
        scrollableContentRef.current.scrollTop = 0;
      }
    });
  }, []);
  
  const contentElement = (
    <div className={`
      px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-6 w-full
      ${hasVideo ? 
        'pt-16 mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16 2xl:mx-20 bg-amber-600 bg-opacity-50 dark:bg-opacity-70 dark:bg-slate-700 dark:prose-invert rounded-xl max-h-[85vh] overflow-y-auto' : 
        'bg-opacity-0 justify-content-center'
      }
    `}>
      {hasVideo ? (
        // Video sections keep original behavior
        <div 
          className="prose prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl max-w-none"
          style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
        >
      
          {/* Video section content */}
          <div className={hasVideo ? "text-center sm:text-left mb-6" : ""}>
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
      ) : (
        // Standard sections with overlay design
        <div className="relative w-full">
          {/* Content Area - Fixed or Expandable Height */}
          <div 
            ref={scrollableContentRef}
            className={`${
              isExpanded 
                ? 'max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent' 
                : 'overflow-hidden'
            }`}
            style={!isExpanded && availableHeight ? { height: `${availableHeight}px` } : {}}
          >
            <div ref={contentRef} className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl max-w-none">
              {/* Image for non-video sections */}
              {section.hasImage && section.imageConfig && (
                <div className="flex justify-center sm:justify-start mb-6">
                  <Image
                    alt={section.imageConfig.alt}
                    src={section.imageConfig.src}
                    quality="low"
                    width={section.imageConfig.width}
                    height={section.imageConfig.height}
                    className="rounded-lg shadow-md"
                  />
                </div>
              )}
              
              {/* Title */}
              <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center sm:text-left ${section.textColor || ''}`}>
                {content.frontMatter.title}
              </h1>
              
              {/* Content */}
              <div className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl leading-relaxed">
                {MemoizedStandardMarkdown}
              </div>
              
              {/* Show Less Button at Bottom */}
              {isExpanded && shouldShowReadMore && (
                <div className="text-center pt-6 border-t border-gray-200 mt-6">
                  <button
                    onClick={handleShowLess}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <span>Show Less</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Overlay: Bottom 10% with Blur + Button */}
          {shouldShowReadMore && !isExpanded && availableHeight > 0 && (
            <div 
              className="absolute bottom-0 left-0 right-0 pointer-events-none"
              style={{ height: `${availableHeight * OVERLAY_HEIGHT_RATIO}px` }}
            >
              {/* Blur Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-transparent backdrop-blur-sm" />
              
              {/* Read More Button */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                <button
                  onClick={handleContinueReading}
                  className="px-4 py-2 bg-white/95 backdrop-blur border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium text-gray-700"
                >
                  Continue Reading
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
  
  if (hasVideo) {
    return (
      <div 
        className={`snap-start ${section.backgroundColor} w-screen h-screen relative overflow-hidden`}
        id={section.id}
        style={{ touchAction: 'pan-y', overscrollBehavior: 'contain' }}
      >
        <LazyVideo
          src={content.frontMatter.backgroundVideo}
          type="video/mp4"
          poster={content.frontMatter.videoPoster || "/img/yuval-ararat.png"}
          preload="metadata"
          className="absolute z-10 w-auto min-w-full min-h-full max-w-none object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          {contentElement}
        </div>
      </div>
    );
  }
  
  return (
    <div 
      ref={sectionRef}
      className={`snap-start ${section.backgroundColor} w-screen h-screen flex items-center justify-center overflow-hidden`}
      id={section.id}
      style={{ touchAction: 'pan-y', overscrollBehavior: 'contain' }}
    >
      {contentElement}
    </div>
  );
};

export default MarkdownContentComponent;
export type { SectionConfig, ContentData };