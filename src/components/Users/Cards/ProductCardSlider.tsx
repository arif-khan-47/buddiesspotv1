import React, { useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Product } from '@/types/productInterface';
import Image from 'next/image';

function ProductCardSlider({ product }: any) {
    const [isHover, setIsHover] = useState<null | Number>(null)
    console.log('zsrdxfcgvhbjnk', product)
    return (
        <div>
            <Swiper
                spaceBetween={10}
                slidesPerView={6}
            >
                {
                    product && product.length > 0 && product.map((item: Product, index: number) => (
                        <SwiperSlide>
                            <div onMouseOver={() => setIsHover(index)} onMouseOut={() => setIsHover(null)} className={`${isHover == index ? 'bg-yellow-300' : ''} border-red-500 border-2 rounded-lg h-44 cursor-pointer overflow-hidden relative`}>
                                <div className='relative h-16 w-16 mx-auto my-3'>
                                    <Image
                                        src={item?.images[0]?.url}
                                        objectFit='contain'
                                        layout='fill'
                                        className='w-fit h-fit rounded-full'
                                        alt='logo'
                                    />
                                </div>
                                <div className='text-center text-xs text-red-500 font-bold capitalize'>
                                    {item.name}
                                </div>
                                <div className='absolute bottom-2 text-sm font-bold left-1/2 transform -translate-x-1/2 text-gray-600'>
                                    ₹{item.price}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default ProductCardSlider
