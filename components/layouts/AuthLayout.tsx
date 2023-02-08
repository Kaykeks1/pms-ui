import React, { ReactNode } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import profilePic from '../../images/gear.png'

type Props = {
  children?: ReactNode
  title?: string
  pageTitle?: string
}

const AuthLayout = ({ children, title = 'This is the default title', pageTitle }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="auth flex flex-col bg-violet-600 h-screen bg-fixed">
      <div className="absolute flex pl-16 pt-10 items-center">
        <Image
          className="object-cover w-12 h-12 ml-6 mr-4 rounded-full"
          src={profilePic}
          alt="Logo"
          width={60}
          height={60}
        />
        <h1 className="text-3xl font-semi bold text-center text-white">PMS.</h1>
      </div>
      <div className="flex flex-col md:flex-row w-full md:h-full justify-center pt-60 pb-20 md:pt-0 md:pb-0 overflow-auto z-10">
        <div className="flex w-full md:w-1/2 text-4xl md:text-7xl font-semi bold text-center text-white md:items-center justify-center md:h-full p-5">Project Management System.</div>
        <div className="flex w-full md:w-1/2 items-center justify-center md:h-full">
          <div className="flex flex-col bg-white w-3/5 p-10 rounded-lg">{children}</div>
        </div>
      </div>
    </div>
  </div>
)

export default AuthLayout
