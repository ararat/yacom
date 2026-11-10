import React from 'react';

// Standard markdown components used across content sections
export const standardMarkdownComponents = {
  h1: ({children}: {children: React.ReactNode}) => (
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 text-center sm:text-left text-gray-900 dark:text-dark-text">
      {children}
    </h1>
  ),
  h2: ({children}: {children: React.ReactNode}) => (
    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 mt-10 first:mt-0 text-gray-900 dark:text-dark-text">
      {children}
    </h2>
  ),
  h3: ({children}: {children: React.ReactNode}) => (
    <h3 className="text-xl sm:text-2xl font-semibold mb-3 mt-6 text-gray-900 dark:text-dark-text">
      {children}
    </h3>
  ),
  p: ({children}: {children: React.ReactNode}) => (
    <p className="text-base sm:text-lg leading-relaxed mb-4 text-gray-600 dark:text-dark-text-secondary">
      {children}
    </p>
  ),
  a: ({children, href}: {children: React.ReactNode, href?: string}) => (
    <a href={href} className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium transition-colors">
      {children}
    </a>
  ),
  strong: ({children}: {children: React.ReactNode}) => (
    <strong className="font-semibold text-gray-900 dark:text-dark-text">{children}</strong>
  ),
  em: ({children}: {children: React.ReactNode}) => (
    <em className="italic">{children}</em>
  ),
  ul: ({children}: {children: React.ReactNode}) => (
    <ul className="list-disc list-outside ml-5 mb-4 space-y-2 text-gray-600 dark:text-dark-text-secondary">{children}</ul>
  ),
  ol: ({children}: {children: React.ReactNode}) => (
    <ol className="list-decimal list-outside ml-5 mb-4 space-y-2 text-gray-600 dark:text-dark-text-secondary">{children}</ol>
  ),
  li: ({children}: {children: React.ReactNode}) => (
    <li className="text-base sm:text-lg leading-relaxed">{children}</li>
  ),
};
