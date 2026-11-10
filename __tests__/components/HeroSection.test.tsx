import { render } from '@testing-library/react'
import HeroSection from '../../components/HeroSection'

const mockContent = {
  frontMatter: {},
  content: '# Yuval Ararat\n\n**A tagline**\n\nA short description.',
}

describe('HeroSection', () => {
  test('should render with the given id', () => {
    const { container } = render(<HeroSection id="welcome" content={mockContent} />)

    const section = container.querySelector('section')
    expect(section).toHaveAttribute('id', 'welcome')
  })

  test('should render the markdown title as an h1', () => {
    const { getByRole } = render(<HeroSection id="welcome" content={mockContent} />)

    const heading = getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Yuval Ararat')
  })

  test('should render markdown body content', () => {
    const { getByText } = render(<HeroSection id="welcome" content={mockContent} />)

    expect(getByText('A tagline')).toBeInTheDocument()
    expect(getByText('A short description.')).toBeInTheDocument()
  })

  test('should render primary and secondary call to action links', () => {
    const { getByRole } = render(<HeroSection id="welcome" content={mockContent} />)

    const primaryCta = getByRole('link', { name: 'View Experience' })
    expect(primaryCta).toHaveAttribute('href', '#experience')

    const secondaryCta = getByRole('link', { name: 'Read Thoughts' })
    expect(secondaryCta).toHaveAttribute('href', '#blog')
  })
})
