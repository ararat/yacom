import React from 'react';

// Standard markdown components for regular sections
export const standardMarkdownComponents = {
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
};

// Video-specific markdown components with white text and shadows
export const videoMarkdownComponents = {
  ...standardMarkdownComponents,
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
};