import Layout from '@/components/Users/Layout/Layout'
import Loading from '@/components/Loading'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { NextPageContext } from 'next'
import { useEffect, useState } from 'react'
import { getProductsByCategory } from '@/http'
import { Product } from '@/types/productInterface'
import ProductCard from '@/components/Users/Cards/ProductCard'


function ProductPage() {

  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<any>([])
  console.log(data)

  const router = useRouter()
  const slug = router.query.page
  async function getData() {
    try {
      const res = await getProductsByCategory(slug as string)
      setLoading(false)
      setData(res?.data?.products)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <Layout>
      {loading ?
        <Loading /> :
        <div className='container m-auto'>
          <div className='mt-5 mb-5 capitalize font-semibold text-xl text-red-500'>{slug}</div>
          <div className='grid grid-cols-5 gap-8'>
            {
              data && data.map((item: Product, index: number) => (
                <div className='col-span-1'>
                  <ProductCard item={item} />
                </div>

              ))
            }
          </div>
        </div>}
    </Layout>
  )
}



export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  const { page } = context.query;
  try {
    const res = await getProductsByCategory(page as string)
    const data = res?.data?.products;
    if (data.length > 0) {
      return {
        props: {
          session,
          a:data,
        }
      }
    }else{
      return{
        notFound:true
      }
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        session,
      }
    }
  }

}

export default ProductPage