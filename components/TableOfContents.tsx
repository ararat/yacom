import React, { useState, useEffect } from 'react';
import { TOCItem } from '../lib/tableOfContents';

interface TableOfContentsProps {
  toc: TOCItem[];
  className?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  toc,
  className = '',
  collapsible = true,
  defaultCollapsed = false,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [activeId, setActiveId] = useState<string>('');

  // Track which heading is currently in view
  useEffect(() => {
    if (toc.length === 0) return;

    const headingElements = toc.map(item => document.getElementById(item.id)).filter(Boolean);
    
    if (headingElements.length === 0) return;

    let isScrolling = false;

    const observer = new IntersectionObserver(
      (entries) => {
        // Don't update active ID during manual scrolling to prevent conflicts
        if (isScrolling) return;
        
        // Find the heading that's currently most visible
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          // Use the first visible heading
          const mostVisible = visibleEntries[0];
          setActiveId(mostVisible.target.id);
        }
      },
      {
        rootMargin: '-160px 0px -70% 0px', // More conservative margins
        threshold: [0, 0.25], // Multiple thresholds for better detection
      }
    );

    // Detect scroll events to prevent observer conflicts
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    headingElements.forEach(element => {
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      headingElements.forEach(element => {
        if (element) observer.unobserve(element);
      });
    };
  }, [toc]);

  const handleHeadingClick = (id: string) => {
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`Element with id '${id}' not found. Make sure headings have proper IDs.`);
      return;
    }

    // Prevent race conditions by temporarily disabling the intersection observer
    const headingElements = toc.map(item => document.getElementById(item.id)).filter(Boolean);
    
    // Calculate scroll position
    const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetTop = Math.max(0, elementTop - 140); // Account for fixed header + padding
    
    // Set active ID immediately to prevent jumping
    setActiveId(id);
    
    // Scroll to the element
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  };

  const renderTOCItem = (item: TOCItem, index: number) => {
    const isActive = activeId === item.id;
    const levelClasses = {
      1: 'text-base font-semibold',
      2: 'text-sm font-medium ml-4',
      3: 'text-sm ml-8',
      4: 'text-xs ml-12',
      5: 'text-xs ml-16',
      6: 'text-xs ml-20',
    };

    return (
      <li key={`${item.id}-${index}`} className="py-1">
        <button
          onClick={() => handleHeadingClick(item.id)}
          className={`
            block w-full text-left transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:text-blue-600 dark:focus:text-blue-400
            ${levelClasses[item.level as keyof typeof levelClasses] || 'text-sm'}
            ${isActive ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-700 dark:text-dark-text-secondary'}
          `}
          aria-label={`Go to ${item.title}`}
        >
          {item.title}
        </button>
        {item.children && item.children.length > 0 && (
          <ul className="mt-1">
            {item.children.map((child, childIndex) => renderTOCItem(child, childIndex))}
          </ul>
        )}
      </li>
    );
  };

  if (toc.length === 0) {
    return null;
  }

  return (
    <nav
      className={`table-of-contents bg-gray-50 dark:bg-dark-surface rounded-lg p-4 border border-gray-200 dark:border-gray-600 ${className}`}
      aria-label="Table of contents"
    >
      {collapsible && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-between w-full mb-3 text-sm font-medium text-gray-900 dark:text-dark-text hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:text-blue-600 dark:focus:text-blue-400 transition-colors duration-200"
          aria-expanded={!isCollapsed}
          aria-controls="toc-content"
        >
          <span>Table of Contents</span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isCollapsed ? 'rotate-0' : 'rotate-180'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}

      {!collapsible && (
        <h3 className="text-sm font-medium text-gray-900 dark:text-dark-text mb-3">Table of Contents</h3>
      )}

      <div
        id="toc-content"
        className={`transition-all duration-300 overflow-hidden ${
          isCollapsed ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100'
        }`}
      >
        <ul className="space-y-0">
          {toc.map((item, index) => renderTOCItem(item, index))}
        </ul>
      </div>

      {/* Mobile-specific styling */}
      <style jsx>{`
        @media (max-width: 768px) {
          .table-of-contents {
            position: sticky;
            top: 80px; /* Below navigation */
            z-index: 10;
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default TableOfContents;