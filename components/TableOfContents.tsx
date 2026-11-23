import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TOCItem } from '../lib/tableOfContents';

/** Gap between the fixed site navigation and the sidebar (Tailwind top-24). */
const STICKY_TOP = 96;
/** Space kept below a sidebar that is taller than the screen. */
const BOTTOM_GAP = 24;
/** Offset used when jumping to a heading, so it clears the fixed navigation. */
const HEADING_OFFSET = 140;

const LEVEL_CLASSES: Record<number, string> = {
  1: 'text-base font-semibold',
  2: 'text-sm font-medium ml-4',
  3: 'text-sm ml-8',
  4: 'text-xs ml-12',
  5: 'text-xs ml-16',
  6: 'text-xs ml-20',
};

const flatIds = (items: TOCItem[]): string[] =>
  items.flatMap((item) => [item.id, ...flatIds(item.children ?? [])]);

/** Which heading is currently being read. */
function useActiveHeading(toc: TOCItem[]) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const headings = flatIds(toc)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    let scrolling = false;
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      scrolling = true;
      clearTimeout(timer);
      timer = setTimeout(() => (scrolling = false), 150);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (scrolling) return;
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-160px 0px -70% 0px', threshold: [0, 0.25] },
    );

    window.addEventListener('scroll', onScroll, { passive: true });
    headings.forEach((el) => observer.observe(el));
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [toc]);

  return [activeId, setActiveId] as const;
}

function scrollToHeading(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADING_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  return true;
}

function TOCList({
  items,
  activeId,
  onSelect,
}: {
  items: TOCItem[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <ul className="space-y-0">
      {items.map((item, index) => (
        <li key={`${item.id}-${index}`} className="py-1">
          <button
            type="button"
            onClick={() => onSelect(item.id)}
            className={`block text-left transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus-visible:text-blue-600 dark:focus-visible:text-blue-400 ${
              LEVEL_CLASSES[item.level] ?? 'text-sm'
            } ${
              activeId === item.id
                ? 'text-blue-600 dark:text-blue-400 font-medium'
                : 'text-gray-700 dark:text-dark-text-secondary'
            }`}
            aria-current={activeId === item.id ? 'location' : undefined}
            aria-label={`Go to ${item.title}`}
          >
            {item.title}
          </button>
          {item.children && item.children.length > 0 && (
            <div className="mt-1">
              <TOCList items={item.children} activeId={activeId} onSelect={onSelect} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

/**
 * Desktop sidebar. Always shows every entry; it never scrolls inside itself.
 * When it fits on screen it sticks below the navigation. When it is taller
 * than the screen it scrolls with the page until its last entry is in view,
 * then sticks there, so the whole list can always be reached.
 */
const TableOfContents: React.FC<{ toc: TOCItem[]; className?: string }> = ({ toc, className = '' }) => {
  const [activeId, setActiveId] = useActiveHeading(toc);
  const navRef = useRef<HTMLElement>(null);
  const [top, setTop] = useState(STICKY_TOP);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      setTop(Math.round(Math.min(STICKY_TOP, window.innerHeight - nav.offsetHeight - BOTTOM_GAP)));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('resize', schedule, { passive: true });
    const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(schedule);
    observer?.observe(nav);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', schedule);
      observer?.disconnect();
    };
  }, [toc]);

  if (toc.length === 0) return null;

  const select = (id: string) => {
    if (scrollToHeading(id)) setActiveId(id);
  };

  return (
    <nav
      ref={navRef}
      className={`table-of-contents sticky bg-gray-50 dark:bg-dark-surface rounded-lg p-4 border border-gray-200 dark:border-gray-600 ${className}`}
      style={{ top }}
      aria-label="Table of contents"
    >
      <h3 className="text-sm font-medium text-gray-900 dark:text-dark-text mb-3">Table of Contents</h3>
      <TOCList items={toc} activeId={activeId} onSelect={select} />
    </nav>
  );
};

export default TableOfContents;

/**
 * Phones and tablets. Nothing sits in the page: two round buttons float in
 * the bottom-right corner. The list button opens the contents full screen
 * (the panel scrolls like a page, with no box inside it); picking an entry
 * closes it and jumps there. The arrow returns to the top and only appears
 * once the reader has scrolled down.
 */
export const MobileTableOfContents: React.FC<{ toc: TOCItem[] }> = ({ toc }) => {
  const [activeId, setActiveId] = useActiveHeading(toc);
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const openButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    openButton.current?.focus({ preventScroll: true });
  }, []);

  // While the panel is open the page behind it stays put and Escape closes it.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  if (toc.length === 0) return null;

  const select = (id: string) => {
    setOpen(false);
    // Let the page unlock before scrolling it.
    requestAnimationFrame(() => {
      if (scrollToHeading(id)) setActiveId(id);
    });
  };

  const fab =
    'flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-violet-mid text-white hover:bg-violet-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-bright transition-all duration-200';

  return (
    <>
      <div
        className={`lg:hidden fixed right-4 z-40 flex-col items-center gap-3 ${open ? 'hidden' : 'flex'}`}
        style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      >
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`${fab} ${showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
          aria-label="Back to top"
          aria-hidden={!showTop}
          tabIndex={showTop ? 0 : -1}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <button
          ref={openButton}
          type="button"
          onClick={() => setOpen(true)}
          className={fab}
          aria-label="Table of contents"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="toc-panel"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" />
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="toc-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Table of contents"
          className="lg:hidden fixed inset-0 overflow-y-auto overscroll-contain bg-white dark:bg-dark-bg"
          // Above the fixed site navigation (z-50). Inline because the production
          // CSS clean-up drops arbitrary classes such as z-[60].
          style={{ zIndex: 60 }}
        >
          <div className="sticky top-0 flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg">
            <span className="text-base font-semibold text-gray-900 dark:text-dark-text">Table of Contents</span>
            <button
              ref={closeButton}
              type="button"
              onClick={close}
              className="flex items-center justify-center w-10 h-10 -mr-2 rounded-full text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-bright"
              aria-label="Close table of contents"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="px-5 py-4 pb-10">
            <TOCList items={toc} activeId={activeId} onSelect={select} />
          </div>
        </div>
      )}
    </>
  );
};
