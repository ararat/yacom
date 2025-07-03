import { render } from '@testing-library/react'
import BlogPost from '../../components/BlogPost'

// Mock Next.js components
jest.mock('next/link', () => {
  return function MockLink({ children, href, passHref }: any) {
    return <a href={href} data-passHref={passHref}>{children}</a>
  }
})

jest.mock('../../components/image', () => {
  return function MockImage(props: any) {
    return (
      <img
        data-testid="blog-post-image"
        src={props.src}
        alt={props.alt}
        width={props.width}
        height={props.height}
        data-layout={props.layout}
        data-loading={props.loading}
        className={props.className}
      />
    )
  }
})

const defaultProps = {
  key: 'test-post',
  path: '/blog/test-post',
  title: 'Test Blog Post Title',
  slug: 'test-post',
  description: 'This is a test blog post description that provides some context about the content.',
  imageSrc: '/img/test-post.jpg',
  className: 'custom-class',
}

describe('BlogPost', () => {
  test('should render blog post article', () => {
    const { getByRole } = render(<BlogPost {...defaultProps} />)

    const article = getByRole('article')
    expect(article).toBeInTheDocument()
    // The key attribute is used by React internally and won't appear in the DOM
  })

  test('should render as link with correct href', () => {
    const { getByRole } = render(<BlogPost {...defaultProps} />)

    const link = getByRole('link')
    expect(link).toHaveAttribute('href', '/blog/test-post')
    expect(link).toHaveAttribute('data-passHref', 'true')
  })

  test('should render blog post title', () => {
    const { getByRole } = render(<BlogPost {...defaultProps} />)

    const heading = getByRole('heading', { level: 3 })
    expect(heading).toHaveTextContent('Test Blog Post Title')
    expect(heading).toHaveClass(
      'font-bold', 'text-xs', 'sm:text-lg', 'lg:text-xl', 'xl:text-2xl',
      'text-gray-900', 'mb-2', 'sm:mb-3', 'line-clamp-3', 'sm:line-clamp-2',
      'group-hover:text-blue-600', 'transition-colors', 'duration-200', 'leading-tight'
    )
  })

  test('should render blog post description', () => {
    const { getByText } = render(<BlogPost {...defaultProps} />)

    const description = getByText('This is a test blog post description that provides some context about the content.')
    expect(description).toHaveClass(
      'text-xs', 'sm:text-sm', 'lg:text-base', 'xl:text-lg', 'text-gray-600',
      'leading-relaxed', 'line-clamp-2', 'sm:line-clamp-3', 'flex-grow'
    )
  })

  test('should render image with correct props', () => {
    const { getByTestId } = render(<BlogPost {...defaultProps} />)

    const image = getByTestId('blog-post-image')
    expect(image).toHaveAttribute('src', '/img/test-post.jpg')
    expect(image).toHaveAttribute('alt', 'Test Blog Post Title')
    expect(image).toHaveAttribute('width', '300')
    expect(image).toHaveAttribute('height', '180')
    expect(image).toHaveAttribute('data-layout', 'responsive')
    expect(image).toHaveAttribute('data-loading', 'lazy')
  })

  test('should use fallback image when imageSrc is empty', () => {
    const propsWithEmptyImage = { ...defaultProps, imageSrc: '' }
    const { getByTestId } = render(<BlogPost {...propsWithEmptyImage} />)

    const image = getByTestId('blog-post-image')
    expect(image).toHaveAttribute('src', '/img/blog/blog-thumbnail.jpeg')
  })

  test('should render "Read more" link with arrow icon', () => {
    const { getByText, container } = render(<BlogPost {...defaultProps} />)

    const readMore = getByText('Read more')
    const readMoreContainer = readMore.parentElement
    expect(readMoreContainer).toHaveClass(
      'text-blue-600', 'text-xs', 'sm:text-sm', 'lg:text-base', 'font-medium',
      'group-hover:text-blue-700', 'transition-colors', 'duration-200'
    )

    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveClass(
      'ml-1', 'w-3', 'h-3', 'sm:w-4', 'sm:h-4',
      'transition-transform', 'duration-200', 'group-hover:translate-x-1'
    )

    const path = container.querySelector('path[d="M9 5l7 7-7 7"]')
    expect(path).toBeInTheDocument()
    expect(path).toHaveAttribute('stroke-linecap', 'round')
    expect(path).toHaveAttribute('stroke-linejoin', 'round')
    expect(path).toHaveAttribute('stroke-width', '2')
  })

  test('should have correct article styling classes', () => {
    const { getByRole } = render(<BlogPost {...defaultProps} />)

    const article = getByRole('article')
    expect(article).toHaveClass(
      'group', 'relative', 'rounded-lg', 'bg-white', 'shadow-md',
      'hover:shadow-xl', 'transition-all', 'duration-300', 'transform',
      'hover:-translate-y-1', 'border', 'border-gray-100', 'overflow-hidden',
      'hover-lift', 'h-full', 'flex', 'flex-col', 'custom-class'
    )
  })

  test('should have correct image container styling', () => {
    const { container } = render(<BlogPost {...defaultProps} />)

    const imageContainer = container.querySelector('.w-full.h-32')
    expect(imageContainer).toHaveClass(
      'w-full', 'h-32', 'sm:h-48', 'md:h-52', 'lg:h-56', 'xl:h-60',
      'overflow-hidden', 'relative'
    )
  })

  test('should have correct content container styling', () => {
    const { container } = render(<BlogPost {...defaultProps} />)

    const contentContainer = container.querySelector('.p-2.sm\\:p-4')
    expect(contentContainer).toHaveClass(
      'p-2', 'sm:p-4', 'lg:p-5', 'xl:p-6', 'flex', 'flex-col', 'flex-grow'
    )
  })

  test('should have correct "Read more" container styling', () => {
    const { container } = render(<BlogPost {...defaultProps} />)

    const readMoreContainer = container.querySelector('.mt-2.sm\\:mt-4')
    expect(readMoreContainer).toHaveClass(
      'mt-2', 'sm:mt-4', 'flex', 'items-center'
    )
  })

  test('should handle long titles correctly', () => {
    const propsWithLongTitle = {
      ...defaultProps,
      title: 'This is a very long blog post title that should be truncated with line-clamp classes to prevent layout issues and maintain good visual hierarchy',
    }

    const { getByRole } = render(<BlogPost {...propsWithLongTitle} />)

    const heading = getByRole('heading', { level: 3 })
    expect(heading).toHaveTextContent(propsWithLongTitle.title)
    expect(heading).toHaveClass('line-clamp-3', 'sm:line-clamp-2')
  })

  test('should handle long descriptions correctly', () => {
    const propsWithLongDescription = {
      ...defaultProps,
      description: 'This is a very long blog post description that should be truncated with line-clamp classes to ensure consistent card heights and prevent layout issues across different screen sizes and content lengths.',
    }

    const { getByText } = render(<BlogPost {...propsWithLongDescription} />)

    const description = getByText(propsWithLongDescription.description)
    expect(description).toHaveClass('line-clamp-2', 'sm:line-clamp-3')
  })

  test('should handle empty title gracefully', () => {
    const propsWithEmptyTitle = { ...defaultProps, title: '' }
    const { getByRole } = render(<BlogPost {...propsWithEmptyTitle} />)

    const heading = getByRole('heading', { level: 3 })
    expect(heading).toHaveTextContent('')
  })

  test('should handle empty description gracefully', () => {
    const propsWithEmptyDescription = { ...defaultProps, description: '' }
    const { container } = render(<BlogPost {...propsWithEmptyDescription} />)

    const description = container.querySelector('p')
    expect(description).toHaveTextContent('')
  })

  test('should handle special characters in title and description', () => {
    const propsWithSpecialChars = {
      ...defaultProps,
      title: 'Title with & special <characters> "quotes"',
      description: 'Description with & special <characters> "quotes"',
    }

    const { getByRole, getByText } = render(<BlogPost {...propsWithSpecialChars} />)

    const heading = getByRole('heading', { level: 3 })
    expect(heading).toHaveTextContent('Title with & special <characters> "quotes"')

    const description = getByText('Description with & special <characters> "quotes"')
    expect(description).toBeInTheDocument()
  })

  test('should handle different image URLs correctly', () => {
    const testCases = [
      { imageSrc: '/img/relative-path.jpg', expected: '/img/relative-path.jpg' },
      { imageSrc: 'https://example.com/absolute-url.jpg', expected: 'https://example.com/absolute-url.jpg' },
      { imageSrc: '', expected: '/img/blog/blog-thumbnail.jpeg' },
    ]

    testCases.forEach(({ imageSrc, expected }, index) => {
      const { getByTestId, unmount } = render(<BlogPost {...defaultProps} imageSrc={imageSrc} key={index} />)
      const image = getByTestId('blog-post-image')
      expect(image).toHaveAttribute('src', expected)
      unmount()
    })
  })

  test('should apply custom className to article', () => {
    const customClass = 'my-custom-blog-post-class'
    const { getByRole } = render(<BlogPost {...defaultProps} className={customClass} />)

    const article = getByRole('article')
    expect(article).toHaveClass(customClass)
  })

  test('should have proper semantic structure', () => {
    const { getByRole } = render(<BlogPost {...defaultProps} />)

    // Should be wrapped in a link
    const link = getByRole('link')
    expect(link).toBeInTheDocument()

    // Should contain an article
    const article = getByRole('article')
    expect(article).toBeInTheDocument()

    // Should have a heading inside the article
    const heading = getByRole('heading', { level: 3 })
    expect(heading).toBeInTheDocument()
    expect(article).toContainElement(heading)
  })

  test('should have proper image dimensions and responsive behavior', () => {
    const { getByTestId } = render(<BlogPost {...defaultProps} />)

    const image = getByTestId('blog-post-image')
    expect(image).toHaveClass(
      'w-full', 'h-full', 'object-center', 'object-cover',
      'transition-transform', 'duration-300', 'group-hover:scale-105'
    )
  })

  test('should have proper hover effects', () => {
    const { getByRole, getByText, container } = render(<BlogPost {...defaultProps} />)

    const article = getByRole('article')
    expect(article).toHaveClass('group')

    const title = getByRole('heading', { level: 3 })
    expect(title).toHaveClass('group-hover:text-blue-600')

    const readMore = getByText('Read more').parentElement
    expect(readMore).toHaveClass('group-hover:text-blue-700')

    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('group-hover:translate-x-1')
  })

  test('should maintain aspect ratio and responsive design', () => {
    const { container } = render(<BlogPost {...defaultProps} />)

    const imageContainer = container.querySelector('.w-full.h-32')
    expect(imageContainer).toHaveClass(
      'h-32', 'sm:h-48', 'md:h-52', 'lg:h-56', 'xl:h-60'
    )

    const title = container.querySelector('h3')
    expect(title).toHaveClass(
      'text-xs', 'sm:text-lg', 'lg:text-xl', 'xl:text-2xl'
    )

    const description = container.querySelector('p')
    expect(description).toHaveClass(
      'text-xs', 'sm:text-sm', 'lg:text-base', 'xl:text-lg'
    )
  })
})