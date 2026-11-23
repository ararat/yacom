import React, { useEffect, useState } from 'react';
import TableOfContents from './TableOfContents';
import { TOCItem } from '../lib/tableOfContents';

const BUTTON =
  'flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-violet-mid text-white hover:bg-violet-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-bright transition-opacity duration-200';

/**
 * Phones and tablets: two floating buttons in the bottom-right corner.
 * The list icon opens the contents full screen; the arrow goes back to the top
 * and only shows once the reader has scrolled down.
 */
const MobileTocButtons: React.FC<{ toc: TOCItem[] }> = ({ toc }) => {
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // While the contents are open, the page behind stays still and Escape closes them.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (toc.length === 0) return null;

  // Unlock the page before the contents list scrolls it to the picked heading.
  const close = () => {
    document.body.style.overflow = '';
    setOpen(false);
  };

  return (
    <div className="lg:hidden">
      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Table of contents"
          className="fixed inset-0 overflow-y-auto bg-white dark:bg-dark-bg p-4"
          // Above the fixed site navigation (z-50); inline because the production
          // CSS clean-up drops arbitrary classes such as z-[60].
          style={{ zIndex: 60 }}
        >
          <button
            type="button"
            onClick={close}
            className="ml-auto mb-2 flex items-center justify-center w-10 h-10 rounded-full text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-surface"
            aria-label="Close table of contents"
            autoFocus
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <TableOfContents toc={toc} collapsible={false} onNavigate={close} />
        </div>
      ) : (
        <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`${BUTTON} ${showTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            aria-label="Back to top"
            tabIndex={showTop ? 0 : -1}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button type="button" onClick={() => setOpen(true)} className={BUTTON} aria-label="Table of contents">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileTocButtons;
