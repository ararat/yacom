import React, { useEffect, useRef, useState } from 'react';
import TableOfContents from './TableOfContents';
import { TOCItem } from '../lib/tableOfContents';

const BUTTON =
  'flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-violet-mid text-white hover:bg-violet-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-bright transition-opacity duration-200';

/**
 * Two floating buttons in the bottom-right corner, on every screen size.
 * The list icon grows the contents window up and left out of that corner; it
 * shrinks back on picking an entry, pressing the icon again, Escape, or
 * clicking or tabbing anywhere else. The arrow goes back to the top and only
 * shows once the reader has scrolled down.
 */
const FloatingToc: React.FC<{ toc: TOCItem[] }> = ({ toc }) => {
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close when the reader goes back to the page.
  useEffect(() => {
    if (!open) return;
    const outside = (event: Event) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('focusin', outside);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('focusin', outside);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const hasToc = toc.length > 0;

  return (
    <div ref={rootRef} className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`${BUTTON} ${showTop && !open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-label="Back to top"
        tabIndex={showTop && !open ? 0 : -1}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {hasToc && (
        <div className="relative">
          <div
            id="floating-toc"
            className={`absolute right-0 bottom-full mb-3 overflow-y-auto overscroll-contain rounded-lg shadow-2xl origin-bottom-right transition-all duration-300 ease-out motion-reduce:transition-none ${
              open ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-0 invisible'
            }`}
            style={{ width: 'min(22rem, calc(100vw - 2rem))', maxHeight: 'calc(100dvh - 10rem)' }}
          >
            <TableOfContents
              toc={toc}
              collapsible={false}
              onNavigate={() => setOpen(false)}
            />
          </div>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            className={BUTTON}
            aria-label={open ? 'Close table of contents' : 'Table of contents'}
            aria-expanded={open}
            aria-controls="floating-toc"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" />
              )}
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default FloatingToc;
