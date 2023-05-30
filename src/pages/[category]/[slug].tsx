import { getSession } from 'next-auth/react';
import React, { useState } from 'react';
import { NextPageContext } from 'next'
import { getSingleProduct } from '@/http';
import Layout from '@/components/Users/Layout/Layout';
import Image from 'next/image';

function ProductDetail({ data }: any) {

    const [expanded, setExpanded] = useState(false);

    console.log(data)
    return (
        <Layout>
            <div className='m-auto container'>
                <div className='grid grid-cols-2 pt-10'>
                    {
                        data.images.map((image: any, index: number) => (
                            <div key={index} className='w-96 h-96 relative col-span-1 mx-auto'>
                                <Image
                                    src={image?.url}
                                    objectFit='contain'
                                    layout='fill'
                                    className='w-fit h-fit'
                                    alt='img'
                                />
                            </div>

                        ))
                    }
                    <div className='col-span-1'>
                        <div className='font-bold text-4xl text-red-500 capitalize mb-5'>{data.name} { }[Veg]</div>
                        <div className='font-semibold text-3xl mb-5'>₹ {data.price}</div>
                       
                        {data.description && data.description.length > 200 && !expanded ? (
                            <>
                                <p>{data.description.slice(0, 200)}...</p>
                                <button onClick={() => setExpanded(true)} className='text-red-500 font-semibold'>Read More</button>
                            </>
                        ) : (
                            <>
                                <p>{data.description}</p>
                                {data.description && data.description.length > 200 && expanded && (
                                    <button onClick={() => setExpanded(false)} className='text-red-500 font-semibold'>Show Less</button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}


export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
    const { slug } = context.query;
    try {
        const res = await getSingleProduct(slug as string)
        const data = res?.data?.product;
        if (res?.data?.product) {
            return {
                props: {
                    session,
                    data,
                }
            }
        } else {
            return {
                notFound: true
            }
        }
    } catch (error: any) {
        // console.log(error.response?.data?.success)
        if (error?.response?.data?.success == false) {
            return {
                notFound: true
            }
        } else {
            return {
                props: {
                    session,
                }
            }

        }
    }

}

export default ProductDetail
