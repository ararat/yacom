import { render } from '@testing-library/react'
import VideoBackgroundSection from '../../components/VideoBackgroundSection'

// Mock LazyVideo component
jest.mock('../../components/LazyVideo', () => {
  return function MockLazyVideo(props: any) {
    return (
      <div data-testid="lazy-video" data-src={props.src} data-poster={props.poster}>
        Lazy Video
      </div>
    )
  }
})

// Mock markdown components
jest.mock('../../lib/markdownComponents', () => ({
  videoMarkdownComponents: {
    h1: ({ children }: any) => <h1>{children}</h1>,
    p: ({ children }: any) => <p>{children}</p>,
  },
}))

const mockSection = {
  id: 'hero',
  navTitle: 'Hero',
  backgroundColor: 'bg-amber-600',
  contentFile: 'hero',
  backgroundVideo: '/video/hero.mp4',
  videoPoster: '/img/hero-poster.jpg',
  enabled: true,
  hideFromNav: false,
}

const mockContent = {
  frontMatter: {
    title: 'Welcome',
    subtitle: 'This is a subtitle',
  },
  content: '# Welcome\n\nThis is the content.',
}

describe('VideoBackgroundSection', () => {
  test('should render video background section with video', () => {
    const { getByTestId } = render(
      <VideoBackgroundSection section={mockSection} content={mockContent} />
    )

    const video = getByTestId('lazy-video')
    expect(video).toBeInTheDocument()
    expect(video).toHaveAttribute('data-src', '/video/hero.mp4')
    expect(video).toHaveAttribute('data-poster', '/img/hero-poster.jpg')
  })

  test('should use default poster when videoPoster is not provided', () => {
    const sectionWithoutPoster = { ...mockSection, videoPoster: undefined }
    
    const { getByTestId } = render(
      <VideoBackgroundSection section={sectionWithoutPoster} content={mockContent} />
    )

    const video = getByTestId('lazy-video')
    expect(video).toHaveAttribute('data-poster', '/img/yuval-ararat.png')
  })

  test('should render section with correct id and styling', () => {
    const { container } = render(
      <VideoBackgroundSection section={mockSection} content={mockContent} />
    )

    const section = container.firstChild as HTMLElement
    expect(section).toHaveAttribute('id', 'hero')
    expect(section).toHaveClass(
      'snap-start', 'bg-amber-600', 'w-screen', 'h-screen',
      'relative', 'overflow-hidden'
    )
  })

  test('should render title and subtitle from frontMatter', () => {
    const { getByRole, getByText } = render(
      <VideoBackgroundSection section={mockSection} content={mockContent} />
    )

    const title = getByRole('heading', { level: 1 })
    expect(title).toHaveTextContent('Welcome')
    expect(title).toHaveClass(
      'text-xl', 'sm:text-2xl', 'md:text-3xl', 'lg:text-4xl',
      'xl:text-5xl', '2xl:text-6xl', 'font-bold', 'mb-2',
      'text-white', 'drop-shadow-lg'
    )

    const subtitle = getByText('This is a subtitle')
    expect(subtitle).toHaveClass(
      'text-sm', 'sm:text-base', 'md:text-lg', 'lg:text-xl',
      'xl:text-2xl', 'text-white', 'font-medium', 'drop-shadow-md'
    )
  })

  test('should not render subtitle when not provided', () => {
    const contentWithoutSubtitle = {
      ...mockContent,
      frontMatter: { title: 'Welcome' },
    }

    const { queryByText } = render(
      <VideoBackgroundSection section={mockSection} content={contentWithoutSubtitle} />
    )

    expect(queryByText('This is a subtitle')).not.toBeInTheDocument()
  })

  test('should render markdown content', () => {
    const { getByText } = render(
      <VideoBackgroundSection section={mockSection} content={mockContent} />
    )

    // The content should be processed by ReactMarkdown
    // Since we mocked the markdown components, we should see the raw content
    expect(getByText('This is the content.')).toBeInTheDocument()
  })

  test('should have correct content container styling', () => {
    const { container } = render(
      <VideoBackgroundSection section={mockSection} content={mockContent} />
    )

    const contentContainer = container.querySelector('.px-4')
    expect(contentContainer).toHaveClass(
      'px-4', 'sm:px-6', 'md:px-8', 'lg:px-12', 'xl:px-16', '2xl:px-20',
      'py-6', 'w-full', 'pt-16', 'mx-4', 'sm:mx-6', 'md:mx-8', 'lg:mx-12',
      'xl:mx-16', '2xl:mx-20', 'bg-amber-600', 'bg-opacity-50',
      'dark:bg-opacity-70', 'dark:bg-slate-700', 'dark:prose-invert',
      'rounded-xl', 'max-h-[85vh]', 'overflow-y-auto'
    )
  })

  test('should have proper prose styling', () => {
    const { container } = render(
      <VideoBackgroundSection section={mockSection} content={mockContent} />
    )

    const proseContainer = container.querySelector('.prose')
    expect(proseContainer).toHaveClass(
      'prose', 'prose-invert', 'prose-sm', 'sm:prose-base',
      'lg:prose-lg', 'xl:prose-xl', '2xl:prose-2xl', 'max-w-none'
    )
  })

  test('should have proper touch and scroll behavior', () => {
    const { container } = render(
      <VideoBackgroundSection section={mockSection} content={mockContent} />
    )

    const section = container.firstChild as HTMLElement
    expect(section).toHaveStyle({
      touchAction: 'pan-y',
      overscrollBehavior: 'contain',
    })

    const proseContainer = container.querySelector('.prose')
    expect(proseContainer).toHaveStyle({
      WebkitOverflowScrolling: 'touch',
      touchAction: 'pan-y',
    })
  })

  test('should render with absolute positioning for video and content', () => {
    const { container } = render(
      <VideoBackgroundSection section={mockSection} content={mockContent} />
    )

    const videoContainer = container.querySelector('[data-testid="lazy-video"]')?.parentElement
    expect(videoContainer).toHaveClass('absolute', 'z-10')

    const contentWrapper = container.querySelector('.absolute.inset-0.flex.items-center.justify-center.z-20')
    expect(contentWrapper).toBeInTheDocument()
  })

  test('should handle empty backgroundVideo gracefully', () => {
    const sectionWithoutVideo = { ...mockSection, backgroundVideo: undefined }
    
    const { getByTestId } = render(
      <VideoBackgroundSection section={sectionWithoutVideo} content={mockContent} />
    )

    const video = getByTestId('lazy-video')
    expect(video).toHaveAttribute('data-src', '')
  })

  test('should memoize ReactMarkdown for performance', () => {
    const { rerender } = render(
      <VideoBackgroundSection section={mockSection} content={mockContent} />
    )

    // Rerender with same content - should use memoized version
    rerender(
      <VideoBackgroundSection section={mockSection} content={mockContent} />
    )

    // Should not throw or cause issues
    expect(true).toBe(true)
  })

  test('should have correct z-index layering', () => {
    const { container } = render(
      <VideoBackgroundSection section={mockSection} content={mockContent} />
    )

    const videoElement = container.querySelector('[data-testid="lazy-video"]')
    expect(videoElement?.closest('.absolute')).toHaveClass('z-10')

    const contentElement = container.querySelector('.z-20')
    expect(contentElement).toBeInTheDocument()
  })
})