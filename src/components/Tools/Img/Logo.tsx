import Image from 'next/image'
import React from 'react'

interface ILogoProps {
    className: any
}
// const Logo = ({ className }: ILogoProps): JSX.Element => {
const Logo = () => {

    const LogoUrl = 'https://res.cloudinary.com/dgyudczza/image/upload/v1682572572/Buddies%20Spot/BS_pky7dg.png'
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
