// Infinite Scroll Constants
export const INITIAL_POSTS_COUNT = 6; // Initial number of posts to show
export const POSTS_LOAD_INCREMENT = 6; // Number of posts to load on each scroll
export const INFINITE_SCROLL_THRESHOLD = 0.1; // Trigger when 10% visible
export const INFINITE_SCROLL_ROOT_MARGIN = '200px'; // Trigger 200px before element

// Animation & Transition Constants
export const SCROLL_RESTORATION_DELAY = 100; // Delay for scroll restoration in ms
export const RESIZE_DEBOUNCE_DELAY = 150; // Debounce delay for resize events

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;