import { renderHook } from '@testing-library/react'
import { useContentHeight } from '../../hooks/useContentHeight'
import { useRef } from 'react'

// Mock constants
jest.mock('../../lib/constants', () => ({
  NAVIGATION_HEIGHT: 80,
  CONTENT_MARGINS: 40,
  AVAILABLE_HEIGHT_RATIO: 0.9,
}))

describe('useContentHeight', () => {
  beforeEach(() => {
    // Mock window.innerHeight
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 1000,
    })
  })

  test('should calculate available height correctly', () => {
    const mockContent = { test: 'content' }
    
    const { result } = renderHook(() => {
      const contentRef = useRef<HTMLDivElement>(null)
      return useContentHeight(contentRef, mockContent)
    })

    // Expected: (1000 - 80 - 40) * 0.9 = 792
    expect(result.current.availableHeight).toBe(792)
  })

  test('should return needsReadMore as false when content fits', () => {
    const mockContent = { test: 'content' }
    
    const { result } = renderHook(() => {
      const contentRef = useRef<HTMLDivElement>({
        scrollHeight: 500,
      } as HTMLDivElement)
      return useContentHeight(contentRef, mockContent)
    })

    expect(result.current.needsReadMore).toBe(false)
  })

  test('should return needsReadMore as true when content overflows', () => {
    const mockContent = { test: 'content' }
    
    const { result } = renderHook(() => {
      const contentRef = useRef<HTMLDivElement>({
        scrollHeight: 1000,
      } as HTMLDivElement)
      return useContentHeight(contentRef, mockContent)
    })

    expect(result.current.needsReadMore).toBe(true)
  })

  test('should handle null contentRef', () => {
    const mockContent = { test: 'content' }
    
    const { result } = renderHook(() => {
      const contentRef = useRef<HTMLDivElement>(null)
      return useContentHeight(contentRef, mockContent)
    })

    expect(result.current.contentHeight).toBe(0)
    expect(result.current.needsReadMore).toBe(false)
  })

  test('should update heights when window resizes', () => {
    const mockContent = { test: 'content' }
    let resizeHandler: () => void

    // Mock addEventListener
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    addEventListenerSpy.mockImplementation((event, handler) => {
      if (event === 'resize') {
        resizeHandler = handler as () => void
      }
    })

    const { result, unmount } = renderHook(() => {
      const contentRef = useRef<HTMLDivElement>(null)
      return useContentHeight(contentRef, mockContent)
    })

    // Initial calculation
    expect(result.current.availableHeight).toBe(792)

    // Change window height and trigger resize
    window.innerHeight = 800
    resizeHandler!()

    // Should recalculate: (800 - 80 - 40) * 0.9 = 612
    expect(result.current.availableHeight).toBe(612)

    // Cleanup
    unmount()
    addEventListenerSpy.mockRestore()
  })

  test('should clean up event listener on unmount', () => {
    const mockContent = { test: 'content' }
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')

    const { unmount } = renderHook(() => {
      const contentRef = useRef<HTMLDivElement>(null)
      return useContentHeight(contentRef, mockContent)
    })

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
    removeEventListenerSpy.mockRestore()
  })
})