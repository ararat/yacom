import React, { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ContentData {
  frontMatter: { [key: string]: any };
  content: string;
}

interface HeroSectionProps {
  id: string;
  content: ContentData;
}

const heroMarkdownComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900 dark:text-dark-text">
      {children}
    </h1>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-lg sm:text-xl leading-relaxed mb-4 text-gray-600 dark:text-dark-text-secondary max-w-2xl mx-auto">
      {children}
    </p>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-semibold text-gray-900 dark:text-dark-text">{children}</strong>
  ),
};

const HeroSection: React.FC<HeroSectionProps> = ({ id, content }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const memoizedMarkdown = useMemo(() => (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={heroMarkdownComponents}>
      {content.content}
    </ReactMarkdown>
  ), [content.content]);

  const contentOpacity = Math.max(1 - scrollY / 500, 0);
  const contentOffset = Math.min(scrollY * 0.15, 60);

  return (
    <section
      id={id}
      className="relative w-full flex overflow-hidden bg-white dark:bg-dark-bg pt-32 pb-20 sm:pt-40 sm:pb-28 min-h-screen min-h-[100svh] snap-start scroll-mt-16"
    >
      {/* Subtle gradient accents that drift with scroll, viteplus-style */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-blue-200/50 dark:bg-blue-500/10 blur-3xl motion-reduce:transform-none"
        style={{ transform: `translateY(${scrollY * 0.25}px)` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-purple-200/50 dark:bg-purple-500/10 blur-3xl motion-reduce:transform-none"
        style={{ transform: `translateY(${-scrollY * 0.18}px)` }}
      />

      <div
        className="relative max-w-3xl m-auto px-6 text-center motion-reduce:transform-none motion-reduce:!opacity-100"
        style={{ opacity: contentOpacity, transform: `translateY(${contentOffset}px)` }}
      >
        {memoizedMarkdown}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#experience"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm sm:text-base font-medium text-white shadow-sm hover:bg-blue-700 transition-colors duration-200"
          >
            View Experience
          </a>
          <a
            href="#blog"
            className="inline-flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 px-6 py-3 text-sm sm:text-base font-medium text-gray-900 dark:text-dark-text hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors duration-200"
          >
            Read Thoughts
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
