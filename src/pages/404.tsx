import LogoWithoutName from '@/components/Tools/Img/LogoWithoutName'
import { useRouter } from 'next/router'
import React from 'react'

function ErrorPage() {
    const router = useRouter()
    return (
        <div className='flex h-screen'>
            <div className='m-auto'>
                <div className='flex'>
                    <div className='relative h-64 w-32'>
                        <LogoWithoutName />
                    </div>
                    <div className='h-52 my-auto mr-10 bg-black w-1' />
                    <div className='my-auto text-5xl leading-normal'>
                        <p className='text-4xl'>This Page Could</p>
                        <p className='font-bold text-red-500'>Not Be Found</p>
                    </div>

                </div>
                    <div onClick={()=>router.push('/')} className='text-center mt-4 hover:bg-black duration-500 bg-red-600 py-2 rounded-full text-white cursor-pointer text-2xl hover:scale-105'>
                        Go to the home page.
                    </div>
            </div>
        </div>


    )
}

export default ErrorPage
