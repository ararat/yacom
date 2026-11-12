import React from 'react'
import { AppProps } from 'next/app'
import Script from 'next/script'
import localFont from 'next/font/local'
import { ThemeProvider } from '../contexts/ThemeContext'

// Headline face. next/font preloads it and adds a size-matched fallback, so the
// swap from the fallback doesn't shift the layout.
const display = localFont({
  src: [
    { path: '../node_modules/@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2', weight: '400 900', style: 'normal' },
    { path: '../node_modules/@fontsource-variable/playfair-display/files/playfair-display-latin-wght-italic.woff2', weight: '400 900', style: 'italic' },
  ],
  variable: '--font-display',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
})

import "../styles/tailwind.css";


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ThemeProvider>
      <div className={display.variable}>
        <Component {...pageProps} />
      </div>
      <Script src="https://assets.adobedtm.com/launch-EN948973dc19864983827932b329a66b45.min.js" strategy="lazyOnload" />
    </ThemeProvider>
  )
}

export default MyApp