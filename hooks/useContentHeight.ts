import { useState, useEffect, useCallback, RefObject } from 'react';
import {
  NAVIGATION_HEIGHT,
  CONTENT_MARGINS,
  AVAILABLE_HEIGHT_RATIO,
} from '../lib/constants';

interface UseContentHeightReturn {
  availableHeight: number;
  contentHeight: number;
  needsReadMore: boolean;
}

export const useContentHeight = (
  contentRef: RefObject<HTMLDivElement>,
  content: any
): UseContentHeightReturn => {
  const [availableHeight, setAvailableHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  // Memoized calculation of available space
  const getAvailableHeight = useCallback(() => {
    const viewportHeight = window.innerHeight;
    const availableHeight = viewportHeight - NAVIGATION_HEIGHT - CONTENT_MARGINS;
    return availableHeight * AVAILABLE_HEIGHT_RATIO;
  }, []);

  useEffect(() => {
    const updateHeights = () => {
      const available = getAvailableHeight();
      setAvailableHeight(available);
      
      if (contentRef.current) {
        const fullHeight = contentRef.current.scrollHeight;
        setContentHeight(fullHeight);
      }
    };
    
    updateHeights();
    window.addEventListener('resize', updateHeights);
    return () => window.removeEventListener('resize', updateHeights);
  }, [content, getAvailableHeight, contentRef]);

  const needsReadMore = contentHeight > availableHeight;

  return {
    availableHeight,
    contentHeight,
    needsReadMore,
  };
};