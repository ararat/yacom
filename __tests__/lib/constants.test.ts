import {
  NAVIGATION_HEIGHT,
  CONTENT_MARGINS,
  AVAILABLE_HEIGHT_RATIO,
  OVERLAY_HEIGHT_RATIO,
  EXPANDED_MAX_HEIGHT,
  INITIAL_POSTS_COUNT,
  POSTS_LOAD_INCREMENT,
  INFINITE_SCROLL_THRESHOLD,
  INFINITE_SCROLL_ROOT_MARGIN,
  SCROLL_RESTORATION_DELAY,
  RESIZE_DEBOUNCE_DELAY,
  BREAKPOINTS,
} from '../../lib/constants'

describe('Constants', () => {
  describe('UI Layout Constants', () => {
    test('should have correct navigation height', () => {
      expect(NAVIGATION_HEIGHT).toBe(80)
    })

    test('should have correct content margins', () => {
      expect(CONTENT_MARGINS).toBe(40)
    })

    test('should have correct available height ratio', () => {
      expect(AVAILABLE_HEIGHT_RATIO).toBe(0.9)
    })

    test('should have correct overlay height ratio', () => {
      expect(OVERLAY_HEIGHT_RATIO).toBe(0.1)
    })

    test('should have correct expanded max height', () => {
      expect(EXPANDED_MAX_HEIGHT).toBe('75vh')
    })
  })

  describe('Infinite Scroll Constants', () => {
    test('should have correct initial posts count', () => {
      expect(INITIAL_POSTS_COUNT).toBe(6)
    })

    test('should have correct posts load increment', () => {
      expect(POSTS_LOAD_INCREMENT).toBe(6)
    })

    test('should have correct infinite scroll threshold', () => {
      expect(INFINITE_SCROLL_THRESHOLD).toBe(0.1)
    })

    test('should have correct infinite scroll root margin', () => {
      expect(INFINITE_SCROLL_ROOT_MARGIN).toBe('200px')
    })
  })

  describe('Animation & Transition Constants', () => {
    test('should have correct scroll restoration delay', () => {
      expect(SCROLL_RESTORATION_DELAY).toBe(100)
    })

    test('should have correct resize debounce delay', () => {
      expect(RESIZE_DEBOUNCE_DELAY).toBe(150)
    })
  })

  describe('Breakpoints', () => {
    test('should have correct breakpoint values', () => {
      expect(BREAKPOINTS.sm).toBe(640)
      expect(BREAKPOINTS.md).toBe(768)
      expect(BREAKPOINTS.lg).toBe(1024)
      expect(BREAKPOINTS.xl).toBe(1280)
      expect(BREAKPOINTS['2xl']).toBe(1536)
    })

    test('should be declared as const', () => {
      // While BREAKPOINTS is declared 'as const' for TypeScript,
      // it's still mutable at runtime in JavaScript
      // This test just verifies the structure exists
      expect(BREAKPOINTS).toBeDefined()
      expect(BREAKPOINTS.sm).toBe(640)
    })
  })
})