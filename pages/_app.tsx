import React from 'react'
import { AppProps } from 'next/app'
import Script from 'next/script'
import { ThemeProvider } from '../contexts/ThemeContext'

import "../styles/tailwind.css";
import "@fontsource-variable/playfair-display/wght.css";
import "@fontsource-variable/playfair-display/wght-italic.css";


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <Script src="https://assets.adobedtm.com/launch-EN948973dc19864983827932b329a66b45.min.js" type="text/javascript" />
    </ThemeProvider>
  )
}

export default MyApp