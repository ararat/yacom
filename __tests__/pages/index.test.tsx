import { render } from '@testing-library/react'
import Home from '../../pages/index'

// Mock Next.js components
jest.mock('next/head', () => {
  return function MockHead({ children }: any) {
    return <div data-testid="head">{children}</div>
  }
})

// Mock child components
jest.mock('../../components/Navigation', () => {
  return function MockNavigation(props: any) {
    return (
      <nav data-testid="navigation" data-variant={props.variant}>
        Navigation: {props.SiteTitle}
        <div data-testid="nav-sections">
          {props.sections?.map((section: any) => (
            <span key={section.id} data-section-id={section.id}>
              {section.navTitle}
            </span>
          ))}
        </div>
      </nav>
    )
  }
})

jest.mock('../../components/MarkdownContentComponent', () => {
  return function MockMarkdownContentComponent(props: any) {
    return (
      <div 
        data-testid="markdown-content" 
        data-section-id={props.section.id}
        data-section-title={props.section.navTitle}
      >
        Section: {props.section.navTitle} ({props.section.id})
      </div>
    )
  }
})

jest.mock('../../components/BlogSection', () => {
  return function MockBlogSection(props: any) {
    return (
      <div data-testid="blog-section">
        Blog Section with {props.posts.length} posts
      </div>
    )
  }
})

const mockProps = {
  SiteTitle: 'Test Site Title',
  SiteDescription: 'Test site description for testing purposes',
  posts: [
    {
      slug: 'first-post',
      frontMatter: {
        title: 'First Post',
        date: '2023-01-02',
        description: 'First test post',
      },
    },
    {
      slug: 'second-post',
      frontMatter: {
        title: 'Second Post',
        date: '2023-01-01',
        description: 'Second test post',
      },
    },
  ],
  content: {
    hero: {
      frontMatter: { title: 'Welcome' },
      content: '# Welcome\n\nWelcome content',
    },
    about: {
      frontMatter: { title: 'About Me' },
      content: '# About\n\nAbout content',
    },
    expertise: {
      frontMatter: { title: 'My Expertise' },
      content: '# Expertise\n\nExpertise content',
    },
  },
}

describe('Home Page', () => {
  test('should render home page with correct structure', () => {
    const { getByTestId } = render(<Home {...mockProps} />)

    expect(getByTestId('head')).toBeInTheDocument()
    expect(getByTestId('navigation')).toBeInTheDocument()
    expect(getByTestId('blog-section')).toBeInTheDocument()
  })

  test('should set correct page title and meta description', () => {
    const { getByTestId } = render(<Home {...mockProps} />)

    const head = getByTestId('head')
    expect(head).toHaveTextContent('Test Site Title')
    expect(head).toHaveTextContent('Test site description for testing purposes')
  })

  test('should render navigation with correct props', () => {
    const { getByTestId } = render(<Home {...mockProps} />)

    const navigation = getByTestId('navigation')
    expect(navigation).toHaveAttribute('data-variant', 'standard')
    expect(navigation).toHaveTextContent('Navigation: Test Site Title')
  })

  test('should render navigation sections correctly', () => {
    const { getByTestId } = render(<Home {...mockProps} />)

    const navSections = getByTestId('nav-sections')
    
    // Should include enabled sections from SECTIONS_CONFIG
    expect(navSections.querySelector('[data-section-id="welcome"]')).toHaveTextContent('Welcome')
    expect(navSections.querySelector('[data-section-id="about"]')).toHaveTextContent('About')
    expect(navSections.querySelector('[data-section-id="expertise"]')).toHaveTextContent('Expertise')
    
    // Should include blog section
    expect(navSections.querySelector('[data-section-id="blog"]')).toHaveTextContent('Thoughts')
  })

  test('should render all enabled markdown sections', () => {
    const { getAllByTestId } = render(<Home {...mockProps} />)

    const markdownSections = getAllByTestId('markdown-content')
    expect(markdownSections).toHaveLength(3) // welcome, about, expertise

    expect(markdownSections[0]).toHaveAttribute('data-section-id', 'welcome')
    expect(markdownSections[0]).toHaveAttribute('data-section-title', 'Welcome')

    expect(markdownSections[1]).toHaveAttribute('data-section-id', 'about')
    expect(markdownSections[1]).toHaveAttribute('data-section-title', 'About')

    expect(markdownSections[2]).toHaveAttribute('data-section-id', 'expertise')
    expect(markdownSections[2]).toHaveAttribute('data-section-title', 'Expertise')
  })

  test('should render blog section with posts', () => {
    const { getByTestId } = render(<Home {...mockProps} />)

    const blogSection = getByTestId('blog-section')
    expect(blogSection).toHaveTextContent('Blog Section with 2 posts')
  })

  test('should have correct blog section styling and id', () => {
    const { container } = render(<Home {...mockProps} />)

    const blogContainer = container.querySelector('#blog')
    expect(blogContainer).toBeInTheDocument()
    expect(blogContainer).toHaveClass(
      'snap-start', 'bg-cyan-500', 'w-screen', 'min-h-screen'
    )
  })

  test('should have correct main container styling', () => {
    const { container } = render(<Home {...mockProps} />)

    const mainContainer = container.querySelector('.snap-y')
    expect(mainContainer).toHaveClass(
      'snap-y', 'snap-mandatory', 'min-h-full', 'h-screen', 'w-auto',
      'overflow-y-scroll', 'overflow-x-hidden'
    )
  })

  test('should include SEO meta tags', () => {
    const { getByTestId } = render(<Home {...mockProps} />)

    const head = getByTestId('head')
    
    // Check if meta tags are present (they would be rendered as children)
    expect(head.innerHTML).toContain('name="description"')
    expect(head.innerHTML).toContain('itemProp="name"')
    expect(head.innerHTML).toContain('itemProp="url"')
    expect(head.innerHTML).toContain('content="Yuval Ararat"')
    expect(head.innerHTML).toContain('content="//www.yuvalararat.com"')
  })

  describe('Props Handling', () => {
    test('should handle empty posts array', () => {
      const propsWithNoPosts = { ...mockProps, posts: [] }
      const { getByTestId } = render(<Home {...propsWithNoPosts} />)

      const blogSection = getByTestId('blog-section')
      expect(blogSection).toHaveTextContent('Blog Section with 0 posts')
    })

    test('should handle missing content for sections', () => {
      const propsWithMissingContent = {
        ...mockProps,
        content: {
          hero: mockProps.content.hero,
          // Missing about and expertise content
        },
      }

      const { getAllByTestId } = render(<Home {...propsWithMissingContent} />)

      // Should still render all sections even with missing content
      const markdownSections = getAllByTestId('markdown-content')
      expect(markdownSections).toHaveLength(3)
    })

    test('should handle empty content object', () => {
      const propsWithNoContent = { ...mockProps, content: {} }
      const { getAllByTestId } = render(<Home {...propsWithNoContent} />)

      // Should still render section components
      const markdownSections = getAllByTestId('markdown-content')
      expect(markdownSections).toHaveLength(3)
    })
  })

  describe('Section Configuration', () => {
    test('should only render enabled sections', () => {
      // The SECTIONS_CONFIG in the component has all sections enabled
      const { getAllByTestId } = render(<Home {...mockProps} />)

      const markdownSections = getAllByTestId('markdown-content')
      expect(markdownSections).toHaveLength(3) // All sections are enabled
    })

    test('should filter out hideFromNav sections from navigation', () => {
      const { getByTestId } = render(<Home {...mockProps} />)

      const navSections = getByTestId('nav-sections')
      
      // All sections in SECTIONS_CONFIG have hideFromNav: false, so all should appear
      expect(navSections.querySelector('[data-section-id="welcome"]')).toBeInTheDocument()
      expect(navSections.querySelector('[data-section-id="about"]')).toBeInTheDocument()
      expect(navSections.querySelector('[data-section-id="expertise"]')).toBeInTheDocument()
    })

    test('should include blog section in navigation', () => {
      const { getByTestId } = render(<Home {...mockProps} />)

      const navSections = getByTestId('nav-sections')
      const blogSection = navSections.querySelector('[data-section-id="blog"]')
      
      expect(blogSection).toBeInTheDocument()
      expect(blogSection).toHaveTextContent('Thoughts')
    })
  })

  describe('Content Integration', () => {
    test('should pass correct content to MarkdownContentComponent', () => {
      const { getAllByTestId } = render(<Home {...mockProps} />)

      const markdownSections = getAllByTestId('markdown-content')
      
      // Verify each section gets its corresponding content
      expect(markdownSections[0]).toHaveTextContent('Section: Welcome (welcome)')
      expect(markdownSections[1]).toHaveTextContent('Section: About (about)')
      expect(markdownSections[2]).toHaveTextContent('Section: Expertise (expertise)')
    })

    test('should handle posts data correctly', () => {
      const { getByTestId } = render(<Home {...mockProps} />)

      const blogSection = getByTestId('blog-section')
      expect(blogSection).toHaveTextContent('Blog Section with 2 posts')
    })
  })

  describe('Layout Structure', () => {
    test('should have correct document structure', () => {
      const { container } = render(<Home {...mockProps} />)

      // Should have Fragment wrapper with min-h-full div
      const minHeightDiv = container.querySelector('.min-h-full')
      expect(minHeightDiv).toBeInTheDocument()

      // Should have snap container
      const snapContainer = container.querySelector('.snap-y.snap-mandatory')
      expect(snapContainer).toBeInTheDocument()
    })

    test('should maintain proper component order', () => {
      const { container } = render(<Home {...mockProps} />)

      const snapContainer = container.querySelector('.snap-y.snap-mandatory')
      const children = Array.from(snapContainer?.children || [])

      // Navigation should be first
      expect(children[0]).toHaveAttribute('data-testid', 'navigation')

      // Markdown sections should follow
      expect(children[1]).toHaveAttribute('data-testid', 'markdown-content')
      expect(children[2]).toHaveAttribute('data-testid', 'markdown-content')
      expect(children[3]).toHaveAttribute('data-testid', 'markdown-content')

      // Blog section should be last
      expect(children[4]).toHaveAttribute('id', 'blog')
    })
  })

  describe('Accessibility', () => {
    test('should have proper semantic structure', () => {
      const { getByTestId } = render(<Home {...mockProps} />)

      // Navigation should be present
      const navigation = getByTestId('navigation')
      expect(navigation.tagName.toLowerCase()).toBe('nav')
    })

    test('should have proper page metadata', () => {
      const { getByTestId } = render(<Home {...mockProps} />)

      const head = getByTestId('head')
      expect(head.innerHTML).toContain('<title>')
      expect(head.innerHTML).toContain('name="description"')
    })
  })

  describe('Edge Cases', () => {
    test('should handle undefined props gracefully', () => {
      const minimalProps = {
        SiteTitle: '',
        SiteDescription: '',
        posts: [],
        content: {},
      }

      const { getByTestId } = render(<Home {...minimalProps} />)

      expect(getByTestId('navigation')).toBeInTheDocument()
      expect(getByTestId('blog-section')).toBeInTheDocument()
    })

    test('should handle posts with different frontMatter structures', () => {
      const propsWithVariedPosts = {
        ...mockProps,
        posts: [
          {
            slug: 'post-1',
            frontMatter: {
              title: 'Post 1',
              date: '2023-01-01',
            },
          },
          {
            slug: 'post-2',
            frontMatter: {
              title: 'Post 2',
              // Missing date
            },
          },
        ],
      }

      const { getByTestId } = render(<Home {...propsWithVariedPosts} />)

      const blogSection = getByTestId('blog-section')
      expect(blogSection).toHaveTextContent('Blog Section with 2 posts')
    })
  })
})