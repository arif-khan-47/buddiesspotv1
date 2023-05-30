import React, { useState, useEffect } from 'react'
import Logo from '../../Tools/Img/Logo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getAllCategories } from '@/http'
import { signIn, signOut, useSession } from 'next-auth/react'
import { IoClose, IoMenu } from 'react-icons/io5'
import { RiUser3Fill } from 'react-icons/ri'



const Header = () => {
  const { data: session } = useSession() as any
  const [profileOpen, setProfileOpen] = useState<boolean>(false)
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false)
  const [nav, setNav] = useState([])
  const { pathname } = useRouter()

  const isActive = (href: string) => {
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
    <div className='bg-white'>
      <div className='container m-auto'>
        <div className=' mx-5 lg:mx-0 grid pb-4 grid-cols-2 lg:grid-cols-6 z-10 lg:pt-2'>
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
            <ul className='text-center lg:text-left lg:flex lg:justify-end gap-10 lg:mr-16'>
              <Link href={'/'}><li className={`${isActive('/') ? 'font-semibold' : ''} hover:text-red-600 my-3 lg:my-0`}>Home</li></Link>
              
              {
                nav?.map((item: any, index: number) => (
                    <li onClick={()=>router.push(`/${item}`).then(() => router.reload())} className={`${isActive(`/${item}`) ? '' : ''} hover:text-red-600 my-3 lg:my-0 capitalize cursor-pointer`}>{item}</li>

                ))
              }
              
              {
                session?.user ?
                  <><li>
                    <li className={`text-red-600 relative cursor-pointer`} onClick={() => setProfileOpen(!profileOpen)}>
                      <RiUser3Fill className='h-6 w-6' />
                    </li>
                    <div className={`absolute ${profileOpen ? 'block' : 'hidden'} z-10 mt-2 py-2 bg-yellow-300 rounded-lg px-2`}>
                      <Link href={'/profile'}><li className={`text-red-600 cursor-pointer rounded-md hover:text-white hover:bg-black px-1`}>{session && session.user && session.user.user && session.user.user.name}</li></Link>
                      <li onClick={() => signOut()} className={`text-red-600 cursor-pointer rounded-md hover:text-white hover:bg-black px-1 mt-2`}>Logout</li>
                    </div>
                  </li>
                  </>
                  :
                  <>
                    <Link href={'/login'}><li onClick={() => signIn()} className={`${isActive('/login') ? '' : ''} hover:text-red-600 my-3 lg:my-0`}>Login</li></Link>
                    <Link href={'/register'}><li className={`${isActive('/register') ? '' : ''} hover:text-red-600 my-3 lg:my-0`}>Sign Up</li></Link>
                  </>
              }

            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}


export default Header

