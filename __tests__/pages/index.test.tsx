import { fireEvent, render, screen } from '@testing-library/react'
import Home from '../../pages/index'

const WRITING = [
  { tag: 'Writing', date: 'November 2026', title: "Don't rewrite DORA for AI", text: 'Measuring engineering is changing.', url: '/blog/dont-rewrite-dora' },
]

const mockMatchMedia = (matches: (query: string) => boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: matches(query),
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }),
  })
}

describe('Home page', () => {
  let frames: FrameRequestCallback[] = []
  const flushFrames = () => {
    const pending = frames
    frames = []
    pending.forEach((cb) => cb(0))
  }

  beforeEach(() => {
    frames = []
    mockMatchMedia((q) => q.includes('pointer: fine'))
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => frames.push(cb))
  })

  afterEach(() => jest.restoreAllMocks())

  test('renders the headline and every main section', () => {
    const { container } = render(<Home writing={WRITING} />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Yuval Ararat. Leading engineering into the agentic era.')
    for (const id of ['perspective', 'approach', 'career', 'impact', 'presentations', 'writing', 'contact']) {
      expect(container.querySelector(`#${id}`)).toBeInTheDocument()
    }
  })

  test('links to the SlideShare decks and profile', () => {
    render(<Home writing={WRITING} />)

    const hrefs = screen.getAllByRole('link').map((a) => a.getAttribute('href'))
    expect(hrefs).toContain('https://www.slideshare.net/slideshow/integration-patterns-in-aem-6/42784625')
    expect(hrefs).toContain('https://www.slideshare.net/ararat')
  })

  test('builds the Writing cards from the posts it is given', () => {
    const { container } = render(<Home writing={WRITING} />)

    const card = container.querySelector('#writing a[href="/blog/dont-rewrite-dora"]')
    expect(card).toHaveTextContent("Don't rewrite DORA for AI")
    expect(card).toHaveTextContent('Writing · November 2026')
  })

  test('leaves out the Writing section when there are no posts', () => {
    const { container } = render(<Home writing={[]} />)
    expect(container.querySelector('#writing')).not.toBeInTheDocument()
  })

  test('shows the selected LinkedIn recommendations, featured first', () => {
    const { container } = render(<Home writing={WRITING} />)

    const quotes = container.querySelectorAll('#endorsements figure')
    expect(quotes).toHaveLength(4)
    expect(quotes[0]).toHaveTextContent('Shady Ibrahim')
    expect(quotes[0]).toHaveTextContent('true walking encyclopedia')
    expect(screen.queryByText('Quote to be added.')).not.toBeInTheDocument()
    expect(screen.getByText('06 · Presentations')).toBeInTheDocument()
  })

  test('emits valid Person structured data with "<" escaped', () => {
    const { container } = render(<Home writing={WRITING} />)

    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script?.innerHTML).not.toContain('<')
    const graph = JSON.parse(script?.innerHTML ?? '{}')['@graph']
    expect(graph[0]['@type']).toBe('Person')
    expect(graph[0].name).toBe('Yuval Ararat')
  })

  test('shapes are decorative and follow scroll and pointer', () => {
    const { container } = render(<Home writing={WRITING} />)
    const shape = container.querySelector<HTMLElement>('[data-shape]')!

    expect(shape).toHaveAttribute('aria-hidden', 'true')

    Object.defineProperty(window, 'scrollY', { value: 240, configurable: true })
    fireEvent.scroll(window)
    flushFrames()
    expect(shape.style.getPropertyValue('--sy')).toBe('240')

    // jsdom's PointerEvent drops coordinates, so dispatch a MouseEvent of the same type
    fireEvent(window, new MouseEvent('pointermove', { clientX: window.innerWidth, clientY: 0 }))
    flushFrames()
    expect(shape.style.getPropertyValue('--mx')).toBe('0.500')
  })

  test('leaves shapes still when reduced motion is requested', () => {
    mockMatchMedia((q) => q.includes('prefers-reduced-motion'))
    const { container } = render(<Home writing={WRITING} />)
    const shape = container.querySelector<HTMLElement>('[data-shape]')!

    fireEvent.scroll(window)
    flushFrames()
    expect(shape.style.getPropertyValue('--sy')).toBe('')
  })
})
