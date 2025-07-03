import { render, fireEvent } from '@testing-library/react'
import ReadMoreOverlay from '../../components/ReadMoreOverlay'

// Mock constants
jest.mock('../../lib/constants', () => ({
  OVERLAY_HEIGHT_RATIO: 0.1,
}))

describe('ReadMoreOverlay', () => {
  const mockOnContinueReading = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render with correct height based on available height', () => {
    const { container } = render(
      <ReadMoreOverlay 
        availableHeight={1000} 
        onContinueReading={mockOnContinueReading} 
      />
    )

    const overlay = container.firstChild as HTMLElement
    expect(overlay).toHaveStyle({ height: '100px' }) // 1000 * 0.1
  })

  test('should render Continue Reading button', () => {
    const { getByRole } = render(
      <ReadMoreOverlay 
        availableHeight={500} 
        onContinueReading={mockOnContinueReading} 
      />
    )

    const button = getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Continue Reading')
  })

  test('should call onContinueReading when button is clicked', () => {
    const { getByRole } = render(
      <ReadMoreOverlay 
        availableHeight={500} 
        onContinueReading={mockOnContinueReading} 
      />
    )

    const button = getByRole('button')
    fireEvent.click(button)

    expect(mockOnContinueReading).toHaveBeenCalledTimes(1)
  })

  test('should have correct CSS classes for styling', () => {
    const { container, getByRole } = render(
      <ReadMoreOverlay 
        availableHeight={500} 
        onContinueReading={mockOnContinueReading} 
      />
    )

    const overlay = container.firstChild as HTMLElement
    expect(overlay).toHaveClass('absolute', 'bottom-0', 'left-0', 'right-0', 'pointer-events-none')

    const blurDiv = overlay.querySelector('.bg-gradient-to-t')
    expect(blurDiv).toHaveClass('bg-gradient-to-t', 'from-white', 'backdrop-blur-sm')

    const button = getByRole('button')
    expect(button).toHaveClass(
      'px-4', 'py-2', 'bg-white/95', 'backdrop-blur', 
      'border', 'border-gray-200', 'rounded-lg', 'shadow-sm',
      'hover:shadow-md', 'transition-all', 'duration-200',
      'text-sm', 'font-medium', 'text-gray-700'
    )
  })

  test('should handle zero available height', () => {
    const { container } = render(
      <ReadMoreOverlay 
        availableHeight={0} 
        onContinueReading={mockOnContinueReading} 
      />
    )

    const overlay = container.firstChild as HTMLElement
    expect(overlay).toHaveStyle({ height: '0px' })
  })

  test('should have pointer-events-auto on button container', () => {
    const { container } = render(
      <ReadMoreOverlay 
        availableHeight={500} 
        onContinueReading={mockOnContinueReading} 
      />
    )

    const buttonContainer = container.querySelector('.pointer-events-auto')
    expect(buttonContainer).toBeInTheDocument()
    expect(buttonContainer).toHaveClass('flex', 'items-center', 'justify-center')
  })
})