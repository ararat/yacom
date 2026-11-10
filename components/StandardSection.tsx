import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from './image';
import ScrollReveal from './ScrollReveal';
import { standardMarkdownComponents } from '../lib/markdownComponents';

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

interface StandardSectionProps {
  section: SectionConfig;
  content: ContentData;
}

const StandardSection: React.FC<StandardSectionProps> = ({
  section,
  content
}) => {
  const MemoizedStandardMarkdown = useMemo(() => (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={standardMarkdownComponents}
    >
      {content.content}
    </ReactMarkdown>
  ), [content.content]);

  return (
    <section
      className={`${section.backgroundColor} w-full flex py-16 sm:py-20 lg:py-28 min-h-screen min-h-[100svh] snap-start scroll-mt-16`}
      id={section.id}
    >
      <div className="max-w-3xl m-auto px-6 sm:px-8">
        <ScrollReveal>
          {section.hasImage && section.imageConfig && (
            <div className="flex justify-center mb-8">
              <Image
                alt={section.imageConfig.alt}
                src={section.imageConfig.src}
                quality="low"
                width={section.imageConfig.width}
                height={section.imageConfig.height}
                className="rounded-full shadow-md"
              />
            </div>
          )}

          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-8 text-center ${section.textColor || 'text-gray-900 dark:text-dark-text'}`}>
            {content.frontMatter.title}
          </h1>

          <div className="prose prose-lg max-w-none">
            {MemoizedStandardMarkdown}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default StandardSection;
