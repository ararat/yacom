import { render } from '@testing-library/react'
import LoadingSpinner from '../../components/LoadingSpinner'

describe('LoadingSpinner', () => {
  test('should render loading spinner', () => {
    const { container } = render(<LoadingSpinner />)
    
    const spinner = container.querySelector('div')
    expect(spinner).toBeInTheDocument()
  })

  test('should have correct CSS classes for animation', () => {
    const { container } = render(<LoadingSpinner />)
    
    const spinner = container.querySelector('div')
    expect(spinner).toHaveClass('animate-spin')
  })

  test('should be accessible with proper attributes', () => {
    const { container } = render(<LoadingSpinner />)
    
    const spinner = container.querySelector('div')
    expect(spinner).toHaveAttribute('role', 'status')
    expect(spinner).toHaveAttribute('aria-label', 'Loading')
  })

  test('should render SVG with correct attributes', () => {
    const { container } = render(<LoadingSpinner />)
    
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
    expect(svg).toHaveAttribute('fill', 'none')
  })

  test('should have visually hidden text for screen readers', () => {
    const { getByText } = render(<LoadingSpinner />)
    
    const hiddenText = getByText('Loading...')
    expect(hiddenText).toBeInTheDocument()
    expect(hiddenText).toHaveClass('sr-only')
  })
})