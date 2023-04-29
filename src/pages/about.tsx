import Layout from '@/components/Layout/Layout'
import React from 'react'
import { getSession } from 'next-auth/react'
import Loading from '@/components/Loading'

function About() {
  return (
    <Layout>
      <Loading/>
    </Layout>
  )
}

export default About


export async function getServerSideProps(context: any) {
  const session = await getSession(context);
// console.log('bhabhabhabhabhabhabhabhabhabh',session)

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