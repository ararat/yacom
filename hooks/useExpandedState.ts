import { useState, useCallback, RefObject } from 'react';

interface UseExpandedStateReturn {
  isExpanded: boolean;
  handleContinueReading: () => void;
  handleShowLess: () => void;
}

export const useExpandedState = (
  scrollableContentRef: RefObject<HTMLDivElement>
): UseExpandedStateReturn => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleContinueReading = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const handleShowLess = useCallback(() => {
    // Restore the collapsed state and scroll content to top
    setIsExpanded(false);
    
    // Scroll the content div to top to show the beginning with Continue Reading button
    requestAnimationFrame(() => {
      if (scrollableContentRef.current) {
        scrollableContentRef.current.scrollTop = 0;
      }
    });
  }, [scrollableContentRef]);

  return {
    isExpanded,
    handleContinueReading,
    handleShowLess,
  };
};