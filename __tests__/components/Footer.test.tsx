import { render } from '@testing-library/react'
import Footer from '../../components/Footer'

describe('Footer', () => {
  test('should render the site title in the copyright line', () => {
    const { getByText } = render(<Footer siteTitle="Yuval Ararat" />)

    expect(getByText(/Yuval Ararat/)).toBeInTheDocument()
    expect(getByText(/All rights reserved/)).toBeInTheDocument()
  })

  test('should render the current year', () => {
    const { getByText } = render(<Footer siteTitle="Yuval Ararat" />)

    const year = new Date().getFullYear().toString()
    expect(getByText(new RegExp(year))).toBeInTheDocument()
  })

  test('should render GitHub and Thoughts links', () => {
    const { getByRole } = render(<Footer siteTitle="Yuval Ararat" />)

    const githubLink = getByRole('link', { name: 'GitHub' })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/ararat')

    const thoughtsLink = getByRole('link', { name: 'Thoughts' })
    expect(thoughtsLink).toHaveAttribute('href', '/#blog')
  })
})
