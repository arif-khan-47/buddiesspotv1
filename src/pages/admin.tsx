import React from 'react'
import { getSession, useSession } from 'next-auth/react'
import AdminLayout from '@/components/Admin/Layout/AdminLayout';
import { setCookies } from 'cookies-next';


function Admin() {
  const { data: session }: any = useSession()
    setCookies('token', session?.user?.token, { maxAge: 60 * 6 * 24 });
  return (
    <AdminLayout>
      Admin route
    </AdminLayout>
  )
}

export default Admin


export async function getServerSideProps(context: any) {
  const session = await getSession(context);

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