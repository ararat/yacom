import { render } from '@testing-library/react'
import Document from '../../pages/_document'

// Mock Next.js Document components
jest.mock('next/document', () => ({
  Html: ({ children, className, lang, ...props }: any) => (
    <html data-testid="document-html" className={className} lang={lang} {...props}>
      {children}
    </html>
  ),
  Head: ({ children, ...props }: any) => (
    <head data-testid="document-head" {...props}>
      {children}
    </head>
  ),
  Main: (props: any) => (
    <main data-testid="document-main" {...props}>
      Main Content Placeholder
    </main>
  ),
  NextScript: (props: any) => (
    <div data-testid="document-nextscript" {...props}>
      NextScript Placeholder
    </div>
  ),
}))

describe('Document (_document.tsx)', () => {
  test('should render HTML element with correct attributes', () => {
    const { getByTestId } = render(<Document />)

    const htmlElement = getByTestId('document-html')
    expect(htmlElement).toBeInTheDocument()
    expect(htmlElement).toHaveAttribute('lang', 'en')
    expect(htmlElement).toHaveClass('scroll-smooth')
  })

  test('should render Head with favicon links', () => {
    const { getByTestId, container } = render(<Document />)

    const headElement = getByTestId('document-head')
    expect(headElement).toBeInTheDocument()

    // Check for favicon links
    const favicon32 = container.querySelector('link[sizes="32x32"]')
    expect(favicon32).toBeInTheDocument()
    expect(favicon32).toHaveAttribute('rel', 'icon')
    expect(favicon32).toHaveAttribute('href', 'img/cropped-Avatar-2-32x32.png')

    const favicon192 = container.querySelector('link[sizes="192x192"]')
    expect(favicon192).toBeInTheDocument()
    expect(favicon192).toHaveAttribute('rel', 'icon')
    expect(favicon192).toHaveAttribute('href', 'img/cropped-Avatar-2-192x192.png')
  })

  test('should render apple-touch-icon link', () => {
    const { container } = render(<Document />)

    const appleTouchIcon = container.querySelector('link[rel="apple-touch-icon"]')
    expect(appleTouchIcon).toBeInTheDocument()
    expect(appleTouchIcon).toHaveAttribute('href', 'img/cropped-Avatar-2-180x180.png')
  })

  test('should render image preload links', () => {
    const { container } = render(<Document />)

    const preloadLinks = container.querySelectorAll('link[rel="preload"][as="image"]')
    expect(preloadLinks).toHaveLength(2)

    // Check for yuval-ararat.png preload
    const preload1 = container.querySelector('link[href="/img/yuval-ararat.png"]')
    expect(preload1).toBeInTheDocument()
    expect(preload1).toHaveAttribute('rel', 'preload')
    expect(preload1).toHaveAttribute('as', 'image')

    // Check for blog-thumbnail.jpeg preload
    const preload2 = container.querySelector('link[href="/img/blog/blog-thumbnail.jpeg"]')
    expect(preload2).toBeInTheDocument()
    expect(preload2).toHaveAttribute('rel', 'preload')
    expect(preload2).toHaveAttribute('as', 'image')
  })

  test('should render body with Main and NextScript', () => {
    const { getByTestId } = render(<Document />)

    const mainElement = getByTestId('document-main')
    expect(mainElement).toBeInTheDocument()

    const nextScriptElement = getByTestId('document-nextscript')
    expect(nextScriptElement).toBeInTheDocument()
  })

  test('should have correct document structure', () => {
    const { getByTestId } = render(<Document />)

    const htmlElement = getByTestId('document-html')
    const headElement = getByTestId('document-head')
    const mainElement = getByTestId('document-main')
    const nextScriptElement = getByTestId('document-nextscript')

    // HTML should contain Head and body
    expect(htmlElement).toContainElement(headElement)
    expect(htmlElement).toContainElement(mainElement)
    expect(htmlElement).toContainElement(nextScriptElement)
  })

  test('should have all required favicon sizes', () => {
    const { container } = render(<Document />)

    // Check for multiple favicon sizes for different devices
    const iconLinks = container.querySelectorAll('link[rel="icon"]')
    expect(iconLinks).toHaveLength(2)

    const sizes = Array.from(iconLinks).map(link => link.getAttribute('sizes'))
    expect(sizes).toContain('32x32')
    expect(sizes).toContain('192x192')
  })

  test('should use correct icon file paths', () => {
    const { container } = render(<Document />)

    const allIconLinks = container.querySelectorAll('link[href*="cropped-Avatar-2"]')
    expect(allIconLinks).toHaveLength(3) // 2 favicons + 1 apple-touch-icon

    const hrefs = Array.from(allIconLinks).map(link => link.getAttribute('href'))
    expect(hrefs).toContain('img/cropped-Avatar-2-32x32.png')
    expect(hrefs).toContain('img/cropped-Avatar-2-192x192.png')
    expect(hrefs).toContain('img/cropped-Avatar-2-180x180.png')
  })

  describe('Performance Optimizations', () => {
    test('should preload critical images', () => {
      const { container } = render(<Document />)

      const preloadLinks = container.querySelectorAll('link[rel="preload"]')
      expect(preloadLinks).toHaveLength(2)

      // Should preload profile image
      const profilePreload = container.querySelector('link[href="/img/yuval-ararat.png"]')
      expect(profilePreload).toHaveAttribute('as', 'image')

      // Should preload default blog thumbnail
      const blogPreload = container.querySelector('link[href="/img/blog/blog-thumbnail.jpeg"]')
      expect(blogPreload).toHaveAttribute('as', 'image')
    })

    test('should have scroll-smooth class for better UX', () => {
      const { getByTestId } = render(<Document />)

      const htmlElement = getByTestId('document-html')
      expect(htmlElement).toHaveClass('scroll-smooth')
    })
  })

  describe('Accessibility', () => {
    test('should have proper lang attribute', () => {
      const { getByTestId } = render(<Document />)

      const htmlElement = getByTestId('document-html')
      expect(htmlElement).toHaveAttribute('lang', 'en')
    })

    test('should have proper document structure for screen readers', () => {
      const { getByTestId } = render(<Document />)

      // Should have main content area
      const mainElement = getByTestId('document-main')
      expect(mainElement.tagName.toLowerCase()).toBe('main')
    })
  })

  describe('Icon Specifications', () => {
    test('should have proper icon sizes for different platforms', () => {
      const { container } = render(<Document />)

      // 32x32 for browser favicon
      const favicon32 = container.querySelector('link[sizes="32x32"]')
      expect(favicon32).toHaveAttribute('href', 'img/cropped-Avatar-2-32x32.png')

      // 192x192 for Android Chrome
      const favicon192 = container.querySelector('link[sizes="192x192"]')
      expect(favicon192).toHaveAttribute('href', 'img/cropped-Avatar-2-192x192.png')

      // 180x180 for iOS Safari
      const appleTouchIcon = container.querySelector('link[rel="apple-touch-icon"]')
      expect(appleTouchIcon).toHaveAttribute('href', 'img/cropped-Avatar-2-180x180.png')
    })

    test('should have correct link relationships', () => {
      const { container } = render(<Document />)

      const iconRels = ['icon', 'apple-touch-icon']
      iconRels.forEach(rel => {
        const link = container.querySelector(`link[rel="${rel}"]`)
        expect(link).toBeInTheDocument()
      })
    })
  })

  describe('Link Validation', () => {
    test('should have valid image paths', () => {
      const { container } = render(<Document />)

      const imageLinks = container.querySelectorAll('link[href*=".png"], link[href*=".jpeg"]')
      
      imageLinks.forEach(link => {
        const href = link.getAttribute('href')
        expect(href).toBeTruthy()
        expect(href).toMatch(/\.(png|jpeg)$/)
      })
    })

    test('should use consistent naming convention for avatar images', () => {
      const { container } = render(<Document />)

      const avatarLinks = container.querySelectorAll('link[href*="cropped-Avatar-2"]')
      
      avatarLinks.forEach(link => {
        const href = link.getAttribute('href')
        expect(href).toContain('cropped-Avatar-2')
        expect(href).toMatch(/img\/cropped-Avatar-2-\d+x\d+\.png$/)
      })
    })
  })

  describe('SEO and Metadata', () => {
    test('should provide proper favicon hierarchy', () => {
      const { container } = render(<Document />)

      // Should have both standard favicon and apple-touch-icon
      const iconLink = container.querySelector('link[rel="icon"]')
      const appleTouchIcon = container.querySelector('link[rel="apple-touch-icon"]')
      
      expect(iconLink).toBeInTheDocument()
      expect(appleTouchIcon).toBeInTheDocument()
    })

    test('should include resource hints for performance', () => {
      const { container } = render(<Document />)

      const preloadLinks = container.querySelectorAll('link[rel="preload"]')
      expect(preloadLinks.length).toBeGreaterThan(0)

      preloadLinks.forEach(link => {
        expect(link).toHaveAttribute('as')
      })
    })
  })

  describe('Cross-browser Compatibility', () => {
    test('should support multiple favicon formats', () => {
      const { container } = render(<Document />)

      // Should have different sizes for different devices/browsers
      const favicon32 = container.querySelector('link[sizes="32x32"]')
      const favicon192 = container.querySelector('link[sizes="192x192"]')
      
      expect(favicon32).toBeInTheDocument()
      expect(favicon192).toBeInTheDocument()
    })

    test('should include Apple-specific icon', () => {
      const { container } = render(<Document />)

      const appleTouchIcon = container.querySelector('link[rel="apple-touch-icon"]')
      expect(appleTouchIcon).toBeInTheDocument()
      expect(appleTouchIcon).toHaveAttribute('href', 'img/cropped-Avatar-2-180x180.png')
    })
  })
})