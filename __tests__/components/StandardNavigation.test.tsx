import { render, fireEvent } from '@testing-library/react'
import StandardNavigation from '../../components/StandardNavigation'

const mockSections = [
  { id: 'home', navTitle: 'Home', enabled: true },
  { id: 'about', navTitle: 'About', enabled: true },
  { id: 'contact', navTitle: 'Contact', enabled: false },
]

describe('StandardNavigation', () => {
  const mockSetNavbar = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Mobile Button Only Mode', () => {
    test('should render mobile menu button when mobileButtonOnly is true', () => {
      const { getByRole } = render(
        <StandardNavigation
          SiteDescription="Test site"
          sections={mockSections}
          navbar={false}
          setNavbar={mockSetNavbar}
          mobileButtonOnly={true}
        />
      )

      const button = getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('aria-label', 'Open menu')
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })

    test('should show hamburger icon when navbar is closed', () => {
      const { container } = render(
        <StandardNavigation
          SiteDescription="Test site"
          sections={mockSections}
          navbar={false}
          setNavbar={mockSetNavbar}
          mobileButtonOnly={true}
        />
      )

      const hamburgerIcon = container.querySelector('path[d="M4 6h16M4 12h16M4 18h16"]')
      expect(hamburgerIcon).toBeInTheDocument()
    })

    test('should show close icon when navbar is open', () => {
      const { container } = render(
        <StandardNavigation
          SiteDescription="Test site"
          sections={mockSections}
          navbar={true}
          setNavbar={mockSetNavbar}
          mobileButtonOnly={true}
        />
      )

      const closeIcon = container.querySelector('path[fill-rule="evenodd"]')
      expect(closeIcon).toBeInTheDocument()
    })

    test('should call setNavbar when button is clicked', () => {
      const { getByRole } = render(
        <StandardNavigation
          SiteDescription="Test site"
          sections={mockSections}
          navbar={false}
          setNavbar={mockSetNavbar}
          mobileButtonOnly={true}
        />
      )

      const button = getByRole('button')
      fireEvent.click(button)

      expect(mockSetNavbar).toHaveBeenCalledWith(true)
    })

    test('should toggle navbar state correctly', () => {
      const { getByRole, rerender } = render(
        <StandardNavigation
          SiteDescription="Test site"
          sections={mockSections}
          navbar={false}
          setNavbar={mockSetNavbar}
          mobileButtonOnly={true}
        />
      )

      const button = getByRole('button')
      expect(button).toHaveAttribute('aria-expanded', 'false')

      rerender(
        <StandardNavigation
          SiteDescription="Test site"
          sections={mockSections}
          navbar={true}
          setNavbar={mockSetNavbar}
          mobileButtonOnly={true}
        />
      )

      expect(button).toHaveAttribute('aria-expanded', 'true')
      expect(button).toHaveAttribute('aria-label', 'Close menu')
    })
  })

  describe('Menu Items Only Mode', () => {
    test('should render menu items when menuItemsOnly is true', () => {
      const { getByRole } = render(
        <StandardNavigation
          SiteDescription="Test site"
          sections={mockSections}
          navbar={true}
          setNavbar={mockSetNavbar}
          menuItemsOnly={true}
        />
      )

      const menubar = getByRole('menubar')
      expect(menubar).toBeInTheDocument()
    })

    test('should only render enabled sections', () => {
      const { getByText, queryByText } = render(
        <StandardNavigation
          SiteDescription="Test site"
          sections={mockSections}
          navbar={true}
          setNavbar={mockSetNavbar}
          menuItemsOnly={true}
        />
      )

      expect(getByText('Home')).toBeInTheDocument()
      expect(getByText('About')).toBeInTheDocument()
      expect(queryByText('Contact')).not.toBeInTheDocument()
    })

    test('should render menu items with correct links', () => {
      const { getByRole } = render(
        <StandardNavigation
          SiteDescription="Test site"
          sections={mockSections}
          navbar={true}
          setNavbar={mockSetNavbar}
          menuItemsOnly={true}
        />
      )

      const homeLink = getByRole('link', { name: 'Home' })
      const aboutLink = getByRole('link', { name: 'About' })

      expect(homeLink).toHaveAttribute('href', '/#home')
      expect(aboutLink).toHaveAttribute('href', '/#about')
    })

    test('should close navbar when menu item is clicked', () => {
      const { getByRole } = render(
        <StandardNavigation
          SiteDescription="Test site"
          sections={mockSections}
          navbar={true}
          setNavbar={mockSetNavbar}
          menuItemsOnly={true}
        />
      )

      const homeLink = getByRole('link', { name: 'Home' })
      fireEvent.click(homeLink)

      expect(mockSetNavbar).toHaveBeenCalledWith(false)
    })

    test('should hide menu when navbar is closed', () => {
      const { container } = render(
        <StandardNavigation
          SiteDescription="Test site"
          sections={mockSections}
          navbar={false}
          setNavbar={mockSetNavbar}
          menuItemsOnly={true}
        />
      )

      const menuContainer = container.querySelector('.hidden')
      expect(menuContainer).toBeInTheDocument()
    })

    test('should show menu when navbar is open', () => {
      const { container } = render(
        <StandardNavigation
          SiteDescription="Test site"
          sections={mockSections}
          navbar={true}
          setNavbar={mockSetNavbar}
          menuItemsOnly={true}
        />
      )

      const menuContainer = container.querySelector('.block')
      expect(menuContainer).toBeInTheDocument()
    })

    test('should handle empty sections array', () => {
      const { getByRole } = render(
        <StandardNavigation
          SiteDescription="Test site"
          sections={[]}
          navbar={true}
          setNavbar={mockSetNavbar}
          menuItemsOnly={true}
        />
      )

      const menubar = getByRole('menubar')
      expect(menubar).toBeInTheDocument()
      expect(menubar.children).toHaveLength(0)
    })

    test('should handle undefined sections', () => {
      const { getByRole } = render(
        <StandardNavigation
          SiteDescription="Test site"
          sections={undefined}
          navbar={true}
          setNavbar={mockSetNavbar}
          menuItemsOnly={true}
        />
      )

      const menubar = getByRole('menubar')
      expect(menubar).toBeInTheDocument()
      expect(menubar.children).toHaveLength(0)
    })
  })

  describe('Default Mode', () => {
    test('should return null when neither mode is specified', () => {
      const { container } = render(
        <StandardNavigation
          SiteDescription="Test site"
          sections={mockSections}
          navbar={false}
          setNavbar={mockSetNavbar}
        />
      )

      expect(container.firstChild).toBeNull()
    })
  })

  describe('Accessibility', () => {
    test('should have proper ARIA attributes for mobile button', () => {
      const { getByRole } = render(
        <StandardNavigation
          SiteDescription="Test site"
          sections={mockSections}
          navbar={false}
          setNavbar={mockSetNavbar}
          mobileButtonOnly={true}
        />
      )

      const button = getByRole('button')
      expect(button).toHaveAttribute('id', 'Navigation')
      expect(button).toHaveAttribute('value', 'Navigation')
      expect(button).toHaveAttribute('aria-label', 'Open menu')
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })

    test('should have proper ARIA attributes for menu items', () => {
      const { getAllByRole } = render(
        <StandardNavigation
          SiteDescription="Test site"
          sections={mockSections}
          navbar={true}
          setNavbar={mockSetNavbar}
          menuItemsOnly={true}
        />
      )

      const menuItems = getAllByRole('none')
      expect(menuItems).toHaveLength(2) // Only enabled sections

      const menuLinks = getAllByRole('menuitem')
      expect(menuLinks).toHaveLength(2)
    })
  })

  describe('Styling', () => {
    test('should have correct CSS classes for mobile button', () => {
      const { getByRole } = render(
        <StandardNavigation
          SiteDescription="Test site"
          sections={mockSections}
          navbar={false}
          setNavbar={mockSetNavbar}
          mobileButtonOnly={true}
        />
      )

      const button = getByRole('button')
      expect(button).toHaveClass(
        'p-2', 'text-white', 'rounded-md', 'outline-none',
        'focus:ring-2', 'focus:ring-blue-300', 'hover:bg-slate-700',
        'transition-colors', 'duration-200'
      )
    })

    test('should have correct CSS classes for menu items', () => {
      const { getByRole } = render(
        <StandardNavigation
          SiteDescription="Test site"
          sections={mockSections}
          navbar={true}
          setNavbar={mockSetNavbar}
          menuItemsOnly={true}
        />
      )

      const homeLink = getByRole('link', { name: 'Home' })
      expect(homeLink).toHaveClass(
        'block', 'py-2', 'px-3', 'rounded-md', 'hover:bg-slate-700',
        'hover:text-blue-300', 'transition-all', 'duration-200',
        'text-center', 'md:text-left'
      )
    })
  })
})