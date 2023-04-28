import React, { useState, useEffect } from 'react'
import Logo from '../Tools/Img/Logo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getAllCategories } from '@/http'
import { signIn, signOut, useSession } from 'next-auth/react'
import {IoClose, IoMenu} from 'react-icons/io5'



const Header = ( ) => {
  const { data: session } = useSession()
  
  const [open, setOpen] = useState<boolean>(false)
  const [nav, setNav] = useState([])
  
  
  const isActive = (href: string) => {
    const { pathname } = useRouter()
    return pathname === href
  }
  useEffect(() => {
    async function getCategories() {
      try {
        const res = await getAllCategories();
        setNav(res.data.categories);
      } catch (error) {
        console.log(error);
      }
    }
    getCategories()
  }, [])

  return (
    <div className=''>
      <div className='container m-auto'>
        <div className=' mx-5 lg:mx-0 grid pb-4 grid-cols-2 lg:grid-cols-6 bg-white z-10'>
          <div className='col-span-1 my-auto'>
            <div className='h-16 w-32 lg:h-20 lg:w-40 relative'>
              <Link className='w-fit' href={'/'}>
                <Logo />
              </Link>
            </div>
          </div>

          <div className='lg:hidden col-span-1 relative flex'>
            <div onClick={() => setOpen(!open)} className='absolute top-1/2 right-0 transform -translate-y-1/2 p-2'>
              {
                open ?
                  <IoClose className={'w-8 h-8 m-auto'} />
                  :
                  <IoMenu className={'w-8 h-8 m-auto'} />
              }
            </div>
          </div>

          <div className={`${open ? 'block' : 'hidden'} my-auto lg:block col-span-2 lg:col-span-5`}>
            <ul className='text-center lg:text-left lg:flex lg:justify-end gap-10'>
              <Link href={'/'}><li className={`${isActive('/') ? 'font-semibold' : ''} my-3 lg:my-0`}>Home</li></Link>
              <Link href={'/about'}><li className={`${isActive('/about') ? 'font-semibold' : ''} my-3 lg:my-0`}>About</li></Link>
              <Link href={'/contact'}><li className={`${isActive('/') ? 'font-semibold' : ''} my-3 lg:my-0`}>Contact</li></Link>
              {
                nav?.map((item: any, index: number) => 
                (
                  <Link key={index} href={`/${item}`}><li className={`${isActive(`/{item}`) ? 'font-semibold' : ''} my-3 lg:my-0`}>{item}</li></Link>
                  ),
                )
              }
              {
                session?.user ?
                  <Link href={'/'}><li onClick={() => signOut()} className={`text-red-600`}>Logout</li></Link>
                  :
                  <Link href={'/login'}><li onClick={() => signIn()} className={`${isActive('/login') ? 'font-semibold' : ''} my-3 lg:my-0`}>Login</li></Link>
              }

            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}





export default Header

