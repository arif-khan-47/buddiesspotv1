import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { NextPage } from 'next'
import Head from 'next/head';

interface ILayoutProps {
  hideHeader?: boolean;
  hideFooter?: boolean;
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

const Layout: NextPage<ILayoutProps> = ({
  hideHeader = false,
  hideFooter = false,
  children,
  title = 'Buddies Spot',
  description = 'Best Fast Food in Mumbai.',
  keywords,

}) => {

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#141414" />
      </Head>
      {
        !hideHeader && <nav> <Header />  </nav>
      }
      <main className={`min-h-screen ${hideHeader?``:`-mb-24`}`}>{children}</main>
      {
        !hideFooter && <footer>
          <Footer />
        </footer>
      }
    </div>
  )
}

export default Layout