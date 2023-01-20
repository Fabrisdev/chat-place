import Head from 'next/head'
import Layout, { siteTitle } from "../components/layout"
export default function Home() {
    const webpageTitle = `${siteTitle} | INICIO`

    return(
        <Layout>
            <>
                <Head>
                    <title>{webpageTitle}</title>
                </Head>
                <p>Página de inicio</p>
            </>
        </Layout>
    )
}

