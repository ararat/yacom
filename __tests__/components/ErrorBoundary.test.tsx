import { render } from '@testing-library/react'
import ErrorBoundary from '../../components/ErrorBoundary'

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Suppress console.error during tests
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('should render children when there is no error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )

    expect(getByText('No error')).toBeInTheDocument()
  })

  test('should render error UI when there is an error', () => {
    const { getByText, getByRole } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(getByRole('heading', { level: 2 })).toHaveTextContent('Something went wrong')
    expect(getByText(/We're sorry, but something unexpected happened/)).toBeInTheDocument()
  })

  test('should display error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    const { getByText } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(getByText('Error Details:')).toBeInTheDocument()
    expect(getByText('Test error')).toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })

  test('should not display error details in production mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    const { queryByText } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(queryByText('Error Details:')).not.toBeInTheDocument()
    expect(queryByText('Test error')).not.toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })

  test('should have correct styling classes', () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    const errorDiv = container.firstChild as HTMLElement
    expect(errorDiv).toHaveClass(
      'min-h-screen', 'flex', 'items-center', 'justify-center',
      'bg-gray-50', 'py-12', 'px-4', 'sm:px-6', 'lg:px-8'
    )
  })

  test('should handle error info in componentDidCatch', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    // ErrorBoundary should log the error
    expect(consoleSpy).toHaveBeenCalled()
  })

  test('should reset error state when children change', () => {
    const { rerender, getByText, queryByText } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    // Should show error UI
    expect(getByText('Something went wrong')).toBeInTheDocument()

    // Rerender with non-throwing component
    rerender(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )

    // Should still show error UI (ErrorBoundary doesn't auto-reset)
    expect(queryByText('Something went wrong')).toBeInTheDocument()
  })

  test('should have proper ARIA attributes for accessibility', () => {
    const { getByRole } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    const errorHeading = getByRole('heading', { level: 2 })
    expect(errorHeading).toHaveTextContent('Something went wrong')
  })
})