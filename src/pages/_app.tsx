import store from '@/redux/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'
import { getAllCategories } from '@/http'
import NextNProgress from "nextjs-progressbar";
import { Toaster } from 'react-hot-toast'


function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <SessionProvider session={pageProps.session}
          // Re-fetch session every 5 minutes
          refetchInterval={5 * 60}
          // Re-fetches session when window is focused
          refetchOnWindowFocus={true}
        >
          <NextNProgress
            options={{ showSpinner: false }}
            color="#F56565"
            startPosition={0.3}
            stopDelayMs={200}
            height={4}
            showOnShallow={true}
          />
          <Component {...pageProps} />

        </SessionProvider>
      </Provider>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  );
}

// MyApp.getInitialProps = async () => {
//   // const config: IConfigData = await layoutData();
//   // now pass config to pageProps
//   // return { pageProps: { config: config.data } }
// }

export default MyApp;
