import React from 'react'
import { AppProps } from 'next/app'
import '../styles/index.css'
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head> 
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
    </Head>
  <Component {...pageProps} />
  </>
}

export default MyApp;