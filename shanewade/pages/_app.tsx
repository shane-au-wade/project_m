import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { ThemeProvider } from 'react-jss'

function MyApp({ Component, pageProps }: AppProps) {
  const theme = {}
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Project M</title>
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
