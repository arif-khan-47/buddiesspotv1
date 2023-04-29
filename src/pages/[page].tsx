import Layout from '@/components/Layout/Layout'
import { useRouter } from 'next/router'


function ProductPage() {
  const router = useRouter()
  const  slug  = router.query.page
  return (
    <Layout>
      <p>Product: {slug}</p>
    </Layout>
  )
}

export default ProductPage