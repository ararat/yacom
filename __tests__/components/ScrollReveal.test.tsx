import { act, render } from '@testing-library/react'
import ScrollReveal from '../../components/ScrollReveal'

describe('ScrollReveal', () => {
  let observeMock: jest.Mock
  let disconnectMock: jest.Mock
  let capturedCallback: (entries: Partial<IntersectionObserverEntry>[]) => void

  beforeEach(() => {
    observeMock = jest.fn()
    disconnectMock = jest.fn()

    // @ts-expect-error - simplified IntersectionObserver mock for this suite
    global.IntersectionObserver = jest.fn((callback) => {
      capturedCallback = callback
      return {
        observe: observeMock,
        disconnect: disconnectMock,
        unobserve: jest.fn(),
      }
    })
  })

  test('should start hidden before intersecting', () => {
    const { container } = render(<ScrollReveal>Content</ScrollReveal>)

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('opacity-0', 'translate-y-8')
    expect(observeMock).toHaveBeenCalled()
  })

  test('should become visible once intersecting and disconnect the observer', () => {
    const { container } = render(<ScrollReveal>Content</ScrollReveal>)

    act(() => {
      capturedCallback([{ isIntersecting: true }])
    })

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('opacity-100', 'translate-y-0')
    expect(disconnectMock).toHaveBeenCalled()
  })

  test('should stay hidden while not intersecting', () => {
    const { container } = render(<ScrollReveal>Content</ScrollReveal>)

    act(() => {
      capturedCallback([{ isIntersecting: false }])
    })

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('opacity-0', 'translate-y-8')
  })

  test('should apply the transition delay once visible', () => {
    const { container } = render(<ScrollReveal delayMs={200}>Content</ScrollReveal>)

    act(() => {
      capturedCallback([{ isIntersecting: true }])
    })

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveStyle({ transitionDelay: '200ms' })
  })

  test('should render children', () => {
    const { getByText } = render(<ScrollReveal>Hello world</ScrollReveal>)

    expect(getByText('Hello world')).toBeInTheDocument()
  })
})
