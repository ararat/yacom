import React, { useState, useRef, useEffect, useCallback } from 'react';
import { marked } from 'marked';
import Image from './image';
import LazyVideo from './LazyVideo';

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
  
  // Calculate available space (90% after navigation + margins)
  const getAvailableHeight = () => {
    const viewportHeight = window.innerHeight;
    const navigationHeight = 80; // Fixed navigation height
    const margins = 40; // Top/bottom margins
    const availableHeight = viewportHeight - navigationHeight - margins;
    return availableHeight * 0.9; // Use 90% of available space
  };
  
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
          
          <div 
            className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl leading-relaxed !text-white drop-shadow-sm"
            dangerouslySetInnerHTML={{ __html: marked(content.content) }}
          />
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
              <div 
                className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl leading-relaxed"
                dangerouslySetInnerHTML={{ __html: marked(content.content) }}
              />
              
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
              style={{ height: `${availableHeight * 0.1}px` }}
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