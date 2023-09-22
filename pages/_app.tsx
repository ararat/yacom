import React from 'react'
import { AppProps } from 'next/app'
import Script from 'next/script'

import "../styles/tailwind.css";


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Component {...pageProps} />
      <Script src="//assets.adobedtm.com/launch-EN948973dc19864983827932b329a66b45.min.js" type="text/javascript" />
    </>
  )
}

export default MyApp