import Image from 'next/image'
import React from 'react'

interface ILogoProps {
    className: any
}
const Logo = () => {

    const LogoUrl = 'https://res.cloudinary.com/dgyudczza/image/upload/v1682663310/Buddies%20Spot/BS_pgqi1o.png'
    return (
        <Image
            src={LogoUrl}
            objectFit='contain'
            layout='fill'
            className='w-fit h-fit'
            alt='logo'
        />

    )
}

export default Logo
