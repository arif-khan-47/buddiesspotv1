import Layout from '@/components/Users/Layout/Layout'
import Loading from '@/components/Loading'
import { useRouter } from 'next/router'


function ProductPage({page}:any) {
  const router = useRouter()
  const  slug  = router.query.page
  return (
    <Layout>
      <div className='container m-autorun'>
      <p>Product: {slug},{page}</p>
      {/* <Loading/> */}
      </div>
    </Layout>
  )
}

export default ProductPage

// This gets called on every request
export async function getServerSideProps(context:any) {
const {page}=(context.query);
 
  // Pass data to the page via props
  return { props: { page } };
}