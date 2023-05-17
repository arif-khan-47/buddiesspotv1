import Link from 'next/link'
import React from 'react'
import Logo from '../../Tools/Img/Logo'
import { HiLocationMarker } from 'react-icons/hi'
import { MdOutlineAlternateEmail, MdCall } from 'react-icons/md'
import { ImWhatsapp } from 'react-icons/im'
import { BiTimeFive } from 'react-icons/bi'
import {BsFacebook, BsTwitter, BsYoutube, BsInstagram} from 'react-icons/bs'

function Footer() {
  const quickLinks = [
    {
      title: 'Home',
      link: '/'
    },
    {
      title: 'About',
      link: '/about'
    },
    {
      title: 'Faqs',
      link: '/'
    },
    {
      title: 'Contact',
      link: '/contact'
    },
  ]
  return (
    <div className='bg-yellow-300'>
      <div className='container m-auto'>
        <div className='py-10 lg:pt-20 grid-cols-1 lg:grid-cols-4 grid mx-5 lg:mx-10'>
          <div className='col-span-1 mb-10 lg:mb-0'>
            <div className='h-24 w-48 lg:h-16 lg:w-32 relative mb-4 mx-auto lg:mx-0'>
              <Link className='w-fit' href={'/'}>
                <Logo />
              </Link>
            </div>
            <div className='text-center lg:text-left'>
              Best Fankie and <br /> Shawarma in Santacruz.
            </div>
          </div>
          <div className='col-span-1 mb-10 lg:mb-0 text-center lg:text-left mx lg:mx-0 mx-auto'>
            <div className='font-semibold text-xl text-center lg:text-left'>Get in Touch</div>


            <div className='flex justify-center lg:justify-start my-2 gap-2'>
              <HiLocationMarker className='w-6 h-6' />
              <div className='my-auto'>
                Santacruz(East)

              </div>
            </div>
            <div className='flex my-2 gap-2 justify-center lg:justify-start'>
              <MdOutlineAlternateEmail className='w-6 h-6' />
              <div className='my-auto'>
                buddiessopt@gmail.com
              </div>
            </div>
            <div className='flex my-2 gap-2 justify-center lg:justify-start'>
              <ImWhatsapp className='w-6 h-6' />
              <div className='my-auto'>
                +91 752 9090909
              </div>
            </div>
            <div className='flex my-2 gap-2 justify-center lg:justify-start'>
              <MdCall className='w-6 h-6' />
              <div className='my-auto'>
                +91 752 9090909
              </div>
            </div>
            <div className='flex my-2 gap-2 justify-center lg:justify-start'>
              <BiTimeFive className='w-6 h-6' />
              <div className='my-auto'>
                4:00 PM - 11:00 PM
              </div>
            </div>
          </div>
          <div className='col-span-1 mb-10 lg:mb-0'>
            <div className='font-semibold text-xl text-center lg:text-left'>Quick Links</div>
            {
              quickLinks.map((item: any, index: number) => (

                <div key={index} className='my-2 gap-2 text-center lg:text-left'>
                  <Link href={item.link}>
                    <span className='hover:text-red-600 text-center'>
                      {item.title}
                    </span>
                  </Link>
                </div>
              ))
            }
          </div>

          <div className='col-span-1'>
            <div className='font-semibold text-xl text-center lg:text-left'>Follow Us</div>
              <div className='flex mt-2 flex-wrap gap-2 justify-center lg:justify-start'>
                <BsFacebook className='border rounded-full border-black hover:border-red-600 hover:text-red-600 cursor-pointer p-1 h-10 w-10'/>
                <BsTwitter className='border rounded-full border-black hover:border-red-600 hover:text-red-600 cursor-pointer p-1 h-10 w-10'/>
                <BsYoutube className='border rounded-full border-black hover:border-red-600 hover:text-red-600 cursor-pointer p-1 h-10 w-10'/>
                <BsInstagram className='border rounded-full border-black hover:border-red-600 hover:text-red-600 cursor-pointer p-1 h-10 w-10'/>
                <ImWhatsapp className='border rounded-full border-black hover:border-red-600 hover:text-red-600 cursor-pointer p-1 h-10 w-10'/>
              </div>
          </div>
        </div>
          <div className='h-[2px] bg-red-600 rounded-full w-[90%] mx-auto my-10'/>
          <div className='pb-10 opacity-70 text-center lg:text-left'>Copyright &#169; {new Date().getFullYear()}. All Right Reserved.</div>
      </div>
    </div>
  )
}

export default Footer
