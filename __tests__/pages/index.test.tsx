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

jest.mock('../../components/HeroSection', () => {
  return function MockHeroSection(props: any) {
    return (
      <div data-testid="hero-section" data-section-id={props.id}>
        Hero: {props.content?.content}
      </div>
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

jest.mock('../../components/Footer', () => {
  return function MockFooter(props: any) {
    return <div data-testid="footer">Footer: {props.siteTitle}</div>
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
      frontMatter: {},
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
    experience: {
      frontMatter: { title: 'My Experience' },
      content: '# Experience\n\nExperience content',
    },
  },
}

describe('Home Page', () => {
  test('should render home page with correct structure', () => {
    const { getByTestId } = render(<Home {...mockProps} />)

    expect(getByTestId('head')).toBeInTheDocument()
    expect(getByTestId('navigation')).toBeInTheDocument()
    expect(getByTestId('hero-section')).toBeInTheDocument()
    expect(getByTestId('blog-section')).toBeInTheDocument()
    expect(getByTestId('footer')).toBeInTheDocument()
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
    expect(navSections.querySelector('[data-section-id="experience"]')).toHaveTextContent('Experience')

    // Should include blog section
    expect(navSections.querySelector('[data-section-id="blog"]')).toHaveTextContent('Thoughts')
  })

  test('should render the hero section separately from content sections', () => {
    const { getByTestId } = render(<Home {...mockProps} />)

    const hero = getByTestId('hero-section')
    expect(hero).toHaveAttribute('data-section-id', 'welcome')
    expect(hero).toHaveTextContent('Welcome content')
  })

  test('should render all enabled non-hero markdown sections', () => {
    const { getAllByTestId } = render(<Home {...mockProps} />)

    const markdownSections = getAllByTestId('markdown-content')
    expect(markdownSections).toHaveLength(3) // about, expertise, experience

    expect(markdownSections[0]).toHaveAttribute('data-section-id', 'about')
    expect(markdownSections[0]).toHaveAttribute('data-section-title', 'About')

    expect(markdownSections[1]).toHaveAttribute('data-section-id', 'expertise')
    expect(markdownSections[1]).toHaveAttribute('data-section-title', 'Expertise')

    expect(markdownSections[2]).toHaveAttribute('data-section-id', 'experience')
    expect(markdownSections[2]).toHaveAttribute('data-section-title', 'Experience')
  })

  test('should render blog section with posts', () => {
    const { getByTestId } = render(<Home {...mockProps} />)

    const blogSection = getByTestId('blog-section')
    expect(blogSection).toHaveTextContent('Blog Section with 2 posts')
  })

  test('should have correct blog section id', () => {
    const { container } = render(<Home {...mockProps} />)

    const blogContainer = container.querySelector('#blog')
    expect(blogContainer).toBeInTheDocument()
  })

  test('should render footer with site title', () => {
    const { getByTestId } = render(<Home {...mockProps} />)

    const footer = getByTestId('footer')
    expect(footer).toHaveTextContent('Footer: Test Site Title')
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

    test('should still render a MarkdownContentComponent per configured section when content is missing', () => {
      const propsWithMissingContent = {
        ...mockProps,
        content: {
          hero: mockProps.content.hero,
          // Missing about, expertise, experience content
        },
      }

      const { getAllByTestId } = render(<Home {...propsWithMissingContent} />)

      // index.tsx delegates the missing-content guard to MarkdownContentComponent itself
      expect(getAllByTestId('markdown-content')).toHaveLength(3)
    })

    test('should handle empty content object', () => {
      const propsWithNoContent = { ...mockProps, content: {} }
      const { queryByTestId, getAllByTestId } = render(<Home {...propsWithNoContent} />)

      expect(queryByTestId('hero-section')).not.toBeInTheDocument()
      expect(getAllByTestId('markdown-content')).toHaveLength(3)
    })
  })

  describe('Section Configuration', () => {
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

      expect(markdownSections[0]).toHaveTextContent('Section: About (about)')
      expect(markdownSections[1]).toHaveTextContent('Section: Expertise (expertise)')
      expect(markdownSections[2]).toHaveTextContent('Section: Experience (experience)')
    })

    test('should handle posts data correctly', () => {
      const { getByTestId } = render(<Home {...mockProps} />)

      const blogSection = getByTestId('blog-section')
      expect(blogSection).toHaveTextContent('Blog Section with 2 posts')
    })
  })

  describe('Layout Structure', () => {
    test('should have correct document structure', () => {
      const { container, getByTestId } = render(<Home {...mockProps} />)

      // Should have Fragment wrapper with min-h-full div
      const minHeightDiv = container.querySelector('.min-h-full')
      expect(minHeightDiv).toBeInTheDocument()

      // Navigation, hero, content, blog and footer should all be present
      expect(getByTestId('navigation')).toBeInTheDocument()
      expect(getByTestId('hero-section')).toBeInTheDocument()
      expect(getByTestId('blog-section')).toBeInTheDocument()
      expect(getByTestId('footer')).toBeInTheDocument()
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
