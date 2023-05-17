import React, { useState, useEffect } from 'react'
import Logo from '../../Tools/Img/Logo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoPeople, IoHome } from 'react-icons/io5'
import {BsMenuButtonWideFill} from 'react-icons/bs'


const Sidebar = () => {
  const options = [
    {
      title: 'Home',
      path: '/admin',
      icon: <IoHome className='h-5 w-5'/>
    },
    {
      title: 'Products',
      path: '/admin/product',
      icon: <BsMenuButtonWideFill className='h-5 w-5'/>
    },
    {
      title: 'Users',
      path: '/admin/users',
      icon: <IoPeople className='h-5 w-5'/>
    },
  ]
  const { pathname } = useRouter()

  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <div className=''>
      <div className='container m-auto'>
        <div className='mx-5 lg:mx-0'>
          <div className='h-16 w-32 lg:my-5 mx-auto lg:h-20 lg:w-40 relative'>
            <a href="/">
            <Logo />
            </a>
          </div>
          <div className={`my-auto lg:block col-span-2 lg:col-span-5`}>
            <ul className='py-5'>
              {
                options.map((item, index) => (
                  <Link key={index} href={item.path}>
                    <li className={`${isActive(item.path) ? 'font-semibold bg-white text-red-600 ' : ''} flex hover:text-red-600 my-3 lg:mb-2 py-2 gap-2 pl-8 rounded-l-full`}><span
                      className={`${isActive(item.path) ? 'text-red-600' : ''} my-auto`}
                    >{item.icon}</span>
                      {item.title}</li>
                  </Link>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Sidebar

