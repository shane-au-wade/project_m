import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { ThemeProvider } from 'react-jss'
import "highlight.js/styles/atom-one-light.css";

// <Setup Blueprint>
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css'
import { FocusStyleManager, InputGroup } from '@blueprintjs/core'
FocusStyleManager.onlyShowFocusOnTabs()


function MyApp({ Component, pageProps }: AppProps) {
  const theme = {}
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Regulation Index</title>
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
