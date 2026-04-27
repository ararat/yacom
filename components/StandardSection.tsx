import React, { useRef, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from './image';
import ReadMoreOverlay from './ReadMoreOverlay';
import { useContentHeight } from '../hooks/useContentHeight';
import { useExpandedState } from '../hooks/useExpandedState';
import { standardMarkdownComponents } from '../lib/markdownComponents';
const BG_COLOR_MAP: Record<string, string> = {
  'bg-obs-base':    '#0a0a0f',
  'bg-obs-surface': '#13101e',
  'bg-obs-raised':  '#1a1530',
  'bg-indigo-950':  '#1e1b4b',
  'bg-slate-900':   '#0f172a',
  'bg-violet-950':  '#2e1065',
};

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

interface StandardSectionProps {
  section: SectionConfig;
  content: ContentData;
}

const StandardSection: React.FC<StandardSectionProps> = ({ 
  section, 
  content 
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollableContentRef = useRef<HTMLDivElement>(null);

  const { availableHeight, needsReadMore } = useContentHeight(contentRef, content);
  const { isExpanded, handleContinueReading, handleShowLess } = useExpandedState(scrollableContentRef);

  const shouldShowReadMore = needsReadMore;

  // Memoized ReactMarkdown component for performance
  const MemoizedStandardMarkdown = useMemo(() => (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]}
      components={standardMarkdownComponents}
    >
      {content.content}
    </ReactMarkdown>
  ), [content.content]);

  const contentElement = (
    <div className={`px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 2xl:px-40 py-6 w-full max-w-[1920px] mx-auto ${isExpanded ? 'h-auto' : ''}`}>
      {/* Standard sections with overlay design */}
      <div className="relative w-full">
        {/* Content Area - Fixed or Expandable Height */}
        <div 
          ref={scrollableContentRef}
          className={`${
            isExpanded 
              ? 'max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent' 
              : 'overflow-hidden'
          }`}
          style={!isExpanded && availableHeight ? { height: `${availableHeight}px` } : {}}
        >
          <div ref={contentRef} className="prose prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl max-w-none prose-headings:text-violet-glow prose-a:text-violet-bright prose-strong:text-obs-text">
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
              <div className="text-center pt-6 border-t border-obs-border mt-6">
                <button
                  onClick={handleShowLess}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm text-obs-muted hover:text-violet-bright transition-colors"
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
          <ReadMoreOverlay
            availableHeight={availableHeight}
            onContinueReading={handleContinueReading}
            bgColor={BG_COLOR_MAP[section.backgroundColor] || '#0a0a0f'}
          />
        )}
      </div>
    </div>
  );

  return (
    <div 
      ref={sectionRef}
      className={`snap-start ${section.backgroundColor} w-screen h-screen flex ${isExpanded ? 'items-start justify-center pt-4' : 'items-center justify-center'} overflow-hidden`}
      id={section.id}
      style={{ touchAction: 'pan-y', overscrollBehavior: 'contain' }}
    >
      {contentElement}
    </div>
  );
};

export default StandardSection;