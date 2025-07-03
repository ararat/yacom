import React from 'react';
import VideoBackgroundSection from './VideoBackgroundSection';
import StandardSection from './StandardSection';

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

  // Route to appropriate component based on section configuration
  const hasVideo = section.backgroundVideo;

  if (hasVideo) {
    return <VideoBackgroundSection section={section} content={content} />;
  }

  return <StandardSection section={section} content={content} />;
};

export default MarkdownContentComponent;
export type { SectionConfig, ContentData };