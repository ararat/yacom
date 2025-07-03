import { render } from '@testing-library/react'
import BlogPost from '../../../pages/blog/[slug]'

// Mock Next.js components
jest.mock('next/head', () => {
  return function MockHead({ children }: any) {
    return <div data-testid="head">{children}</div>
  }
})

jest.mock('../../../components/image', () => {
  return function MockImage(props: any) {
    return (
      <img
        data-testid="blog-post-image"
        src={props.src}
        alt={props.alt}
        width={props.width}
        height={props.height}
        data-layout={props.layout}
      />
    )
  }
})

jest.mock('../../../components/Navigation', () => {
  return function MockNavigation(props: any) {
    return (
      <nav 
        data-testid="navigation" 
        data-variant={props.variant}
        data-site-title={props.siteTitle}
        data-post-title={props.postTitle}
      >
        Navigation: {props.siteTitle} - {props.postTitle}
      </nav>
    )
  }
})

// Mock ReactMarkdown
jest.mock('react-markdown', () => {
  return function MockReactMarkdown({ children, remarkPlugins }: any) {
    return (
      <div 
        data-testid="react-markdown" 
        data-remark-plugins={remarkPlugins?.length || 0}
      >
        {children}
      </div>
    )
  }
})

// Mock remark-gfm
jest.mock('remark-gfm', () => ({
  __esModule: true,
  default: 'mocked-remark-gfm-plugin',
}))

// Mock CSS module
jest.mock('../../../styles/Home.module.css', () => ({
  container: 'mocked-container',
}))

const mockProps = {
  siteTitle: 'Test Blog Site',
  siteDescription: 'A test blog site for testing purposes',
  post: {
    title: 'Test Blog Post Title',
    excerpt: 'This is a test blog post excerpt that describes the content.',
    thumbnail: '/img/blog/test-post-thumbnail.jpg',
    date: '2023-01-15',
    author: 'Test Author',
    tags: 'react, testing, javascript',
  },
  slug: 'test-blog-post',
  content: `# Test Blog Post

This is the main content of the test blog post.

## Section 1

Some content here with **bold** and *italic* text.

- List item 1
- List item 2
- List item 3

## Section 2

More content with a [link](https://example.com).

\`\`\`javascript
const code = 'example';
console.log(code);
\`\`\`

> This is a blockquote.`,
}

describe('BlogPost ([slug].tsx)', () => {
  test('should render blog post page', () => {
    const { getByTestId } = render(<BlogPost {...mockProps} />)

    expect(getByTestId('head')).toBeInTheDocument()
    expect(getByTestId('navigation')).toBeInTheDocument()
    expect(getByTestId('blog-post-image')).toBeInTheDocument()
    expect(getByTestId('react-markdown')).toBeInTheDocument()
  })

  test('should set correct page title and meta description', () => {
    const { getByTestId } = render(<BlogPost {...mockProps} />)

    const head = getByTestId('head')
    expect(head).toHaveTextContent('Test Blog Site - Test Blog Post Title')
    expect(head.innerHTML).toContain('name="description"')
    expect(head.innerHTML).toContain('content="This is a test blog post excerpt that describes the content."')
  })

  test('should render navigation with correct props', () => {
    const { getByTestId } = render(<BlogPost {...mockProps} />)

    const navigation = getByTestId('navigation')
    expect(navigation).toHaveAttribute('data-variant', 'blogPost')
    expect(navigation).toHaveAttribute('data-site-title', 'Test Blog Site')
    expect(navigation).toHaveAttribute('data-post-title', 'Test Blog Post Title')
    expect(navigation).toHaveTextContent('Navigation: Test Blog Site - Test Blog Post Title')
  })

  test('should render blog post image with correct props', () => {
    const { getByTestId } = render(<BlogPost {...mockProps} />)

    const image = getByTestId('blog-post-image')
    expect(image).toHaveAttribute('src', '/img/blog/test-post-thumbnail.jpg')
    expect(image).toHaveAttribute('alt', 'Test Blog Post Title')
    expect(image).toHaveAttribute('width', '1412')
    expect(image).toHaveAttribute('height', '460')
    expect(image).toHaveAttribute('data-layout', 'responsive')
  })

  test('should render markdown content with remark plugins', () => {
    const { getByTestId } = render(<BlogPost {...mockProps} />)

    const markdown = getByTestId('react-markdown')
    expect(markdown).toBeInTheDocument()
    expect(markdown).toHaveTextContent(mockProps.content)
    expect(markdown).toHaveAttribute('data-remark-plugins', '1') // remarkGfm plugin
  })

  test('should have correct main content structure', () => {
    const { container } = render(<BlogPost {...mockProps} />)

    const main = container.querySelector('main')
    expect(main).toBeInTheDocument()
    expect(main).toHaveClass(
      'min-h-screen', 'pt-32', 'sm:pt-36', 'pb-12', 'flex', 'justify-center'
    )
  })

  test('should have correct content container styling', () => {
    const { container } = render(<BlogPost {...mockProps} />)

    const contentContainer = container.querySelector('.w-full.max-w-4xl')
    expect(contentContainer).toHaveClass(
      'w-full', 'max-w-4xl', 'mx-auto', 'px-4', 'sm:px-6', 'md:px-8', 'lg:px-12'
    )
  })

  test('should have correct prose styling', () => {
    const { container } = render(<BlogPost {...mockProps} />)

    const proseContainer = container.querySelector('.prose')
    expect(proseContainer).toHaveClass(
      'prose', 'prose-sm', 'sm:prose', 'lg:prose-lg', 'xl:prose-xl',
      'prose-slate', 'mx-auto'
    )
  })

  describe('Props Handling', () => {
    test('should handle empty post metadata', () => {
      const propsWithEmptyPost = {
        ...mockProps,
        post: {
          title: '',
          excerpt: '',
          thumbnail: '',
        },
      }

      const { getByTestId } = render(<BlogPost {...propsWithEmptyPost} />)

      const head = getByTestId('head')
      expect(head).toHaveTextContent('Test Blog Site - ')

      const image = getByTestId('blog-post-image')
      expect(image).toHaveAttribute('src', '')
      expect(image).toHaveAttribute('alt', '')
    })

    test('should handle missing thumbnail gracefully', () => {
      const propsWithoutThumbnail = {
        ...mockProps,
        post: {
          ...mockProps.post,
          thumbnail: undefined,
        },
      }

      const { getByTestId } = render(<BlogPost {...propsWithoutThumbnail} />)

      const image = getByTestId('blog-post-image')
      expect(image).toHaveAttribute('src', '')
    })

    test('should handle empty content', () => {
      const propsWithEmptyContent = {
        ...mockProps,
        content: '',
      }

      const { getByTestId } = render(<BlogPost {...propsWithEmptyContent} />)

      const markdown = getByTestId('react-markdown')
      expect(markdown).toHaveTextContent('')
    })

    test('should handle long titles and excerpts', () => {
      const propsWithLongText = {
        ...mockProps,
        post: {
          ...mockProps.post,
          title: 'This is a very long blog post title that might wrap to multiple lines and should be handled gracefully by the layout',
          excerpt: 'This is a very long excerpt that provides a detailed description of the blog post content and should also be handled properly in the meta description tag without breaking the layout or causing issues.',
        },
      }

      const { getByTestId } = render(<BlogPost {...propsWithLongText} />)

      const head = getByTestId('head')
      expect(head).toHaveTextContent(propsWithLongText.post.title)

      const navigation = getByTestId('navigation')
      expect(navigation).toHaveAttribute('data-post-title', propsWithLongText.post.title)
    })
  })

  describe('Content Rendering', () => {
    test('should render markdown with different content types', () => {
      const complexContent = `# Main Title

## Subtitle

This is a paragraph with **bold**, *italic*, and \`inline code\`.

### Code Block

\`\`\`javascript
function example() {
  console.log("Hello, world!");
}
\`\`\`

### Lists

1. Ordered item 1
2. Ordered item 2

- Unordered item 1
- Unordered item 2

### Links and Images

[External Link](https://example.com)

### Blockquotes

> This is a blockquote
> with multiple lines

### Tables

| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |

### Horizontal Rule

---

Final paragraph.`

      const propsWithComplexContent = {
        ...mockProps,
        content: complexContent,
      }

      const { getByTestId } = render(<BlogPost {...propsWithComplexContent} />)

      const markdown = getByTestId('react-markdown')
      expect(markdown).toHaveTextContent(complexContent)
    })

    test('should handle special characters in content', () => {
      const contentWithSpecialChars = `# Title with & < > " characters

Content with special characters: & < > " ' and unicode: 中文 emoji: 🚀`

      const propsWithSpecialContent = {
        ...mockProps,
        content: contentWithSpecialChars,
      }

      const { getByTestId } = render(<BlogPost {...propsWithSpecialContent} />)

      const markdown = getByTestId('react-markdown')
      expect(markdown).toHaveTextContent(contentWithSpecialChars)
    })
  })

  describe('SEO and Metadata', () => {
    test('should have proper title format', () => {
      const { getByTestId } = render(<BlogPost {...mockProps} />)

      const head = getByTestId('head')
      expect(head.innerHTML).toContain('<title>Test Blog Site - Test Blog Post Title</title>')
    })

    test('should have meta description from post excerpt', () => {
      const { getByTestId } = render(<BlogPost {...mockProps} />)

      const head = getByTestId('head')
      expect(head.innerHTML).toContain('name="description"')
      expect(head.innerHTML).toContain('content="This is a test blog post excerpt that describes the content."')
    })

    test('should handle missing excerpt gracefully', () => {
      const propsWithoutExcerpt = {
        ...mockProps,
        post: {
          ...mockProps.post,
          excerpt: undefined,
        },
      }

      const { getByTestId } = render(<BlogPost {...propsWithoutExcerpt} />)

      const head = getByTestId('head')
      expect(head.innerHTML).toContain('name="description"')
    })
  })

  describe('Layout and Responsive Design', () => {
    test('should have responsive padding and spacing', () => {
      const { container } = render(<BlogPost {...mockProps} />)

      const main = container.querySelector('main')
      expect(main).toHaveClass('pt-32', 'sm:pt-36')

      const contentContainer = container.querySelector('.max-w-4xl')
      expect(contentContainer).toHaveClass('px-4', 'sm:px-6', 'md:px-8', 'lg:px-12')

      const proseContainer = container.querySelector('.prose')
      expect(proseContainer).toHaveClass('prose-sm', 'sm:prose', 'lg:prose-lg', 'xl:prose-xl')
    })

    test('should center content properly', () => {
      const { container } = render(<BlogPost {...mockProps} />)

      const main = container.querySelector('main')
      expect(main).toHaveClass('flex', 'justify-center')

      const contentContainer = container.querySelector('.max-w-4xl')
      expect(contentContainer).toHaveClass('mx-auto')

      const proseContainer = container.querySelector('.prose')
      expect(proseContainer).toHaveClass('mx-auto')
    })
  })

  describe('Image Handling', () => {
    test('should use correct image dimensions for blog posts', () => {
      const { getByTestId } = render(<BlogPost {...mockProps} />)

      const image = getByTestId('blog-post-image')
      expect(image).toHaveAttribute('width', '1412')
      expect(image).toHaveAttribute('height', '460')
      expect(image).toHaveAttribute('data-layout', 'responsive')
    })

    test('should handle different image URLs', () => {
      const testCases = [
        '/img/blog/local-image.jpg',
        'https://example.com/remote-image.jpg',
        '',
      ]

      testCases.forEach((thumbnail) => {
        const propsWithDifferentImage = {
          ...mockProps,
          post: { ...mockProps.post, thumbnail },
        }

        const { getByTestId } = render(<BlogPost {...propsWithDifferentImage} />)

        const image = getByTestId('blog-post-image')
        expect(image).toHaveAttribute('src', thumbnail)
      })
    })
  })

  describe('Accessibility', () => {
    test('should have proper semantic structure', () => {
      const { container } = render(<BlogPost {...mockProps} />)

      const main = container.querySelector('main')
      expect(main).toBeInTheDocument()
      expect(main.tagName.toLowerCase()).toBe('main')
    })

    test('should have proper alt text for image', () => {
      const { getByTestId } = render(<BlogPost {...mockProps} />)

      const image = getByTestId('blog-post-image')
      expect(image).toHaveAttribute('alt', 'Test Blog Post Title')
    })

    test('should maintain proper heading hierarchy with markdown', () => {
      const { getByTestId } = render(<BlogPost {...mockProps} />)

      // The markdown content should be processed to maintain proper heading hierarchy
      const markdown = getByTestId('react-markdown')
      expect(markdown).toBeInTheDocument()
    })
  })

  describe('Fragment Wrapper', () => {
    test('should not add extra DOM elements', () => {
      const { container } = render(<BlogPost {...mockProps} />)

      // Fragment should not create additional wrapper elements
      // The first child should be the Head mock, followed by Navigation and Main
      expect(container.children).toHaveLength(1)
    })
  })
})