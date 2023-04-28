import Layout from '@/components/Layout/Layout'
import React from 'react'
import { getSession } from 'next-auth/react'

function about() {
  return (
    <Layout>
      about
    </Layout>
  )
}

export default about


export async function getServerSideProps(context:any) {
    const session = await getSession(context);
    if (!session || session.user.role !== "admin") {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      props: {}, // continue to render the page
    };
  }