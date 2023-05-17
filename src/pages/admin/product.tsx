import AdminLayout from '@/components/Admin/Layout/AdminLayout'
import { DeleteProduct, getAllProduct, searchProducts } from '@/http';
import { Product } from '@/types/productInterface';
import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce';
import { BiSearch } from 'react-icons/bi'
import { IoIosCreate, } from 'react-icons/io'
import { IoArrowBackOutline } from 'react-icons/io5'
import CreateProduct from '@/components/Admin/Product/CreateProduct';
import { getSession, useSession } from 'next-auth/react';
import { MdDelete, MdModeEdit } from 'react-icons/md'
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import Link from 'next/link';
import toast from 'react-hot-toast';



function Product() {
    const { data: session }: any = useSession()
    setCookies('token', session?.user?.token, { maxAge: 60 * 6 * 24 });


    const [tab, setTab] = useState('getProduct')

    const [product, setProduct] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const handleSearchInput = (event: any) => {
        setSearchInput(event.target.value);
        setLoading(true)
    };
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<any>([])

    const [searchValue] = useDebounce(searchInput, 1000);

    async function getSearchContent(value: string) {
        try {
            const res = await searchProducts(value);
            setData(res?.data?.products);
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }

    }

    useEffect(() => {
        if (searchValue) {
            getSearchContent(searchValue)
        }
    }, [searchValue])


    async function getProducts() {
        try {
            const res = await getAllProduct();
            setProduct(res?.data?.products);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProducts();
        setLoading(false);
    }, []);

    async function handleDeleteProduct(item: Product) {
        const confirmed = confirm(`Are you sure to delete ${item.name}?`);
        if (confirmed) {
            try {
                const res = await DeleteProduct(item?._id)
                console.log(res?.data)
                toast.success('Product deleted successfully')
                setTimeout(() => window.location.reload(), 3000);
            } catch (error) {
                console.log(error)
                toast.error('Something went wrong.')
            }
        } else {
            // User cancelled deletion, do nothing or add any additional logic you need
        }
    }

    return (
        <div>
            <AdminLayout>
                {
                    tab == 'getProduct' && (
                        <>
                            <div className='font-bold mx-10 py-8 flex justify-between'>
                                <div className='text-2xl flex gap-10'>All Products
                                    <div className='border-b border-red-500 flex gap-2'>
                                        <BiSearch className='my-auto text-red-500' />
                                        <input className='placeholder:text-xl text-xl focus:outline-none'
                                            defaultValue={searchInput}
                                            onChange={handleSearchInput}
                                            placeholder='Search here' type="text" name="" id="" />
                                    </div>
                                </div>
                                <div onClick={() => setTab('createProduct')} className='my-auto border px-3 cursor-pointer duration-500 hover:bg-yellow-300 hover:text-black py-2 border-red-500 bg-red-500 gap-1 text-white rounded-full text-sm flex'>
                                    <IoIosCreate className='my-auto h-5 w-5' />
                                    Create Product
                                </div>
                            </div>
                            <div className='mx-10 mb-10'>
                                <table className='bg-yellow-300 w-full rounded-md overflow-hidden'>
                                    <thead className='w-full text-white'>
                                        <tr className='bg-red-500 w-[100%] text-left'>
                                            <th className='w-[8%] py-2 px-1'>Sr No.</th>
                                            <th className='w-[50%] py-2 px-1'>Name</th>
                                            <th className='w-[20%] py-2 px-1'>Category</th>
                                            <th className='w-[10%] py-2 px-1'>Price</th>
                                            <th className='w-[12%] py-2 px-1'></th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {searchInput === '' ?
                                            product && product.length > 0 && product.map((product: Product, index: number) => (
                                                <tr className='border-y'>
                                                    <td className='py-2 text-center'>{index + 1}</td>
                                                    <td className='py-2 px-1 font-semibold capitalize'>{product.name}</td>
                                                    <td className='py-2 px-1 capitalize'>{product.category}</td>
                                                    <td className='py-2 px-1'>₹{product.price}</td>
                                                    <td className='py-2 px-1 flex justify-center gap-2'>
                                                        <div>
                                                            <Link href={`/admin/product/${product.slug}`}>
                                                                    <MdModeEdit className='my-auto h-8 w-8 cursor-pointer hover:bg-red-500 hover:text-white rounded-full p-1' />
                                                            </Link>
                                                        </div>
                                                        <div><MdDelete onClick={() => handleDeleteProduct(product)} className='my-auto h-8 w-8 cursor-pointer hover:bg-red-500 hover:text-white rounded-full p-1' /></div>
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            <>
                                                <>
                                                    {
                                                        !loading && data && data.length === 0 && (
                                                            <tr className='border-y'>
                                                                <td colSpan={3} className='text-center'>Not Found</td>
                                                            </tr>
                                                        )
                                                    }
                                                </>
                                                {
                                                    loading ?
                                                        <tr className='border-y'>
                                                            <td colSpan={3} className='text-center'>Loading...</td>
                                                        </tr>
                                                        :
                                                        data && data.length > 0 && data.map((product: Product, index: number) => (
                                                            <tr className='border-y'>
                                                    <td className='py-2 text-center'>{index + 1}</td>
                                                    <td className='py-2 px-1 font-semibold capitalize'>{product.name}</td>
                                                    <td className='py-2 px-1 capitalize'>{product.category}</td>
                                                    <td className='py-2 px-1'>₹{product.price}</td>
                                                    <td className='py-2 px-1 flex justify-center gap-2'>
                                                        <div>
                                                            <Link href={`/admin/product/${product.slug}`}>
                                                                    <MdModeEdit className='my-auto h-8 w-8 cursor-pointer hover:bg-red-500 hover:text-white rounded-full p-1' />
                                                            </Link>
                                                        </div>
                                                        <div><MdDelete onClick={() => handleDeleteProduct(product)} className='my-auto h-8 w-8 cursor-pointer hover:bg-red-500 hover:text-white rounded-full p-1' /></div>
                                                    </td>
                                                </tr>
                                                        ))
                                                }
                                            </>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </>

                    )
                }
                {
                    tab == 'createProduct' && (
                        <>
                            <div className='font-bold mx-10 py-8 flex gap-2'>
                                <div onClick={() => setTab('getProduct')} className='my-auto border px-3 cursor-pointer duration-500 hover:bg-yellow-300 hover:text-black py-2 border-red-500 bg-red-500 gap-1 text-white rounded-full text-sm flex'>
                                    <IoArrowBackOutline className='my-auto h-5 w-5' />
                                </div>
                                <div className='text-2xl flex gap-10 my-auto'>Create Product</div>
                            </div>
                            <div className='mx-10'>
                                <CreateProduct />
                            </div>
                        </>
                    )}


            </AdminLayout>
        </div>
    )
}

export default Product



export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    // console.log('session',session?.user?.token) 


    if (!session || session.user.role !== "admin") {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }


    return {
        props: {},
    };
}