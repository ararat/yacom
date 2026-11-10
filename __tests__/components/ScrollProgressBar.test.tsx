import { render, fireEvent } from '@testing-library/react'
import ScrollProgressBar from '../../components/ScrollProgressBar'

const setScrollMetrics = ({
  scrollY,
  scrollHeight,
  innerHeight,
}: {
  scrollY: number
  scrollHeight: number
  innerHeight: number
}) => {
  Object.defineProperty(window, 'scrollY', { value: scrollY, configurable: true })
  Object.defineProperty(document.documentElement, 'scrollHeight', {
    value: scrollHeight,
    configurable: true,
  })
  Object.defineProperty(window, 'innerHeight', { value: innerHeight, configurable: true })
}

describe('ScrollProgressBar', () => {
  const originalRaf = global.requestAnimationFrame

  beforeEach(() => {
    global.requestAnimationFrame = ((cb: FrameRequestCallback) => {
      cb(0)
      return 0
    }) as any
  })

  afterEach(() => {
    global.requestAnimationFrame = originalRaf
  })

  test('should render a progress bar with accessible attributes', () => {
    setScrollMetrics({ scrollY: 0, scrollHeight: 1000, innerHeight: 500 })

    const { getByRole } = render(<ScrollProgressBar />)

    const progressBar = getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuemin', '0')
    expect(progressBar).toHaveAttribute('aria-valuemax', '100')
  })

  test('should start at 0% at the top of the page', () => {
    setScrollMetrics({ scrollY: 0, scrollHeight: 1000, innerHeight: 500 })

    const { getByRole } = render(<ScrollProgressBar />)

    expect(getByRole('progressbar').firstChild).toHaveStyle({ width: '0%' })
  })

  test('should update width as the user scrolls', () => {
    setScrollMetrics({ scrollY: 250, scrollHeight: 1000, innerHeight: 500 })

    const { getByRole } = render(<ScrollProgressBar />)

    fireEvent.scroll(window)

    // scrollable distance = 1000 - 500 = 500; 250 / 500 = 50%
    expect(getByRole('progressbar').firstChild).toHaveStyle({ width: '50%' })
    expect(getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50')
  })

  test('should clamp progress to 100% at the bottom of the page', () => {
    setScrollMetrics({ scrollY: 5000, scrollHeight: 1000, innerHeight: 500 })

    const { getByRole } = render(<ScrollProgressBar />)
    fireEvent.scroll(window)

    expect(getByRole('progressbar').firstChild).toHaveStyle({ width: '100%' })
  })

  test('should not divide by zero when the page does not scroll', () => {
    setScrollMetrics({ scrollY: 0, scrollHeight: 500, innerHeight: 500 })

    const { getByRole } = render(<ScrollProgressBar />)
    fireEvent.scroll(window)

    expect(getByRole('progressbar').firstChild).toHaveStyle({ width: '0%' })
  })
})
