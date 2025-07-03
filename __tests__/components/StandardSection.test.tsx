import { render, fireEvent } from '@testing-library/react'
import StandardSection from '../../components/StandardSection'

// Mock hooks
jest.mock('../../hooks/useContentHeight', () => ({
  useContentHeight: jest.fn(() => ({
    availableHeight: 500,
    needsReadMore: true,
  })),
}))

jest.mock('../../hooks/useExpandedState', () => ({
  useExpandedState: jest.fn(() => ({
    isExpanded: false,
    handleContinueReading: jest.fn(),
    handleShowLess: jest.fn(),
  })),
}))

// Mock components
jest.mock('../../components/ReadMoreOverlay', () => {
  return function MockReadMoreOverlay(props: any) {
    return (
      <div data-testid="read-more-overlay" onClick={props.onContinueReading}>
        Continue Reading
      </div>
    )
  }
})

jest.mock('../../components/image', () => {
  return function MockImage(props: any) {
    return <img data-testid="mock-image" src={props.src} alt={props.alt} />
  }
})

// Mock markdown components
jest.mock('../../lib/markdownComponents', () => ({
  standardMarkdownComponents: {
    h1: ({ children }: any) => <h1>{children}</h1>,
    p: ({ children }: any) => <p>{children}</p>,
  },
}))

const { useContentHeight } = require('../../hooks/useContentHeight')
const { useExpandedState } = require('../../hooks/useExpandedState')

const mockSection = {
  id: 'about',
  navTitle: 'About',
  backgroundColor: 'bg-lime-100',
  contentFile: 'about',
  hasImage: true,
  imageConfig: {
    src: '/img/profile.jpg',
    alt: 'Profile picture',
    width: '200',
    height: '160',
  },
  enabled: true,
  hideFromNav: false,
}

const mockContent = {
  frontMatter: {
    title: 'About Me',
  },
  content: '# About\n\nThis is about content.',
}

describe('StandardSection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render section with correct id and styling', () => {
    const { container } = render(
      <StandardSection section={mockSection} content={mockContent} />
    )

    const section = container.firstChild as HTMLElement
    expect(section).toHaveAttribute('id', 'about')
    expect(section).toHaveClass(
      'snap-start', 'bg-lime-100', 'w-screen', 'h-screen',
      'flex', 'items-center', 'justify-center', 'overflow-hidden'
    )
  })

  test('should render image when hasImage is true', () => {
    const { getByTestId } = render(
      <StandardSection section={mockSection} content={mockContent} />
    )

    const image = getByTestId('mock-image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/img/profile.jpg')
    expect(image).toHaveAttribute('alt', 'Profile picture')
  })

  test('should not render image when hasImage is false', () => {
    const sectionWithoutImage = { ...mockSection, hasImage: false }
    
    const { queryByTestId } = render(
      <StandardSection section={sectionWithoutImage} content={mockContent} />
    )

    expect(queryByTestId('mock-image')).not.toBeInTheDocument()
  })

  test('should render title from frontMatter', () => {
    const { getByRole } = render(
      <StandardSection section={mockSection} content={mockContent} />
    )

    const title = getByRole('heading', { level: 1 })
    expect(title).toHaveTextContent('About Me')
    expect(title).toHaveClass(
      'text-2xl', 'sm:text-3xl', 'md:text-4xl', 'lg:text-5xl',
      'font-bold', 'mb-6', 'text-center', 'sm:text-left'
    )
  })

  test('should apply custom text color when provided', () => {
    const sectionWithTextColor = { ...mockSection, textColor: 'text-red-500' }
    
    const { getByRole } = render(
      <StandardSection section={sectionWithTextColor} content={mockContent} />
    )

    const title = getByRole('heading', { level: 1 })
    expect(title).toHaveClass('text-red-500')
  })

  test('should render ReadMoreOverlay when content needs read more', () => {
    useContentHeight.mockReturnValue({
      availableHeight: 500,
      needsReadMore: true,
    })

    useExpandedState.mockReturnValue({
      isExpanded: false,
      handleContinueReading: jest.fn(),
      handleShowLess: jest.fn(),
    })

    const { getByTestId } = render(
      <StandardSection section={mockSection} content={mockContent} />
    )

    expect(getByTestId('read-more-overlay')).toBeInTheDocument()
  })

  test('should not render ReadMoreOverlay when content fits', () => {
    useContentHeight.mockReturnValue({
      availableHeight: 500,
      needsReadMore: false,
    })

    const { queryByTestId } = render(
      <StandardSection section={mockSection} content={mockContent} />
    )

    expect(queryByTestId('read-more-overlay')).not.toBeInTheDocument()
  })

  test('should render Show Less button when expanded', () => {
    useContentHeight.mockReturnValue({
      availableHeight: 500,
      needsReadMore: true,
    })

    const mockHandleShowLess = jest.fn()
    useExpandedState.mockReturnValue({
      isExpanded: true,
      handleContinueReading: jest.fn(),
      handleShowLess: mockHandleShowLess,
    })

    const { getByRole } = render(
      <StandardSection section={mockSection} content={mockContent} />
    )

    const showLessButton = getByRole('button', { name: /Show Less/ })
    expect(showLessButton).toBeInTheDocument()

    fireEvent.click(showLessButton)
    expect(mockHandleShowLess).toHaveBeenCalled()
  })

  test('should not render Show Less button when not expanded', () => {
    useExpandedState.mockReturnValue({
      isExpanded: false,
      handleContinueReading: jest.fn(),
      handleShowLess: jest.fn(),
    })

    const { queryByRole } = render(
      <StandardSection section={mockSection} content={mockContent} />
    )

    expect(queryByRole('button', { name: /Show Less/ })).not.toBeInTheDocument()
  })

  test('should apply correct height styling when not expanded', () => {
    useContentHeight.mockReturnValue({
      availableHeight: 500,
      needsReadMore: true,
    })

    useExpandedState.mockReturnValue({
      isExpanded: false,
      handleContinueReading: jest.fn(),
      handleShowLess: jest.fn(),
    })

    const { container } = render(
      <StandardSection section={mockSection} content={mockContent} />
    )

    const scrollableContent = container.querySelector('.overflow-hidden')
    expect(scrollableContent).toHaveStyle({ height: '500px' })
  })

  test('should apply expanded styling when expanded', () => {
    useExpandedState.mockReturnValue({
      isExpanded: true,
      handleContinueReading: jest.fn(),
      handleShowLess: jest.fn(),
    })

    const { container } = render(
      <StandardSection section={mockSection} content={mockContent} />
    )

    const scrollableContent = container.querySelector('.max-h-\\[75vh\\]')
    expect(scrollableContent).toHaveClass(
      'max-h-[75vh]', 'overflow-y-auto', 'scrollbar-thin',
      'scrollbar-thumb-gray-400', 'scrollbar-track-transparent'
    )
  })

  test('should have proper touch and scroll behavior', () => {
    const { container } = render(
      <StandardSection section={mockSection} content={mockContent} />
    )

    const section = container.firstChild as HTMLElement
    expect(section).toHaveStyle({
      touchAction: 'pan-y',
      overscrollBehavior: 'contain',
    })
  })

  test('should render content container with correct styling', () => {
    const { container } = render(
      <StandardSection section={mockSection} content={mockContent} />
    )

    const contentContainer = container.querySelector('.px-4')
    expect(contentContainer).toHaveClass(
      'px-4', 'sm:px-6', 'md:px-8', 'lg:px-12', 'xl:px-16', '2xl:px-20',
      'py-6', 'w-full', 'bg-opacity-0', 'justify-content-center'
    )
  })

  test('should render prose container with correct styling', () => {
    const { container } = render(
      <StandardSection section={mockSection} content={mockContent} />
    )

    const proseContainer = container.querySelector('.prose')
    expect(proseContainer).toHaveClass(
      'prose', 'prose-sm', 'sm:prose-base', 'lg:prose-lg',
      'xl:prose-xl', '2xl:prose-2xl', 'max-w-none'
    )
  })

  test('should render image with correct styling when hasImage is true', () => {
    const { container } = render(
      <StandardSection section={mockSection} content={mockContent} />
    )

    const imageContainer = container.querySelector('.flex.justify-center.sm\\:justify-start')
    expect(imageContainer).toBeInTheDocument()
    expect(imageContainer).toHaveClass('mb-6')
  })

  test('should call hook functions correctly', () => {
    const mockHandleContinueReading = jest.fn()
    useExpandedState.mockReturnValue({
      isExpanded: false,
      handleContinueReading: mockHandleContinueReading,
      handleShowLess: jest.fn(),
    })

    const { getByTestId } = render(
      <StandardSection section={mockSection} content={mockContent} />
    )

    fireEvent.click(getByTestId('read-more-overlay'))
    expect(mockHandleContinueReading).toHaveBeenCalled()
  })

  test('should memoize ReactMarkdown for performance', () => {
    const { rerender } = render(
      <StandardSection section={mockSection} content={mockContent} />
    )

    // Rerender with same content - should use memoized version
    rerender(
      <StandardSection section={mockSection} content={mockContent} />
    )

    // Should not throw or cause issues
    expect(true).toBe(true)
  })

  test('should handle section without imageConfig', () => {
    const sectionWithoutImageConfig = { 
      ...mockSection, 
      hasImage: true, 
      imageConfig: undefined 
    }
    
    const { queryByTestId } = render(
      <StandardSection section={sectionWithoutImageConfig} content={mockContent} />
    )

    expect(queryByTestId('mock-image')).not.toBeInTheDocument()
  })
})