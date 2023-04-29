import React from 'react'
import LogoWithoutName from './Tools/Img/LogoWithoutName'

function Loading() {
    return (
        <div className='container m-auto'>
            <div className='h-screen flex relative'>
                <div className='h-[60%] w-full mx-auto animate-bounce bottom-[20%] absolute'>
                    <LogoWithoutName />
                </div>
                <div className='text-red-600 font-semibold absolute bottom-[20%] left-1/2  transform -translate-x-1/2 animate-pulse'>Loading...</div>
            </div>
        </div>
    )
}

export default Loading
