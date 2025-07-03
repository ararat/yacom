import { render } from '@testing-library/react'
import BlogPostNavigation from '../../components/BlogPostNavigation'

describe('BlogPostNavigation', () => {
  test('should render breadcrumb navigation', () => {
    const { getByRole } = render(
      <BlogPostNavigation postTitle="Test Blog Post" />
    )

    const nav = getByRole('navigation', { name: 'Breadcrumb' })
    expect(nav).toBeInTheDocument()
  })

  test('should render breadcrumb items correctly', () => {
    const { getByRole, getByText } = render(
      <BlogPostNavigation postTitle="My Amazing Post" />
    )

    // Check breadcrumb links
    const homeLink = getByRole('link', { name: 'Home' })
    expect(homeLink).toHaveAttribute('href', '/')

    const thoughtsLink = getByRole('link', { name: 'Thoughts' })
    expect(thoughtsLink).toHaveAttribute('href', '/#blog')

    // Check current page title (not a link)
    const currentPage = getByText('My Amazing Post')
    expect(currentPage).toBeInTheDocument()
    expect(currentPage.tagName).toBe('LI')
  })

  test('should render back button', () => {
    const { getByRole } = render(
      <BlogPostNavigation postTitle="Test Post" />
    )

    const backButton = getByRole('link', { name: /Back to Thoughts/ })
    expect(backButton).toBeInTheDocument()
    expect(backButton).toHaveAttribute('href', '/#blog')
  })

  test('should have correct structure for breadcrumbs', () => {
    const { container } = render(
      <BlogPostNavigation postTitle="Test Post" />
    )

    const breadcrumbList = container.querySelector('ol')
    expect(breadcrumbList).toBeInTheDocument()
    expect(breadcrumbList?.children).toHaveLength(5) // Home, /, Thoughts, /, Post Title
  })

  test('should render breadcrumb separators', () => {
    const { getAllByText } = render(
      <BlogPostNavigation postTitle="Test Post" />
    )

    const separators = getAllByText('/')
    expect(separators).toHaveLength(2)
  })

  test('should truncate long post titles', () => {
    const longTitle = 'This is a very long blog post title that should be truncated'
    const { getByText } = render(
      <BlogPostNavigation postTitle={longTitle} />
    )

    const titleElement = getByText(longTitle)
    expect(titleElement).toHaveClass('truncate', 'max-w-xs', 'sm:max-w-md')
  })

  test('should have proper accessibility attributes', () => {
    const { getByRole } = render(
      <BlogPostNavigation postTitle="Test Post" />
    )

    const nav = getByRole('navigation', { name: 'Breadcrumb' })
    expect(nav).toHaveAttribute('aria-label', 'Breadcrumb')
  })

  test('should have correct styling classes for breadcrumb container', () => {
    const { getByRole } = render(
      <BlogPostNavigation postTitle="Test Post" />
    )

    const nav = getByRole('navigation', { name: 'Breadcrumb' })
    expect(nav).toHaveClass('flex-1', 'flex', 'justify-center', 'mx-4')
  })

  test('should have correct styling for breadcrumb items', () => {
    const { getByRole } = render(
      <BlogPostNavigation postTitle="Test Post" />
    )

    const homeLink = getByRole('link', { name: 'Home' })
    expect(homeLink).toHaveClass('hover:text-white', 'transition-colors', 'duration-200')

    const thoughtsLink = getByRole('link', { name: 'Thoughts' })
    expect(thoughtsLink).toHaveClass('hover:text-white', 'transition-colors', 'duration-200')
  })

  test('should have correct styling for back button', () => {
    const { getByRole } = render(
      <BlogPostNavigation postTitle="Test Post" />
    )

    const backButton = getByRole('link', { name: /Back to Thoughts/ })
    expect(backButton).toHaveClass(
      'inline-flex', 'items-center', 'gap-2', 'px-4', 'py-2',
      'bg-blue-600', 'hover:bg-blue-700', 'rounded-lg',
      'transition-colors', 'duration-200', 'text-sm', 'font-medium', 'flex-shrink-0'
    )
  })

  test('should render back arrow icon', () => {
    const { container } = render(
      <BlogPostNavigation postTitle="Test Post" />
    )

    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveClass('w-4', 'h-4')
    
    const path = container.querySelector('path[d="M15 19l-7-7 7-7"]')
    expect(path).toBeInTheDocument()
  })

  test('should have correct text colors', () => {
    const { container, getByText } = render(
      <BlogPostNavigation postTitle="Test Post" />
    )

    const breadcrumbList = container.querySelector('ol')
    expect(breadcrumbList).toHaveClass('text-sm', 'text-gray-300')

    const separators = container.querySelectorAll('.text-gray-500')
    expect(separators).toHaveLength(2)

    const currentPage = getByText('Test Post')
    expect(currentPage).toHaveClass('text-white', 'font-medium')
  })

  test('should handle empty post title', () => {
    const { getByText } = render(
      <BlogPostNavigation postTitle="" />
    )

    const emptyTitle = getByText('')
    expect(emptyTitle).toBeInTheDocument()
  })

  test('should handle special characters in post title', () => {
    const titleWithSpecialChars = 'Post with & special <characters> "quotes"'
    const { getByText } = render(
      <BlogPostNavigation postTitle={titleWithSpecialChars} />
    )

    const title = getByText(titleWithSpecialChars)
    expect(title).toBeInTheDocument()
  })
})