import store from '@/redux/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'
import { getAllCategories } from '@/http'
import { Toaster } from 'react-hot-toast'

function App({ Component, pageProps: { session, pageProps } }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </Provider>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  )
}

export default App;
