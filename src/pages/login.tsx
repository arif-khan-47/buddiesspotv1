import Layout from '@/components/Users/Layout/Layout'
import Logo from '@/components/Tools/Img/Logo'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'

function Login() {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const handleEmailInput = (event: any) => {
    setEmail(event.target.value);
  };
  const handlePasswordInput = (event: any) => {
    setPassword(event.target.value);
  };

  const loginHandle = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: '/'
    })
  }
  return (
    <Layout>
      <div className='bg-gradient-to-t from-red-600 to-transparent'>
        <div className='m-auto container'>
          <div className='mx-5 lg:mx-0'>
            <div className='grid grid-cols-2 h-screen relative'>
              <div className='col-span-1 my-auto'>
                <div className='w-[100%]'>
                <div className='h-[20rem] relative -mt-40 mx-auto'>
                  <Logo />
                </div>

                </div>
              </div>
              <div className='col-span-1 my-auto'>
                <div className='bg-yellow-300 rounded-lg p-16 -mt-24 mx-20'>
                  <div className='text-center mb-5 text-red-600 font-bold text-3xl'>Login</div>
                  <div className='w-[100%] h-10 rounded-full mb-4'>
                    <input className='h-full w-full px-5 rounded-full focus:outline-none' type="email" name="" id=""
                      autoFocus={true}
                      defaultValue={email}
                      placeholder='Email'
                      onChange={handleEmailInput} />
                  </div>
                  <div className='w-[100%] h-10 rounded-full mb-4'>
                    <input className='h-full w-full px-5 rounded-full focus:outline-none' type="password" name="" id=""
                      autoFocus={false}
                      defaultValue={password}
                      placeholder='Password'
                      onChange={handlePasswordInput} />
                  </div>
                  <div className='text-center mt-4 hover:bg-black duration-500 bg-red-600 py-2 rounded-full text-white cursor-pointer' onClick={loginHandle}>
                    <button className=''>
                    Submit
                    </button>
                  </div>

                  <div className='h-[2px] bg-red-600 rounded-full my-5'/>
                  <div className='flex justify-center gap-2 font-semibold'>
                    Don&apos;t have an account? <Link href={'/register'}><div className='text-red-600'>Sign Up</div></Link> 
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default Login
