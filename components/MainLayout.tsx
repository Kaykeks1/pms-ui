import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import profilePic from './growth.png'
import Sidebar from './Sidebar'

type Props = {
  children?: ReactNode
  title?: string
  pageTitle?: string
}

// const myLoader = ({ src, width, quality }) => {
//   return `https://example.com/${src}?w=${width}&q=${quality || 75}`
//   // return '.'
// }

const MainLayout = ({ children, title = 'This is the default title', pageTitle }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="flex">
      <Sidebar />
      <div className='page-container'>
        <div className='page-header'>
          <h5 className='page-title'>{pageTitle}</h5>
          <span className='current-date'>Monday, 4th September</span>
        </div>
        <div className='page-body'>
          {children}
        </div>
      </div>
    </div>
  </div>
)

export default MainLayout
