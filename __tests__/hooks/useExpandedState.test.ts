import { renderHook, act } from '@testing-library/react'
import { useExpandedState } from '../../hooks/useExpandedState'
import { useRef } from 'react'

describe('useExpandedState', () => {
  test('should initialize with isExpanded as false', () => {
    const { result } = renderHook(() => {
      const scrollableContentRef = useRef<HTMLDivElement>(null)
      return useExpandedState(scrollableContentRef)
    })

    expect(result.current.isExpanded).toBe(false)
  })

  test('should set isExpanded to true when handleContinueReading is called', () => {
    const { result } = renderHook(() => {
      const scrollableContentRef = useRef<HTMLDivElement>(null)
      return useExpandedState(scrollableContentRef)
    })

    act(() => {
      result.current.handleContinueReading()
    })

    expect(result.current.isExpanded).toBe(true)
  })

  test('should set isExpanded to false when handleShowLess is called', () => {
    const { result } = renderHook(() => {
      const scrollableContentRef = useRef<HTMLDivElement>(null)
      return useExpandedState(scrollableContentRef)
    })

    // First expand
    act(() => {
      result.current.handleContinueReading()
    })

    expect(result.current.isExpanded).toBe(true)

    // Then collapse
    act(() => {
      result.current.handleShowLess()
    })

    expect(result.current.isExpanded).toBe(false)
  })

  test('should scroll to top when handleShowLess is called', () => {
    const mockScrollableElement = {
      scrollTop: 100,
    }

    const { result } = renderHook(() => {
      const scrollableContentRef = useRef<HTMLDivElement>(
        mockScrollableElement as HTMLDivElement
      )
      return useExpandedState(scrollableContentRef)
    })

    // Mock requestAnimationFrame
    const rafSpy = jest.spyOn(window, 'requestAnimationFrame')
    rafSpy.mockImplementation((callback) => {
      callback(0)
      return 0
    })

    act(() => {
      result.current.handleShowLess()
    })

    expect(mockScrollableElement.scrollTop).toBe(0)
    
    rafSpy.mockRestore()
  })

  test('should handle null scrollableContentRef gracefully', () => {
    const { result } = renderHook(() => {
      const scrollableContentRef = useRef<HTMLDivElement>(null)
      return useExpandedState(scrollableContentRef)
    })

    // Mock requestAnimationFrame
    const rafSpy = jest.spyOn(window, 'requestAnimationFrame')
    rafSpy.mockImplementation((callback) => {
      callback(0)
      return 0
    })

    // Should not throw error
    expect(() => {
      act(() => {
        result.current.handleShowLess()
      })
    }).not.toThrow()

    rafSpy.mockRestore()
  })

  test('should provide stable function references', () => {
    const { result, rerender } = renderHook(() => {
      const scrollableContentRef = useRef<HTMLDivElement>(null)
      return useExpandedState(scrollableContentRef)
    })

    const firstHandlers = {
      handleContinueReading: result.current.handleContinueReading,
      handleShowLess: result.current.handleShowLess,
    }

    rerender()

    const secondHandlers = {
      handleContinueReading: result.current.handleContinueReading,
      handleShowLess: result.current.handleShowLess,
    }

    expect(firstHandlers.handleContinueReading).toBe(secondHandlers.handleContinueReading)
    expect(firstHandlers.handleShowLess).toBe(secondHandlers.handleShowLess)
  })
})