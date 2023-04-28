import React from 'react'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode,
  // config:any
  // navbar:any
}

const Layout = ({ children }: LayoutProps) => {

  return (
    <div>
      <Header />
      <main className='min-h-screen'>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout