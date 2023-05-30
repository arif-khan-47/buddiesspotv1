import NonVeg from '@/components/Tools/Img/NonVeg'
import Veg from '@/components/Tools/Img/Veg'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaStar } from 'react-icons/fa'

function ProductCard({ item }: any) {
  return (
    <div className='cursor-pointer hover:bg-yellow-200 hover:text-red-500 h-64 p-2 border-red-500 border rounded-2xl overflow-hidden relative'>

      <Link href={`${item.category}/${item.slug}`}>

      <div className='bg-red-500 text-black px-2 py-1 absolute z-10 rounded-full top-4 left-4 flex gap-1'>
      <FaStar className='my-auto text-xs'/>
      <div className='my-auto text-xs'>{item.ratings}</div>
      </div>
      {
        item.images.map((img: any, index: number) => (
          <div key={index} className='h-36 relative w-full overflow-hidden rounded-xl'>
            <Image
              src={img.url}
              objectFit='fill'
              layout='fill'
              className='w-fit h-fit'
              alt='product'
              />
          </div>
        ))
      }
      <div className='font-semibold mt-2 capitalize'>
        {item.name}
      </div>
      <div className='text-gray-500 absolute bottom-3 left-3 font-bold'>
        <span className='text-xl'>₹ </span>{item.price}/pic
      </div>
      {
        item.type && (
          <div className={`h-14 w-14 absolute -bottom-3 ${item.type === 'veg' ? 'fill-green-800' : 'fill-red-800'} right-3`}>
            {item.type === 'veg' ?
              <Veg />
              :
              <NonVeg />
            }
          </div>
        )
      }
      </Link>
    </div>
  )
}

export default ProductCard
