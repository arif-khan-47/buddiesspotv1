import React from 'react'
import Sidebar from './Sidebar'
// import Footer from './Footer'
import { NextPage } from 'next'
import Head from 'next/head';

interface IAdminLayoutProps {
  hideHeader?: boolean;
  hideFooter?: boolean;
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

const AdminLayout: NextPage<IAdminLayoutProps> = ({
  hideHeader = false,
  hideFooter = false,
  children,
  title = 'Buddies Spot | Admin',
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
      <div className='grid grid-cols-6'>
        <nav className='col-span-1 h-screen bg-yellow-300 sticky top-0 bottom-0 left-0'>
          {
            !hideHeader && <Sidebar />
          }

        </nav>
        <main className={`col-span-5 min-h-screen`}>{children}</main>
        {/* {
        !hideFooter && <footer>
        <Footer />
        </footer>
      } */}

      </div>
    </div>
  )
}

export default AdminLayout