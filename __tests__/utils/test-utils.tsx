import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from '../../contexts/ThemeContext'

// Custom render function that includes ThemeProvider
const customRender = (ui: React.ReactElement, options?: RenderOptions) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>{children}</ThemeProvider>
  )
  
  return render(ui, { wrapper: Wrapper, ...options })
}

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }