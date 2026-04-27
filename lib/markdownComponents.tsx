import React, { ComponentPropsWithoutRef } from 'react';

type AProps = ComponentPropsWithoutRef<'a'>;
type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type PProps = ComponentPropsWithoutRef<'p'>;
type LiProps = ComponentPropsWithoutRef<'li'>;
type UlProps = ComponentPropsWithoutRef<'ul'>;
type OlProps = ComponentPropsWithoutRef<'ol'>;
type StrongProps = ComponentPropsWithoutRef<'strong'>;
type EmProps = ComponentPropsWithoutRef<'em'>;

// Standard markdown components for regular sections
export const standardMarkdownComponents = {
  h1: ({ children, ...props }: HeadingProps) => (
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center sm:text-left" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: HeadingProps) => (
    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: HeadingProps) => (
    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: PProps) => (
    <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl leading-relaxed mb-4" {...props}>
      {children}
    </p>
  ),
  a: ({ children, href, ...props }: AProps) => (
    <a href={href} className="text-blue-600 hover:text-blue-800 underline transition-colors" {...props}>
      {children}
    </a>
  ),
  strong: ({ children, ...props }: StrongProps) => (
    <strong className="font-semibold" {...props}>{children}</strong>
  ),
  em: ({ children, ...props }: EmProps) => (
    <em className="italic" {...props}>{children}</em>
  ),
  ul: ({ children, ...props }: UlProps) => (
    <ul className="list-disc list-inside mb-4 space-y-2" {...props}>{children}</ul>
  ),
  ol: ({ children, ...props }: OlProps) => (
    <ol className="list-decimal list-inside mb-4 space-y-2" {...props}>{children}</ol>
  ),
  li: ({ children, ...props }: LiProps) => (
    <li className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl leading-relaxed" {...props}>{children}</li>
  ),
};

// Video-specific markdown components with white text and shadows
export const videoMarkdownComponents = {
  ...standardMarkdownComponents,
  h1: ({ children, ...props }: HeadingProps) => (
    <h1 className="text-white drop-shadow-lg font-bold mb-2" {...props}>{children}</h1>
  ),
  h2: ({ children, ...props }: HeadingProps) => (
    <h2 className="text-white drop-shadow-md font-bold mb-2" {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }: HeadingProps) => (
    <h3 className="text-white drop-shadow-md font-bold mb-2" {...props}>{children}</h3>
  ),
  p: ({ children, ...props }: PProps) => (
    <p className="text-white drop-shadow-sm leading-relaxed mb-4" {...props}>{children}</p>
  ),
  a: ({ children, href, ...props }: AProps) => (
    <a href={href} className="text-blue-200 hover:text-blue-100 underline transition-colors" {...props}>
      {children}
    </a>
  ),
  strong: ({ children, ...props }: StrongProps) => (
    <strong className="font-semibold text-white drop-shadow-sm" {...props}>{children}</strong>
  ),
  em: ({ children, ...props }: EmProps) => (
    <em className="italic text-white drop-shadow-sm" {...props}>{children}</em>
  ),
  li: ({ children, ...props }: LiProps) => (
    <li className="text-white drop-shadow-sm leading-relaxed" {...props}>{children}</li>
  ),
};
