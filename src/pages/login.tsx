import Layout from '@/components/Layout/Layout'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'

function login() {

  const handleEmailInput = (event: any) => {
    setEmail(event.target.value);
  };
  const handlePasswordInput = (event: any) => {
    setPassword(event.target.value);
  };
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const loginHandle = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect:true,
      callbackUrl:'/'
    })
  }
  return (
    <Layout>
      <div className='m-auto'>
        <div>
          <input className='border' type="email" name="" id=""
            autoFocus={true}
            defaultValue={email}
            placeholder='Phone Number'
            onChange={handleEmailInput} />
        </div>
        <div>
          <input className='border' type="password" name="" id=""
            autoFocus={true}
            defaultValue={password}
            placeholder='Phone Number'
            onChange={handlePasswordInput} />
        </div>
        <button onClick={loginHandle}>
          Submit
        </button>
      </div>
    </Layout>
  )
}

export default login
