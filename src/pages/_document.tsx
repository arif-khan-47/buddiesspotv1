import Document, { Html, Head, Main, NextScript } from 'next/document'
import { getAllCategories } from '@/http'


class MyDocument extends Document {
    static async getInitialProps(ctx:any) {
        const initialProps:any = await Document.getInitialProps(ctx)
        const header = await getAllCategories();
        initialProps.header = header.data.categories
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js" defer />
            </Html>
        )
    }
}

export default MyDocument

