import { render, fireEvent, waitFor, act } from '@testing-library/react'
import BlogSection from '../../components/BlogSection'

// Mock BlogPost component
jest.mock('../../components/BlogPost', () => {
  return function MockBlogPost(props: any) {
    return (
      <div data-testid="blog-post" data-slug={props.slug}>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <img src={props.imageSrc} alt="" />
      </div>
    )
  }
})

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
})
window.IntersectionObserver = mockIntersectionObserver

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn((cb) => setTimeout(cb, 0))

// Mock window.scrollTo and window.scrollY
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true,
})

Object.defineProperty(window, 'scrollY', {
  value: 0,
  writable: true,
})

const mockPosts = [
  {
    slug: 'first-post',
    frontMatter: {
      title: 'First Post',
      description: 'Description of first post',
      tags: 'react, javascript',
      thumbnail: '/img/first.jpg',
    },
  },
  {
    slug: 'second-post',
    frontMatter: {
      title: 'Second Post',
      description: 'Description of second post',
      tags: 'typescript, testing',
      thumbnail: '/img/second.jpg',
    },
  },
  {
    slug: 'third-post',
    frontMatter: {
      title: 'Third Post',
      description: 'Another great post',
      tags: 'nextjs, react',
      thumbnail: '/img/third.jpg',
    },
  },
]

const createManyPosts = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    slug: `post-${i + 1}`,
    frontMatter: {
      title: `Post ${i + 1}`,
      description: `Description for post ${i + 1}`,
      tags: `tag${i % 3 + 1}, general`,
      thumbnail: `/img/post-${i + 1}.jpg`,
    },
  }))
}

describe('BlogSection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    window.scrollY = 0
  })

  test('should render blog section with title', () => {
    const { getByRole } = render(<BlogSection posts={mockPosts} />)

    const title = getByRole('heading', { level: 2 })
    expect(title).toHaveTextContent('Recent Thoughts')
  })

  test('should render search input', () => {
    const { getByRole } = render(<BlogSection posts={mockPosts} />)

    const searchInput = getByRole('textbox', { name: 'Search blog posts' })
    expect(searchInput).toBeInTheDocument()
    expect(searchInput).toHaveAttribute('placeholder', 'Search thoughts...')
  })

  test('should render blog posts', () => {
    const { getAllByTestId } = render(<BlogSection posts={mockPosts} />)

    const blogPosts = getAllByTestId('blog-post')
    expect(blogPosts).toHaveLength(3)
    expect(blogPosts[0]).toHaveAttribute('data-slug', 'first-post')
  })

  describe('Search Functionality', () => {
    test('should filter posts by title', () => {
      const { getByRole, getAllByTestId } = render(<BlogSection posts={mockPosts} />)

      const searchInput = getByRole('textbox', { name: 'Search blog posts' })
      fireEvent.change(searchInput, { target: { value: 'First' } })

      const blogPosts = getAllByTestId('blog-post')
      expect(blogPosts).toHaveLength(1)
      expect(blogPosts[0]).toHaveAttribute('data-slug', 'first-post')
    })

    test('should filter posts by description', () => {
      const { getByRole, getAllByTestId } = render(<BlogSection posts={mockPosts} />)

      const searchInput = getByRole('textbox', { name: 'Search blog posts' })
      fireEvent.change(searchInput, { target: { value: 'great' } })

      const blogPosts = getAllByTestId('blog-post')
      expect(blogPosts).toHaveLength(1)
      expect(blogPosts[0]).toHaveAttribute('data-slug', 'third-post')
    })

    test('should filter posts by tags', () => {
      const { getByRole, getAllByTestId } = render(<BlogSection posts={mockPosts} />)

      const searchInput = getByRole('textbox', { name: 'Search blog posts' })
      fireEvent.change(searchInput, { target: { value: 'react' } })

      const blogPosts = getAllByTestId('blog-post')
      expect(blogPosts).toHaveLength(2) // First and Third posts have 'react' tag
    })

    test('should be case insensitive', () => {
      const { getByRole, getAllByTestId } = render(<BlogSection posts={mockPosts} />)

      const searchInput = getByRole('textbox', { name: 'Search blog posts' })
      fireEvent.change(searchInput, { target: { value: 'FIRST' } })

      const blogPosts = getAllByTestId('blog-post')
      expect(blogPosts).toHaveLength(1)
      expect(blogPosts[0]).toHaveAttribute('data-slug', 'first-post')
    })

    test('should show result count when searching', () => {
      const { getByRole, getByText } = render(<BlogSection posts={mockPosts} />)

      const searchInput = getByRole('textbox', { name: 'Search blog posts' })
      fireEvent.change(searchInput, { target: { value: 'react' } })

      expect(getByText('2 results found')).toBeInTheDocument()
    })

    test('should show singular result when one match', () => {
      const { getByRole, getByText } = render(<BlogSection posts={mockPosts} />)

      const searchInput = getByRole('textbox', { name: 'Search blog posts' })
      fireEvent.change(searchInput, { target: { value: 'First' } })

      expect(getByText('1 result found')).toBeInTheDocument()
    })

    test('should clear search when clear button is clicked', () => {
      const { getByRole, getAllByTestId } = render(<BlogSection posts={mockPosts} />)

      const searchInput = getByRole('textbox', { name: 'Search blog posts' })
      fireEvent.change(searchInput, { target: { value: 'First' } })

      expect(getAllByTestId('blog-post')).toHaveLength(1)

      const clearButton = getByRole('button', { name: 'Clear search' })
      fireEvent.click(clearButton)

      expect(searchInput).toHaveValue('')
      expect(getAllByTestId('blog-post')).toHaveLength(3)
    })

    test('should show clear button only when search term exists', () => {
      const { getByRole, queryByRole } = render(<BlogSection posts={mockPosts} />)

      expect(queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument()

      const searchInput = getByRole('textbox', { name: 'Search blog posts' })
      fireEvent.change(searchInput, { target: { value: 'test' } })

      expect(getByRole('button', { name: 'Clear search' })).toBeInTheDocument()
    })

    test('should handle empty search gracefully', () => {
      const { getByRole, getAllByTestId } = render(<BlogSection posts={mockPosts} />)

      const searchInput = getByRole('textbox', { name: 'Search blog posts' })
      fireEvent.change(searchInput, { target: { value: '   ' } })

      const blogPosts = getAllByTestId('blog-post')
      expect(blogPosts).toHaveLength(3) // Should show all posts for whitespace-only search
    })
  })

  describe('Empty State', () => {
    test('should show empty state when no posts', () => {
      const { getByText } = render(<BlogSection posts={[]} />)

      expect(getByText('No thoughts found')).toBeInTheDocument()
      expect(getByText('Check back later for new thoughts and insights')).toBeInTheDocument()
    })

    test('should show search-specific empty state', () => {
      const { getByRole, getByText } = render(<BlogSection posts={mockPosts} />)

      const searchInput = getByRole('textbox', { name: 'Search blog posts' })
      fireEvent.change(searchInput, { target: { value: 'nonexistent' } })

      expect(getByText('No thoughts found')).toBeInTheDocument()
      expect(getByText(/No results matching/)).toBeInTheDocument()
      expect(getByText('Clear search to see all thoughts')).toBeInTheDocument()
    })

    test('should clear search from empty state', () => {
      const { getByRole, getByText, getAllByTestId } = render(<BlogSection posts={mockPosts} />)

      const searchInput = getByRole('textbox', { name: 'Search blog posts' })
      fireEvent.change(searchInput, { target: { value: 'nonexistent' } })

      const clearButton = getByText('Clear search to see all thoughts')
      fireEvent.click(clearButton)

      expect(searchInput).toHaveValue('')
      expect(getAllByTestId('blog-post')).toHaveLength(3)
    })
  })

  describe('Infinite Scroll', () => {
    test('should initially show 6 posts when more than 6 available', () => {
      const manyPosts = createManyPosts(10)
      const { getAllByTestId } = render(<BlogSection posts={manyPosts} />)

      const blogPosts = getAllByTestId('blog-post')
      expect(blogPosts).toHaveLength(6)
    })

    test('should show all posts when 6 or fewer available', () => {
      const { getAllByTestId } = render(<BlogSection posts={mockPosts} />)

      const blogPosts = getAllByTestId('blog-post')
      expect(blogPosts).toHaveLength(3)
    })

    test('should set up IntersectionObserver for infinite scroll', () => {
      const manyPosts = createManyPosts(10)
      render(<BlogSection posts={manyPosts} />)

      expect(mockIntersectionObserver).toHaveBeenCalledWith(
        expect.any(Function),
        { threshold: 0.1, rootMargin: '200px' }
      )
    })

    test('should render trigger element when more posts available', () => {
      const manyPosts = createManyPosts(10)
      const { container } = render(<BlogSection posts={manyPosts} />)

      const trigger = container.querySelector('[aria-hidden="true"].h-4')
      expect(trigger).toBeInTheDocument()
    })

    test('should not render trigger element when all posts visible', () => {
      const { container } = render(<BlogSection posts={mockPosts} />)

      const trigger = container.querySelector('[aria-hidden="true"].h-4')
      expect(trigger).not.toBeInTheDocument()
    })

    test('should not show infinite scroll during search', () => {
      const manyPosts = createManyPosts(10)
      const { getByRole, container } = render(<BlogSection posts={manyPosts} />)

      const searchInput = getByRole('textbox', { name: 'Search blog posts' })
      fireEvent.change(searchInput, { target: { value: 'Post' })

      const trigger = container.querySelector('[aria-hidden="true"].h-4')
      expect(trigger).not.toBeInTheDocument()
    })

    test('should load more posts when intersection occurs', async () => {
      const manyPosts = createManyPosts(10)
      
      // Mock the intersection observer callback
      let observerCallback: (entries: any[]) => void
      mockIntersectionObserver.mockImplementation((callback) => {
        observerCallback = callback
        return {
          observe: jest.fn(),
          unobserve: jest.fn(),
          disconnect: jest.fn(),
        }
      })

      const { getAllByTestId } = render(<BlogSection posts={manyPosts} />)

      expect(getAllByTestId('blog-post')).toHaveLength(6)

      // Simulate intersection
      act(() => {
        observerCallback([{ isIntersecting: true }])
      })

      await waitFor(() => {
        expect(getAllByTestId('blog-post')).toHaveLength(10) // All posts should be visible
      })
    })

    test('should preserve scroll position when loading more', async () => {
      const manyPosts = createManyPosts(10)
      window.scrollY = 500

      let observerCallback: (entries: any[]) => void
      mockIntersectionObserver.mockImplementation((callback) => {
        observerCallback = callback
        return {
          observe: jest.fn(),
          unobserve: jest.fn(),
          disconnect: jest.fn(),
        }
      })

      render(<BlogSection posts={manyPosts} />)

      act(() => {
        observerCallback([{ isIntersecting: true }])
      })

      await waitFor(() => {
        expect(requestAnimationFrame).toHaveBeenCalled()
      })

      // The scroll position should be restored in the requestAnimationFrame callback
      const rafCallback = (requestAnimationFrame as jest.Mock).mock.calls[0][0]
      rafCallback()
      
      expect(window.scrollTo).toHaveBeenCalledWith(0, 500)
    })
  })

  describe('Search Tips', () => {
    test('should show search tips when search has results', () => {
      const { getByRole, getByText } = render(<BlogSection posts={mockPosts} />)

      const searchInput = getByRole('textbox', { name: 'Search blog posts' })
      fireEvent.change(searchInput, { target: { value: 'react' } })

      expect(getByText('Tip: Search by title, description, or tags to find specific topics')).toBeInTheDocument()
    })

    test('should not show search tips when no search term', () => {
      const { queryByText } = render(<BlogSection posts={mockPosts} />)

      expect(queryByText('Tip: Search by title, description, or tags to find specific topics')).not.toBeInTheDocument()
    })

    test('should not show search tips when search has no results', () => {
      const { getByRole, queryByText } = render(<BlogSection posts={mockPosts} />)

      const searchInput = getByRole('textbox', { name: 'Search blog posts' })
      fireEvent.change(searchInput, { target: { value: 'nonexistent' } })

      expect(queryByText('Tip: Search by title, description, or tags to find specific topics')).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    test('should have proper ARIA labels', () => {
      const { getByRole } = render(<BlogSection posts={mockPosts} />)

      const searchInput = getByRole('textbox', { name: 'Search blog posts' })
      expect(searchInput).toHaveAttribute('aria-label', 'Search blog posts')

      const clearButton = getByRole('button', { name: 'Clear search' })
      fireEvent.change(searchInput, { target: { value: 'test' } })
      expect(clearButton).toHaveAttribute('aria-label', 'Clear search')
    })

    test('should have aria-hidden on decorative elements', () => {
      const manyPosts = createManyPosts(10)
      const { container } = render(<BlogSection posts={manyPosts} />)

      const searchIcon = container.querySelector('svg[aria-hidden="true"]')
      expect(searchIcon).toBeInTheDocument()

      const trigger = container.querySelector('[aria-hidden="true"].h-4')
      expect(trigger).toBeInTheDocument()
    })
  })

  describe('Grid Layout', () => {
    test('should have correct grid classes', () => {
      const { container } = render(<BlogSection posts={mockPosts} />)

      const grid = container.querySelector('.grid')
      expect(grid).toHaveClass(
        'grid-cols-2', 'sm:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4',
        'gap-3', 'sm:gap-6', 'lg:gap-8', 'auto-rows-fr'
      )
    })

    test('should pass correct props to BlogPost components', () => {
      const { getAllByTestId } = render(<BlogSection posts={mockPosts} />)

      const blogPosts = getAllByTestId('blog-post')
      const firstPost = blogPosts[0]
      
      expect(firstPost.querySelector('h3')).toHaveTextContent('First Post')
      expect(firstPost.querySelector('p')).toHaveTextContent('Description of first post')
      expect(firstPost.querySelector('img')).toHaveAttribute('src', '/img/first.jpg')
    })
  })

  describe('Edge Cases', () => {
    test('should handle posts without frontMatter properties', () => {
      const postsWithMissingData = [
        {
          slug: 'incomplete-post',
          frontMatter: {},
        },
      ]

      const { getAllByTestId } = render(<BlogSection posts={postsWithMissingData} />)
      
      expect(getAllByTestId('blog-post')).toHaveLength(1)
    })

    test('should handle search when posts have undefined frontMatter fields', () => {
      const postsWithUndefinedFields = [
        {
          slug: 'undefined-fields',
          frontMatter: {
            title: undefined,
            description: undefined,
            tags: undefined,
          },
        },
      ]

      const { getByRole, getAllByTestId } = render(<BlogSection posts={postsWithUndefinedFields} />)

      const searchInput = getByRole('textbox', { name: 'Search blog posts' })
      fireEvent.change(searchInput, { target: { value: 'test' } })

      // Should not crash and should show empty state
      expect(getAllByTestId('blog-post')).toHaveLength(0)
    })

    test('should reset visible count when clearing search', () => {
      const manyPosts = createManyPosts(10)
      const { getByRole, getAllByTestId } = render(<BlogSection posts={manyPosts} />)

      // Initially shows 6 posts
      expect(getAllByTestId('blog-post')).toHaveLength(6)

      // Search shows all matching posts
      const searchInput = getByRole('textbox', { name: 'Search blog posts' })
      fireEvent.change(searchInput, { target: { value: 'Post' } })
      expect(getAllByTestId('blog-post')).toHaveLength(10)

      // Clearing search should reset to initial 6
      fireEvent.change(searchInput, { target: { value: '' } })
      expect(getAllByTestId('blog-post')).toHaveLength(6)
    })
  })

  describe('Component Lifecycle', () => {
    test('should disconnect IntersectionObserver on unmount', () => {
      const mockDisconnect = jest.fn()
      mockIntersectionObserver.mockReturnValue({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: mockDisconnect,
      })

      const { unmount } = render(<BlogSection posts={createManyPosts(10)} />)
      
      unmount()
      
      expect(mockDisconnect).toHaveBeenCalled()
    })

    test('should handle props change correctly', () => {
      const { getAllByTestId, rerender } = render(<BlogSection posts={mockPosts} />)
      
      expect(getAllByTestId('blog-post')).toHaveLength(3)

      const newPosts = createManyPosts(5)
      rerender(<BlogSection posts={newPosts} />)
      
      expect(getAllByTestId('blog-post')).toHaveLength(5)
    })
  })
})