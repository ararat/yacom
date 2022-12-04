import React from 'react'
import { AppProps } from 'next/app'

import "../styles/tailwind.css";
//import "bootstrap/dist/css/bootstrap.css";


function MyApp({ Component, pageProps }: AppProps) {

  return <Component {...pageProps} />
}

export default MyApp
