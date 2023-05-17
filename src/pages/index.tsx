import Layout from "@/components/Users/Layout/Layout"
import React, { useEffect, useState } from "react"
import { MdOutlineManageSearch } from 'react-icons/md'
import LogoWithoutName from '../components/Tools/Img/LogoWithoutName'
import Loading from "@/components/Loading"
import { getAllProduct, searchProducts } from "@/http"
import ProductCardSlider from "@/components/Users/Cards/ProductCardSlider"
import { useDebounce } from "use-debounce"
import { Product } from "@/types/productInterface"



export default function Home() {
  const [loading, setLoading] = useState(true)
  const [searchLoading, setSearchLoading] = useState(true)
  const [product, setProduct] = useState([])
  const [data, setData] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const handleSearchInput = (event: any) => {
    setSearchInput(event.target.value);
    setSearchLoading(true)
  };
  async function getProducts() {
    try {
      const res = await getAllProduct();
      setProduct(res?.data?.products);
    } catch (error) {
      console.log(error);
    }
  }
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
      setSearchLoading(false)
    }
  }, [searchValue])

  useEffect(() => {
    getProducts();
    setLoading(false);
  }, []);

  return (
    <>
      <Layout>
        {
          loading ?
            <Loading /> :
            <div className="m-auto container">
              <div className="grid grid-cols-3 mx-5 lg:mx-0">
                <div className="col-span-2 ml-10">
                  <div className="mt-28 text-5xl">
                    <span className="font-bold">Find Awesome Food</span> In Mumbai
                  </div>
                  <div className="text-2xl opacity-50 mt-5">
                    List of tops shawarma, frakie and all based on trends.
                  </div>
                  <div className="h-12 mt-5 relative">
                    <input className="w-full h-full bg-red-300 rounded-full px-10 placeholder:text-black" defaultValue={searchInput} onChange={handleSearchInput} placeholder="Search Food" type="text" />
                    <MdOutlineManageSearch className="top-1/2 w-8 h-8 right-3 transform -translate-y-1/2 absolute" />
                  </div>
                  <div className="mt-8">
                    {searchInput === '' ?
                      <ProductCardSlider product={product} />
                      :
                      <>
                        <>
                          {
                            !searchLoading && data && data.length === 0 && (
                              <div className='text-center text-red-500 font-semibold text-2xl'>Not found</div>
                            )
                          }
                        </>
                        {
                          searchLoading ?
                            <div className='text-center animate-pulse text-red-500 font-semibold text-2xl'>Loading...</div>
                            :
                            data && data.length > 0 && (
                              <ProductCardSlider product={data} />
                            )
                        }
                      </>
                    }
                  </div>
                </div>

                <div className="col-span-1 w-full ">
                  <div className='h-[30rem] w-[100%] relative mx-auto'>
                    <LogoWithoutName />
                  </div>
                </div>

              </div>
            </div>
        }
      </Layout>
    </>
  )
}

