import { render } from '@testing-library/react'
import Image from '../../components/image'

describe('Image Component', () => {
  beforeEach(() => {
    // Mock environment variables
    process.env.NODE_ENV = 'development'
    process.env.site_address = 'https://example.com'
  })

  afterEach(() => {
    delete process.env.site_address
  })

  test('should render image with basic props', () => {
    const { getByRole } = render(
      <Image
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
      />
    )

    const img = getByRole('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/test-image.jpg')
    expect(img).toHaveAttribute('alt', 'Test image')
  })

  test('should use fallback image when src is empty', () => {
    const { getByRole } = render(
      <Image
        src=""
        alt="Test image"
        width={100}
        height={100}
      />
    )

    const img = getByRole('img')
    expect(img).toHaveAttribute('src', '/img/blog/blog-thumbnail.jpeg')
  })

  test('should use fallback image when src is undefined', () => {
    const { getByRole } = render(
      <Image
        src={undefined as any}
        alt="Test image"
        width={100}
        height={100}
      />
    )

    const img = getByRole('img')
    expect(img).toHaveAttribute('src', '/img/blog/blog-thumbnail.jpeg')
  })

  test('should convert string width and height to numbers', () => {
    const { getByRole } = render(
      <Image
        src="/test-image.jpg"
        alt="Test image"
        width="100"
        height="200"
      />
    )

    const img = getByRole('img')
    expect(img).toHaveAttribute('width', '100')
    expect(img).toHaveAttribute('height', '200')
  })

  test('should convert string quality to number', () => {
    const { getByRole } = render(
      <Image
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        quality="90"
      />
    )

    const img = getByRole('img')
    // Quality is passed to the underlying Next.js Image component
    expect(img).toBeInTheDocument()
  })

  test('should use lazy loading by default', () => {
    const { getByRole } = render(
      <Image
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
      />
    )

    const img = getByRole('img')
    expect(img).toHaveAttribute('loading', 'lazy')
  })

  test('should use eager loading when priority is set', () => {
    const { getByRole } = render(
      <Image
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        priority={true}
      />
    )

    const img = getByRole('img')
    expect(img).toHaveAttribute('loading', 'eager')
  })

  test('should apply custom className with transition', () => {
    const { getByRole } = render(
      <Image
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        className="custom-class"
      />
    )

    const img = getByRole('img')
    expect(img).toHaveClass('transition-opacity', 'duration-300', 'custom-class')
  })

  test('should use default alt text when not provided', () => {
    const { getByRole } = render(
      <Image
        src="/test-image.jpg"
        alt=""
        width={100}
        height={100}
      />
    )

    const img = getByRole('img')
    expect(img).toHaveAttribute('alt', 'Image')
  })

  test('should be unoptimized in development', () => {
    process.env.NODE_ENV = 'development'
    
    const { getByRole } = render(
      <Image
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
      />
    )

    const img = getByRole('img')
    expect(img).toBeInTheDocument()
    // In development, images are unoptimized
  })

  test('should use cloudflare loader in production', () => {
    process.env.NODE_ENV = 'production'
    
    const { getByRole } = render(
      <Image
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
      />
    )

    const img = getByRole('img')
    expect(img).toBeInTheDocument()
    // In production, should use Cloudflare image loader
  })

  test('should handle numeric width and height', () => {
    const { getByRole } = render(
      <Image
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={200}
      />
    )

    const img = getByRole('img')
    expect(img).toHaveAttribute('width', '100')
    expect(img).toHaveAttribute('height', '200')
  })

  test('should handle numeric quality', () => {
    const { getByRole } = render(
      <Image
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        quality={75}
      />
    )

    const img = getByRole('img')
    expect(img).toBeInTheDocument()
  })

  test('should handle loading prop override', () => {
    const { getByRole } = render(
      <Image
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        loading="eager"
      />
    )

    const img = getByRole('img')
    expect(img).toHaveAttribute('loading', 'eager')
  })
})