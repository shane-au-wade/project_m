import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { ThemeProvider } from "react-jss"

function MyApp({ Component, pageProps }: AppProps) {
  const theme = {}
  return (
    <ThemeProvider theme={theme}>
       <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
