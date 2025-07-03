import { render } from '@testing-library/react'
import MarkdownContentComponent from '../../components/MarkdownContentComponent'
import type { SectionConfig, ContentData } from '../../components/MarkdownContentComponent'

// Mock child components
jest.mock('../../components/VideoBackgroundSection', () => {
  return function MockVideoBackgroundSection(props: any) {
    return (
      <div data-testid="video-background-section" data-section-id={props.section.id}>
        Video Background Section for {props.section.navTitle}
      </div>
    )
  }
})

jest.mock('../../components/StandardSection', () => {
  return function MockStandardSection(props: any) {
    return (
      <div data-testid="standard-section" data-section-id={props.section.id}>
        Standard Section for {props.section.navTitle}
      </div>
    )
  }
})

// Mock console.warn
const mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation()

const createMockSection = (overrides: Partial<SectionConfig> = {}): SectionConfig => ({
  id: 'test-section',
  navTitle: 'Test Section',
  backgroundColor: 'bg-white',
  contentFile: 'test-content',
  enabled: true,
  ...overrides,
})

const createMockContent = (overrides: Partial<ContentData> = {}): ContentData => ({
  frontMatter: { title: 'Test Title' },
  content: '# Test Content\n\nThis is test content.',
  ...overrides,
})

describe('MarkdownContentComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Standard Section Rendering', () => {
    test('should render StandardSection when no background video', () => {
      const section = createMockSection()
      const content = createMockContent()

      const { getByTestId } = render(
        <MarkdownContentComponent section={section} content={content} />
      )

      const standardSection = getByTestId('standard-section')
      expect(standardSection).toBeInTheDocument()
      expect(standardSection).toHaveAttribute('data-section-id', 'test-section')
      expect(standardSection).toHaveTextContent('Standard Section for Test Section')
    })

    test('should render StandardSection when backgroundVideo is undefined', () => {
      const section = createMockSection({ backgroundVideo: undefined })
      const content = createMockContent()

      const { getByTestId, queryByTestId } = render(
        <MarkdownContentComponent section={section} content={content} />
      )

      expect(getByTestId('standard-section')).toBeInTheDocument()
      expect(queryByTestId('video-background-section')).not.toBeInTheDocument()
    })

    test('should render StandardSection when backgroundVideo is empty string', () => {
      const section = createMockSection({ backgroundVideo: '' })
      const content = createMockContent()

      const { getByTestId, queryByTestId } = render(
        <MarkdownContentComponent section={section} content={content} />
      )

      expect(getByTestId('standard-section')).toBeInTheDocument()
      expect(queryByTestId('video-background-section')).not.toBeInTheDocument()
    })
  })

  describe('Video Background Section Rendering', () => {
    test('should render VideoBackgroundSection when backgroundVideo is present', () => {
      const section = createMockSection({
        backgroundVideo: '/video/background.mp4',
      })
      const content = createMockContent()

      const { getByTestId } = render(
        <MarkdownContentComponent section={section} content={content} />
      )

      const videoSection = getByTestId('video-background-section')
      expect(videoSection).toBeInTheDocument()
      expect(videoSection).toHaveAttribute('data-section-id', 'test-section')
      expect(videoSection).toHaveTextContent('Video Background Section for Test Section')
    })

    test('should render VideoBackgroundSection with video poster', () => {
      const section = createMockSection({
        backgroundVideo: '/video/background.mp4',
        videoPoster: '/img/poster.jpg',
      })
      const content = createMockContent()

      const { getByTestId, queryByTestId } = render(
        <MarkdownContentComponent section={section} content={content} />
      )

      expect(getByTestId('video-background-section')).toBeInTheDocument()
      expect(queryByTestId('standard-section')).not.toBeInTheDocument()
    })

    test('should prioritize video section over standard section', () => {
      const section = createMockSection({
        backgroundVideo: '/video/background.mp4',
        hasImage: true, // This should be ignored when video is present
        imageConfig: {
          src: '/img/test.jpg',
          alt: 'Test image',
          width: '300',
          height: '200',
        },
      })
      const content = createMockContent()

      const { getByTestId, queryByTestId } = render(
        <MarkdownContentComponent section={section} content={content} />
      )

      expect(getByTestId('video-background-section')).toBeInTheDocument()
      expect(queryByTestId('standard-section')).not.toBeInTheDocument()
    })
  })

  describe('Content Validation', () => {
    test('should return null and warn when content is undefined', () => {
      const section = createMockSection()

      const { container } = render(
        <MarkdownContentComponent section={section} content={undefined as any} />
      )

      expect(container.firstChild).toBeNull()
      expect(mockConsoleWarn).toHaveBeenCalledWith('No content found for section: test-section')
    })

    test('should return null and warn when content is null', () => {
      const section = createMockSection()

      const { container } = render(
        <MarkdownContentComponent section={section} content={null as any} />
      )

      expect(container.firstChild).toBeNull()
      expect(mockConsoleWarn).toHaveBeenCalledWith('No content found for section: test-section')
    })

    test('should render when content is empty but defined', () => {
      const section = createMockSection()
      const content = createMockContent({
        frontMatter: {},
        content: '',
      })

      const { getByTestId } = render(
        <MarkdownContentComponent section={section} content={content} />
      )

      expect(getByTestId('standard-section')).toBeInTheDocument()
      expect(mockConsoleWarn).not.toHaveBeenCalled()
    })
  })

  describe('Props Passing', () => {
    test('should pass section and content props to StandardSection', () => {
      const section = createMockSection({
        id: 'props-test',
        navTitle: 'Props Test Section',
        backgroundColor: 'bg-blue-500',
        textColor: 'text-white',
      })
      const content = createMockContent({
        frontMatter: { title: 'Props Test' },
        content: 'Props test content',
      })

      render(<MarkdownContentComponent section={section} content={content} />)

      // The mock component should receive the props and render the section id
      const standardSection = document.querySelector('[data-section-id="props-test"]')
      expect(standardSection).toBeInTheDocument()
    })

    test('should pass section and content props to VideoBackgroundSection', () => {
      const section = createMockSection({
        id: 'video-props-test',
        navTitle: 'Video Props Test',
        backgroundVideo: '/video/test.mp4',
      })
      const content = createMockContent({
        frontMatter: { title: 'Video Props Test' },
        content: 'Video props test content',
      })

      render(<MarkdownContentComponent section={section} content={content} />)

      const videoSection = document.querySelector('[data-section-id="video-props-test"]')
      expect(videoSection).toBeInTheDocument()
    })
  })

  describe('Section Configuration', () => {
    test('should handle section with all optional properties', () => {
      const section = createMockSection({
        textColor: 'text-gray-800',
        hasImage: true,
        imageConfig: {
          src: '/img/test.jpg',
          alt: 'Test image',
          width: '400',
          height: '300',
        },
        hideFromNav: true,
      })
      const content = createMockContent()

      const { getByTestId } = render(
        <MarkdownContentComponent section={section} content={content} />
      )

      expect(getByTestId('standard-section')).toBeInTheDocument()
    })

    test('should handle section with minimal required properties', () => {
      const section: SectionConfig = {
        id: 'minimal',
        navTitle: 'Minimal',
        backgroundColor: 'bg-white',
        contentFile: 'minimal',
        enabled: true,
      }
      const content = createMockContent()

      const { getByTestId } = render(
        <MarkdownContentComponent section={section} content={content} />
      )

      expect(getByTestId('standard-section')).toBeInTheDocument()
    })

    test('should handle disabled section', () => {
      const section = createMockSection({ enabled: false })
      const content = createMockContent()

      const { getByTestId } = render(
        <MarkdownContentComponent section={section} content={content} />
      )

      // Component should still render even if section is disabled
      // The enabled flag is likely used elsewhere for navigation filtering
      expect(getByTestId('standard-section')).toBeInTheDocument()
    })
  })

  describe('Content Structure', () => {
    test('should handle content with complex frontMatter', () => {
      const section = createMockSection()
      const content = createMockContent({
        frontMatter: {
          title: 'Complex Content',
          subtitle: 'With subtitle',
          author: 'Test Author',
          date: '2023-01-01',
          tags: ['tag1', 'tag2'],
          nested: {
            property: 'value',
          },
        },
      })

      const { getByTestId } = render(
        <MarkdownContentComponent section={section} content={content} />
      )

      expect(getByTestId('standard-section')).toBeInTheDocument()
    })

    test('should handle content with complex markdown', () => {
      const section = createMockSection()
      const content = createMockContent({
        content: `
# Main Title

## Subtitle

This is a paragraph with **bold** and *italic* text.

- List item 1
- List item 2

\`\`\`javascript
const code = 'example';
\`\`\`

[Link text](https://example.com)
        `.trim(),
      })

      const { getByTestId } = render(
        <MarkdownContentComponent section={section} content={content} />
      )

      expect(getByTestId('standard-section')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    test('should handle section with very long content', () => {
      const section = createMockSection()
      const longContent = 'A'.repeat(10000)
      const content = createMockContent({ content: longContent })

      const { getByTestId } = render(
        <MarkdownContentComponent section={section} content={content} />
      )

      expect(getByTestId('standard-section')).toBeInTheDocument()
    })

    test('should handle section with special characters in id', () => {
      const section = createMockSection({
        id: 'section-with-special-chars_123',
        navTitle: 'Section with & special <chars>',
      })
      const content = createMockContent()

      const { getByTestId } = render(
        <MarkdownContentComponent section={section} content={content} />
      )

      const standardSection = getByTestId('standard-section')
      expect(standardSection).toHaveAttribute('data-section-id', 'section-with-special-chars_123')
    })

    test('should handle backgroundVideo with different URL formats', () => {
      const testCases = [
        '/video/local.mp4',
        'https://example.com/remote.mp4',
        './relative/video.mp4',
        'video.mp4',
      ]

      testCases.forEach((videoUrl) => {
        const section = createMockSection({ 
          id: `test-${videoUrl.replace(/[^a-zA-Z0-9]/g, '-')}`,
          backgroundVideo: videoUrl 
        })
        const content = createMockContent()

        const { getByTestId } = render(
          <MarkdownContentComponent section={section} content={content} />
        )

        expect(getByTestId('video-background-section')).toBeInTheDocument()
      })
    })
  })

  describe('Type Safety', () => {
    test('should accept valid SectionConfig interface', () => {
      const section: SectionConfig = {
        id: 'type-test',
        navTitle: 'Type Test',
        backgroundColor: 'bg-gray-100',
        textColor: 'text-gray-900',
        contentFile: 'type-test',
        hasImage: false,
        backgroundVideo: undefined,
        videoPoster: undefined,
        enabled: true,
        hideFromNav: false,
      }
      const content: ContentData = {
        frontMatter: { title: 'Type Test' },
        content: 'Type test content',
      }

      const { getByTestId } = render(
        <MarkdownContentComponent section={section} content={content} />
      )

      expect(getByTestId('standard-section')).toBeInTheDocument()
    })

    test('should handle imageConfig with all properties', () => {
      const section = createMockSection({
        hasImage: true,
        imageConfig: {
          src: '/img/full-config.jpg',
          alt: 'Full config image',
          width: '500',
          height: '400',
        },
      })
      const content = createMockContent()

      const { getByTestId } = render(
        <MarkdownContentComponent section={section} content={content} />
      )

      expect(getByTestId('standard-section')).toBeInTheDocument()
    })
  })
})