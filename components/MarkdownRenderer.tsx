import React from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { generateHeadingId } from '../lib/tableOfContents';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

// Plain text of a heading, including text inside inline code, emphasis or links,
// so the id matches the one the table of contents generates.
const textOf = (node: React.ReactNode): string => {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) return textOf(node.props.children);
  return '';
};

// One renderer per level. react-markdown 10 no longer passes a `level` prop, so
// building the tag from it produced invalid <hundefined> elements.
const heading = (Tag: HeadingTag) => {
  const Heading = ({ node: _node, children, ...props }: React.ComponentProps<HeadingTag> & { node?: unknown }) => (
    <Tag id={generateHeadingId(textOf(children))} {...props}>
      {children}
    </Tag>
  );
  Heading.displayName = `Markdown${Tag.toUpperCase()}`;
  return Heading;
};

const components: Components = {
  h1: heading('h1'),
  h2: heading('h2'),
  h3: heading('h3'),
  h4: heading('h4'),
  h5: heading('h5'),
  h6: heading('h6'),
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className }) => {
  const markdown = (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
  // Wrap only when asked, so the blog's .prose styles see the same markup as before.
  return className ? <div className={className}>{markdown}</div> : markdown;
};

export default MarkdownRenderer;
