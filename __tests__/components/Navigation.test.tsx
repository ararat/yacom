import { render, fireEvent } from '@testing-library/react'
import Navigation from '../../components/Navigation'
import { ThemeProvider } from '../../contexts/ThemeContext'

// Mock Next.js router
const mockPush = jest.fn(() => Promise.resolve(true))
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock child components
jest.mock('../../components/StandardNavigation', () => {
  return function MockStandardNavigation(props: any) {
    if (props.mobileButtonOnly) {
      return (
        <button
          data-testid="mobile-button"
          onClick={() => props.setNavbar(!props.navbar)}
        >
          {props.navbar ? 'Close' : 'Open'}
        </button>
      )
    }
    if (props.menuItemsOnly) {
      return (
        <div data-testid="menu-items">
          {props.sections?.map((section: any) => (
            <a key={section.id} href={`/#${section.id}`}>
              {section.navTitle}
            </a>
          ))}
        </div>
      )
    }
    return null
  }
})

jest.mock('../../components/BlogPostNavigation', () => {
  return function MockBlogPostNavigation(props: any) {
    return <div data-testid="blog-nav">Blog nav for: {props.postTitle}</div>
  }
})

const mockSections = [
  { id: 'home', navTitle: 'Home', enabled: true },
  { id: 'about', navTitle: 'About', enabled: true },
]

describe('Navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Mock window.location
    delete (window as any).location
    window.location = { pathname: '/' } as any
  })

  describe('Standard Navigation Variant', () => {
    test('should render standard navigation with site title', () => {
      const { getByRole } = render(
        <Navigation
          variant="standard"
          SiteTitle="Test Site"
          SiteDescription="Test Description"
          sections={mockSections}
        />
      )

      const heading = getByRole('heading', { level: 2 })
      expect(heading).toHaveTextContent('Test Site')

      const siteLink = getByRole('link', { name: 'Test Site' })
      expect(siteLink).toHaveAttribute('href', '/')
    })

    test('should render mobile button and menu items', () => {
      const { getByTestId } = render(
        <ThemeProvider>
          <Navigation
            variant="standard"
            SiteTitle="Test Site"
            SiteDescription="Test Description"
            sections={mockSections}
          />
        </ThemeProvider>
      )

      expect(getByTestId('mobile-button')).toBeInTheDocument()
      expect(getByTestId('menu-items')).toBeInTheDocument()
    })

    test('should manage navbar state correctly', () => {
      const { getByTestId } = render(
        <ThemeProvider>
          <Navigation
            variant="standard"
            SiteTitle="Test Site"
            SiteDescription="Test Description"
            sections={mockSections}
          />
        </ThemeProvider>
      )

      const mobileButton = getByTestId('mobile-button')
      expect(mobileButton).toHaveTextContent('Open')

      fireEvent.click(mobileButton)
      expect(mobileButton).toHaveTextContent('Close')
    })

    test('should handle scroll-to-top when on home page', async () => {
      const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation()
      
      const { getByRole } = render(
        <Navigation
          variant="standard"
          SiteTitle="Test Site"
          SiteDescription="Test Description"
          sections={mockSections}
        />
      )

      const siteLink = getByRole('link', { name: 'Test Site' })
      fireEvent.click(siteLink)

      expect(mockPush).toHaveBeenCalledWith('/')
      
      // Wait for promise to resolve
      await new Promise(resolve => setTimeout(resolve, 0))
      expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
      
      scrollToSpy.mockRestore()
    })

    test('should allow normal navigation when not on home page', () => {
      Object.defineProperty(window, 'location', {
        value: { pathname: '/other-page' },
        writable: true,
      })

      const { getByRole } = render(
        <Navigation
          variant="standard"
          SiteTitle="Test Site"
          SiteDescription="Test Description"
          sections={mockSections}
        />
      )

      const siteLink = getByRole('link', { name: 'Test Site' })
      fireEvent.click(siteLink)

      expect(mockPush).not.toHaveBeenCalled()
    })
  })

  describe('Blog Post Navigation Variant', () => {
    test('should render blog post navigation with structured data', () => {
      const { getByTestId } = render(
        <Navigation
          variant="blogPost"
          siteTitle="Test Site"
          postTitle="My Blog Post"
        />
      )

      expect(getByTestId('blog-nav')).toHaveTextContent('Blog nav for: My Blog Post')
    })

    test('should render site title as h1 in blog variant', () => {
      const { getByRole } = render(
        <Navigation
          variant="blogPost"
          siteTitle="Test Site"
          postTitle="My Blog Post"
        />
      )

      const heading = getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent('Test Site')
    })

    test('should include structured data script', () => {
      const { container } = render(
        <Navigation
          variant="blogPost"
          siteTitle="Test Site"
          postTitle="My Blog Post"
        />
      )

      const script = container.querySelector('script[type="application/ld+json"]')
      expect(script).toBeInTheDocument()
      
      const structuredData = JSON.parse(script?.textContent || '{}')
      expect(structuredData['@type']).toBe('BreadcrumbList')
      expect(structuredData.itemListElement).toHaveLength(3)
      expect(structuredData.itemListElement[2].name).toBe('My Blog Post')
    })

    test('should handle scroll-to-top in blog variant', async () => {
      const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation()
      
      const { getByRole } = render(
        <Navigation
          variant="blogPost"
          siteTitle="Test Site"
          postTitle="My Blog Post"
        />
      )

      const siteLink = getByRole('link', { name: 'Test Site' })
      fireEvent.click(siteLink)

      expect(mockPush).toHaveBeenCalledWith('/')
      
      await new Promise(resolve => setTimeout(resolve, 0))
      expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
      
      scrollToSpy.mockRestore()
    })
  })

  describe('Styling and Layout', () => {
    test('should have correct padding for standard variant', () => {
      const { container } = render(
        <ThemeProvider>
          <Navigation
            variant="standard"
            SiteTitle="Test Site"
            SiteDescription="Test Description"
            sections={mockSections}
          />
        </ThemeProvider>
      )

      const nav = container.querySelector('nav')
      expect(nav).toHaveClass('py-2')
    })

    test('should have correct padding for blog variant', () => {
      const { container } = render(
        <Navigation
          variant="blogPost"
          siteTitle="Test Site"
          postTitle="My Blog Post"
        />
      )

      const nav = container.querySelector('nav')
      expect(nav).toHaveClass('py-4')
    })

    test('should have common navigation classes', () => {
      const { container } = render(
        <ThemeProvider>
          <Navigation
            variant="standard"
            SiteTitle="Test Site"
            SiteDescription="Test Description"
            sections={mockSections}
          />
        </ThemeProvider>
      )

      const nav = container.querySelector('nav')
      expect(nav).toHaveClass(
        'fixed', 'top-0', 'left-0', 'right-0', 'bg-slate-800/95',
        'backdrop-blur-sm', 'text-white', 'z-50', 'shadow-lg',
        'transition-all', 'duration-300'
      )
    })

    test('should have correct container classes', () => {
      const { container } = render(
        <Navigation
          variant="blogPost"
          siteTitle="Test Site"
          postTitle="My Blog Post"
        />
      )

      const innerContainer = container.querySelector('.max-w-7xl')
      expect(innerContainer).toHaveClass('max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6')
    })
  })

  describe('Props Handling', () => {
    test('should handle different site title prop names', () => {
      const { getByRole, rerender } = render(
        <Navigation
          variant="standard"
          SiteTitle="Standard Title"
          SiteDescription="Test Description"
          sections={mockSections}
        />
      )

      expect(getByRole('heading', { level: 2 })).toHaveTextContent('Standard Title')

      rerender(
        <Navigation
          variant="blogPost"
          siteTitle="Blog Title"
          postTitle="My Blog Post"
        />
      )

      expect(getByRole('heading', { level: 1 })).toHaveTextContent('Blog Title')
    })

    test('should handle undefined sections gracefully', () => {
      const { getByTestId } = render(
        <Navigation
          variant="standard"
          SiteTitle="Test Site"
          SiteDescription="Test Description"
        />
      )

      // Should still render without errors
      expect(getByTestId('mobile-button')).toBeInTheDocument()
      expect(getByTestId('menu-items')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    test('should have proper heading hierarchy', () => {
      const { getByRole } = render(
        <Navigation
          variant="standard"
          SiteTitle="Test Site"
          SiteDescription="Test Description"
          sections={mockSections}
        />
      )

      const heading = getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
    })

    test('should have proper link accessibility', () => {
      const { getByRole } = render(
        <Navigation
          variant="blogPost"
          siteTitle="Test Site"
          postTitle="My Blog Post"
        />
      )

      const siteLink = getByRole('link', { name: 'Test Site' })
      expect(siteLink).toHaveClass('hover:text-blue-300', 'transition-colors', 'duration-200')
    })
  })
})