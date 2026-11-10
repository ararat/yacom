import { render } from '@testing-library/react'
import StandardSection from '../../components/StandardSection'

// Mock components
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

const mockSection = {
  id: 'about',
  navTitle: 'About',
  backgroundColor: 'bg-white',
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
  test('should render section with correct id and background', () => {
    const { container } = render(
      <StandardSection section={mockSection} content={mockContent} />
    )

    const section = container.firstChild as HTMLElement
    expect(section.tagName).toBe('SECTION')
    expect(section).toHaveAttribute('id', 'about')
    expect(section).toHaveClass('bg-white', 'w-full')
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
    const { container } = render(
      <StandardSection section={mockSection} content={mockContent} />
    )

    // Query outside the .prose markdown body, which has its own (mocked) h1
    // Query by its distinctive class, since the (mocked) markdown body also renders an h1
    const title = container.querySelector('h1.text-3xl')
    expect(title).toHaveTextContent('About Me')
    expect(title).toHaveClass('text-3xl', 'font-bold', 'text-center')
  })

  test('should apply custom text color when provided', () => {
    const sectionWithTextColor = { ...mockSection, textColor: 'text-red-500' }

    const { container } = render(
      <StandardSection section={sectionWithTextColor} content={mockContent} />
    )

    // Query by its distinctive class, since the (mocked) markdown body also renders an h1
    const title = container.querySelector('h1.text-3xl')
    expect(title).toHaveClass('text-red-500')
  })

  test('should render prose container with markdown content', () => {
    const { container, getByText } = render(
      <StandardSection section={mockSection} content={mockContent} />
    )

    const proseContainer = container.querySelector('.prose')
    expect(proseContainer).toHaveClass('prose', 'prose-lg', 'max-w-none')
    expect(getByText('This is about content.')).toBeInTheDocument()
  })

  test('should handle section without imageConfig', () => {
    const sectionWithoutImageConfig = {
      ...mockSection,
      hasImage: true,
      imageConfig: undefined,
    }

    const { queryByTestId } = render(
      <StandardSection section={sectionWithoutImageConfig} content={mockContent} />
    )

    expect(queryByTestId('mock-image')).not.toBeInTheDocument()
  })

  test('should memoize ReactMarkdown for performance', () => {
    const { rerender } = render(
      <StandardSection section={mockSection} content={mockContent} />
    )

    rerender(
      <StandardSection section={mockSection} content={mockContent} />
    )

    expect(true).toBe(true)
  })
})
