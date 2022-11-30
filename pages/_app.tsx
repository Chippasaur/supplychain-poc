import React from 'react'
import Head from 'next/head'
import { SWRConfig } from 'swr'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import '../client/resources/styles/globals.scss'

import { fetcher } from '../client/utils/api'
import NavigationBar from '../client/components/navigationBar'

const SWRConfigValue = {
  fetcher: fetcher,
  onError: (e: any, key: string) => {
    console.log(key, e)
  },
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={SWRConfigValue}>
      <Head>
        <title>Visibility</title>
      </Head>
      {useRouter().pathname !== '/api-docs' ? <NavigationBar /> : null}
      <div id={'app'}>
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  )
}

export default MyApp
