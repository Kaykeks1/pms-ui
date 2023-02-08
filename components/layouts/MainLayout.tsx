import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import profilePic from './growth.png'
import Sidebar from '../sidebar/Sidebar'
import formatDate from '../../utils/formatDate';

type Props = {
  children?: ReactNode
  title?: string
  pageTitle?: string
}

const MainLayout = ({ children, title = 'This is the default title', pageTitle }: Props) => {
  const showMobileSidebar = () => {
    const hamburger = document.getElementById('menu-btn')
    const sidebar = document.getElementById('sibe-bar')
    hamburger.classList.toggle('open')
    sidebar.classList.toggle('active-mobile-sidebar')
    document.getElementById("overlay").style.display = "block";
  }
  const onClickPageBody = () => {
    const sidebar = document.getElementById('sibe-bar')
    sidebar.classList.remove('active-mobile-sidebar')
    const hamburger = document.getElementById('menu-btn')
    hamburger.classList.remove('open')
    document.getElementById("overlay").style.display = "none";
  }
  if (typeof window !== 'undefined') {
    const sidebar = document.getElementById('sibe-bar')
    const hamburger = document.getElementById('menu-btn')
    window.addEventListener("resize", function() {
      if (window.innerWidth > 976) {
        hamburger.classList.remove('open')
        sidebar.classList.remove("active-mobile-sidebar");
        document.getElementById("overlay").style.display = "none";
      }
    });
  }
  return (<div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="flex relative">
      <Sidebar />
      <div className='page-container'>
        <div className='page-header'>
          <button
            id="menu-btn"
            className="block hamburger lg:hidden focus:outline-none"
            onClick={showMobileSidebar}
          >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
          <h5 className='page-title'>{pageTitle}</h5>
          <span className='current-date'>{formatDate.normal4(new Date())}</span>
        </div>
        <div className='page-body'>
          {children}
          <div id="overlay" onClick={onClickPageBody} />
        </div>
      </div>
    </div>
  </div>)
}

export default MainLayout
