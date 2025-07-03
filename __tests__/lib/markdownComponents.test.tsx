import { render } from '@testing-library/react'
import { standardMarkdownComponents, videoMarkdownComponents } from '../../lib/markdownComponents'

describe('Markdown Components', () => {
  describe('Standard Markdown Components', () => {
    test('should render h1 component correctly', () => {
      const H1 = standardMarkdownComponents.h1
      const { getByRole } = render(<H1>Test Heading</H1>)
      
      const heading = getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Test Heading')
      expect(heading).toHaveClass('text-2xl', 'font-bold', 'mb-6')
    })

    test('should render h2 component correctly', () => {
      const H2 = standardMarkdownComponents.h2
      const { getByRole } = render(<H2>Test Heading 2</H2>)
      
      const heading = getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Test Heading 2')
      expect(heading).toHaveClass('text-xl', 'font-bold', 'mb-4')
    })

    test('should render h3 component correctly', () => {
      const H3 = standardMarkdownComponents.h3
      const { getByRole } = render(<H3>Test Heading 3</H3>)
      
      const heading = getByRole('heading', { level: 3 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Test Heading 3')
      expect(heading).toHaveClass('text-lg', 'font-bold', 'mb-3')
    })

    test('should render paragraph component correctly', () => {
      const P = standardMarkdownComponents.p
      const { getByText } = render(<P>Test paragraph</P>)
      
      const paragraph = getByText('Test paragraph')
      expect(paragraph).toBeInTheDocument()
      expect(paragraph.tagName).toBe('P')
      expect(paragraph).toHaveClass('text-sm', 'leading-relaxed', 'mb-4')
    })

    test('should render link component correctly', () => {
      const A = standardMarkdownComponents.a
      const { getByRole } = render(<A href="https://example.com">Test Link</A>)
      
      const link = getByRole('link')
      expect(link).toBeInTheDocument()
      expect(link).toHaveTextContent('Test Link')
      expect(link).toHaveAttribute('href', 'https://example.com')
      expect(link).toHaveClass('text-blue-600', 'hover:text-blue-800', 'underline')
    })

    test('should render strong component correctly', () => {
      const Strong = standardMarkdownComponents.strong
      const { getByText } = render(<Strong>Bold text</Strong>)
      
      const strong = getByText('Bold text')
      expect(strong).toBeInTheDocument()
      expect(strong.tagName).toBe('STRONG')
      expect(strong).toHaveClass('font-semibold')
    })

    test('should render em component correctly', () => {
      const Em = standardMarkdownComponents.em
      const { getByText } = render(<Em>Italic text</Em>)
      
      const em = getByText('Italic text')
      expect(em).toBeInTheDocument()
      expect(em.tagName).toBe('EM')
      expect(em).toHaveClass('italic')
    })

    test('should render ul component correctly', () => {
      const UL = standardMarkdownComponents.ul
      const { getByRole } = render(<UL><li>Item 1</li></UL>)
      
      const list = getByRole('list')
      expect(list).toBeInTheDocument()
      expect(list.tagName).toBe('UL')
      expect(list).toHaveClass('list-disc', 'list-inside', 'mb-4')
    })

    test('should render ol component correctly', () => {
      const OL = standardMarkdownComponents.ol
      const { getByRole } = render(<OL><li>Item 1</li></OL>)
      
      const list = getByRole('list')
      expect(list).toBeInTheDocument()
      expect(list.tagName).toBe('OL')
      expect(list).toHaveClass('list-decimal', 'list-inside', 'mb-4')
    })

    test('should render li component correctly', () => {
      const LI = standardMarkdownComponents.li
      const { getByRole } = render(<ul><LI>List item</LI></ul>)
      
      const listItem = getByRole('listitem')
      expect(listItem).toBeInTheDocument()
      expect(listItem).toHaveTextContent('List item')
      expect(listItem).toHaveClass('text-sm', 'leading-relaxed')
    })
  })

  describe('Video Markdown Components', () => {
    test('should render h1 with white text and shadow', () => {
      const H1 = videoMarkdownComponents.h1
      const { getByRole } = render(<H1>Video Heading</H1>)
      
      const heading = getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Video Heading')
      expect(heading).toHaveClass('text-white', 'drop-shadow-lg', 'font-bold')
    })

    test('should render h2 with white text and shadow', () => {
      const H2 = videoMarkdownComponents.h2
      const { getByRole } = render(<H2>Video Heading 2</H2>)
      
      const heading = getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveClass('text-white', 'drop-shadow-md', 'font-bold')
    })

    test('should render paragraph with white text and shadow', () => {
      const P = videoMarkdownComponents.p
      const { getByText } = render(<P>Video paragraph</P>)
      
      const paragraph = getByText('Video paragraph')
      expect(paragraph).toBeInTheDocument()
      expect(paragraph).toHaveClass('text-white', 'drop-shadow-sm', 'leading-relaxed')
    })

    test('should render link with light blue colors for video overlay', () => {
      const A = videoMarkdownComponents.a
      const { getByRole } = render(<A href="https://example.com">Video Link</A>)
      
      const link = getByRole('link')
      expect(link).toBeInTheDocument()
      expect(link).toHaveClass('text-blue-200', 'hover:text-blue-100')
    })

    test('should render strong with white text and shadow', () => {
      const Strong = videoMarkdownComponents.strong
      const { getByText } = render(<Strong>Bold video text</Strong>)
      
      const strong = getByText('Bold video text')
      expect(strong).toBeInTheDocument()
      expect(strong).toHaveClass('font-semibold', 'text-white', 'drop-shadow-sm')
    })

    test('should render em with white text and shadow', () => {
      const Em = videoMarkdownComponents.em
      const { getByText } = render(<Em>Italic video text</Em>)
      
      const em = getByText('Italic video text')
      expect(em).toBeInTheDocument()
      expect(em).toHaveClass('italic', 'text-white', 'drop-shadow-sm')
    })

    test('should render li with white text and shadow', () => {
      const LI = videoMarkdownComponents.li
      const { getByRole } = render(<ul><LI>Video list item</LI></ul>)
      
      const listItem = getByRole('listitem')
      expect(listItem).toBeInTheDocument()
      expect(listItem).toHaveClass('text-white', 'drop-shadow-sm', 'leading-relaxed')
    })
  })
})