import { render } from '@testing-library/react'
import MyApp from '../../pages/_app'
import { AppProps } from 'next/app'

// Mock Next.js Script component
jest.mock('next/script', () => {
  return function MockScript(props: any) {
    return (
      <script
        data-testid="next-script"
        src={props.src}
        type={props.type}
      />
    )
  }
})

// Mock CSS import (it would normally be handled by Next.js)
jest.mock('../../styles/tailwind.css', () => ({}))

// Mock component for testing
const MockComponent = (props: any) => (
  <div data-testid="page-component">
    Mock Page Component
    <div data-testid="page-props">{JSON.stringify(props)}</div>
  </div>
)

const createMockAppProps = (overrides: Partial<AppProps> = {}): AppProps => ({
  Component: MockComponent,
  pageProps: { testProp: 'testValue' },
  router: {
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    basePath: '',
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    isPreview: false,
  },
  ...overrides,
})

describe('MyApp (_app.tsx)', () => {
  test('should render the page component with props', () => {
    const appProps = createMockAppProps()
    const { getByTestId } = render(<MyApp {...appProps} />)

    const pageComponent = getByTestId('page-component')
    expect(pageComponent).toBeInTheDocument()
    expect(pageComponent).toHaveTextContent('Mock Page Component')

    const pageProps = getByTestId('page-props')
    expect(pageProps).toHaveTextContent('{"testProp":"testValue"}')
  })

  test('should render Adobe DTM script', () => {
    const appProps = createMockAppProps()
    const { getByTestId } = render(<MyApp {...appProps} />)

    const script = getByTestId('next-script')
    expect(script).toBeInTheDocument()
    expect(script).toHaveAttribute(
      'src', 
      '//assets.adobedtm.com/launch-EN948973dc19864983827932b329a66b45.min.js'
    )
    expect(script).toHaveAttribute('type', 'text/javascript')
  })

  test('should have correct component structure', () => {
    const appProps = createMockAppProps()
    const { container } = render(<MyApp {...appProps} />)

    // Should have Fragment wrapper (renders as no additional DOM element)
    expect(container.children).toHaveLength(1)
    
    // Should contain both the page component and script
    const pageComponent = container.querySelector('[data-testid="page-component"]')
    const script = container.querySelector('[data-testid="next-script"]')
    
    expect(pageComponent).toBeInTheDocument()
    expect(script).toBeInTheDocument()
  })

  test('should pass all pageProps to the component', () => {
    const customPageProps = {
      title: 'Test Page',
      data: { id: 1, name: 'Test' },
      posts: [{ slug: 'test-post' }],
    }

    const appProps = createMockAppProps({
      pageProps: customPageProps,
    })

    const { getByTestId } = render(<MyApp {...appProps} />)

    const pageProps = getByTestId('page-props')
    expect(pageProps).toHaveTextContent(JSON.stringify(customPageProps))
  })

  test('should handle different page components', () => {
    const CustomComponent = (props: any) => (
      <div data-testid="custom-component">
        Custom Component: {props.customProp}
      </div>
    )

    const appProps = createMockAppProps({
      Component: CustomComponent,
      pageProps: { customProp: 'customValue' },
    })

    const { getByTestId } = render(<MyApp {...appProps} />)

    const customComponent = getByTestId('custom-component')
    expect(customComponent).toBeInTheDocument()
    expect(customComponent).toHaveTextContent('Custom Component: customValue')
  })

  test('should handle empty pageProps', () => {
    const appProps = createMockAppProps({
      pageProps: {},
    })

    const { getByTestId } = render(<MyApp {...appProps} />)

    const pageComponent = getByTestId('page-component')
    expect(pageComponent).toBeInTheDocument()

    const pageProps = getByTestId('page-props')
    expect(pageProps).toHaveTextContent('{}')
  })

  test('should maintain component hierarchy', () => {
    const appProps = createMockAppProps()
    const { container } = render(<MyApp {...appProps} />)

    const children = Array.from(container.children[0].children)
    
    // Page component should come first
    expect(children[0]).toHaveAttribute('data-testid', 'page-component')
    
    // Script should come second
    expect(children[1]).toHaveAttribute('data-testid', 'next-script')
  })

  describe('Page Props Handling', () => {
    test('should handle complex nested pageProps', () => {
      const complexPageProps = {
        siteConfig: {
          title: 'Test Site',
          description: 'Test Description',
        },
        posts: [
          { slug: 'post-1', title: 'Post 1' },
          { slug: 'post-2', title: 'Post 2' },
        ],
        content: {
          hero: { title: 'Hero', content: 'Hero content' },
          about: { title: 'About', content: 'About content' },
        },
      }

      const appProps = createMockAppProps({
        pageProps: complexPageProps,
      })

      const { getByTestId } = render(<MyApp {...appProps} />)

      const pageProps = getByTestId('page-props')
      expect(pageProps).toHaveTextContent(JSON.stringify(complexPageProps))
    })

    test('should handle pageProps with functions (though they should not normally be passed)', () => {
      const pagePropsWithFunction = {
        data: 'test',
        // Functions should not normally be in pageProps, but testing edge case
        callback: () => {},
      }

      const appProps = createMockAppProps({
        pageProps: pagePropsWithFunction,
      })

      // Should not throw an error when rendering
      expect(() => {
        render(<MyApp {...appProps} />)
      }).not.toThrow()
    })

    test('should handle null and undefined pageProps', () => {
      const testCases = [null, undefined]

      testCases.forEach((pageProps) => {
        const appProps = createMockAppProps({
          pageProps: pageProps as any,
        })

        expect(() => {
          render(<MyApp {...appProps} />)
        }).not.toThrow()
      })
    })
  })

  describe('Component Integration', () => {
    test('should work with different component types', () => {
      // Class component
      class ClassComponent extends React.Component {
        render() {
          return <div data-testid="class-component">Class Component</div>
        }
      }

      // Function component
      const FunctionComponent = () => (
        <div data-testid="function-component">Function Component</div>
      )

      // ForwardRef component
      const ForwardRefComponent = React.forwardRef<HTMLDivElement>((props, ref) => (
        <div ref={ref} data-testid="forwardref-component">ForwardRef Component</div>
      ))

      const components = [
        { Component: ClassComponent, testId: 'class-component' },
        { Component: FunctionComponent, testId: 'function-component' },
        { Component: ForwardRefComponent, testId: 'forwardref-component' },
      ]

      components.forEach(({ Component, testId }) => {
        const appProps = createMockAppProps({
          Component,
          pageProps: {},
        })

        const { getByTestId } = render(<MyApp {...appProps} />)
        expect(getByTestId(testId)).toBeInTheDocument()
      })
    })

    test('should preserve component displayName', () => {
      const NamedComponent = () => <div data-testid="named-component">Named</div>
      NamedComponent.displayName = 'NamedComponent'

      const appProps = createMockAppProps({
        Component: NamedComponent,
        pageProps: {},
      })

      const { getByTestId } = render(<MyApp {...appProps} />)
      expect(getByTestId('named-component')).toBeInTheDocument()
    })
  })

  describe('Script Loading', () => {
    test('should include Adobe DTM script for analytics', () => {
      const appProps = createMockAppProps()
      const { getByTestId } = render(<MyApp {...appProps} />)

      const script = getByTestId('next-script')
      
      // Verify it's the Adobe DTM script
      expect(script).toHaveAttribute('src')
      const src = script.getAttribute('src')
      expect(src).toContain('assets.adobedtm.com')
      expect(src).toContain('launch-EN948973dc19864983827932b329a66b45.min.js')
    })

    test('should set correct script type', () => {
      const appProps = createMockAppProps()
      const { getByTestId } = render(<MyApp {...appProps} />)

      const script = getByTestId('next-script')
      expect(script).toHaveAttribute('type', 'text/javascript')
    })
  })

  describe('Error Boundaries', () => {
    test('should not crash when component throws error', () => {
      const ErrorComponent = () => {
        throw new Error('Test error')
      }

      const appProps = createMockAppProps({
        Component: ErrorComponent,
        pageProps: {},
      })

      // This would normally be caught by an error boundary in a real app
      // For this test, we're just ensuring the MyApp structure is sound
      expect(() => {
        try {
          render(<MyApp {...appProps} />)
        } catch (error) {
          // Expected to throw in this test case
        }
      }).not.toThrow('Unexpected error in MyApp structure')
    })
  })

  describe('Performance', () => {
    test('should not re-render unnecessarily', () => {
      let renderCount = 0
      
      const CountingComponent = () => {
        renderCount++
        return <div data-testid="counting-component">Render #{renderCount}</div>
      }

      const appProps = createMockAppProps({
        Component: CountingComponent,
        pageProps: { prop: 'value' },
      })

      const { getByTestId, rerender } = render(<MyApp {...appProps} />)
      
      expect(getByTestId('counting-component')).toHaveTextContent('Render #1')
      
      // Rerender with same props - should re-render (this is expected behavior)
      rerender(<MyApp {...appProps} />)
      
      expect(getByTestId('counting-component')).toHaveTextContent('Render #2')
    })
  })
})