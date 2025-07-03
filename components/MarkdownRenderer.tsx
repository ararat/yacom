import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { generateHeadingId } from '../lib/tableOfContents';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Custom heading renderer that adds IDs for TOC navigation
const HeadingRenderer = ({ level, children, ...props }: any) => {
  const text = React.Children.toArray(children).join('');
  const id = generateHeadingId(text);
  
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <Tag id={id} {...props}>
      {children}
    </Tag>
  );
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: HeadingRenderer,
        h2: HeadingRenderer,
        h3: HeadingRenderer,
        h4: HeadingRenderer,
        h5: HeadingRenderer,
        h6: HeadingRenderer,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;