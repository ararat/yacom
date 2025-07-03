import { render, act } from '@testing-library/react'
import LazyVideo from '../../components/LazyVideo'

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
})

beforeAll(() => {
  window.IntersectionObserver = mockIntersectionObserver
})

describe('LazyVideo', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render video element with correct attributes', () => {
    const { container } = render(
      <LazyVideo
        src="/test-video.mp4"
        type="video/mp4"
        poster="/test-poster.jpg"
        preload="metadata"
        className="test-class"
      />
    )

    const video = container.querySelector('video')
    expect(video).toBeInTheDocument()
    expect(video).toHaveAttribute('poster', '/test-poster.jpg')
    expect(video).toHaveAttribute('preload', 'metadata')
    expect(video).toHaveClass('test-class')
    expect(video).toHaveAttribute('aria-label', 'Background video')
  })

  test('should have default video attributes', () => {
    const { container } = render(
      <LazyVideo
        src="/test-video.mp4"
        type="video/mp4"
      />
    )

    const video = container.querySelector('video')
    expect(video).toHaveAttribute('loop')
    expect(video).toHaveAttribute('muted')
    expect(video).toHaveAttribute('playsInline')
  })

  test('should render fallback content', () => {
    const { getByText } = render(
      <LazyVideo
        src="/test-video.mp4"
        type="video/mp4"
      />
    )

    expect(getByText('Your browser does not support video backgrounds.')).toBeInTheDocument()
  })

  test('should setup IntersectionObserver on mount', () => {
    const observeMock = jest.fn()
    mockIntersectionObserver.mockReturnValue({
      observe: observeMock,
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    })

    render(
      <LazyVideo
        src="/test-video.mp4"
        type="video/mp4"
      />
    )

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: 0.1 }
    )
    expect(observeMock).toHaveBeenCalled()
  })

  test('should render source when intersecting', () => {
    let intersectionCallback: (entries: any[]) => void

    mockIntersectionObserver.mockImplementation((callback) => {
      intersectionCallback = callback
      return {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      }
    })

    const { container } = render(
      <LazyVideo
        src="/test-video.mp4"
        type="video/mp4"
      />
    )

    // Initially no source
    expect(container.querySelector('source')).not.toBeInTheDocument()

    // Simulate intersection
    act(() => {
      intersectionCallback([{ isIntersecting: true }])
    })

    // Source should now be present
    const source = container.querySelector('source')
    expect(source).toBeInTheDocument()
    expect(source).toHaveAttribute('src', '/test-video.mp4')
    expect(source).toHaveAttribute('type', 'video/mp4')
  })

  test('should not render source when not intersecting', () => {
    let intersectionCallback: (entries: any[]) => void

    mockIntersectionObserver.mockImplementation((callback) => {
      intersectionCallback = callback
      return {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      }
    })

    const { container } = render(
      <LazyVideo
        src="/test-video.mp4"
        type="video/mp4"
      />
    )

    // Simulate no intersection
    act(() => {
      intersectionCallback([{ isIntersecting: false }])
    })

    expect(container.querySelector('source')).not.toBeInTheDocument()
  })

  test('should cleanup IntersectionObserver on unmount', () => {
    const disconnectMock = jest.fn()
    mockIntersectionObserver.mockReturnValue({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: disconnectMock,
    })

    const { unmount } = render(
      <LazyVideo
        src="/test-video.mp4"
        type="video/mp4"
      />
    )

    unmount()

    expect(disconnectMock).toHaveBeenCalled()
  })

  test('should handle video play attempt', async () => {
    let intersectionCallback: (entries: any[]) => void
    const playMock = jest.fn().mockResolvedValue(undefined)

    mockIntersectionObserver.mockImplementation((callback) => {
      intersectionCallback = callback
      return {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      }
    })

    // Mock video element play method
    Object.defineProperty(HTMLVideoElement.prototype, 'play', {
      value: playMock,
      writable: true,
    })

    const { container } = render(
      <LazyVideo
        src="/test-video.mp4"
        type="video/mp4"
      />
    )

    // Simulate intersection
    act(() => {
      intersectionCallback([{ isIntersecting: true }])
    })

    // Wait for useEffect to run
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(playMock).toHaveBeenCalled()
  })

  test('should handle video play failure gracefully', async () => {
    let intersectionCallback: (entries: any[]) => void
    const playMock = jest.fn().mockRejectedValue(new Error('Play failed'))
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

    mockIntersectionObserver.mockImplementation((callback) => {
      intersectionCallback = callback
      return {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      }
    })

    Object.defineProperty(HTMLVideoElement.prototype, 'play', {
      value: playMock,
      writable: true,
    })

    const { container } = render(
      <LazyVideo
        src="/test-video.mp4"
        type="video/mp4"
      />
    )

    act(() => {
      intersectionCallback([{ isIntersecting: true }])
    })

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(consoleSpy).toHaveBeenCalledWith('Video autoplay failed:', expect.any(Error))
    
    consoleSpy.mockRestore()
  })

  test('should have correct fallback styling', () => {
    const { container } = render(
      <LazyVideo
        src="/test-video.mp4"
        type="video/mp4"
      />
    )

    const fallbackDiv = container.querySelector('.bg-amber-600')
    expect(fallbackDiv).toBeInTheDocument()
    expect(fallbackDiv).toHaveClass(
      'absolute', 'inset-0', 'bg-amber-600', 'flex', 
      'items-center', 'justify-center', 'text-white'
    )
  })
})